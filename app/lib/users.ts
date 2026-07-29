"use client";

import { apiFetch } from "@/app/utils/apiFetch";

const API = process.env.NEXT_PUBLIC_API_URL;

export interface AppUser {
  id: number | string;
  username: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  name?: string;
  role: string;
  department?: string;
  is_active?: boolean;
}

export interface UserPayload {
  username: string;
  email: string;
  role: string;
  first_name?: string;
  last_name?: string;
  password?: string;
  department?: string;
}

function listFromResponse(data: unknown): AppUser[] {
  if (Array.isArray(data)) {
    return data as AppUser[];
  }

  if (data && typeof data === "object" && "results" in data) {
    const results = (data as { results?: unknown }).results;
    return Array.isArray(results) ? (results as AppUser[]) : [];
  }

  return [];
}

export async function getUsers() {
  try {
    return listFromResponse(await apiFetch(`${API}/users/list/`));
  } catch {
    return listFromResponse(await apiFetch(`${API}/settings/roles/`));
  }
}

export async function createUser(data: UserPayload) {
  return apiFetch(`${API}/users/create/`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateUser(userId: string | number, data: UserPayload) {
  return apiFetch(`${API}/users/update/${userId}/`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteUser(userId: string | number) {
  return apiFetch(`${API}/users/delete/${userId}/`, {
    method: "DELETE",
  });
}
