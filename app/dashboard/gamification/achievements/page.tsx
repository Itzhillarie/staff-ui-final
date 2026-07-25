"use client";

import { useEffect, useState } from "react";
import {
  Trophy,
  Target,
  CheckCircle2,
  Loader2,
  Lock,
} from "lucide-react";

import {
  Achievement,
  getAchievements,
} from "@/app/lib/gamification";

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAchievements() {
      try {
        const data = await getAchievements();
        setAchievements(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Achievements Error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadAchievements();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="rounded-3xl bg-linear-to-r from-indigo-700 via-purple-700 to-pink-700 p-8 text-white shadow-xl">

        <div className="flex items-center gap-4">

          <Trophy className="h-12 w-12 text-yellow-300" />

          <div>

            <h1 className="text-4xl font-bold">
              Achievements
            </h1>

            <p className="mt-2 text-purple-100">
              Complete milestones to become a top innovator.
            </p>

          </div>

        </div>

      </div>

      {/* Stats */}

      <div className="grid gap-6 md:grid-cols-3">

        <div className="rounded-2xl bg-white p-6 shadow">

          <p className="text-sm text-slate-500">
            Total Achievements
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            {achievements.length}
          </h2>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow">

          <p className="text-sm text-slate-500">
            Completed
          </p>

          <h2 className="mt-2 text-4xl font-bold text-green-600">
            {achievements.filter((a) => a.completed).length}
          </h2>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow">

          <p className="text-sm text-slate-500">
            In Progress
          </p>

          <h2 className="mt-2 text-4xl font-bold text-indigo-600">
            {achievements.filter((a) => !a.completed).length}
          </h2>

        </div>

      </div>

      {/* Achievement Cards */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {achievements.map((achievement) => {

          const progress =
            achievement.target > 0
              ? Math.min(
                  (achievement.progress /
                    achievement.target) *
                    100,
                  100
                )
              : 0;

          return (
            <div
              key={achievement.id}
              className="rounded-2xl border bg-white p-6 shadow transition hover:shadow-lg"
            >
              <div className="mb-5 flex items-center justify-between">

                {achievement.completed ? (
                  <CheckCircle2 className="h-12 w-12 text-green-600" />
                ) : (
                  <Lock className="h-12 w-12 text-slate-400" />
                )}

                <Target className="h-8 w-8 text-indigo-600" />

              </div>

              <h2 className="text-2xl font-bold">
                {achievement.title}
              </h2>

              <p className="mt-3 text-slate-500">
                {achievement.description}
              </p>

              <div className="mt-6">

                <div className="mb-2 flex justify-between text-sm">

                  <span>Progress</span>

                  <span>
                    {achievement.progress} / {achievement.target}
                  </span>

                </div>

                <div className="h-3 overflow-hidden rounded-full bg-slate-200">

                  <div
                    className={`h-full rounded-full ${
                      achievement.completed
                        ? "bg-green-500"
                        : "bg-indigo-600"
                    }`}
                    style={{
                      width: `${progress}%`,
                    }}
                  />

                </div>

              </div>

              <div className="mt-6">

                {achievement.completed ? (
                  <div className="rounded-full bg-green-100 py-2 text-center font-semibold text-green-700">
                    ✓ Completed
                  </div>
                ) : (
                  <div className="rounded-full bg-indigo-100 py-2 text-center font-semibold text-indigo-700">
                    In Progress
                  </div>
                )}

              </div>

            </div>
          );
        })}

      </div>

      {achievements.length === 0 && (
        <div className="rounded-2xl bg-white p-12 text-center shadow">

          <Trophy className="mx-auto mb-5 h-16 w-16 text-slate-300" />

          <h2 className="text-2xl font-bold">
            No Achievements Found
          </h2>

          <p className="mt-3 text-slate-500">
            Your achievements will appear here as you use the platform.
          </p>

        </div>
      )}

    </div>
  );
}