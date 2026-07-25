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

/* ==========================================
   PROJECTS
========================================== */

export async function getProjects() {
  return apiFetch(`${API}/projects/list/`, {
    method: "GET",
    headers: authHeaders(),
  });
}

export async function getProject(id: string) {
  return apiFetch(`${API}/projects/detail/${id}/`, {
    method: "GET",
    headers: authHeaders(),
  });
}

/* ==========================================
   PHASES
========================================== */

export async function createPhase(
  projectId: string,
  data: {
    phase_name: string;
    description: string;
  }
) {
  return apiFetch(`${API}/projects/${projectId}/phases/create/`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
}

export async function updatePhase(
  phaseId: string,
  data: {
    phase_name: string;
    description: string;
  }
) {
  return apiFetch(`${API}/projects/phases/update/${phaseId}/`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
}

export async function deletePhase(phaseId: string) {
  return apiFetch(`${API}/projects/phases/delete/${phaseId}/`, {
    method: "DELETE",
    headers: authHeaders(),
  });
}

/* ==========================================
   TASKS
========================================== */

export async function getTasks() {
  return [];
}

export async function getTask(id: string) {
  return apiFetch(`${API}/projects/tasks/detail/${id}/`, {
    method: "GET",
    headers: authHeaders(),
  });
}

export async function createTask(
  phaseId: string,
  data: {
    title: string;
    description: string;
    assigned_to: string;
    priority: string;
    due_date: string;
  }
) {
  return apiFetch(`${API}/projects/phases/${phaseId}/tasks/create/`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
}

export async function updateTask(
  taskId: string,
  data: {
    title: string;
    description: string;
    assigned_to: string;
    priority: string;
    due_date: string;
  }
) {
  return apiFetch(`${API}/projects/tasks/update/${taskId}/`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(data),
  });
}

export async function deleteTask(taskId: string) {
  return apiFetch(`${API}/projects/tasks/delete/${taskId}/`, {
    method: "DELETE",
    headers: authHeaders(),
  });
}

export async function completeTask(taskId: string) {
  return apiFetch(`${API}/projects/tasks/complete/${taskId}/`, {
    method: "POST",
    headers: authHeaders(),
  });
}
