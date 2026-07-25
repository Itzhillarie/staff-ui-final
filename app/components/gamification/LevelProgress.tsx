"use client";

import { TrendingUp } from "lucide-react";

interface LevelProgressProps {
  level: number;
  currentPoints: number;
  nextLevelPoints: number;
}

export default function LevelProgress({
  level,
  currentPoints,
  nextLevelPoints,
}: LevelProgressProps) {
  const progress =
    nextLevelPoints > 0
      ? Math.min((currentPoints / nextLevelPoints) * 100, 100)
      : 0;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-slate-800">
            Level Progress
          </h2>

          <p className="mt-1 text-slate-500">
            Keep earning points to unlock the next level.
          </p>

        </div>

        <div className="rounded-2xl bg-indigo-100 p-4">
          <TrendingUp className="h-8 w-8 text-indigo-600" />
        </div>

      </div>

      <div className="mb-4 flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-500">
            Current Level
          </p>

          <h3 className="text-3xl font-bold text-indigo-700">
            Level {level}
          </h3>

        </div>

        <div className="text-right">

          <p className="text-sm text-slate-500">
            Progress
          </p>

          <h3 className="text-xl font-bold text-slate-800">
            {currentPoints} / {nextLevelPoints} XP
          </h3>

        </div>

      </div>

      <div className="h-4 overflow-hidden rounded-full bg-slate-200">

        <div
          className="h-full rounded-full bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 transition-all duration-700"
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

      <div className="mt-3 flex justify-between text-sm text-slate-500">

        <span>
          {progress.toFixed(0)}% Complete
        </span>

        <span>
          {Math.max(nextLevelPoints - currentPoints, 0)} XP to next level
        </span>

      </div>

    </div>
  );
}