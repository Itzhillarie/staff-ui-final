"use client";

import { useAuthStore } from "@/app/store/authstore";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;
const token = useAuthStore.getState().token;

interface LoginPayload {
  username: string;
  password: string;
}

export async function login(data: LoginPayload) {
  const response = await fetch(`${API_URL}/users/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "Login failed");
  }

  useAuthStore.getState().login(
    result.token,
    result.username,
    result.role
  );

  return result;
}

export function logout() {
  useAuthStore.getState().logout();
}