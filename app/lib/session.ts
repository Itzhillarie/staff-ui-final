import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getServerSessionToken() {
  const cookieStore = await cookies();

  return cookieStore.get("jwt")?.value;
}

export async function hasActiveServerSession() {
  const token = await getServerSessionToken();

  if (!token) {
    return false;
  }

  const apiUrl =
    process.env.API_SERVER_URL ??
    process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    return false;
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

    return response.ok;
  } catch (error) {
    console.error("Unable to validate dashboard session.", error);

    return false;
  }
}

export async function ensureActiveServerSession() {
  const active = await hasActiveServerSession();

  if (!active) {
    redirect("/auth/login?session=expired");
  }
}
