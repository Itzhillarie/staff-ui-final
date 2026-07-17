"use client";

import { X, Trophy, Target, Star, Calendar, CheckCircle, Lock } from "lucide-react";

export interface Achievement {
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

interface AchievementDialogProps {
  open: boolean;
  achievement: Achievement | null;
  onClose: () => void;
}

export default function AchievementDialog({
  open,
  achievement,
  onClose,
}: AchievementDialogProps) {
  if (!open || !achievement) return null;

  const progress = Math.min(
    Math.round((achievement.progress / achievement.target) * 100),
    100
  );

  const difficultyColor = {
    Easy: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Hard: "bg-orange-100 text-orange-700",
    Legendary: "bg-purple-100 text-purple-700",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
      <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-200 p-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              Achievement Details
            </h2>

            <p className="text-slate-500">
              View your achievement progress.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 transition hover:bg-slate-100"
          >
            <X size={22} />
          </button>
        </div>

        {/* Content */}

        <div className="space-y-6 p-6">

          <div className="flex items-start gap-4">

            <div className="rounded-full bg-indigo-100 p-4">
              <Trophy className="text-indigo-600" size={32} />
            </div>

            <div className="flex-1">

              <div className="flex items-center gap-3">

                <h3 className="text-2xl font-bold">
                  {achievement.title}
                </h3>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    difficultyColor[achievement.difficulty]
                  }`}
                >
                  {achievement.difficulty}
                </span>

              </div>

              <p className="mt-3 text-slate-600">
                {achievement.description}
              </p>

            </div>

          </div>

          {/* Information */}

          <div className="grid gap-4 md:grid-cols-2">

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">
                Category
              </p>

              <p className="font-semibold">
                {achievement.category}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">
                Reward
              </p>

              <p className="font-semibold">
                {achievement.reward}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <div className="flex items-center gap-2">
                <Star
                  size={18}
                  className="text-yellow-500"
                />

                <span className="text-sm text-slate-500">
                  Points
                </span>
              </div>

              <p className="mt-2 text-xl font-bold">
                {achievement.points}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">

              {achievement.unlocked ? (
                <div>

                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle size={18} />
                    <span className="font-semibold">
                      Unlocked
                    </span>
                  </div>

                  {achievement.unlockedDate && (
                    <div className="mt-2 flex items-center gap-2 text-slate-500">
                      <Calendar size={16} />
                      {achievement.unlockedDate}
                    </div>
                  )}

                </div>
              ) : (
                <div className="flex items-center gap-2 text-red-600">
                  <Lock size={18} />
                  Locked
                </div>
              )}

            </div>

          </div>

          {/* Progress */}

          <div>

            <div className="mb-2 flex items-center justify-between">

              <div className="flex items-center gap-2">
                <Target
                  size={18}
                  className="text-indigo-600"
                />

                <span className="font-semibold">
                  Progress
                </span>
              </div>

              <span className="font-bold">
                {achievement.progress} / {achievement.target}
              </span>

            </div>

            <div className="h-4 overflow-hidden rounded-full bg-slate-200">

              <div
                className="h-full rounded-full bg-indigo-600 transition-all"
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>

            <p className="mt-2 text-right text-sm text-slate-500">
              {progress}% Completed
            </p>

          </div>

        </div>

        {/* Footer */}

        <div className="flex justify-end border-t border-slate-200 p-6">

          <button
            onClick={onClose}
            className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            Close
          </button>

        </div>

      </div>
    </div>
  );
}