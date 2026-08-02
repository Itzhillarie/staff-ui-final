"use server";

import { cookies, headers } from "next/headers";

export interface LoginState {
  success: boolean;
  message: string;
  token?: string;
  username?: string;
  role?: string;
  permission?: string;
}

export async function loginUserAction(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const username = formData.get("username")?.toString().trim();
  const password = formData.get("password")?.toString().trim();

  if (!username || !password) {
    return {
      success: false,
      message: "Username and password are required.",
    };
  }

  try {
    const apiUrl = await getServerApiUrl();

    if (!apiUrl) {
      return {
        success: false,
        message: "API server URL is not configured.",
      };
    }

    const response = await fetch(
      `${apiUrl}/users/login/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "1",
        },
        body: JSON.stringify({
          username,
          password,
        }),
        cache: "no-store",
      }
    );

    const data = await parseApiResponse(response);

    if (!response.ok) {
      return {
        success: false,
        message:
          data.error ||
          data.message ||
          "Invalid username or password.",
      };
    }

    const cookieStore = await cookies();

    cookieStore.set("jwt", data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60,
    });

    return {
      success: true,
      message: "Login successful.",
      token: data.token,
      username: data.username,
      role: data.role,
      permission: data.permission
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Unable to connect to the server.",
    };
  }
}

async function getServerApiUrl() {
  const configuredUrl =
    process.env.API_SERVER_URL?.trim() ||
    process.env.NEXT_PUBLIC_API_URL?.trim();

  if (!configuredUrl) {
    return null;
  }

  if (/^https?:\/\//i.test(configuredUrl)) {
    return configuredUrl.replace(/\/+$/, "");
  }

  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host");

  if (!host) {
    return null;
  }

  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");

  return new URL(
    configuredUrl,
    `${protocol}://${host}`
  )
    .toString()
    .replace(/\/+$/, "");
}

async function parseApiResponse(response: Response) {
  const text = await response.text();

  if (!text) {
    return {};
  }

  try {
    return JSON.parse(text);
  } catch {
    return {
      message: response.ok
        ? "Unexpected empty response from server."
        : `Server returned ${response.status} ${response.statusText}.`,
    };
  }
}
