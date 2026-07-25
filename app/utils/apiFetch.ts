"use client";

import { useAuthStore } from "@/app/store/authstore";

export async function apiFetch<T = any>(
  input: RequestInfo | URL,
  init: RequestInit = {}
): Promise<T> {
  const headers = new Headers(init.headers);

  if (init.body) {
    headers.set("Content-Type", "application/json");
  }""

  headers.set("ngrok-skip-browser-warning", "1");

  const token = useAuthStore.getState().token;

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  

  const response = await fetch(input, {
    ...init,
    headers,
    credentials: "include",
    cache: "no-store",
    mode: "cors",
  });

  if (!response.ok) {
    const text = await response.text();

    let data: any = {};

    try {
      data = JSON.parse(text);
    } catch {}

    if (response.status === 401) {
      useAuthStore.getState().logout();

      if (typeof window !== "undefined") {
        window.location.href = "/auth/login";
      }
    }

    throw new Error(
      data.error ||
      data.detail ||
      data.message ||
      `HTTP ${response.status}`
    );
  }

  if (response.status === 204) {
    return null as T;
  }

  return response.json();
}