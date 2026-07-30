"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle2,
  Circle,
  ClipboardList,
  FolderKanban,
  Loader2,
  Plus,
  User,
  X,
} from "lucide-react";

import {
  completeTask,
  createPhase,
  createTask,
  getProject,
  getProjects,
} from "@/app/lib/project";
import {
  canAccessEverywhere,
  hasOwnershipFields,
  isEmployee,
  isOwnedByUser,
  useAuthHydrated,
} from "@/app/lib/access";
import { useAuthStore } from "@/app/store/authstore";
import { toast } from "sonner";

interface Task {
  id: string;
  title: string;
  description?: string;
  assigned_to?: string;
  assigned_to_name?: string;
  priority?: "High" | "Medium" | "Low" | string;
  due_date?: string;
  completed?: boolean;
  status?: string;
}

interface Phase {
  id: string;
  phase_name: string;
  description?: string;
  Description?: string;
  name?: string;
  title?: string;
  progress?: number;
  tasks?: Task[];
}

interface Project {
  id: string;
  pk?: string;
  uuid?: string;
  project_id?: string;
  project_name?: string;
  name?: string;
  title?: string;
  description?: string;
  idea?: string;
  idea_title?: string;
  progress?: number;
  start_date?: string;
  end_date?: string | null;
  phases?: Phase[];
  creator?: string | { username?: string; name?: string; id?: string | number };
  created_by?: string | { username?: string; name?: string; id?: string | number };
  created_by_name?: string;
  created_by_username?: string;
  owner?: string | { username?: string; name?: string; id?: string | number };
  owner_name?: string;
  owner_username?: string;
  author?: string | { username?: string; name?: string; id?: string | number };
  user?: string | { username?: string; name?: string; id?: string | number };
  idea_creator?: string;
}

interface TaskForm {
  show: boolean;
  title: string;
  description: string;
  assigned_to: string;
  priority: "High" | "Medium" | "Low";
  due_date: string;
}

const emptyTaskForm: TaskForm = {
  show: true,
  title: "",
  description: "",
  assigned_to: "",
  priority: "Medium",
  due_date: "",
};

function isTaskComplete(task: Task) {
  return (
    task.completed === true ||
    task.status?.toLowerCase() === "completed" ||
    task.status?.toLowerCase() === "complete"
  );
}

function calculatePhaseProgress(phase: Phase) {
  const tasks = phase.tasks ?? [];

  if (tasks.length === 0) {
    return Number(phase.progress ?? 0);
  }

  return Math.round((tasks.filter(isTaskComplete).length / tasks.length) * 100);
}

function calculateProjectProgress(project: Project) {
  const phases = project.phases ?? [];
  const tasks = phases.flatMap((phase) => phase.tasks ?? []);

  if (tasks.length > 0) {
    return Math.round((tasks.filter(isTaskComplete).length / tasks.length) * 100);
  }

  if (phases.length > 0) {
    return Math.round(
      phases.reduce((sum, phase) => sum + calculatePhaseProgress(phase), 0) /
        phases.length
    );
  }

  return Number(project.progress ?? 0);
}

function formatDate(value?: string | null) {
  if (!value) {
    return "Not set";
  }

  return new Date(value).toLocaleDateString();
}

function isUuid(value?: string | null) {
  return Boolean(
    value?.match(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    )
  );
}

function getBackendProjectId(project: Project | null, fallbackId: string) {
  const candidates = [
    project?.id,
    project?.project_id,
    project?.uuid,
    project?.pk,
    fallbackId,
  ];

  return candidates.find(isUuid) ?? fallbackId;
}

function priorityClass(priority?: string) {
  switch (priority) {
    case "High":
      return "bg-red-100 text-red-700 dark:bg-red-950/50 dark:text-red-300";
    case "Low":
      return "bg-green-100 text-green-700 dark:bg-green-950/50 dark:text-green-300";
    default:
      return "bg-amber-100 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300";
  }
}

