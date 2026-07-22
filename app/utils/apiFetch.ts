import { useAuthStore } from "@/app/store/authstore";

export async function apiFetch(
  input: RequestInfo,
  init: RequestInit = {}
) {
  const { token, logout } = useAuthStore.getState();

  const headers = new Headers(init.headers);

  // Only set Content-Type if the request has a body
  if (init.body) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(input, {
    ...init,
    headers,
    credentials: "include",
    cache: "no-store",
  });

  const text = await response.text();

  let data = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (response.status === 401) {
    logout();

    if (typeof window !== "undefined") {
      localStorage.removeItem("auth-storage");
      window.location.replace("/auth/login");
    }

    throw new Error("Session expired");
  }

  if (!response.ok) {
    throw {
      status: response.status,
      message: response.statusText,
      body: data,
    };
  }

  return data;
}