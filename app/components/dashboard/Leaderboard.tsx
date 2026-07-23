"use client";

import { useEffect, useState } from "react";
import {
  Crown,
  Trophy,
  Medal,
  Award,
  TrendingUp,
  Loader2,
} from "lucide-react";

import { getDashboardData } from "@/app/lib/dashboard";

interface Leader {
  id: string;
  rank: number;
  username: string;
  points: number;
  ideas: number;
  approved_ideas: number;
  badge: string;
}

const icons = [
  Crown,
  Trophy,
  Medal,
  Award,
];

const colors = [
  "bg-yellow-500",
  "bg-gray-500",
  "bg-amber-700",
  "bg-blue-600",
  "bg-green-600",
  "bg-purple-600",
];

export default function Leaderboard() {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const dashboard = await getDashboardData();

        const leaderboard =
          dashboard.charts.leaderboard.map(
            (user, index) => ({
              id: String(index + 1),
              rank: index + 1,
              username: user.username,
              points: user.points,
              ideas: 0,
              approved_ideas: 0,
              badge:
                index === 0
                  ? "Champion"
                  : index === 1
                  ? "Runner Up"
                  : index === 2
                  ? "Top Innovator"
                  : "Contributor",
            })
          );

        setLeaders(leaderboard);
      } catch (error) {
        console.error("Leaderboard Error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLeaderboard();
  }, []);

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

          <span>Live Rankings</span>

        </div>

      </div>

      {loading ? (

        <div className="flex items-center justify-center py-12">

          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />

        </div>

      ) : leaders.length === 0 ? (

        <div className="p-10 text-center text-slate-500">
          No leaderboard data available.
        </div>

      ) : (

        <div className="divide-y">

          {leaders.map((leader, index) => {

            const Icon = icons[index] ?? Award;

            const initials = leader.username
              .split(" ")
              .map((word) => word.charAt(0))
              .join("")
              .substring(0, 2)
              .toUpperCase();

            return (

              <div
                key={leader.id}
                className="flex items-center justify-between p-5 transition hover:bg-slate-50"
              >

                <div className="flex items-center gap-4">

                  <div className="w-8 text-lg font-bold text-slate-600">

                    #{leader.rank}

                  </div>

                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-full font-bold text-white ${
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

                      {leader.badge}

                    </p>

                  </div>

                </div>

                <div className="flex items-center gap-10">

                  <div className="text-center">

                    <p className="text-xs uppercase text-slate-400">
                      Ideas
                    </p>

                    <p className="font-semibold">
                      {leader.ideas}
                    </p>

                  </div>

                  <div className="text-center">

                    <p className="text-xs uppercase text-slate-400">
                      Approved
                    </p>

                    <p className="font-semibold text-green-600">
                      {leader.approved_ideas}
                    </p>

                  </div>

                  <div className="text-center">

                    <p className="text-xs uppercase text-slate-400">
                      Points
                    </p>

                    <p className="text-lg font-bold text-blue-600">
                      {leader.points}
                    </p>

                  </div>

                  <div className="flex items-center gap-2 rounded-full bg-slate-100 px-4 py-2">

                    <Icon
                      size={18}
                      className="text-yellow-500"
                    />

                    <span className="text-sm font-medium">
                      {leader.badge}
                    </span>

                  </div>

                </div>

              </div>

            );
          })}

        </div>

      )}

    </section>
  );
}