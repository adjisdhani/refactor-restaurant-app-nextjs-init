import { NextResponse } from 'next/server';

export async function POST() {
  const res = NextResponse.json({ ok: true });

  res.cookies.set({
    name: 'token',
    value: '',
    path: '/',
    maxAge: 0,
  });

  res.cookies.set({
    name: 'csrf',
    value: '',
    path: '/',
    maxAge: 0,
  });

  return res;
}