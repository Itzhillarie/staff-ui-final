"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/app/store/authstore";

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({
  children,
}: AuthProviderProps): React.ReactNode {
  const router = useRouter();
  const pathname = usePathname();

  const token = useAuthStore((state) => state.token);
  const setLoading = useAuthStore((state) => state.setLoading);

  useEffect(() => {
    setLoading(true);

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

      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [
    token,
    pathname,
    router,
    setLoading,
  ]);

  return children as React.ReactNode;
}
