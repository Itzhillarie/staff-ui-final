"use client";

import {
  CheckCircle2,
  Lock,
  Target,
} from "lucide-react";

export interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  completed: boolean;
}

interface AchievementCardProps {
  achievement: Achievement;
}

export default function AchievementCard({
  achievement,
}: AchievementCardProps) {
  const percentage =
    achievement.target > 0
      ? Math.min(
          (achievement.progress / achievement.target) * 100,
          100
        )
      : 0;

  return (
    <div
      className={`rounded-2xl border p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${
        achievement.completed
          ? "border-green-200 bg-white"
          : "border-slate-200 bg-white"
      }`}
    >
      <div className="mb-5 flex items-center justify-between">

        {achievement.completed ? (
          <CheckCircle2 className="h-12 w-12 text-green-600" />
        ) : (
          <Target className="h-12 w-12 text-indigo-600" />
        )}

        {achievement.completed ? (
          <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
            Completed
          </span>
        ) : (
          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600">
            In Progress
          </span>
        )}

      </div>

      <h2 className="text-2xl font-bold text-slate-800">
        {achievement.title}
      </h2>

      <p className="mt-3 text-slate-500">
        {achievement.description}
      </p>

      <div className="mt-6">

        <div className="mb-2 flex items-center justify-between text-sm">

          <span className="text-slate-500">
            Progress
          </span>

          <span className="font-semibold text-slate-700">
            {achievement.progress} / {achievement.target}
          </span>

        </div>

        <div className="h-3 overflow-hidden rounded-full bg-slate-200">

          <div
            className={`h-full rounded-full transition-all duration-700 ${
              achievement.completed
                ? "bg-green-500"
                : "bg-indigo-600"
            }`}
            style={{
              width: `${percentage}%`,
            }}
          />

        </div>

        <div className="mt-2 flex justify-between text-xs text-slate-500">

          <span>{percentage.toFixed(0)}%</span>

          {!achievement.completed && (
            <span>
              {achievement.target - achievement.progress} remaining
            </span>
          )}

        </div>

      </div>

      <div className="mt-6">

        {achievement.completed ? (
          <div className="flex items-center justify-center gap-2 rounded-xl bg-green-100 py-3 font-semibold text-green-700">
            <CheckCircle2 className="h-5 w-5" />
            Achievement Unlocked
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 rounded-xl bg-slate-100 py-3 font-semibold text-slate-600">
            <Lock className="h-5 w-5" />
            Keep Going
          </div>
        )}

      </div>

    </div>
  );
}