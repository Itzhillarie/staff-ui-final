import { apiFetch } from "@/app/utils/apiFetch";

const API = process.env.NEXT_PUBLIC_API_URL!;

export interface Idea {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string | null;
  likes: number;
  dislikes: number;
  creator: string;
}

export interface IdeaPayload {
  title: string;
  description: string;
}

export interface PaginatedIdeasResponse {
  count: number;
  total_pages: number;
  current_page: number;
  page_size: number;
  has_next: boolean;
  has_previous: boolean;
  results: Idea[];
}

export interface ApiMessage {
  message: string;
  [key: string]: any;
}

/* ------------------------------------------
   GET ALL IDEAS
------------------------------------------ */

export function getIdeas(
  page = 1,
  pageSize = 10
): Promise<PaginatedIdeasResponse> {
  return apiFetch<PaginatedIdeasResponse>(
    `${API}/ideas/list/?page=${page}&page_size=${pageSize}`,
    {
      method: "GET",
    }
  );
}

/* ------------------------------------------
   GET SINGLE IDEA
------------------------------------------ */

export function getIdea(id: string): Promise<Idea> {
  return apiFetch<Idea>(
    `${API}/ideas/detail/${id}/`,
    {
      method: "GET",
    }
  );
}

/* ------------------------------------------
   CREATE IDEA
------------------------------------------ */

export function createIdea(
  data: IdeaPayload
): Promise<ApiMessage> {
  return apiFetch<ApiMessage>(
    `${API}/ideas/create/`,
    {
      method: "POST",
      body: JSON.stringify(data),
    }
  );
}

/* ------------------------------------------
   UPDATE IDEA
------------------------------------------ */

export function updateIdea(
  id: string,
  data: IdeaPayload
): Promise<ApiMessage> {
  return apiFetch<ApiMessage>(
    `${API}/ideas/update/${id}/`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    }
  );
}

/* ------------------------------------------
   DELETE IDEA
------------------------------------------ */

export function deleteIdea(
  id: string
): Promise<ApiMessage> {
  return apiFetch<ApiMessage>(
    `${API}/ideas/delete/${id}/`,
    {
      method: "DELETE",
    }
  );
}

/* ------------------------------------------
   SUBMIT IDEA
------------------------------------------ */

export function submitIdea(
  id: string
): Promise<ApiMessage> {
  return apiFetch<ApiMessage>(
    `${API}/ideas/submit/${id}/`,
    {
      method: "POST",
    }
  );
}

/* ------------------------------------------
   LIKE IDEA
------------------------------------------ */

export function likeIdea(
  id: string
): Promise<ApiMessage> {
  return apiFetch<ApiMessage>(
    `${API}/ideas/like/${id}/`,
    {
      method: "POST",
    }
  );
}

/* ------------------------------------------
   DISLIKE IDEA
------------------------------------------ */

export function dislikeIdea(
  id: string
): Promise<ApiMessage> {
  return apiFetch<ApiMessage>(
    `${API}/ideas/dislike/${id}/`,
    {
      method: "POST",
    }
  );
}

/* ------------------------------------------
   COMMENT IDEA
------------------------------------------ */

export function commentIdea(
  id: string,
  comment: string
): Promise<ApiMessage> {
  return apiFetch<ApiMessage>(
    `${API}/ideas/comment/${id}/`,
    {
      method: "POST",
      body: JSON.stringify({ comment }),
    }
  );
}