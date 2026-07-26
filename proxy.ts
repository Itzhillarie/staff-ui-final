import { NextRequest, NextResponse } from "next/server";

function expiredSessionRedirect(request: NextRequest) {
  const response = NextResponse.redirect(
    new URL("/auth/login?session=expired", request.url)
  );

  for (const name of ["jwt", "username", "role"]) {
    response.cookies.set(name, "", {
      httpOnly: name === "jwt",
      expires: new Date(0),
      maxAge: 0,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
  }

  return response;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith("/dashboard")) {
    return NextResponse.next();
  }

  const token = request.cookies.get("jwt")?.value;

  if (!token) {
    return expiredSessionRedirect(request);
  }

  const apiUrl =
    process.env.API_SERVER_URL ??
    process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    return expiredSessionRedirect(request);
  }

  try {
    const response = await fetch(`${apiUrl}/users/dashboard/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "1",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return expiredSessionRedirect(request);
    }
  } catch (error) {
    console.error("Unable to validate dashboard session.", error);

    return expiredSessionRedirect(request);
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
