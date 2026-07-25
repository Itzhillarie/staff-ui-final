"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Search,
  CheckCircle2,
  Circle,
  Calendar,
  Loader2,
} from "lucide-react";

import {
  getTasks,
  completeTask,
} from "@/app/lib/project";

import { toast } from "sonner";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: string;
  due_date: string;
  completed: boolean;
  assigned_to: string;
  phase: string;
  project: string;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  async function loadTasks() {
    try {
      setLoading(true);

      const data = await getTasks();

      const list = Array.isArray(data)
        ? data
        : data.results ?? [];

      setTasks(list);
    } catch {
      toast.error("Unable to load tasks.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function markComplete(id: string) {
    try {
      await completeTask(id);

      toast.success("Task completed.");

      loadTasks();
    } catch {
      toast.error("Unable to complete task.");
    }
  }

  const filtered = useMemo(() => {
    return tasks.filter((task) =>
      task.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [tasks, search]);

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold">
          Tasks
        </h1>

        <p className="mt-2 text-slate-500">
          Track implementation tasks.
        </p>

      </div>

      <div className="rounded-2xl border bg-white p-5">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-3 top-3 text-slate-400"
          />

          <input
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search tasks..."
            className="w-full rounded-xl border p-3 pl-10"
          />

        </div>

      </div>

      <div className="rounded-2xl border bg-white shadow-sm">

        {loading ? (

          <div className="flex justify-center py-20">

            <Loader2 className="animate-spin text-blue-600"/>

          </div>

        ) : (

          <table className="w-full">

            <thead className="bg-slate-50">

              <tr>

                <th className="px-6 py-4 text-left">
                  Task
                </th>

                <th className="px-6 py-4 text-left">
                  Project
                </th>

                <th className="px-6 py-4 text-left">
                  Phase
                </th>

                <th className="px-6 py-4 text-center">
                  Assigned
                </th>

                <th className="px-6 py-4 text-center">
                  Priority
                </th>

                <th className="px-6 py-4 text-center">
                  Due Date
                </th>

                <th className="px-6 py-4 text-center">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {filtered.map((task) => (

                <tr
                  key={task.id}
                  className="border-t hover:bg-slate-50"
                >

                  <td className="px-6 py-5">

                    <div>

                      <h3 className="font-semibold">

                        {task.title}

                      </h3>

                      <p className="text-sm text-slate-500">

                        {task.description}

                      </p>

                    </div>

                  </td>

                  <td className="px-6 py-5">

                    {task.project}

                  </td>

                  <td className="px-6 py-5">

                    {task.phase}

                  </td>

                  <td className="px-6 py-5 text-center">

                    {task.assigned_to}

                  </td>

                  <td className="px-6 py-5 text-center">

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        task.priority === "High"
                          ? "bg-red-100 text-red-700"
                          : task.priority === "Medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {task.priority}
                    </span>

                  </td>

                  <td className="px-6 py-5 text-center">

                    <div className="flex items-center justify-center gap-2">

                      <Calendar size={16}/>

                      {task.due_date}

                    </div>

                  </td>

                  <td className="px-6 py-5 text-center">

                    <button
                      onClick={() =>
                        !task.completed &&
                        markComplete(task.id)
                      }
                    >

                      {task.completed ? (

                        <CheckCircle2 className="text-green-600"/>

                      ) : (

                        <Circle className="text-slate-400"/>

                      )}

                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        )}

      </div>

    </div>
  );
}