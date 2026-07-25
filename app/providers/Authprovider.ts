"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/app/store/authstore";

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({
  children,
}: AuthProviderProps) {
  const router = useRouter();
  const pathname = usePathname();

  const token = useAuthStore((state) => state.token);

  useEffect(() => {
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
  }, [token, pathname, router]);

  return {children};
}