"use client";

import { useAuthStore } from "@/app/store/authstore";

export function logout() {
  // Clear Zustand state
  useAuthStore.getState().logout();

  // Clear persisted Zustand storage
  localStorage.removeItem("auth-storage");
  localStorage.removeItem("authToken");
  localStorage.removeItem("username");
  localStorage.removeItem("role");

  // Clear any non-HTTP-only cookies
  document.cookie =
    "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie =
    "role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  // Redirect
  window.location.replace("/auth/login");
}