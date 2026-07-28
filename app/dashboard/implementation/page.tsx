"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Calendar,
  FolderKanban,
  Loader2,
  Search,
  Target,
} from "lucide-react";

import { getProjects } from "@/app/lib/project";
import { toast } from "sonner";

interface Task {
  id: string;
  completed?: boolean;
  status?: string;
}

interface Phase {
  id: string;
  progress?: number;
  tasks?: Task[];
}

interface Project {
  id: string;
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
}

function normalizeList(data: unknown): Project[] {
  if (Array.isArray(data)) {
    return data as Project[];
  }

  if (data && typeof data === "object" && "results" in data) {
    const results = (data as { results?: unknown }).results;
    return Array.isArray(results) ? (results as Project[]) : [];
  }

  return [];
}

function isTaskComplete(task: Task) {
  return (
    task.completed === true ||
    task.status?.toLowerCase() === "completed" ||
    task.status?.toLowerCase() === "complete"
  );
}

function calculateProjectProgress(project: Project) {
  const tasks = project.phases?.flatMap((phase) => phase.tasks ?? []) ?? [];

  if (tasks.length > 0) {
    const completed = tasks.filter(isTaskComplete).length;
    return Math.round((completed / tasks.length) * 100);
  }

  const phases = project.phases ?? [];

  if (phases.length > 0) {
    const total = phases.reduce(
      (sum, phase) => sum + Number(phase.progress ?? 0),
      0
    );
    return Math.round(total / phases.length);
  }

  return Number(project.progress ?? 0);
}

function formatDate(value?: string | null) {
  if (!value) {
    return "Not set";
  }

  return new Date(value).toLocaleDateString();
}

export default function ImplementationPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  async function loadProjects() {
    try {
      setLoading(true);
      const data = await getProjects();
      setProjects(normalizeList(data));
    } catch {
      toast.error("Unable to load implementation projects.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) {
      return projects;
    }

    return projects.filter((project) => {
      const name = project.project_name ?? project.name ?? project.title ?? "";
      const idea = project.idea_title ?? project.idea ?? "";
      const description = project.description ?? "";

      return `${name} ${idea} ${description}`.toLowerCase().includes(keyword);
    });
  }, [projects, search]);

  const totals = useMemo(() => {
    const phaseCount = projects.reduce(
      (sum, project) => sum + (project.phases?.length ?? 0),
      0
    );
    const taskCount = projects.reduce(
      (sum, project) =>
        sum +
        (project.phases?.reduce(
          (phaseSum, phase) => phaseSum + (phase.tasks?.length ?? 0),
          0
        ) ?? 0),
      0
    );
    const avgProgress =
      projects.length === 0
        ? 0
        : Math.round(
            projects.reduce(
              (sum, project) => sum + calculateProjectProgress(project),
              0
            ) / projects.length
          );

    return {
      projects: projects.length,
      phases: phaseCount,
      tasks: taskCount,
      progress: avgProgress,
    };
  }, [projects]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            Implementation Projects
          </h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Approved ideas become projects where Product Managers define phases,
            tasks, owners, due dates and priorities.
          </p>
        </div>

        <Link
          href="/dashboard/implementation/tasks"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          <Target size={18} />
          View Tasks
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          ["Projects", totals.projects],
          ["Phases", totals.phases],
          ["Tasks", totals.tasks],
          ["Average Progress", `${totals.progress}%`],
        ].map(([label, value]) => (
          <div
            key={label}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              {label}
            </p>
            <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              {value}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-3 text-slate-400"
          />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search implementation projects..."
            className="w-full rounded-lg border border-slate-300 bg-white p-3 pl-10 text-slate-900 outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-blue-600" size={36} />
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="rounded-lg border border-slate-200 bg-white p-16 text-center text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
          No implementation projects found.
        </div>
      ) : (
        <div className="grid gap-5">
          {filteredProjects.map((project) => {
            const name =
              project.project_name ?? project.name ?? project.title ?? "Project";
            const progress = calculateProjectProgress(project);
            const phaseCount = project.phases?.length ?? 0;
            const taskCount =
              project.phases?.reduce(
                (sum, phase) => sum + (phase.tasks?.length ?? 0),
                0
              ) ?? 0;

            return (
              <Link
                href={`/dashboard/implementation/project/${project.id}`}
                key={project.id}
                className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:border-blue-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex flex-wrap items-start justify-between gap-5">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3">
                      <FolderKanban className="text-blue-600" size={24} />
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                        {name}
                      </h2>
                    </div>
                    <p className="mt-3 max-w-3xl text-slate-600 dark:text-slate-300">
                      {project.description ?? "No project description provided."}
                    </p>
                    {(project.idea_title || project.idea) && (
                      <p className="mt-3 text-sm font-medium text-slate-500 dark:text-slate-400">
                        Linked idea: {project.idea_title ?? project.idea}
                      </p>
                    )}
                  </div>

                  <ArrowRight className="mt-1 text-slate-400" size={22} />
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-4">
                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-500">
                      Progress
                    </p>
                    <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                      {progress}%
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-500">
                      Phases
                    </p>
                    <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                      {phaseCount}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-500">
                      Tasks
                    </p>
                    <p className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                      {taskCount}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-500">
                      Timeline
                    </p>
                    <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                      <Calendar size={16} />
                      {formatDate(project.start_date)} - {formatDate(project.end_date)}
                    </p>
                  </div>
                </div>

                <div className="mt-5 h-2 rounded-full bg-slate-200 dark:bg-slate-800">
                  <div
                    className="h-2 rounded-full bg-blue-600"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
