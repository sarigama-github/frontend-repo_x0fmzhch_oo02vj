export const API_BASE = import.meta.env.VITE_BACKEND_URL || "";

async function http(path, { method = "GET", body, params } = {}) {
  const url = new URL((API_BASE || "") + path, window.location.origin);
  if (params) Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") url.searchParams.set(k, String(v));
  });
  const res = await fetch(url.toString(), {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`API ${method} ${path} failed: ${res.status}`);
  return res.json();
}

export const api = {
  get: (p, opts) => http(p, { ...opts, method: 'GET' }),
  post: (p, body, opts) => http(p, { ...opts, method: 'POST', body }),
};
