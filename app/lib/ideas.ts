import { apiFetch } from "@/app/utils/apiFetch";

const API = process.env.NEXT_PUBLIC_API_URL!;

export interface IdeaPayload {
  title: string;
  description: string;
}

/* ------------------------------------------
   GET ALL IDEAS
------------------------------------------ */

export async function getIdeas() {
  return await apiFetch(`${API}/ideas/list/`, {
    method: "GET",
  });
}

/* ------------------------------------------
   GET SINGLE IDEA
------------------------------------------ */

export async function getIdea(id: string) {
  return await apiFetch(`${API}/ideas/detail/${id}/`, {
    method: "GET",
  });
}

/* ------------------------------------------
   CREATE IDEA
------------------------------------------ */

export async function createIdea(data: IdeaPayload) {
  return await apiFetch(`${API}/ideas/create/`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/* ------------------------------------------
   UPDATE IDEA
------------------------------------------ */

export async function updateIdea(
  id: string,
  data: IdeaPayload
) {
  return await apiFetch(`${API}/ideas/update/${id}/`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

/* ------------------------------------------
   DELETE IDEA
------------------------------------------ */

export async function deleteIdea(id: string) {
  return await apiFetch(`${API}/ideas/delete/${id}/`, {
    method: "DELETE",
  });
}

/* ------------------------------------------
   SUBMIT IDEA
------------------------------------------ */

export async function submitIdea(id: string) {
  return await apiFetch(`${API}/ideas/submit/${id}/`, {
    method: "POST",
  });
}

/* ------------------------------------------
   LIKE IDEA
------------------------------------------ */

export async function likeIdea(id: string) {
  return await apiFetch(`${API}/ideas/like/${id}/`, {
    method: "POST",
  });
}

/* ------------------------------------------
   DISLIKE IDEA
------------------------------------------ */

export async function dislikeIdea(id: string) {
  return await apiFetch(`${API}/ideas/dislike/${id}/`, {
    method: "POST",
  });
}

/* ------------------------------------------
   COMMENT IDEA
------------------------------------------ */

export async function commentIdea(
  id: string,
  comment: string
) {
  return await apiFetch(`${API}/ideas/comment/${id}/`, {
    method: "POST",
    body: JSON.stringify({
      comment,
    }),
  });
}