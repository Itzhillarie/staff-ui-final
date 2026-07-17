"use client";

import {
  ArrowRight,
  Calendar,
  FolderKanban,
  Lightbulb,
  CheckSquare,
  User,
  Bell,
} from "lucide-react";

export interface SearchResult {
  id: number;
  title: string;
  description: string;
  type:
    | "Idea"
    | "Project"
    | "Task"
    | "Employee"
    | "Notification";
  status: string;
  date: string;
}

interface SearchResultCardProps {
  result: SearchResult;
  onView?: (result: SearchResult) => void;
}

export default function SearchResultCard({
  result,
  onView,
}: SearchResultCardProps) {
  const icons = {
    Idea: Lightbulb,
    Project: FolderKanban,
    Task: CheckSquare,
    Employee: User,
    Notification: Bell,
  };

  const Icon = icons[result.type];

  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md">

      <div className="flex items-start justify-between">

        <div className="flex items-center gap-3">

          <div className="rounded-lg bg-indigo-100 p-3">
            <Icon
              size={20}
              className="text-indigo-600"
            />
          </div>

          <div>

            <h3 className="font-semibold text-slate-800">
              {result.title}
            </h3>

            <span className="text-xs text-slate-500">
              {result.type}
            </span>

          </div>

        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs">
          {result.status}
        </span>

      </div>

      <p className="mt-4 text-sm text-slate-600">
        {result.description}
      </p>

      <div className="mt-5 flex items-center justify-between">

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Calendar size={16} />
          {result.date}
        </div>

        <button
          onClick={() => onView?.(result)}
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700"
        >
          View
          <ArrowRight size={16} />
        </button>

      </div>

    </div>
  );
}