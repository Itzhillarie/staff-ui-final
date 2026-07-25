"use client";

import { useState } from "react";
import {
  ClipboardList,
  Plus,
  Search,
  Filter,
} from "lucide-react";

import TaskCard from "@/app/components/Implementation/TaskCard";
import TaskDialog from "@/app/components/Implementation/TaskDialog";
import CreateTaskDialog from "@/app/components/Implementation/CreateTaskDialog";

export default function TasksPage() {
  const [search, setSearch] = useState("");

  const [selectedTask, setSelectedTask] = useState<any>(null);

  const [taskDialogOpen, setTaskDialogOpen] =
    useState(false);

  const [createDialogOpen, setCreateDialogOpen] =
    useState(false);

  const tasks = [
    {
      id: 1,
      title: "Design Database Schema",
      description:
        "Create database tables for implementation project.",
      assignedTo: "Hillary Chelimo",
      priority: "High" as const,
      status: "In Progress" as const,
      dueDate: "2026-08-15",
    },

    {
      id: 2,
      title: "Develop Authentication API",
      description:
        "Implement login and JWT authentication.",
      assignedTo: "John Kamau",
      priority: "High" as const,
      status: "Not Started" as const,
      dueDate: "2026-08-20",
    },

    {
      id: 3,
      title: "Testing Dashboard",
      description:
        "Perform UI and API integration testing.",
      assignedTo: "Mary Wanjiru",
      priority: "Medium" as const,
      status: "Completed" as const,
      dueDate: "2026-08-10",
    },
  ];

  const filteredTasks = tasks.filter(
    (task) =>
      task.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      task.assignedTo
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-wrap items-center justify-between gap-4">

        <div className="flex items-center gap-3">

          <ClipboardList
            size={36}
            className="text-indigo-600"
          />

          <div>

            <h1 className="text-4xl font-bold text-slate-800">
              Task Management
            </h1>

            <p className="text-slate-500">
              View, assign and monitor implementation
              tasks.
            </p>

          </div>

        </div>

        <button
          onClick={() => setCreateDialogOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700"
        >
          <Plus size={18} />
          New Task
        </button>

      </div>

      {/* Search + Filter */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="grid gap-4 lg:grid-cols-3">

          <div className="relative lg:col-span-2">

            <Search
              size={18}
              className="absolute left-4 top-4 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search tasks..."
              className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 focus:border-indigo-600 focus:outline-none"
            />

          </div>

          <button className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 hover:bg-slate-100">

            <Filter size={18} />

            Filters

          </button>

        </div>

      </div>

      {/* Statistics */}

      <div className="grid gap-6 md:grid-cols-4">

        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <p className="text-slate-500">
            Total Tasks
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            25
          </h2>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <p className="text-slate-500">
            Completed
          </p>

          <h2 className="mt-2 text-3xl font-bold text-green-600">
            14
          </h2>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <p className="text-slate-500">
            In Progress
          </p>

          <h2 className="mt-2 text-3xl font-bold text-blue-600">
            7
          </h2>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <p className="text-slate-500">
            Overdue
          </p>

          <h2 className="mt-2 text-3xl font-bold text-red-600">
            4
          </h2>

        </div>

      </div>

      {/* Tasks */}

      <div className="space-y-6">

        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={() => {
              setSelectedTask(task);
              setTaskDialogOpen(true);
            }}
            onToggleComplete={() =>
              console.log("Complete", task.id)
            }
          />
        ))}

      </div>

      {/* Dialogs */}

      <TaskDialog
        open={taskDialogOpen}
        task={selectedTask}
        onClose={() =>
          setTaskDialogOpen(false)
        }
        onSave={(task) => {
          console.log(task);
          setTaskDialogOpen(false);
        }}
      />

      <CreateTaskDialog
        open={createDialogOpen}
        onClose={() =>
          setCreateDialogOpen(false)
        }
        onCreate={(task) => {
          console.log(task);
        }}
      />

    </div>
  );
}