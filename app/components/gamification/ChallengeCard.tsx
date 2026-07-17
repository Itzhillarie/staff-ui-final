"use client";

import {
  Calendar,
  Trophy,
  Target,
  CheckCircle2,
  Clock,
  Coins,
  ArrowRight,
  Lock,
} from "lucide-react";

interface Challenge {
  id: number;
  title: string;
  description: string;
  category: string;
  startDate: string;
  endDate: string;
  rewardPoints: number;
  progress: number;
  target: number;
  completed: boolean;
  difficulty: "Easy" | "Medium" | "Hard";
}

interface ChallengeCardProps {
  challenge: Challenge;
  onView?: (challenge: Challenge) => void;
}

export default function ChallengeCard({
  challenge,
  onView,
}: ChallengeCardProps) {
  const percentage = Math.min(
    (challenge.progress / challenge.target) * 100,
    100
  );

  const difficultyColor = {
    Easy: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Hard: "bg-red-100 text-red-700",
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Header */}

      <div className="flex items-start justify-between border-b border-slate-100 bg-linear-to-r from-indigo-600 to-purple-600 p-6 text-white">

        <div>

          <h2 className="text-2xl font-bold">
            {challenge.title}
          </h2>

          <p className="mt-2 text-indigo-100">
            {challenge.category}
          </p>

        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${difficultyColor[challenge.difficulty]}`}
        >
          {challenge.difficulty}
        </span>

      </div>

      {/* Body */}

      <div className="space-y-6 p-6">

        <p className="leading-7 text-slate-600">
          {challenge.description}
        </p>

        {/* Dates */}

        <div className="grid gap-4 md:grid-cols-2">

          <div className="rounded-xl bg-slate-50 p-4">

            <div className="flex items-center gap-2">

              <Calendar
                size={18}
                className="text-blue-600"
              />

              <span className="text-sm text-slate-500">
                Start Date
              </span>

            </div>

            <p className="mt-2 font-semibold text-slate-800">
              {challenge.startDate}
            </p>

          </div>

          <div className="rounded-xl bg-slate-50 p-4">

            <div className="flex items-center gap-2">

              <Clock
                size={18}
                className="text-red-600"
              />

              <span className="text-sm text-slate-500">
                Deadline
              </span>

            </div>

            <p className="mt-2 font-semibold text-slate-800">
              {challenge.endDate}
            </p>

          </div>

        </div>

        {/* Progress */}

        <div>

          <div className="mb-2 flex items-center justify-between">

            <span className="font-medium text-slate-700">
              Progress
            </span>

            <span className="text-sm font-semibold text-indigo-600">
              {challenge.progress}/{challenge.target}
            </span>

          </div>

          <div className="h-3 overflow-hidden rounded-full bg-slate-200">

            <div
              className="h-full rounded-full bg-linear-to-r from-indigo-600 to-purple-600 transition-all duration-700"
              style={{
                width: `${percentage}%`,
              }}
            />

          </div>

        </div>

        {/* Reward */}

        <div className="grid gap-4 md:grid-cols-2">

          <div className="rounded-xl bg-slate-50 p-4">

            <div className="flex items-center gap-2">

              <Coins
                size={18}
                className="text-yellow-600"
              />

              <span className="text-sm text-slate-500">
                Reward
              </span>

            </div>

            <h3 className="mt-2 text-2xl font-bold text-indigo-600">
              +{challenge.rewardPoints}
            </h3>

          </div>

          <div className="rounded-xl bg-slate-50 p-4">

            <div className="flex items-center gap-2">

              <Target
                size={18}
                className="text-green-600"
              />

              <span className="text-sm text-slate-500">
                Goal
              </span>

            </div>

            <h3 className="mt-2 font-semibold text-slate-800">
              {challenge.target} Tasks
            </h3>

          </div>

        </div>

      </div>

      {/* Footer */}

      <div className="flex items-center justify-between border-t border-slate-100 p-6">

        {challenge.completed ? (

          <div className="flex items-center gap-2 text-green-600">

            <CheckCircle2 size={22} />

            <span className="font-semibold">
              Completed
            </span>

          </div>

        ) : percentage === 0 ? (

          <div className="flex items-center gap-2 text-slate-500">

            <Lock size={20} />

            <span>Not Started</span>

          </div>

        ) : (

          <div className="flex items-center gap-2 text-indigo-600">

            <Trophy size={20} />

            <span className="font-semibold">
              In Progress
            </span>

          </div>

        )}

        <button
          onClick={() => onView?.(challenge)}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-white transition hover:bg-indigo-700"
        >
          View Challenge

          <ArrowRight size={18} />
        </button>

      </div>

    </div>
  );
}