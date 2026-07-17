"use client";

import {
  Trophy,
  Medal,
  Crown,
  Star,
  ArrowUp,
  ArrowDown,
  Minus,
  Lightbulb,
  CheckCircle2,
} from "lucide-react";

interface LeaderboardUser {
  id: number;
  name: string;
  department: string;
  avatar?: string;
  points: number;
  level: string;
  rank: number;
  ideas: number;
  completedProjects: number;
  badges: number;
  trend: "up" | "down" | "same";
}

interface LeaderboardCardProps {
  user: LeaderboardUser;
  isCurrentUser?: boolean;
}

export default function LeaderboardCard({
  user,
  isCurrentUser = false,
}: LeaderboardCardProps) {
  const rankIcon = () => {
    switch (user.rank) {
      case 1:
        return <Crown className="h-7 w-7 text-yellow-500" />;
      case 2:
        return <Trophy className="h-7 w-7 text-slate-400" />;
      case 3:
        return <Medal className="h-7 w-7 text-orange-500" />;
      default:
        return (
          <span className="text-xl font-bold text-slate-600">
            #{user.rank}
          </span>
        );
    }
  };

  const trendIcon = () => {
    switch (user.trend) {
      case "up":
        return (
          <ArrowUp className="h-5 w-5 text-green-600" />
        );
      case "down":
        return (
          <ArrowDown className="h-5 w-5 text-red-600" />
        );
      default:
        return (
          <Minus className="h-5 w-5 text-slate-500" />
        );
    }
  };

  return (
    <div
      className={`rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        isCurrentUser
          ? "border-indigo-500 ring-2 ring-indigo-100"
          : "border-slate-200"
      }`}
    >
      {/* Top */}

      <div className="flex items-start justify-between">

        <div className="flex items-center gap-5">

          {/* Rank */}

          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
            {rankIcon()}
          </div>

          {/* Avatar */}

          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-r from-indigo-500 to-purple-600 text-xl font-bold text-white">
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .substring(0, 2)}
          </div>

          <div>

            <h2 className="text-xl font-bold text-slate-800">
              {user.name}
            </h2>

            <p className="text-slate-500">
              {user.department}
            </p>

            <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1">

              <Star
                size={15}
                className="text-indigo-600"
              />

              <span className="text-sm font-semibold text-indigo-700">
                {user.level}
              </span>

            </div>

          </div>

        </div>

        <div className="flex items-center gap-2">
          {trendIcon()}
        </div>

      </div>

      {/* Statistics */}

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">

        <div className="rounded-xl bg-slate-50 p-4">

          <p className="text-sm text-slate-500">
            Points
          </p>

          <h3 className="mt-2 text-2xl font-bold text-indigo-600">
            {user.points.toLocaleString()}
          </h3>

        </div>

        <div className="rounded-xl bg-slate-50 p-4">

          <div className="flex items-center gap-2">

            <Lightbulb
              size={18}
              className="text-yellow-600"
            />

            <span className="text-sm text-slate-500">
              Ideas
            </span>

          </div>

          <h3 className="mt-2 text-2xl font-bold">
            {user.ideas}
          </h3>

        </div>

        <div className="rounded-xl bg-slate-50 p-4">

          <div className="flex items-center gap-2">

            <CheckCircle2
              size={18}
              className="text-green-600"
            />

            <span className="text-sm text-slate-500">
              Projects
            </span>

          </div>

          <h3 className="mt-2 text-2xl font-bold">
            {user.completedProjects}
          </h3>

        </div>

        <div className="rounded-xl bg-slate-50 p-4">

          <div className="flex items-center gap-2">

            <Medal
              size={18}
              className="text-orange-600"
            />

            <span className="text-sm text-slate-500">
              Badges
            </span>

          </div>

          <h3 className="mt-2 text-2xl font-bold">
            {user.badges}
          </h3>

        </div>

      </div>

      {/* Footer */}

      <div className="mt-8 flex items-center justify-between border-t pt-5">

        <div>

          <p className="text-sm text-slate-500">
            Organization Rank
          </p>

          <h3 className="text-xl font-bold text-slate-800">
            #{user.rank}
          </h3>

        </div>

        {isCurrentUser && (
          <span className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-semibold text-white">
            You
          </span>
        )}

      </div>

    </div>
  );
}