function normalizeProjectList(data: unknown): Project[] {
  if (Array.isArray(data)) {
    return data as Project[];
  }

  if (data && typeof data === "object" && "results" in data) {
    const results = (data as { results?: unknown }).results;
    return Array.isArray(results) ? (results as Project[]) : [];
  }

  return [];
}

function createdPhaseFromResponse(data: unknown): Phase | null {
  if (!data || typeof data !== "object") {
    return null;
  }

  const record = data as Partial<Phase> & {
    phase?: Phase;
    data?: Phase;
    name?: string;
  };
  const candidate = record.phase ?? record.data ?? record;

  const id = candidate.id;

  if (!id) {
    return null;
  }

  return {
    ...candidate,
    id,
    phase_name:
      candidate.phase_name ??
      (candidate as { name?: string }).name ??
      (candidate as { title?: string }).title ??
      "Untitled phase",
    description:
      candidate.description ?? (candidate as { Description?: string }).Description,
    tasks: candidate.tasks ?? [],
  };
}

function createdTaskFromResponse(data: unknown): Task | null {
  if (!data || typeof data !== "object") {
    return null;
  }

  const record = data as Partial<Task> & { task?: Task; data?: Task };
  const candidate = record.task ?? record.data ?? record;

  return candidate.id && candidate.title ? (candidate as Task) : null;
}

