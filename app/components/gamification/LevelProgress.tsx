"use client";

import {
  CheckCircle2,
  Lock,
  Crown,
  ArrowRight,
} from "lucide-react";

interface Level {
  level: number;
  title: string;
  requiredXP: number;
  reward: string;
}

interface LevelProgressProps {
  currentXP: number;
}

export default function LevelProgress({
  currentXP,
}: LevelProgressProps) {
  const levels: Level[] = [
    {
      level: 1,
      title: "Innovator",
      requiredXP: 0,
      reward: "Innovation Badge",
    },
    {
      level: 2,
      title: "Creative Thinker",
      requiredXP: 500,
      reward: "Bronze Certificate",
    },
    {
      level: 3,
      title: "Problem Solver",
      requiredXP: 1200,
      reward: "Silver Badge",
    },
    {
      level: 4,
      title: "Innovation Expert",
      requiredXP: 2500,
      reward: "Innovation Trophy",
    },
    {
      level: 5,
      title: "Innovation Champion",
      requiredXP: 5000,
      reward: "Gold Medal",
    },
    {
      level: 6,
      title: "Visionary",
      requiredXP: 8000,
      reward: "Leadership Recognition",
    },
    {
      level: 7,
      title: "Innovation Master",
      requiredXP: 12000,
      reward: "Executive Award",
    },
    {
      level: 8,
      title: "Hall of Fame",
      requiredXP: 18000,
      reward: "Hall of Fame Trophy",
    },
  ];

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

      {/* Header */}

      <div className="mb-8">

        <h2 className="text-2xl font-bold text-slate-800">
          Innovation Level Journey
        </h2>

        <p className="mt-2 text-slate-500">
          Track your progress and unlock new rewards as you
          contribute to innovation.
        </p>

      </div>

      <div className="space-y-5">

        {levels.map((level, index) => {
          const completed = currentXP >= level.requiredXP;

          const current =
            completed &&
            (index === levels.length - 1 ||
              currentXP < levels[index + 1].requiredXP);

          return (
            <div
              key={level.level}
              className={`rounded-2xl border p-6 transition-all ${
                current
                  ? "border-indigo-500 bg-indigo-50"
                  : completed
                  ? "border-green-300 bg-green-50"
                  : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                <div className="flex items-center gap-5">

                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-full ${
                      current
                        ? "bg-indigo-600 text-white"
                        : completed
                        ? "bg-green-600 text-white"
                        : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    {completed ? (
                      <CheckCircle2 size={28} />
                    ) : (
                      <Lock size={24} />
                    )}
                  </div>

                  <div>

                    <div className="flex items-center gap-3">

                      <h3 className="text-xl font-bold text-slate-800">
                        Level {level.level}
                      </h3>

                      {current && (
                        <span className="rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">
                          CURRENT
                        </span>
                      )}

                    </div>

                    <p className="mt-2 text-lg font-medium text-slate-700">
                      {level.title}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Unlocks at {level.requiredXP.toLocaleString()} XP
                    </p>

                  </div>

                </div>

                <div className="flex items-center gap-4">

                  <div className="text-right">

                    <p className="text-sm text-slate-500">
                      Reward
                    </p>

                    <p className="font-semibold text-slate-800">
                      {level.reward}
                    </p>

                  </div>

                  <ArrowRight className="text-slate-400" />

                  <div className="rounded-xl bg-yellow-100 p-3">

                    <Crown
                      size={24}
                      className="text-yellow-600"
                    />

                  </div>

                </div>

              </div>
            </div>
          );
        })}

      </div>

      {/* Footer */}

      <div className="mt-8 rounded-2xl border border-indigo-200 bg-indigo-50 p-6">

        <h3 className="text-lg font-semibold text-indigo-700">
          Next Milestone
        </h3>

        <p className="mt-3 leading-7 text-slate-700">
          Continue submitting ideas, participating in peer
          reviews, completing implementation tasks, and helping
          colleagues to earn more experience points. Each new
          level unlocks exclusive badges, certificates, rewards,
          and organization-wide recognition.
        </p>

      </div>

    </div>
  );
}