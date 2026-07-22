import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const jwt = request.cookies.get("jwt")?.value;

  const { pathname } = request.nextUrl;

  // Allow authentication pages without redirecting
  if (
    pathname.startsWith("/auth/login") ||
    pathname.startsWith("/auth/register") ||
    pathname.startsWith("/auth/forgot-password")
  ) {
    return NextResponse.next();
  }

  // Protect dashboard pages
  if (pathname.startsWith("/dashboard")) {
    if (!jwt) {
      return NextResponse.redirect(
        new URL("/auth/login", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/auth/login",
    "/auth/register",
    "/auth/forgot-password",
  ],
};