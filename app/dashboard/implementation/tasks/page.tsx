"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Calendar,
  CheckCircle2,
  Circle,
  ClipboardList,
  Loader2,
  Search,
  User,
} from "lucide-react";

import { completeTask, getTasks } from "@/app/lib/project";
import { toast } from "sonner";

interface Task {
  id: string;
  title: string;
  description?: string;
  priority?: string;
  due_date?: string;
  completed?: boolean;
  status?: string;
  assigned_to?: string;
  assigned_to_name?: string;
  phase?: string;
  phase_name?: string;
  project?: string;
  project_name?: string;
}

function normalizeList(data: unknown): Task[] {
  if (Array.isArray(data)) {
    return data as Task[];
  }

  if (data && typeof data === "object" && "results" in data) {
    const results = (data as { results?: unknown }).results;
    return Array.isArray(results) ? (results as Task[]) : [];
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

function formatDate(value?: string) {
  if (!value) {
    return "Not set";
  }

  return new Date(value).toLocaleDateString();
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

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  async function loadTasks() {
    try {
      setLoading(true);
      const data = await getTasks();
      setTasks(normalizeList(data));
    } catch {
      toast.error("Unable to load tasks.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadTasks();
  }, []);

  async function markComplete(task: Task) {
    if (isTaskComplete(task)) {
      return;
    }

    try {
      await completeTask(task.id);
      toast.success("Task completed.");
      await loadTasks();
    } catch {
      toast.error("Unable to complete task.");
    }
  }

  const filteredTasks = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) {
      return tasks;
    }

    return tasks.filter((task) =>
      [
        task.title,
        task.description,
        task.project_name,
        task.project,
        task.phase_name,
        task.phase,
        task.assigned_to_name,
        task.assigned_to,
        task.priority,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(keyword)
    );
  }, [tasks, search]);

  const completedCount = tasks.filter(isTaskComplete).length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="flex items-center gap-3 text-4xl font-bold text-slate-900 dark:text-white">
          <ClipboardList className="text-blue-600" size={34} />
          Implementation Tasks
        </h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Track assigned tasks across approved idea implementation projects.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["Total Tasks", tasks.length],
          ["Completed", completedCount],
          ["Open", tasks.length - completedCount],
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
            placeholder="Search tasks, projects, phases or assignees..."
            className="w-full rounded-lg border border-slate-300 bg-white p-3 pl-10 text-slate-900 outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-blue-600" size={36} />
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="p-16 text-center text-slate-500 dark:text-slate-400">
            No implementation tasks found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead className="bg-slate-50 text-sm text-slate-600 dark:bg-slate-950 dark:text-slate-300">
                <tr>
                  <th className="px-6 py-4 text-left">Task</th>
                  <th className="px-6 py-4 text-left">Project</th>
                  <th className="px-6 py-4 text-left">Phase</th>
                  <th className="px-6 py-4 text-left">Assigned</th>
                  <th className="px-6 py-4 text-center">Priority</th>
                  <th className="px-6 py-4 text-center">Due Date</th>
                  <th className="px-6 py-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map((task) => {
                  const completed = isTaskComplete(task);

                  return (
                    <tr
                      key={task.id}
                      className="border-t border-slate-200 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-950"
                    >
                      <td className="px-6 py-5">
                        <h3 className="font-semibold text-slate-900 dark:text-white">
                          {task.title}
                        </h3>
                        {task.description && (
                          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                            {task.description}
                          </p>
                        )}
                      </td>
                      <td className="px-6 py-5 text-slate-700 dark:text-slate-300">
                        {task.project_name ?? task.project ?? "-"}
                      </td>
                      <td className="px-6 py-5 text-slate-700 dark:text-slate-300">
                        {task.phase_name ?? task.phase ?? "-"}
                      </td>
                      <td className="px-6 py-5 text-slate-700 dark:text-slate-300">
                        <span className="flex items-center gap-2">
                          <User size={16} />
                          {task.assigned_to_name ?? task.assigned_to ?? "-"}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${priorityClass(
                            task.priority
                          )}`}
                        >
                          {task.priority ?? "Medium"}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-center text-slate-700 dark:text-slate-300">
                        <span className="inline-flex items-center justify-center gap-2">
                          <Calendar size={16} />
                          {formatDate(task.due_date)}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-center">
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
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
