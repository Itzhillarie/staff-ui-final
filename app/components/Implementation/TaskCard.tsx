"use client";

import {
  Calendar,
  CheckCircle2,
  Circle,
  Clock3,
  User,
  Flag,
  SquarePen,
} from "lucide-react";

interface TaskCardProps {
  task: {
    id: number;
    title: string;
    description: string;
    assignedTo: string;
    priority: "High" | "Medium" | "Low";
    status: "Not Started" | "In Progress" | "Completed";
    dueDate: string;
  };
  onEdit?: () => void;
  onToggleComplete?: () => void;
}

export default function TaskCard({
  task,
  onEdit,
  onToggleComplete,
}: TaskCardProps) {
  const priorityColor = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Low: "bg-green-100 text-green-700",
  };

  const statusColor = {
    "Not Started": "bg-slate-100 text-slate-700",
    "In Progress": "bg-blue-100 text-blue-700",
    Completed: "bg-green-100 text-green-700",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg">

      {/* Header */}

      <div className="flex items-start justify-between border-b p-6">

        <div>

          <h3 className="text-lg font-bold text-slate-800">
            {task.title}
          </h3>

          <p className="mt-2 text-slate-500">
            {task.description}
          </p>

        </div>

        <button
          type="button"
          onClick={onToggleComplete}
          className="rounded-full transition hover:scale-110"
        >
          {task.status === "Completed" ? (
            <CheckCircle2
              size={28}
              className="text-green-600"
            />
          ) : (
            <Circle
              size={28}
              className="text-slate-400"
            />
          )}
        </button>

      </div>

      {/* Details */}

      <div className="grid gap-5 p-6 md:grid-cols-2">

        <div className="flex items-center gap-3">

          <User
            size={18}
            className="text-blue-600"
          />

          <div>

            <p className="text-xs uppercase text-slate-500">
              Assigned To
            </p>

            <p className="font-semibold">
              {task.assignedTo}
            </p>

          </div>

        </div>

        <div className="flex items-center gap-3">

          <Calendar
            size={18}
            className="text-green-600"
          />

          <div>

            <p className="text-xs uppercase text-slate-500">
              Due Date
            </p>

            <p className="font-semibold">
              {task.dueDate}
            </p>

          </div>

        </div>

        <div className="flex items-center gap-3">

          <Flag
            size={18}
            className="text-red-600"
          />

          <div>

            <p className="text-xs uppercase text-slate-500">
              Priority
            </p>

            <span
              className={`rounded-full px-3 py-1 text-sm font-semibold ${priorityColor[task.priority]}`}
            >
              {task.priority}
            </span>

          </div>

        </div>

        <div className="flex items-center gap-3">

          <Clock3
            size={18}
            className="text-indigo-600"
          />

          <div>

            <p className="text-xs uppercase text-slate-500">
              Status
            </p>

            <span
              className={`rounded-full px-3 py-1 text-sm font-semibold ${statusColor[task.status]}`}
            >
              {task.status}
            </span>

          </div>

        </div>

      </div>

      {/* Footer */}

      <div className="flex items-center justify-between border-t bg-slate-50 px-6 py-5">

        <div className="text-sm text-slate-500">
          Task #{task.id}
        </div>

        <button
          type="button"
          onClick={onEdit}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-white transition hover:bg-indigo-700"
        >
          <SquarePen size={18} />
          Edit Task
        </button>

      </div>

    </div>
  );
}