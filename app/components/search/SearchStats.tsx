"use client";

import {
  Search,
  Clock3,
  Layers3,
  Bookmark,
} from "lucide-react";

interface SearchStatsProps {
  totalResults: number;
  searchTime?: number;
  categoriesFound?: number;
  savedSearches?: number;
}

export default function SearchStats({
  totalResults,
  searchTime = 0,
  categoriesFound = 0,
  savedSearches = 0,
}: SearchStatsProps) {
  const stats = [
    {
      title: "Results Found",
      value: totalResults.toLocaleString(),
      icon: Search,
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
    },
    {
      title: "Search Time",
      value: `${searchTime} ms`,
      icon: Clock3,
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      title: "Categories",
      value: categoriesFound,
      icon: Layers3,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      title: "Saved Searches",
      value: savedSearches,
      icon: Bookmark,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  {stat.title}
                </p>

                <h2 className="mt-3 text-3xl font-bold text-slate-800">
                  {stat.value}
                </h2>

              </div>

              <div
                className={`rounded-2xl p-4 ${stat.iconBg}`}
              >
                <Icon
                  className={`h-7 w-7 ${stat.iconColor}`}
                />
              </div>

            </div>

          </div>
        );
      })}
    </div>
  );
}