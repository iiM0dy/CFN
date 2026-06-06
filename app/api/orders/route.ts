import { auth } from "@/auth";
import { NextResponse } from "next/server";

const API = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8888/api';

export async function GET(request: Request) {
  const session = await auth();
  const token = (session?.user as any)?.accessToken;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(request.url);
  const res = await fetch(`${API}/orders${url.search}`, {
    headers: {
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  });
  const json = await res.json().catch(() => null);
  const data = json?.data ?? json ?? [];
  return NextResponse.json(data, { status: res.status });
}

export async function POST(request: Request) {
  const session = await auth();
  const token = (session?.user as any)?.accessToken;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.text();
  const res = await fetch(`${API}/orders`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body,
  });
  const json = await res.json().catch(() => null);
  const data = json?.data ?? json;
  return NextResponse.json(data, { status: res.status });
}
