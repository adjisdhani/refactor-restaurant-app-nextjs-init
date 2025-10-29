/* import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token && req.nextUrl.pathname.startsWith("/main")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/main/:path*"],
}; */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const CSRF_COOKIE_NAME = "csrf";
const CSRF_HEADER_NAME = "x-csrf-token";
const SECRET  = `${process.env.CSRF_SECRET}`;

if (SECRET === "undefined" || SECRET === "") {
  throw new Error("CSRF SECRET must be defined in .env.local");
}

function genToken(len = 24) {
  const arr = crypto.getRandomValues(new Uint8Array(len));
  return Array.from(arr).map(b => b.toString(16).padStart(2, "0")).join("");
}

function encodeUtf8(s: string) {
  return new TextEncoder().encode(s);
}

function toBase64Url(uint8: Uint8Array) {
  let str = "";
  for (let i = 0; i < uint8.length; i++) str += String.fromCharCode(uint8[i]);
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function signHMAC(message: string, secret: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    encodeUtf8(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, encodeUtf8(message));
  return toBase64Url(new Uint8Array(sig));
}

async function verifyHMAC(message: string, secret: string, sigB64url: string) {
  const expected = await signHMAC(message, secret);
  return expected === sigB64url;
}

export async function middleware(req: NextRequest) {
  const resultNext = NextResponse.next();

  // resultNext.headers.set("X-Frame-Options", "DENY");
  // resultNext.headers.set("X-Content-Type-Options", "nosniff");
  // resultNext.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  // resultNext.headers.set("Strict-Transport-Security", "max-age=63072000; includeSubDomains; preload");

  // resultNext.headers.set("Access-Control-Allow-Origin", "*");
  // resultNext.headers.set("Access-Control-Allow-Credentials", "true");
  // resultNext.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  // resultNext.headers.set("Access-Control-Allow-Headers", "Content-Type, X-Csrf-Token");

  const apiUrls = [
    process.env.NEXT_PUBLIC_API_USER,
    process.env.NEXT_PUBLIC_API_RESTAURANT,
  ];

  const csp = [
    "default-src 'self'",
    process.env.NODE_ENV === "development" ? "script-src 'self' 'unsafe-inline'" : "script-src 'self'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data:",
    process.env.NODE_ENV === "development" ? `connect-src *` : `connect-src 'self' ${apiUrls.join(" ")}`,
    "frame-ancestors 'none'",
  ].join("; ");

  // resultNext.headers.set("Content-Security-Policy", csp);

  const token = req.cookies.get("token")?.value;
  if (!token && req.nextUrl.pathname.startsWith("/main")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const method = req.method.toUpperCase();

  if (method === "GET" || method === "HEAD") {
    const cookie = req.cookies.get(CSRF_COOKIE_NAME)?.value;
    if (!cookie) {
      const t = genToken(32);
      const sig = await signHMAC(t, SECRET);
      const cookieVal = `${t}.${sig}`;

      const res = resultNext;
      res.cookies.set({
        name: CSRF_COOKIE_NAME,
        value: cookieVal,
        httpOnly: false,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24,
      });
      return res;
    }
    return resultNext;
  }

  if (["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
    const headerToken = req.headers.get(CSRF_HEADER_NAME) ?? "";
    const cookie = req.cookies.get(CSRF_COOKIE_NAME)?.value ?? "";

    if (!cookie) {
      return new NextResponse("Forbidden - missing CSRF cookie", { status: 403 });
      // return NextResponse.redirect(new URL("/login", req.url));
    }
    const [cookieToken, cookieSig] = cookie.split(".");
    if (!cookieToken || !cookieSig) {
      return new NextResponse("Forbidden - invalid CSRF cookie", { status: 403 });
      // return NextResponse.redirect(new URL("/login", req.url));
    }

    if (!headerToken || headerToken !== cookieToken) {
      return new NextResponse("Forbidden - CSRF token mismatch", { status: 403 });
      // return NextResponse.redirect(new URL("/login", req.url));
    }

    const ok = await verifyHMAC(cookieToken, SECRET, cookieSig);
    if (!ok) {
      return new NextResponse("Forbidden - CSRF token signature invalid", { status: 403 });
      // return NextResponse.redirect(new URL("/login", req.url));
    }

    return resultNext;
  }

  return resultNext;
}

export const config = {
  matcher: [
    "/main/:path*",
    "/libs/:path*",
  ],
};

