import { apiFetch } from "@/app/utils/apiFetch";

const API = process.env.NEXT_PUBLIC_API_URL;

/* ------------------------------------------
   GLOBAL SEARCH
------------------------------------------ */

export async function search(query: string, category?: string) {
  const params = new URLSearchParams();

  params.append("q", query);

  if (category && category !== "all") {
    params.append("category", category);
  }

  return apiFetch(`${API}/search/?${params.toString()}`, {
    method: "GET",
  });
}

/* ------------------------------------------
   SEARCH SUGGESTIONS
------------------------------------------ */

export async function getSearchSuggestions(query: string) {
  const params = new URLSearchParams();

  params.append("q", query);

  return apiFetch(
    `${API}/search/suggestions/?${params.toString()}`,
    {
      method: "GET",
    }
  );
}

/* ------------------------------------------
   ADVANCED SEARCH
------------------------------------------ */

export async function advancedSearch(data: {
  query: string;
  category?: string;
  status?: string;
  start_date?: string;
  end_date?: string;
  priority?: string;
}) {
  return apiFetch(`${API}/search/advanced/`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/* ------------------------------------------
   RECENT SEARCHES
------------------------------------------ */

export async function getRecentSearches() {
  return apiFetch(`${API}/search/recent/`, {
    method: "GET",
  });
}

/* ------------------------------------------
   CLEAR RECENT SEARCHES
------------------------------------------ */

export async function clearRecentSearches() {
  return apiFetch(`${API}/search/recent/clear/`, {
    method: "DELETE",
  });
}

/* ------------------------------------------
   SAVE SEARCH
------------------------------------------ */

export async function saveSearch(data: {
  name: string;
  query: string;
  category?: string;
}) {
  return apiFetch(`${API}/search/save/`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/* ------------------------------------------
   SAVED SEARCHES
------------------------------------------ */

export async function getSavedSearches() {
  return apiFetch(`${API}/search/saved/`, {
    method: "GET",
  });
}

/* ------------------------------------------
   DELETE SAVED SEARCH
------------------------------------------ */

export async function deleteSavedSearch(id: string) {
  return apiFetch(`${API}/search/saved/${id}/`, {
    method: "DELETE",
  });
}

/* ------------------------------------------
   SEARCH STATISTICS
------------------------------------------ */

export async function getSearchStats() {
  return apiFetch(`${API}/search/stats/`, {
    method: "GET",
  });
}