export default function ProjectDetailsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const projectId = params.id;
  const currentUser = useAuthStore((state) => state.user);
  const authHydrated = useAuthHydrated();
  const currentRole = currentUser?.role;
  const currentUsername = currentUser?.username;

  const [project, setProject] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingPhase, setSavingPhase] = useState(false);
  const [savingTaskId, setSavingTaskId] = useState<string | null>(null);
  const [showPhase, setShowPhase] = useState(false);
  const [phaseForm, setPhaseForm] = useState({
    phase_name: "",
    description: "",
  });
  const [taskForms, setTaskForms] = useState<Record<string, TaskForm>>({});

  const loadProject = useCallback(async () => {
    if (!authHydrated) {
      return;
    }

    try {
      setLoading(true);

      const data = (await getProject(projectId)) as Project;

      if (
        isEmployee(currentRole) &&
        hasOwnershipFields(data) &&
        !isOwnedByUser(data, currentUsername)
      ) {
        router.replace("/dashboard/implementation");
        return;
      }

      setProject(data);
    } catch (err) {
      console.error(err);
      toast.error("Unable to load project.");
    } finally {
      setLoading(false);
    }
  }, [authHydrated, currentRole, currentUsername, projectId, router]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadProject();
  }, [loadProject]);

  useEffect(() => {
    let active = true;

    async function loadProjectNavigation() {
      if (!authHydrated) {
        return;
      }

      try {
        const data = await getProjects();
        const allProjects = normalizeProjectList(data);
        const visibleProjects = isEmployee(currentRole)
          ? allProjects.filter(
              (item) =>
                !hasOwnershipFields(item) ||
                isOwnedByUser(item, currentUsername)
            )
          : allProjects;

        if (active) {
          setProjects(visibleProjects);
        }
      } catch {
        if (active) {
          setProjects([]);
        }
      }
    }

    void loadProjectNavigation();

    return () => {
      active = false;
    };
  }, [authHydrated, currentRole, currentUsername]);

  const projectProgress = useMemo(
    () => (project ? calculateProjectProgress(project) : 0),
    [project]
  );

  async function savePhase() {
    if (!phaseForm.phase_name.trim()) {
      toast.error("Phase name is required.");
      return;
    }

    try {
      setSavingPhase(true);
      const backendProjectId = getBackendProjectId(project, projectId);
      const createdPhase = createdPhaseFromResponse(
        await createPhase(backendProjectId, {
        phase_name: phaseForm.phase_name.trim(),
        description: phaseForm.description.trim(),
        })
      );
      toast.success("Phase created.");
      if (createdPhase) {
        setProject((current) =>
          current
            ? {
                ...current,
                phases: [...(current.phases ?? []), createdPhase],
              }
            : current
        );
      }
      setShowPhase(false);
      setPhaseForm({ phase_name: "", description: "" });
      if (!createdPhase) {
        await loadProject();
      }
    } catch {
      toast.error("Unable to create phase.");
    } finally {
      setSavingPhase(false);
    }
  }

  function openTaskForm(phaseId: string) {
    setTaskForms((current) => ({
      ...current,
      [phaseId]: {
        ...(current[phaseId] ?? emptyTaskForm),
        show: true,
      },
    }));
  }

  function updateTaskForm<K extends keyof TaskForm>(
    phaseId: string,
    field: K,
    value: TaskForm[K]
  ) {
    setTaskForms((current) => ({
      ...current,
      [phaseId]: {
        ...(current[phaseId] ?? emptyTaskForm),
        [field]: value,
      },
    }));
  }

  async function saveTask(phaseId: string) {
    const form = taskForms[phaseId];

    if (!form?.title.trim() || !form.assigned_to.trim() || !form.due_date) {
      toast.error("Task title, assignee and due date are required.");
      return;
    }

    try {
      setSavingTaskId(phaseId);
      const createdTask = createdTaskFromResponse(
        await createTask(phaseId, {
        title: form.title.trim(),
        description: form.description.trim(),
        assigned_to: form.assigned_to.trim(),
        priority: form.priority,
        due_date: form.due_date,
        })
      );
      toast.success("Task created.");
      if (createdTask) {
        setProject((current) =>
          current
            ? {
                ...current,
                phases: (current.phases ?? []).map((phase) =>
                  phase.id === phaseId
                    ? {
                        ...phase,
                        tasks: [...(phase.tasks ?? []), createdTask],
                      }
                    : phase
                ),
              }
            : current
        );
      }
      setTaskForms((current) => ({
        ...current,
        [phaseId]: { ...emptyTaskForm },
      }));
      await loadProject();
    } catch {
      toast.error("Unable to create task.");
    } finally {
      setSavingTaskId(null);
    }
  }

  async function markComplete(task: Task) {
    if (isTaskComplete(task)) {
      return;
    }

    try {
      await completeTask(task.id);
      toast.success("Task completed.");
      await loadProject();
    } catch {
      toast.error("Unable to update task.");
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-blue-600" size={36} />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-16 text-center text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
        Project not found.
      </div>
    );
  }

  const projectName = project.project_name ?? project.name ?? project.title ?? "Project";
  const phases = project.phases ?? [];
  const currentIndex = projects.findIndex((item) => item.id === project.id);
  const previousProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject =
    currentIndex >= 0 && currentIndex < projects.length - 1
      ? projects[currentIndex + 1]
      : null;
  const canManageImplementation = canAccessEverywhere(currentRole);

  return (
    <div className="space-y-8">
      <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div className="min-w-0 flex-1">
            <h1 className="flex items-center gap-3 text-3xl font-bold text-slate-900 dark:text-white">
              <FolderKanban className="text-blue-600" />
              {projectName}
            </h1>
            <p className="mt-3 max-w-4xl text-slate-600 dark:text-slate-300">
              {project.description ?? "No project description provided."}
            </p>
            {(project.idea_title || project.idea) && (
              <p className="mt-3 text-sm font-medium text-slate-500 dark:text-slate-400">
                Linked approved idea: {project.idea_title ?? project.idea}
              </p>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={
                previousProject
                  ? `/dashboard/implementation/project/${previousProject.id}`
                  : "#"
              }
              aria-disabled={!previousProject}
              className={`inline-flex items-center gap-2 rounded-lg border px-4 py-3 text-sm font-semibold ${
                previousProject
                  ? "border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                  : "pointer-events-none border-slate-200 text-slate-300 dark:border-slate-800 dark:text-slate-700"
              }`}
            >
              <ArrowLeft size={18} />
              Prev
            </Link>
            <Link
              href={
                nextProject
                  ? `/dashboard/implementation/project/${nextProject.id}`
                  : "#"
              }
              aria-disabled={!nextProject}
              className={`inline-flex items-center gap-2 rounded-lg border px-4 py-3 text-sm font-semibold ${
                nextProject
                  ? "border-slate-300 text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                  : "pointer-events-none border-slate-200 text-slate-300 dark:border-slate-800 dark:text-slate-700"
              }`}
            >
              Next
              <ArrowRight size={18} />
            </Link>
            {canManageImplementation && (
              <button
                onClick={() => setShowPhase(true)}
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                <Plus size={18} />
                Add Phase
              </button>
            )}
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Overall Progress
            </p>
            <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
              {projectProgress}%
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Start Date
            </p>
            <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
              {formatDate(project.start_date)}
            </p>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Target End
            </p>
            <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">
              {formatDate(project.end_date)}
            </p>
          </div>
        </div>

        <div className="mt-6 h-3 rounded-full bg-slate-200 dark:bg-slate-800">
          <div
            className="h-3 rounded-full bg-blue-600"
            style={{ width: `${projectProgress}%` }}
          />
        </div>
      </div>

      {showPhase && canManageImplementation && (
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              New Phase
            </h2>
            <button
              aria-label="Close phase form"
              onClick={() => setShowPhase(false)}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mt-5 grid gap-4">
            <input
              className="w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              placeholder="Phase name"
              value={phaseForm.phase_name}
              onChange={(event) =>
                setPhaseForm((current) => ({
                  ...current,
                  phase_name: event.target.value,
                }))
              }
            />
            <textarea
              rows={4}
              className="w-full rounded-lg border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              placeholder="Description"
              value={phaseForm.description}
              onChange={(event) =>
                setPhaseForm((current) => ({
                  ...current,
                  description: event.target.value,
                }))
              }
            />
          </div>

          <div className="mt-5 flex gap-3">
            <button
              onClick={savePhase}
              disabled={savingPhase}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {savingPhase && <Loader2 className="animate-spin" size={16} />}
              Save Phase
            </button>
            <button
              onClick={() => setShowPhase(false)}
              className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {phases.length === 0 ? (
        <div className="rounded-lg border border-slate-200 bg-white p-16 text-center text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
          No phases defined yet.
        </div>
      ) : (
        phases.map((phase) => {
          const phaseProgress = calculatePhaseProgress(phase);
          const taskForm = taskForms[phase.id];
          const tasks = phase.tasks ?? [];

          return (
            <section
              key={phase.id}
              className="rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex flex-wrap items-start justify-between gap-5 border-b border-slate-200 p-6 dark:border-slate-800">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {phase.phase_name}
                  </h2>
                  <p className="mt-2 text-slate-600 dark:text-slate-300">
                    {phase.description ?? "No phase description provided."}
                  </p>
                </div>

                {canManageImplementation && (
                  <button
                    onClick={() => openTaskForm(phase.id)}
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                  >
                    <Plus size={16} />
                    Add Task
                  </button>
                )}
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <div className="flex items-center justify-between text-sm font-semibold">
                    <span className="text-slate-600 dark:text-slate-300">
                      Phase progress
                    </span>
                    <span className="text-slate-900 dark:text-white">
                      {phaseProgress}%
                    </span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-slate-200 dark:bg-slate-800">
                    <div
                      className="h-2 rounded-full bg-blue-600"
                      style={{ width: `${phaseProgress}%` }}
                    />
                  </div>
                </div>

                {taskForm?.show && canManageImplementation && (
                  <div className="mb-8 rounded-lg border border-slate-200 p-5 dark:border-slate-800">
                    <div className="grid gap-4 lg:grid-cols-2">
                      <input
                        className="rounded-lg border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                        placeholder="Task title"
                        value={taskForm.title}
                        onChange={(event) =>
                          updateTaskForm(phase.id, "title", event.target.value)
                        }
                      />
                      <input
                        className="rounded-lg border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                        placeholder="Assigned team member ID"
                        value={taskForm.assigned_to}
                        onChange={(event) =>
                          updateTaskForm(
                            phase.id,
                            "assigned_to",
                            event.target.value
                          )
                        }
                      />
                      <select
                        className="rounded-lg border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                        value={taskForm.priority}
                        onChange={(event) =>
                          updateTaskForm(
                            phase.id,
                            "priority",
                            event.target.value as TaskForm["priority"]
                          )
                        }
                      >
                        <option value="High">High priority</option>
                        <option value="Medium">Medium priority</option>
                        <option value="Low">Low priority</option>
                      </select>
                      <input
                        type="date"
                        className="rounded-lg border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                        value={taskForm.due_date}
                        onChange={(event) =>
                          updateTaskForm(phase.id, "due_date", event.target.value)
                        }
                      />
                      <textarea
                        rows={3}
                        className="lg:col-span-2 rounded-lg border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                        placeholder="Task description"
                        value={taskForm.description}
                        onChange={(event) =>
                          updateTaskForm(
                            phase.id,
                            "description",
                            event.target.value
                          )
                        }
                      />
                    </div>

                    <div className="mt-5 flex gap-3">
                      <button
                        onClick={() => saveTask(phase.id)}
                        disabled={savingTaskId === phase.id}
                        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                      >
                        {savingTaskId === phase.id && (
                          <Loader2 className="animate-spin" size={16} />
                        )}
                        Save Task
                      </button>
                      <button
                        onClick={() =>
                          updateTaskForm(phase.id, "show", false)
                        }
                        className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                {tasks.length === 0 ? (
                  <div className="rounded-lg border border-dashed border-slate-300 p-8 text-center text-slate-500 dark:border-slate-700 dark:text-slate-400">
                    No tasks in this phase.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {tasks.map((task) => {
                      const completed = isTaskComplete(task);

                      return (
                        <div
                          key={task.id}
                          className="flex flex-wrap items-start justify-between gap-4 rounded-lg border border-slate-200 p-5 dark:border-slate-800"
                        >
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-3">
                              <h3 className="font-semibold text-slate-900 dark:text-white">
                                {task.title}
                              </h3>
                              <span
                                className={`rounded-full px-3 py-1 text-xs font-semibold ${priorityClass(
                                  task.priority
                                )}`}
                              >
                                {task.priority ?? "Medium"}
                              </span>
                            </div>
                            {task.description && (
                              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                                {task.description}
                              </p>
                            )}
                            <div className="mt-3 flex flex-wrap gap-5 text-sm text-slate-500 dark:text-slate-400">
                              <span className="flex items-center gap-2">
                                <User size={16} />
                                {task.assigned_to_name ??
                                  task.assigned_to ??
                                  "Unassigned"}
                              </span>
                              <span className="flex items-center gap-2">
                                <Calendar size={16} />
                                {formatDate(task.due_date)}
                              </span>
                              <span className="flex items-center gap-2">
                                <ClipboardList size={16} />
                                {completed ? "Completed" : "Open"}
                              </span>
                            </div>
                          </div>

                          <button
                            aria-label={
                              completed ? "Task completed" : "Mark task complete"
                            }
                            onClick={() => markComplete(task)}
                            className="rounded-lg p-2 hover:bg-slate-100 dark:hover:bg-slate-800"
                          >
                            {completed ? (
                              <CheckCircle2 className="text-green-600" />
                            ) : (
                              <Circle className="text-slate-400" />
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </section>
          );
        })
      )}
    </div>
  );
}
