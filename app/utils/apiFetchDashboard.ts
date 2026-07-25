import { cookies } from "next/headers";
import { useAuthStore } from "@/app/store/authstore";


export async function apiFetch(
  input: RequestInfo,
  init: RequestInit = {}
) {

  const headers = new Headers(init.headers);

  headers.set(
    "Content-Type",
    "application/json"
  );

  headers.set(
    "ngrok-skip-browser-warning",
    "1"
  );


  let token: string | undefined;


  // Server side token
  if (typeof window === "undefined") {

    const cookieStore = await cookies();

    token =
      cookieStore.get("jwt")?.value;

  }


  // Client side token
  else {

    token =
      useAuthStore.getState().token ?? undefined;

  }



  if (token) {

    headers.set(
      "Authorization",
      `Bearer ${token}`
    );

  }



  const res = await fetch(
    input,
    {
      ...init,
      headers,
      credentials: "include",
      cache: "no-store",
    }
  );



  const text = await res.text();


  let data = null;


  try {

    data = text
      ? JSON.parse(text)
      : null;

  } catch {

    data = text;

  }



  if (!res.ok) {


    if (res.status === 401) {


      if (typeof window !== "undefined") {

        useAuthStore
          .getState()
          .logout();


        window.location.href =
          "/auth/login";

      }

    }



    const error: any =
      new Error(
        res.statusText ||
        "Request failed"
      );


    error.status = res.status;
    error.data = data;


    throw error;

  }



  return data;

}