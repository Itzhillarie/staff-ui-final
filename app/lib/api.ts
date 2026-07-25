import { apiFetch } from "@/app/utils/apiFetch";

const API = process.env.NEXT_PUBLIC_API_URL!;

export interface IdeaPayload {
  title: string;
  description: string;
}

/* ------------------------------------------
   GET ALL IDEAS
------------------------------------------ */

export function getIdeas(page = 1, pageSize = 10) {
  return apiFetch(
    `${API}/ideas/list/?page=${page}&page_size=${pageSize}`,
    {
      method: "GET",
    }
  );
}

/* ------------------------------------------
   GET SINGLE IDEA
------------------------------------------ */

export function getIdea(id: string) {
  return apiFetch(`${API}/ideas/detail/${id}/`, {
    method: "GET",
  });
}

/* ------------------------------------------
   CREATE IDEA
------------------------------------------ */

export function createIdea(data: IdeaPayload) {
  return apiFetch(`${API}/ideas/create/`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/* ------------------------------------------
   UPDATE IDEA
------------------------------------------ */

export function updateIdea(
  id: string,
  data: IdeaPayload
) {
  return apiFetch(`${API}/ideas/update/${id}/`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

/* ------------------------------------------
   DELETE IDEA
------------------------------------------ */

export function deleteIdea(id: string) {
  return apiFetch(`${API}/ideas/delete/${id}/`, {
    method: "DELETE",
  });
}

/* ------------------------------------------
   SUBMIT IDEA
------------------------------------------ */

export function submitIdea(id: string) {
  return apiFetch(`${API}/ideas/submit/${id}/`, {
    method: "POST",
  });
}

/* ------------------------------------------
   LIKE IDEA
------------------------------------------ */

export function likeIdea(id: string) {
  return apiFetch(`${API}/ideas/like/${id}/`, {
    method: "POST",
  });
}

/* ------------------------------------------
   DISLIKE IDEA
------------------------------------------ */

export function dislikeIdea(id: string) {
  return apiFetch(`${API}/ideas/dislike/${id}/`, {
    method: "POST",
  });
}

/* ------------------------------------------
   COMMENT IDEA
------------------------------------------ */

export function commentIdea(
  id: string,
  comment: string
) {
  return apiFetch(`${API}/ideas/comment/${id}/`, {
    method: "POST",
    body: JSON.stringify({ comment }),
  });
}