"use client";

import { useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/app/store/authstore";

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({
  children,
}: AuthProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    if (searchParams.get("session") === "expired") {
      logout();
      localStorage.removeItem("auth-storage");
      localStorage.removeItem("authToken");
      localStorage.removeItem("username");
      localStorage.removeItem("role");
      localStorage.removeItem("permission");

      return;
    }

    const timer = setTimeout(() => {
      // Only redirect authenticated users away from auth pages
      if (
        token &&
        (pathname === "/auth/login" ||
          pathname === "/auth/register" ||
          pathname === "/auth/forgot-password")
      ) {
        router.replace("/dashboard");
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [logout, pathname, router, searchParams, token]);

  return children;
}
