"use server";

import { cookies } from "next/headers";

export interface LoginState {
  success: boolean;
  message: string;
  token?: string;
  username?: string;
  role?: string;
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
    const apiUrl =
      process.env.API_SERVER_URL ??
      process.env.NEXT_PUBLIC_API_URL;

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

    const data = await response.json();

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
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Unable to connect to the server.",
    };
  }
}
