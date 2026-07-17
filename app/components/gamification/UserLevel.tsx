"use client";

import {
  Crown,
  Trophy,
  TrendingUp,
  Star,
  ArrowUpRight,
} from "lucide-react";

interface UserLevelProps {
  employeeName: string;
  currentLevel: string;
  currentXP: number;
  nextLevelXP: number;
  totalPoints: number;
  rank: number;
}

export default function UserLevel({
  employeeName,
  currentLevel,
  currentXP,
  nextLevelXP,
  totalPoints,
  rank,
}: UserLevelProps) {
  const percentage = Math.min(
    (currentXP / nextLevelXP) * 100,
    100
  );

  const remainingXP = Math.max(
    nextLevelXP - currentXP,
    0
  );

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* Hero Header */}

      <div className="bg-linear-to-r from-indigo-600 via-purple-600 to-blue-600 p-8 text-white">

        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          {/* Left */}

          <div>

            <p className="text-indigo-100">
              Welcome back,
            </p>

            <h1 className="mt-2 text-4xl font-bold">
              {employeeName}
            </h1>

            <div className="mt-6 inline-flex items-center gap-3 rounded-full bg-white/20 px-5 py-2 backdrop-blur">

              <Crown size={24} />

              <span className="text-lg font-semibold">
                {currentLevel}
              </span>

            </div>

          </div>

          {/* Right */}

          <div className="grid gap-5 sm:grid-cols-2">

            <div className="rounded-2xl bg-white/15 p-5 backdrop-blur">

              <div className="flex items-center gap-3">

                <Trophy size={28} />

                <div>

                  <p className="text-sm text-indigo-100">
                    Total Points
                  </p>

                  <h2 className="text-3xl font-bold">
                    {totalPoints.toLocaleString()}
                  </h2>

                </div>

              </div>

            </div>

            <div className="rounded-2xl bg-white/15 p-5 backdrop-blur">

              <div className="flex items-center gap-3">

                <Star size={28} />

                <div>

                  <p className="text-sm text-indigo-100">
                    Leaderboard Rank
                  </p>

                  <h2 className="text-3xl font-bold">
                    #{rank}
                  </h2>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Progress Section */}

      <div className="space-y-8 p-8">

        {/* XP */}

        <div>

          <div className="mb-3 flex items-center justify-between">

            <div>

              <h2 className="text-xl font-bold text-slate-800">
                Level Progress
              </h2>

              <p className="text-slate-500">
                {currentXP.toLocaleString()} XP of{" "}
                {nextLevelXP.toLocaleString()} XP
              </p>

            </div>

            <div className="text-right">

              <span className="text-2xl font-bold text-indigo-600">
                {percentage.toFixed(0)}%
              </span>

            </div>

          </div>

          <div className="h-5 overflow-hidden rounded-full bg-slate-200">

            <div
              className="h-full rounded-full bg-linear-to-r from-indigo-600 via-purple-600 to-blue-500 transition-all duration-700"
              style={{
                width: `${percentage}%`,
              }}
            />

          </div>

        </div>

        {/* Stats */}

        <div className="grid gap-6 md:grid-cols-3">

          <div className="rounded-2xl border border-slate-200 p-6">

            <div className="flex items-center gap-3">

              <TrendingUp
                size={24}
                className="text-green-600"
              />

              <div>

                <p className="text-sm text-slate-500">
                  XP Remaining
                </p>

                <h3 className="mt-2 text-3xl font-bold text-slate-800">
                  {remainingXP.toLocaleString()}
                </h3>

              </div>

            </div>

          </div>

          <div className="rounded-2xl border border-slate-200 p-6">

            <div className="flex items-center gap-3">

              <ArrowUpRight
                size={24}
                className="text-blue-600"
              />

              <div>

                <p className="text-sm text-slate-500">
                  Next Level At
                </p>

                <h3 className="mt-2 text-3xl font-bold text-slate-800">
                  {nextLevelXP.toLocaleString()}
                </h3>

              </div>

            </div>

          </div>

          <div className="rounded-2xl border border-slate-200 p-6">

            <div className="flex items-center gap-3">

              <Crown
                size={24}
                className="text-yellow-600"
              />

              <div>

                <p className="text-sm text-slate-500">
                  Current Level
                </p>

                <h3 className="mt-2 text-2xl font-bold text-slate-800">
                  {currentLevel}
                </h3>

              </div>

            </div>

          </div>

        </div>

        {/* Motivation */}

        <div className="rounded-2xl border border-indigo-200 bg-indigo-50 p-6">

          <h3 className="text-lg font-semibold text-indigo-700">
            🎯 Keep Going!
          </h3>

          <p className="mt-3 leading-7 text-slate-700">
            You're only{" "}
            <span className="font-bold text-indigo-700">
              {remainingXP.toLocaleString()} XP
            </span>{" "}
            away from reaching the next level. Submit new ideas,
            participate in peer reviews, complete implementation
            tasks, and collaborate with your team to earn more
            points and unlock exclusive badges and rewards.
          </p>

        </div>

      </div>

    </div>
  );
}