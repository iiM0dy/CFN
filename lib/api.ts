const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8888/api';

export async function api<T = any>(path: string, options?: RequestInit & { token?: string }): Promise<T> {
  const { token, ...fetchOptions } = options || {};
  const headers: Record<string, string> = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    ...(options?.headers as Record<string, string> || {}),
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...fetchOptions,
    headers,
    cache: 'no-store',
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(body.error || body.message || `API error ${res.status}`);
  }

  const text = await res.text();
  if (!text) return null as T;
  return JSON.parse(text);
}

export function apiServer<T = any>(path: string, options?: RequestInit) {
  return api<T>(path, options);
}
