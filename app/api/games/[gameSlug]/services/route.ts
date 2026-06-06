import { NextResponse } from "next/server";

const API = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8888/api';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ gameSlug: string }> }
) {
  const { gameSlug } = await params;
  const url = new URL(request.url);
  const res = await fetch(`${API}/games/${encodeURIComponent(gameSlug)}/services${url.search}`, {
    headers: {
      'Accept': 'application/json',
      ...(request.headers.get('authorization') ? { 'Authorization': request.headers.get('authorization')! } : {}),
    },
  });
  const json = await res.json().catch(() => null);
  if (!json || res.status === 404) {
    return NextResponse.json([], { status: res.status });
  }
  const data = json.services ?? json.data ?? json;
  return NextResponse.json(Array.isArray(data) ? data : []);
}
