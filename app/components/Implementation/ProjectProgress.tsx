"use client";

import {
  CheckCircle2,
  Clock3,
  AlertTriangle,
} from "lucide-react";

interface ProjectProgressProps {
  progress: number;
  completedTasks: number;
  totalTasks: number;
  completedPhases: number;
  totalPhases: number;
}

export default function ProjectProgress({
  progress,
  completedTasks,
  totalTasks,
  completedPhases,
  totalPhases,
}: ProjectProgressProps) {
  const progressColor =
    progress >= 100
      ? "bg-emerald-500"
      : progress >= 70
      ? "bg-blue-600"
      : progress >= 40
      ? "bg-amber-500"
      : "bg-red-500";

  const status =
    progress === 100
      ? {
          text: "Completed",
          icon: CheckCircle2,
          color: "text-emerald-600",
        }
      : progress >= 70
      ? {
          text: "On Track",
          icon: Clock3,
          color: "text-blue-600",
        }
      : {
          text: "Needs Attention",
          icon: AlertTriangle,
          color: "text-red-600",
        };

  const StatusIcon = status.icon;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h3 className="text-lg font-bold text-slate-800">
            Project Progress
          </h3>

          <p className="text-sm text-slate-500">
            Progress is calculated automatically from completed tasks.
          </p>

        </div>

        <div className={`flex items-center gap-2 ${status.color}`}>
          <StatusIcon size={20} />
          <span className="font-semibold">
            {status.text}
          </span>
        </div>

      </div>

      {/* Percentage */}

      <div className="mb-4 flex items-end justify-between">

        <h2 className="text-5xl font-bold text-slate-800">
          {progress}%
        </h2>

        <span className="text-sm text-slate-500">
          Overall Completion
        </span>

      </div>

      {/* Progress Bar */}

      <div className="h-4 overflow-hidden rounded-full bg-slate-200">

        <div
          className={`h-full rounded-full transition-all duration-700 ${progressColor}`}
          style={{ width: `${progress}%` }}
        />

      </div>

      {/* Statistics */}

      <div className="mt-8 grid grid-cols-2 gap-5">

        <div className="rounded-xl bg-slate-50 p-4">

          <p className="text-sm text-slate-500">
            Tasks Completed
          </p>

          <h3 className="mt-2 text-2xl font-bold text-slate-800">
            {completedTasks}/{totalTasks}
          </h3>

        </div>

        <div className="rounded-xl bg-slate-50 p-4">

          <p className="text-sm text-slate-500">
            Phases Completed
          </p>

          <h3 className="mt-2 text-2xl font-bold text-slate-800">
            {completedPhases}/{totalPhases}
          </h3>

        </div>

      </div>

    </div>
  );
}