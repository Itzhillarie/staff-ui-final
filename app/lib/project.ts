import { apiFetch } from "@/app/utils/apiFetch";

const API = process.env.NEXT_PUBLIC_API_URL;

type ProjectTask = {
  id: string;
  title: string;
  description?: string;
  assigned_to?: string;
  assigned_to_name?: string;
  priority?: string;
  due_date?: string;
  completed?: boolean;
  status?: string;
  phase?: string;
  phase_name?: string;
  project?: string;
  project_name?: string;
};

type ProjectPhase = {
  id: string;
  phase_name?: string;
  description?: string;
  Description?: string;
  name?: string;
  title?: string;
  tasks?: ProjectTask[];
};

type ProjectSummary = {
  id: string;
  pk?: string;
  uuid?: string;
  project_id?: string;
  project_name?: string;
  name?: string;
  title?: string;
  phases?: ProjectPhase[];
  project_phases?: ProjectPhase[];
  implementation_phases?: ProjectPhase[];
  Phases?: ProjectPhase[];
};

function listFromResponse<T>(data: T[] | { results?: T[] }) {
  return Array.isArray(data) ? data : data.results ?? [];
}

function phaseListFromResponse(data: unknown): ProjectPhase[] {
  if (Array.isArray(data)) {
    return data as ProjectPhase[];
  }

  if (!data || typeof data !== "object") {
    return [];
  }

  const record = data as {
    results?: unknown;
    phases?: unknown;
    data?: unknown;
  };

  for (const value of [record.results, record.phases, record.data]) {
    if (Array.isArray(value)) {
      return value as ProjectPhase[];
    }
  }

  return [];
}

function normalizePhase(phase: ProjectPhase): ProjectPhase {
  return {
    ...phase,
    phase_name: phase.phase_name ?? phase.name ?? phase.title ?? "Untitled phase",
    description: phase.description ?? phase.Description,
    tasks: phase.tasks ?? [],
  };
}

function normalizeProject<T extends ProjectSummary>(project: T): T {
  const phases =
    project.phases ??
    project.project_phases ??
    project.implementation_phases ??
    project.Phases ??
    [];

  return {
    ...project,
    phases: phases.map(normalizePhase),
  };
}

function isUuid(value?: string | null) {
  return Boolean(
    value?.match(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    )
  );
}

function getProjectPhaseId(project: ProjectSummary, fallbackId: string) {
  const candidates = [
    project.id,
    project.project_id,
    project.uuid,
    project.pk,
    fallbackId,
  ];

  return candidates.find(isUuid) ?? fallbackId;
}

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
  const data = await apiFetch<ProjectSummary[] | { results?: ProjectSummary[] }>(
    `${API}/projects/list/`,
    {
    method: "GET",
    headers: authHeaders(),
    }
  );

  if (Array.isArray(data)) {
    return data.map(normalizeProject);
  }

  return {
    ...data,
    results: data.results?.map(normalizeProject) ?? [],
  };
}

export async function getProject(id: string) {
  const data = await apiFetch<ProjectSummary>(`${API}/projects/detail/${id}/`, {
    method: "GET",
    headers: authHeaders(),
  });

  const project = normalizeProject(data);
  const projectPhaseId = getProjectPhaseId(project, id);

  try {
    const phases = await getProjectPhases(projectPhaseId);

    return {
      ...project,
      phases,
    };
  } catch {
    return project;
  }
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
    body: JSON.stringify({
      phase_name: data.phase_name,
      name: data.phase_name,
      description: data.description,
      Description: data.description,
    }),
  });
}

async function getProjectPhases(projectId: string) {
  const data = await apiFetch(`${API}/projects/projects/${projectId}/phases/`, {
    method: "GET",
    headers: authHeaders(),
  });

  return phaseListFromResponse(data).map(normalizePhase);
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
    body: JSON.stringify({
      phase_name: data.phase_name,
      Description: data.description,
    }),
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
  const data = await getProjects();
  const projects = listFromResponse(
    data as ProjectSummary[] | { results?: ProjectSummary[] }
  );

  const detailedProjects = await Promise.all(
    projects.map(async (project) => {
      if (project.phases) {
        return project;
      }

      try {
        return (await getProject(project.id)) as ProjectSummary;
      } catch {
        return project;
      }
    })
  );

  return detailedProjects.flatMap((project) =>
    (project.phases ?? []).flatMap((phase) =>
      (phase.tasks ?? []).map((task) => ({
        ...task,
        phase: task.phase ?? phase.phase_name ?? phase.id,
        phase_name: task.phase_name ?? phase.phase_name,
        project:
          task.project ??
          project.project_name ??
          project.name ??
          project.title ??
          project.id,
        project_name:
          task.project_name ??
          project.project_name ??
          project.name ??
          project.title,
      }))
    )
  );
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
