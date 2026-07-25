"use client";

import Link from "next/link";
import { Crown, Medal, Trophy, ArrowRight } from "lucide-react";

interface LeaderboardUser {
  id: string;
  username: string;
  rank: number;
  points: number;
}

interface LeaderboardPreviewProps {
  users: LeaderboardUser[];
}

export default function LeaderboardPreview({
  users,
}: LeaderboardPreviewProps) {
  const topUsers = users.slice(0, 5);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="flex items-center justify-between border-b border-slate-200 p-6">

        <div>

          <h2 className="text-2xl font-bold text-slate-800">
            Top Innovators
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Top 5 users by innovation points.
          </p>

        </div>

        <Link
          href="/dashboard/gamification/leaderboard"
          className="flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-800"
        >
          View All
          <ArrowRight className="h-4 w-4" />
        </Link>

      </div>

      <div className="divide-y divide-slate-100">

        {topUsers.length === 0 ? (
          <div className="p-10 text-center text-slate-500">
            No leaderboard data available.
          </div>
        ) : (
          topUsers.map((user) => (
            <div
              key={user.id}
              className="flex items-center justify-between p-5 transition hover:bg-slate-50"
            >
              <div className="flex items-center gap-4">

                <div>

                  {user.rank === 1 ? (
                    <Crown className="h-7 w-7 text-yellow-500" />
                  ) : user.rank === 2 ? (
                    <Medal className="h-7 w-7 text-slate-400" />
                  ) : user.rank === 3 ? (
                    <Trophy className="h-7 w-7 text-orange-500" />
                  ) : (
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-200 text-sm font-bold">
                      {user.rank}
                    </div>
                  )}

                </div>

                <div>

                  <h3 className="font-semibold text-slate-800">
                    {user.username}
                  </h3>

                  <p className="text-sm text-slate-500">
                    Rank #{user.rank}
                  </p>

                </div>

              </div>

              <div className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-bold text-indigo-700">
                {user.points.toLocaleString()} pts
              </div>

            </div>
          ))
        )}

      </div>

    </div>
  );
}