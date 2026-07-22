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
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/login/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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

    if (!data.token) {
      return {
        success: false,
        message: "Login succeeded but no token was returned.",
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

    cookieStore.set("username", data.username ?? "", {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60,
    });

    cookieStore.set("role", data.role ?? "", {
      httpOnly: false,
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
    console.error("Login Error:", error);

    return {
      success: false,
      message: "Unable to connect to the server.",
    };
  }
}