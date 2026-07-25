"use client";

import { Trophy } from "lucide-react";

interface GamificationHeaderProps {
  totalPoints: number;
  level: number;
  rank: number;
}

export default function GamificationHeader({
  totalPoints,
  level,
  rank,
}: GamificationHeaderProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-violet-700 via-purple-700 to-indigo-700 p-8 text-white shadow-2xl">

      <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-white/10 blur-3xl" />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <div className="mb-4 flex items-center gap-4">

            <div className="rounded-2xl bg-white/15 p-4 backdrop-blur-sm">
              <Trophy className="h-10 w-10 text-yellow-300" />
            </div>

            <div>

              <h1 className="text-4xl font-bold">
                Gamification
              </h1>

              <p className="mt-1 text-violet-100">
                Earn points, unlock achievements and compete on the leaderboard.
              </p>

            </div>

          </div>

        </div>

        <div className="grid grid-cols-3 gap-4">

          <div className="rounded-2xl bg-white/10 p-5 text-center backdrop-blur-sm">

            <p className="text-sm text-violet-200">
              Points
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {totalPoints}
            </h2>

          </div>

          <div className="rounded-2xl bg-white/10 p-5 text-center backdrop-blur-sm">

            <p className="text-sm text-violet-200">
              Level
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {level}
            </h2>

          </div>

          <div className="rounded-2xl bg-white/10 p-5 text-center backdrop-blur-sm">

            <p className="text-sm text-violet-200">
              Rank
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              #{rank}
            </h2>

          </div>

        </div>

      </div>
    </div>
  );
}