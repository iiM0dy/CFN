const API = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8888/api';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const res = await fetch(`${API}/orders/track${url.search}`, {
    headers: {
      'Accept': 'application/json',
      ...(request.headers.get('authorization') ? { 'Authorization': request.headers.get('authorization')! } : {}),
    },
  });
  const data = await res.text();
  return new Response(data, { status: res.status, headers: { 'Content-Type': 'application/json' } });
}
