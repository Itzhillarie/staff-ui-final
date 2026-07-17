"use client";

import {
  Trophy,
  Star,
  Award,
  Medal,
  TrendingUp,
  Crown,
} from "lucide-react";

interface GamificationStatsProps {
  totalPoints: number;
  currentLevel: string;
  badgesEarned: number;
  achievementsUnlocked: number;
  leaderboardRank: number;
  monthlyPoints: number;
}

export default function GamificationStats({
  totalPoints,
  currentLevel,
  badgesEarned,
  achievementsUnlocked,
  leaderboardRank,
  monthlyPoints,
}: GamificationStatsProps) {
  const stats = [
    {
      title: "Total Points",
      value: totalPoints.toLocaleString(),
      subtitle: "Points earned",
      icon: Trophy,
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      valueColor: "text-yellow-600",
    },
    {
      title: "Current Level",
      value: currentLevel,
      subtitle: "Innovation Level",
      icon: Crown,
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
      valueColor: "text-indigo-600",
    },
    {
      title: "Badges",
      value: badgesEarned,
      subtitle: "Unlocked",
      icon: Award,
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      valueColor: "text-green-600",
    },
    {
      title: "Achievements",
      value: achievementsUnlocked,
      subtitle: "Completed",
      icon: Medal,
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      valueColor: "text-purple-600",
    },
    {
      title: "Leaderboard Rank",
      value: `#${leaderboardRank}`,
      subtitle: "Organization",
      icon: Star,
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      valueColor: "text-blue-600",
    },
    {
      title: "Monthly Points",
      value: monthlyPoints.toLocaleString(),
      subtitle: "This Month",
      icon: TrendingUp,
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      valueColor: "text-orange-600",
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {stat.title}
                </p>

                <h3
                  className={`mt-3 text-3xl font-bold ${stat.valueColor}`}
                >
                  {stat.value}
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  {stat.subtitle}
                </p>
              </div>

              <div
                className={`rounded-2xl p-4 transition-transform duration-300 group-hover:scale-110 ${stat.iconBg}`}
              >
                <Icon
                  size={30}
                  className={stat.iconColor}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}