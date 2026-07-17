"use client";

import {
  Crown,
  Trophy,
  Medal,
  Award,
  TrendingUp,
} from "lucide-react";

interface Leader {
  username: string;
  points: number;
}

interface LeaderboardProps {
  users: Leader[];
}

const icons = [Crown, Trophy, Medal, Award];

const colors = [
  "bg-yellow-500",
  "bg-gray-500",
  "bg-amber-700",
  "bg-blue-600",
  "bg-green-600",
  "bg-purple-600",
];

export default function Leaderboard({
  users = [],
}: LeaderboardProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="flex items-center justify-between border-b p-6">

        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            Innovation Leaderboard
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Top contributors across the organization
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-blue-700">
          <TrendingUp size={18} />
          Live Rankings
        </div>

      </div>

      <div className="divide-y">

        {users.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            No leaderboard data available.
          </div>
        ) : (

          users.map((leader, index) => {

            const Icon = icons[index] ?? Award;

            const initials = leader.username
              .split(" ")
              .map((n) => n[0])
              .join("")
              .substring(0, 2)
              .toUpperCase();

            return (

              <div
                key={leader.username}
                className="flex items-center justify-between p-5 hover:bg-slate-50 transition"
              >

                <div className="flex items-center gap-4">

                  <div className="w-8 font-bold text-slate-600">
                    #{index + 1}
                  </div>

                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-full text-white font-bold ${
                      colors[index % colors.length]
                    }`}
                  >
                    {initials}
                  </div>

                  <div>

                    <h3 className="font-semibold text-slate-800">
                      {leader.username}
                    </h3>

                    <p className="text-sm text-slate-500">
                      Innovation Participant
                    </p>

                  </div>

                </div>

                <div className="flex items-center gap-6">

                  <div className="text-center">

                    <p className="text-xs uppercase text-slate-400">
                      Points
                    </p>

                    <p className="text-lg font-bold text-blue-600">
                      {leader.points}
                    </p>

                  </div>

                  <div className="rounded-full bg-slate-100 p-3">

                    <Icon
                      size={20}
                      className="text-yellow-500"
                    />

                  </div>

                </div>

              </div>

            );

          })

        )}

      </div>

    </section>
  );
}