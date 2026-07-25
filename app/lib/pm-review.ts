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
   GET ALL IDEAS FOR PRODUCT MANAGER REVIEW
------------------------------------------ */

export async function getPMReviewIdeas() {
  return apiFetch(`${API}/ideas/list/`, {
    method: "GET",
    headers: authHeaders(),
  });
}

/* ------------------------------------------
   GET SINGLE IDEA
------------------------------------------ */

export async function getPMReviewIdea(id: string) {
  return apiFetch(`${API}/ideas/detail/${id}/`, {
    method: "GET",
    headers: authHeaders(),
  });
}

/* ------------------------------------------
   APPROVE IDEA
------------------------------------------ */

export async function approveIdea(
  id: string,
  data: {
    priority: "High" | "Medium" | "Low";
    due_date: string;
    review_comment: string;
  }
) {
  return apiFetch(`${API}/ideas/approve/${id}/`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
}

/* ------------------------------------------
   REJECT IDEA
------------------------------------------ */

export async function rejectIdea(
  id: string,
  review_comment: string
) {
  return apiFetch(`${API}/ideas/reject/${id}/`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({
      review_comment,
    }),
  });
}