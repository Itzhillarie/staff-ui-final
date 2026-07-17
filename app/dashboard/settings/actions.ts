const baseURL = process.env.NEXT_PUBLIC_API_URL ?? "";

async function request(path: string, init: RequestInit) {
  const response = await fetch(`${baseURL}${path}`, init);

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

export async function getSettings() {
  return request("/settings/", {
    method: "GET",
    credentials: "include",
  });
}

export async function updateSettings(payload: unknown) {
  return request("/settings/", {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}

export async function changePassword(payload: {
  currentPassword: string;
  newPassword: string;
}) {
  return request("/change-password/", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
}