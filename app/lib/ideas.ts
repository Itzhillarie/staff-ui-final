import { apiFetch } from "@/app/utils/apiFetch";

const API = process.env.NEXT_PUBLIC_API_URL;

function authHeaders() {
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("authToken")
      : null;

  return {
    "Content-Type": "application/json",
    ...(token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {}),
  };
}

/* ------------------------------------------
   GET ALL IDEAS
------------------------------------------ */

export async function getIdeas() {
  return apiFetch(`${API}/ideas/list/`, {
    method: "GET",
    headers: authHeaders(),
  });
}

/* ------------------------------------------
   GET SINGLE IDEA
------------------------------------------ */

export async function getIdea(id: string) {
  return apiFetch(`${API}/ideas/detail/${id}/`, {
    method: "GET",
    headers: authHeaders(),
  });
}

/* ------------------------------------------
   CREATE IDEA
------------------------------------------ */

export async function createIdea(data: {
  title: string;
  description: string;
}) {
  return apiFetch(`${API}/ideas/create/`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
}

/* ------------------------------------------
   UPDATE IDEA
------------------------------------------ */

export async function updateIdea(
  id: string,
  data: {
    title: string;
    description: string;
  }
) {
  return apiFetch(`${API}/ideas/update/${id}/`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
}

/* ------------------------------------------
   DELETE IDEA
------------------------------------------ */

export async function deleteIdea(id: string) {
  return apiFetch(`${API}/ideas/delete/${id}/`, {
    method: "DELETE",
    headers: authHeaders(),
  });
}

/* ------------------------------------------
   SUBMIT IDEA
------------------------------------------ */

export async function submitIdea(id: string) {
  return apiFetch(`${API}/ideas/submit/${id}/`, {
    method: "POST",
    headers: authHeaders(),
  });
}

/* ------------------------------------------
   LIKE IDEA
------------------------------------------ */

export async function likeIdea(id: string) {
  return apiFetch(`${API}/ideas/like/${id}/`, {
    method: "POST",
    headers: authHeaders(),
  });
}

/* ------------------------------------------
   DISLIKE IDEA
------------------------------------------ */

export async function dislikeIdea(id: string) {
  return apiFetch(`${API}/ideas/dislike/${id}/`, {
    method: "POST",
    headers: authHeaders(),
  });
}

/* ------------------------------------------
   COMMENT IDEA
------------------------------------------ */

export async function commentIdea(
  id: string,
  comment: string
) {
  return apiFetch(`${API}/ideas/comment/${id}/`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({
      comment,
    }),
  });
}