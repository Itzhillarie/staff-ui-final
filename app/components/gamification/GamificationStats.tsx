"use client";

import {
  Award,
  Medal,
  Star,
  Trophy,
} from "lucide-react";

interface GamificationStatsProps {
  totalPoints: number;
  level: number;
  rank: number;
  badges: number;
}

export default function GamificationStats({
  totalPoints,
  level,
  rank,
  badges,
}: GamificationStatsProps) {
  const stats = [
    {
      title: "Total Points",
      value: totalPoints.toLocaleString(),
      icon: Star,
      color: "text-yellow-500",
      bg: "bg-yellow-100",
    },
    {
      title: "Current Level",
      value: level,
      icon: Trophy,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
    {
      title: "Leaderboard Rank",
      value: `#${rank}`,
      icon: Medal,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "Badges Earned",
      value: badges,
      icon: Award,
      color: "text-green-600",
      bg: "bg-green-100",
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">
                  {stat.title}
                </p>

                <h2 className="mt-3 text-4xl font-bold text-slate-800">
                  {stat.value}
                </h2>
              </div>

              <div
                className={`rounded-2xl ${stat.bg} p-4`}
              >
                <Icon
                  className={`h-8 w-8 ${stat.color}`}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}