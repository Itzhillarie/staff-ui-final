"use client";

import {
  Crown,
  Medal,
  Trophy,
} from "lucide-react";

export interface LeaderboardUser {
  id: string;
  username: string;
  points: number;
  level: number;
  badges: number;
  rank: number;
}

interface LeaderboardTableProps {
  users: LeaderboardUser[];
}

export default function LeaderboardTable({
  users,
}: LeaderboardTableProps) {
  function getRankIcon(rank: number) {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2:
        return <Medal className="h-6 w-6 text-slate-400" />;
      case 3:
        return <Trophy className="h-6 w-6 text-orange-500" />;
      default:
        return (
          <span className="font-bold text-slate-700">
            #{rank}
          </span>
        );
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="border-b border-slate-200 p-6">

        <h2 className="text-2xl font-bold text-slate-800">
          Leaderboard
        </h2>

        <p className="mt-1 text-slate-500">
          Top innovators ranked by earned points.
        </p>

      </div>

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-slate-50">

            <tr>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                Rank
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                User
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-slate-600">
                Level
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-slate-600">
                Badges
              </th>

              <th className="px-6 py-4 text-right text-sm font-semibold text-slate-600">
                Points
              </th>

            </tr>

          </thead>

          <tbody>

            {users.length === 0 ? (

              <tr>

                <td
                  colSpan={5}
                  className="py-12 text-center text-slate-500"
                >
                  No leaderboard data available.
                </td>

              </tr>

            ) : (

              users.map((user) => (

                <tr
                  key={user.id}
                  className="border-t border-slate-100 transition hover:bg-slate-50"
                >

                  <td className="px-6 py-5">
                    {getRankIcon(user.rank)}
                  </td>

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-3">

                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-700">

                        {user.username.charAt(0).toUpperCase()}

                      </div>

                      <span className="font-semibold text-slate-800">
                        {user.username}
                      </span>

                    </div>

                  </td>

                  <td className="px-6 py-5 text-center">

                    <span className="rounded-full bg-purple-100 px-3 py-1 text-sm font-semibold text-purple-700">
                      Lv {user.level}
                    </span>

                  </td>

                  <td className="px-6 py-5 text-center">

                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                      {user.badges}
                    </span>

                  </td>

                  <td className="px-6 py-5 text-right">

                    <span className="rounded-full bg-yellow-100 px-4 py-2 font-bold text-yellow-700">
                      {user.points.toLocaleString()} pts
                    </span>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}