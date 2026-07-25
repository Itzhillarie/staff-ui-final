"use client";

import { useEffect, useState } from "react";
import { Trophy, Medal, Crown, Loader2 } from "lucide-react";
import { getLeaderboard, LeaderboardUser } from "@/app/lib/gamification";

export default function LeaderboardPage() {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const data = await getLeaderboard();
        setUsers(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Leaderboard Error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadLeaderboard();
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

      <div className="rounded-3xl bg-linear-to-r from-yellow-500 via-orange-500 to-red-500 p-8 text-white shadow-xl">

        <div className="flex items-center gap-4">

          <Trophy className="h-12 w-12" />

          <div>

            <h1 className="text-4xl font-bold">
              Leaderboard
            </h1>

            <p className="mt-2 text-orange-100">
              Top innovators across the organization.
            </p>

          </div>

        </div>

      </div>

      {/* Top 3 */}

      {users.length >= 3 && (

        <div className="grid gap-6 md:grid-cols-3">

          {/* Second */}

          <div className="rounded-2xl border bg-white p-8 text-center shadow">

            <Medal className="mx-auto mb-4 h-12 w-12 text-slate-400" />

            <h2 className="text-2xl font-bold">
              {users[1].username}
            </h2>

            <p className="mt-2 text-slate-500">
              #{users[1].rank}
            </p>

            <p className="mt-4 text-4xl font-bold text-slate-700">
              {users[1].points}
            </p>

          </div>

          {/* First */}

          <div className="rounded-2xl border-2 border-yellow-400 bg-yellow-50 p-10 text-center shadow-lg">

            <Crown className="mx-auto mb-4 h-14 w-14 text-yellow-500" />

            <h2 className="text-3xl font-bold">
              {users[0].username}
            </h2>

            <p className="mt-2">
              🥇 Rank #{users[0].rank}
            </p>

            <p className="mt-5 text-5xl font-bold text-yellow-600">
              {users[0].points}
            </p>

          </div>

          {/* Third */}

          <div className="rounded-2xl border bg-white p-8 text-center shadow">

            <Medal className="mx-auto mb-4 h-12 w-12 text-orange-500" />

            <h2 className="text-2xl font-bold">
              {users[2].username}
            </h2>

            <p className="mt-2 text-slate-500">
              #{users[2].rank}
            </p>

            <p className="mt-4 text-4xl font-bold text-orange-600">
              {users[2].points}
            </p>

          </div>

        </div>

      )}

      {/* Full Leaderboard */}

      <div className="overflow-hidden rounded-2xl border bg-white shadow">

        <div className="border-b p-6">

          <h2 className="text-2xl font-bold">
            Full Rankings
          </h2>

        </div>

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="px-6 py-4 text-left">
                Rank
              </th>

              <th className="px-6 py-4 text-left">
                User
              </th>

              <th className="px-6 py-4 text-right">
                Points
              </th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr
                key={user.id}
                className="border-t hover:bg-slate-50"
              >

                <td className="px-6 py-5 font-bold">

                  {user.rank === 1 && "🥇"}
                  {user.rank === 2 && "🥈"}
                  {user.rank === 3 && "🥉"}

                  {user.rank > 3 && `#${user.rank}`}

                </td>

                <td className="px-6 py-5 font-medium">
                  {user.username}
                </td>

                <td className="px-6 py-5 text-right font-bold text-indigo-700">
                  {user.points}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}