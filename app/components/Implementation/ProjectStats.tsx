"use client";

import {
  FolderKanban,
  PlayCircle,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    title: "Total Projects",
    value: "24",
    change: "+3 this month",
    icon: FolderKanban,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Active Projects",
    value: "15",
    change: "+2 this week",
    icon: PlayCircle,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    title: "Completed",
    value: "7",
    change: "92% success rate",
    icon: CheckCircle2,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
  },
  {
    title: "Overdue",
    value: "2",
    change: "Needs attention",
    icon: AlertTriangle,
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
  },
];

export default function ProjectStats() {
  return (
    <section className="space-y-6">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Project Overview
          </h2>

          <p className="text-sm text-slate-500">
            Monitor implementation progress across all innovation projects.
          </p>
        </div>

        <div className="hidden items-center gap-2 rounded-xl bg-emerald-50 px-4 py-2 md:flex">
          <TrendingUp className="h-5 w-5 text-emerald-600" />
          <span className="text-sm font-medium text-emerald-700">
            Overall Progress: 78%
          </span>
        </div>

      </div>

      {/* Stats */}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {stat.title}
                  </p>

                  <h3 className="mt-3 text-4xl font-bold text-slate-800">
                    {stat.value}
                  </h3>

                  <p className="mt-3 text-sm text-slate-500">
                    {stat.change}
                  </p>
                </div>

                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-xl ${stat.iconBg}`}
                >
                  <Icon className={`h-7 w-7 ${stat.iconColor}`} />
                </div>

              </div>
            </div>
          );
        })}

      </div>

    </section>
  );
}