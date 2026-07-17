export async function apiFetch(url: string, options: RequestInit = {}) {
  console.log("API Request:", url, options);
  const res = await fetch(url, options);
  const text = await res.text();
  let json = null;
  try { json = text ? JSON.parse(text) : null; } catch (e) { json = null; }
  if (!res.ok) {
    const err: any = new Error(`HTTP ${res.status} ${res.statusText}`);
    err.status = res.status;
    err.body = json || text;
    throw err;
  }
  return json;
}
