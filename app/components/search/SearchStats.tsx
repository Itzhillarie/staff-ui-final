"use client";

import {
  Search,
  Lightbulb,
  FolderKanban,
  CheckSquare,
} from "lucide-react";

interface SearchStatsProps {
  total: number;
  ideas: number;
  projects: number;
  tasks: number;
}

export default function SearchStats({
  total,
  ideas,
  projects,
  tasks,
}: SearchStatsProps) {
  const stats = [
    {
      title: "Total Results",
      value: total,
      icon: Search,
    },
    {
      title: "Ideas",
      value: ideas,
      icon: Lightbulb,
    },
    {
      title: "Projects",
      value: projects,
      icon: FolderKanban,
    },
    {
      title: "Tasks",
      value: tasks,
      icon: CheckSquare,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-xl bg-white p-5 shadow-sm"
          >
            <div className="mb-3 flex items-center justify-between">
              <Icon size={22} className="text-indigo-600" />
            </div>

            <h2 className="text-2xl font-bold">
              {stat.value}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              {stat.title}
            </p>
          </div>
        );
      })}
    </div>
  );
}