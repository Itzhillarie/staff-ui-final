"use client";

import Link from "next/link";
import {
  CheckCircle2,
  Clock3,
  Calendar,
  ArrowRight,
  ClipboardList,
} from "lucide-react";

interface PhaseCardProps {
  phase: {
    id: number;
    name: string;
    description: string;
    status: "Not Started" | "In Progress" | "Completed";
    dueDate: string;
    progress: number;
    completedTasks: number;
    totalTasks: number;
  };
}

export default function PhaseCard({
  phase,
}: PhaseCardProps) {
  const statusColor = {
    "Not Started": "bg-slate-100 text-slate-700",
    "In Progress": "bg-blue-100 text-blue-700",
    Completed: "bg-green-100 text-green-700",
  };

  const progressColor =
    phase.progress === 100
      ? "bg-green-500"
      : phase.progress >= 70
      ? "bg-blue-600"
      : phase.progress >= 40
      ? "bg-yellow-500"
      : "bg-red-500";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg">

      {/* Header */}

      <div className="flex items-start justify-between border-b p-6">

        <div>

          <h3 className="text-xl font-bold text-slate-800">
            {phase.name}
          </h3>

          <p className="mt-2 text-slate-500">
            {phase.description}
          </p>

        </div>

        <span
          className={`rounded-full px-3 py-1 text-sm font-semibold ${
            statusColor[phase.status]
          }`}
        >
          {phase.status}
        </span>

      </div>

      {/* Progress */}

      <div className="p-6">

        <div className="mb-3 flex items-center justify-between">

          <span className="font-medium">
            Progress
          </span>

          <span className="font-bold">
            {phase.progress}%
          </span>

        </div>

        <div className="h-3 overflow-hidden rounded-full bg-slate-200">

          <div
            className={`h-full rounded-full transition-all duration-500 ${progressColor}`}
            style={{
              width: `${phase.progress}%`,
            }}
          />

        </div>

      </div>

      {/* Details */}

      <div className="grid gap-4 border-t p-6 md:grid-cols-2">

        <div className="flex items-center gap-3">

          <ClipboardList
            size={20}
            className="text-indigo-600"
          />

          <div>

            <p className="text-xs uppercase text-slate-500">
              Tasks
            </p>

            <p className="font-semibold">
              {phase.completedTasks}/{phase.totalTasks}
            </p>

          </div>

        </div>

        <div className="flex items-center gap-3">

          <Calendar
            size={20}
            className="text-green-600"
          />

          <div>

            <p className="text-xs uppercase text-slate-500">
              Due Date
            </p>

            <p className="font-semibold">
              {phase.dueDate}
            </p>

          </div>

        </div>

      </div>

      {/* Footer */}

      <div className="flex items-center justify-between border-t bg-slate-50 px-6 py-5">

        <div className="flex items-center gap-2 text-sm text-slate-500">

          {phase.status === "Completed" ? (
            <>
              <CheckCircle2
                size={18}
                className="text-green-600"
              />
              Phase Completed
            </>
          ) : (
            <>
              <Clock3
                size={18}
                className="text-blue-600"
              />
              Work in Progress
            </>
          )}

        </div>

        <Link
          href="#"
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-white transition hover:bg-indigo-700"
        >
          View Tasks

          <ArrowRight size={18} />

        </Link>

      </div>

    </div>
  );
}