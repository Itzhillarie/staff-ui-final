"use client";

import { useAuthStore } from "@/app/store/authstore";

export async function apiFetch<T = unknown>(
  input: RequestInfo | URL,
  init: RequestInit = {}
): Promise<T> {
  const headers = new Headers(init.headers);

  if (init.body) {
    headers.set("Content-Type", "application/json");
  }

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

    let data: Record<string, unknown> = {};

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
      getErrorMessage(data, response.status)
    );
  }

  if (response.status === 204) {
    return null as T;
  }

  return response.json();
}

function getErrorMessage(
  data: Record<string, unknown>,
  status: number
) {
  for (const key of ["error", "detail", "message"]) {
    const value = data[key];

    if (typeof value === "string" && value.trim()) {
      return value;
    }
  }

  return `HTTP ${status}`;
}
