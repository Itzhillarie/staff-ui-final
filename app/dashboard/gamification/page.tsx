"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Trophy,
  Medal,
  Award,
  Star,
  Gift,
  TrendingUp,
  Loader2,
  ArrowRight,
} from "lucide-react";

import {
  getGamificationDashboard,
  GamificationDashboard,
} from "@/app/lib/gamification";

export default function GamificationPage() {
  const [dashboard, setDashboard] =
    useState<GamificationDashboard | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await getGamificationDashboard();
        setDashboard(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="p-10 text-center text-red-500">
        Unable to load gamification data.
      </div>
    );
  }

  return (
    <div className="space-y-8 p-8">

      {/* Header */}

      <div className="rounded-3xl bg-linear-to-r from-violet-700 via-purple-700 to-indigo-700 p-8 text-white shadow-xl">

        <h1 className="flex items-center gap-3 text-4xl font-bold">
          <Trophy className="h-10 w-10 text-yellow-300" />
          Gamification
        </h1>

        <p className="mt-3 text-purple-100">
          Track your innovation journey, achievements and leaderboard ranking.
        </p>

      </div>

      {/* Stats */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

          <Star className="mb-4 h-8 w-8 text-yellow-500" />

          <p className="text-sm text-slate-500">
            Total Points
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            {dashboard.total_points}
          </h2>

        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

          <Medal className="mb-4 h-8 w-8 text-blue-600" />

          <p className="text-sm text-slate-500">
            Current Rank
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            #{dashboard.rank}
          </h2>

        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

          <Award className="mb-4 h-8 w-8 text-green-600" />

          <p className="text-sm text-slate-500">
            Badges Earned
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            {dashboard.badges_count}
          </h2>

        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">

          <TrendingUp className="mb-4 h-8 w-8 text-purple-600" />

          <p className="text-sm text-slate-500">
            Level
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            {dashboard.level}
          </h2>

        </div>

      </div>

      {/* Level Progress */}

      <div className="rounded-2xl border bg-white p-8 shadow-sm">

        <div className="mb-5 flex items-center justify-between">

          <h2 className="text-2xl font-bold">
            Level Progress
          </h2>

          <span className="rounded-full bg-violet-100 px-4 py-2 text-sm font-semibold text-violet-700">
            Level {dashboard.level}
          </span>

        </div>

        <div className="h-4 overflow-hidden rounded-full bg-slate-200">

          <div
            className="h-full rounded-full bg-linear-to-r from-violet-600 to-indigo-600"
            style={{
              width: `${Math.min(
                (dashboard.total_points /
                  dashboard.next_level_points) *
                  100,
                100
              )}%`,
            }}
          />

        </div>

        <p className="mt-3 text-sm text-slate-500">
          {dashboard.total_points} / {dashboard.next_level_points} XP
        </p>

      </div>

      <div className="grid gap-8 xl:grid-cols-2">

        {/* Recent Points */}

        <div className="rounded-2xl border bg-white shadow-sm">

          <div className="border-b p-6">

            <h2 className="text-xl font-bold">
              Recent Points
            </h2>

          </div>

          <div className="divide-y">

            {dashboard.recent_points.length === 0 ? (

              <div className="p-8 text-center text-slate-500">
                No point history available.
              </div>

            ) : (

              dashboard.recent_points.slice(0, 6).map((item) => (

                <div
                  key={item.id}
                  className="flex items-center justify-between p-5"
                >
                  <div>

                    <p className="font-medium">
                      {item.action}
                    </p>

                    <p className="text-sm text-slate-500">
                      {new Date(item.created_at).toLocaleString()}
                    </p>

                  </div>

                  <span className="rounded-full bg-green-100 px-3 py-1 font-bold text-green-700">
                    +{item.points}
                  </span>

                </div>

              ))

            )}

          </div>

        </div>

        {/* Leaderboard */}

        <div className="rounded-2xl border bg-white shadow-sm">

          <div className="flex items-center justify-between border-b p-6">

            <h2 className="text-xl font-bold">
              Leaderboard
            </h2>

            <Link
              href="/dashboard/gamifications/leaderboard"
              className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              View All
              <ArrowRight size={16} />
            </Link>

          </div>

          <div className="divide-y">

            {dashboard.leaderboard.slice(0, 5).map((user) => (

              <div
                key={user.id}
                className="flex items-center justify-between p-5"
              >
                <div>

                  <p className="font-semibold">
                    #{user.rank} {user.username}
                  </p>

                </div>

                <span className="font-bold text-yellow-600">
                  {user.points} pts
                </span>

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* Quick Navigation */}

      <div className="grid gap-6 md:grid-cols-3">

        <Link
          href="/dashboard/gamifications/badges"
          className="rounded-2xl border bg-white p-8 shadow-sm transition hover:shadow-lg"
        >
          <Award className="mb-5 h-10 w-10 text-green-600" />

          <h3 className="text-2xl font-bold">
            Badges
          </h3>

          <p className="mt-2 text-slate-500">
            View all earned badges.
          </p>

        </Link>

        <Link
          href="/dashboard/gamifications/achivements"
          className="rounded-2xl border bg-white p-8 shadow-sm transition hover:shadow-lg"
        >
          <Trophy className="mb-5 h-10 w-10 text-yellow-500" />

          <h3 className="text-2xl font-bold">
            Achievements
          </h3>

          <p className="mt-2 text-slate-500">
            Track your achievement progress.
          </p>

        </Link>

        <Link
          href="/dashboard/gamifications/rewards"
          className="rounded-2xl border bg-white p-8 shadow-sm transition hover:shadow-lg"
        >
          <Gift className="mb-5 h-10 w-10 text-purple-600" />

          <h3 className="text-2xl font-bold">
            Rewards
          </h3>

          <p className="mt-2 text-slate-500">
            Redeem available rewards.
          </p>

        </Link>

      </div>

    </div>
  );
}