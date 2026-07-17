"use client";

import {
  Trophy,
  Lock,
  CheckCircle2,
  Calendar,
  Gift,
  Target,
  Star,
} from "lucide-react";

interface Achievement {
  id: number;
  title: string;
  description: string;
  category: string;
  reward: string;
  progress: number;
  target: number;
  points: number;
  unlocked: boolean;
  unlockedDate?: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Legendary";
}

interface AchievementCardProps {
  achievement: Achievement;
}

export default function AchievementCard({
  achievement,
}: AchievementCardProps) {
  const percentage = Math.min(
    (achievement.progress / achievement.target) * 100,
    100
  );

  const difficultyColor = {
    Easy: "bg-green-100 text-green-700",
    Medium: "bg-blue-100 text-blue-700",
    Hard: "bg-orange-100 text-orange-700",
    Legendary: "bg-purple-100 text-purple-700",
  };

  return (
    <div
      className={`rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        achievement.unlocked
          ? "border-green-300"
          : "border-slate-200"
      }`}
    >
      {/* Header */}

      <div className="flex items-start justify-between border-b border-slate-100 p-6">
        <div className="flex items-center gap-4">
          <div
            className={`rounded-2xl p-4 ${
              achievement.unlocked
                ? "bg-green-100"
                : "bg-slate-100"
            }`}
          >
            {achievement.unlocked ? (
              <Trophy
                size={30}
                className="text-yellow-500"
              />
            ) : (
              <Lock
                size={30}
                className="text-slate-500"
              />
            )}
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-800">
              {achievement.title}
            </h2>

            <p className="mt-1 text-slate-500">
              {achievement.category}
            </p>
          </div>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            difficultyColor[achievement.difficulty]
          }`}
        >
          {achievement.difficulty}
        </span>
      </div>

      {/* Description */}

      <div className="p-6">
        <p className="leading-7 text-slate-600">
          {achievement.description}
        </p>

        {/* Progress */}

        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium text-slate-600">
              Progress
            </span>

            <span className="text-sm font-semibold text-indigo-600">
              {achievement.progress}/{achievement.target}
            </span>
          </div>

          <div className="h-3 rounded-full bg-slate-200">
            <div
              className="h-3 rounded-full bg-linear-to-r from-indigo-600 to-purple-600 transition-all duration-700"
              style={{
                width: `${percentage}%`,
              }}
            />
          </div>
        </div>

        {/* Stats */}

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="flex items-center gap-2">
              <Gift
                size={18}
                className="text-green-600"
              />

              <span className="text-sm text-slate-500">
                Reward
              </span>
            </div>

            <p className="mt-2 font-semibold text-slate-800">
              {achievement.reward}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <div className="flex items-center gap-2">
              <Star
                size={18}
                className="text-yellow-600"
              />

              <span className="text-sm text-slate-500">
                Points
              </span>
            </div>

            <p className="mt-2 text-xl font-bold text-indigo-600">
              +{achievement.points}
            </p>
          </div>
        </div>

        {/* Footer */}

        <div className="mt-6 flex items-center justify-between border-t pt-5">
          {achievement.unlocked ? (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle2 size={20} />
              <span className="font-medium">
                Unlocked
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-slate-500">
              <Target size={20} />
              <span>In Progress</span>
            </div>
          )}

          {achievement.unlockedDate && (
            <div className="flex items-center gap-2 text-slate-500">
              <Calendar size={18} />
              <span className="text-sm">
                {achievement.unlockedDate}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}