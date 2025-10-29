import { NextResponse } from "next/server";
import { z } from "zod";
import { getDataUserServer } from "@/libs/api";

const bodySchema = z.object({
  username: z.string().min(3).max(100),
  password: z.string().min(6).max(128),
});

export async function POST(req: Request) {
 try {
    const json = await req.json().catch(() => ({}));
    const parse = bodySchema.safeParse(json);
    if (!parse.success) {
        return new NextResponse("Invalid input", { status: 400 });
    }
    const { username, password } = parse.data;

    const users = await getDataUserServer();
    const user = users.find(
        (u) => u.username === username && u.password === password
    );

    if (!user) {
        return new NextResponse("Invalid credentials", { status: 401 });
    }

    const res = NextResponse.json({ ok: true, data_passing:user.username });
    res.cookies.set({
        name: "token",
        value: user.id,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60,
    });

    return res;
  } catch (err) {
    console.error("Login POST error:", err);
    const msg = String(err);

    if (process.env.NODE_ENV !== "production") {
      return new NextResponse(`Internal server error: ${msg}`, { status: 500 });
    } else {
      return new NextResponse(`Internal server error: ${msg}`, { status: 500 });
    }
  }
}
