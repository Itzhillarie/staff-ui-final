"use client";

import LeaderboardCard from "../../../components/gamification/LeaderboardCard";
import { Crown, Trophy, Medal, Users } from "lucide-react";

const leaderboard: {
  id: number;
  rank: number;
  name: string;
  department: string;
  level: string;
  points: number;
  badges: number;
  ideas: number;
  completedProjects: number;
  trend: "down" | "same" | "up";
}[] = [
  {
    id: 1,
    rank: 1,
    name: "Hillary Chelimo",
    department: "ICT Department",
    level: "Innovation Champion",
    points: 8450,
    badges: 18,
    ideas: 26,
    completedProjects: 14,
    trend: "up",
  },
  {
    id: 2,
    rank: 2,
    name: "Sarah Wanjiku",
    department: "Finance",
    level: "Innovation Expert",
    points: 7920,
    badges: 16,
    ideas: 22,
    completedProjects: 11,
    trend: "same",
  },
  {
    id: 3,
    rank: 3,
    name: "David Kiptoo",
    department: "Operations",
    level: "Senior Innovator",
    points: 7350,
    badges: 15,
    ideas: 20,
    completedProjects: 9,
    trend: "down",
  },
  {
    id: 4,
    rank: 4,
    name: "Grace Achieng",
    department: "Human Resource",
    level: "Innovator",
    points: 6890,
    badges: 13,
    ideas: 18,
    completedProjects: 8,
    trend: "same",
  },
];

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">

      {/* Header */}

      <div className="mb-8 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">

        <div>

          <h1 className="text-4xl font-bold text-slate-800">
            Innovation Leaderboard
          </h1>

          <p className="mt-2 text-slate-500">
            Recognizing employees making the greatest impact through innovation.
          </p>

        </div>

      </div>

      {/* Statistics */}

      <div className="mb-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <Crown className="mb-3 text-yellow-500" size={34} />

          <h2 className="text-3xl font-bold">
            #1
          </h2>

          <p className="mt-2 text-slate-500">
            Current Champion
          </p>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <Users className="mb-3 text-blue-600" size={34} />

          <h2 className="text-3xl font-bold">
            247
          </h2>

          <p className="mt-2 text-slate-500">
            Active Innovators
          </p>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <Trophy className="mb-3 text-green-600" size={34} />

          <h2 className="text-3xl font-bold">
            1,482
          </h2>

          <p className="mt-2 text-slate-500">
            Ideas Submitted
          </p>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <Medal className="mb-3 text-purple-600" size={34} />

          <h2 className="text-3xl font-bold">
            395
          </h2>

          <p className="mt-2 text-slate-500">
            Badges Awarded
          </p>

        </div>

      </div>

      {/* Filters */}

      <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">

        <div className="grid gap-5 md:grid-cols-3">

          <select className="rounded-xl border border-slate-300 px-4 py-3 focus:border-indigo-500 focus:outline-none">

            <option>All Departments</option>

            <option>ICT</option>

            <option>Finance</option>

            <option>Human Resource</option>

            <option>Operations</option>

          </select>

          <select className="rounded-xl border border-slate-300 px-4 py-3 focus:border-indigo-500 focus:outline-none">

            <option>This Month</option>

            <option>This Quarter</option>

            <option>This Year</option>

            <option>All Time</option>

          </select>

          <input
            type="text"
            placeholder="Search employee..."
            className="rounded-xl border border-slate-300 px-4 py-3 focus:border-indigo-500 focus:outline-none"
          />

        </div>

      </div>

      {/* Top Three */}

      <div className="mb-10 grid gap-6 lg:grid-cols-3">

        {leaderboard.slice(0, 3).map((employee) => (
          <LeaderboardCard
            key={employee.id}
            user={employee}
          />
        ))}

      </div>

      {/* Full Rankings */}

      <div className="rounded-2xl bg-white shadow-sm">

        <div className="border-b p-6">

          <h2 className="text-2xl font-bold text-slate-800">
            Overall Rankings
          </h2>

        </div>

        <div className="divide-y">

          {leaderboard.map((employee) => (

            <div
              key={employee.id}
              className="flex flex-col gap-4 p-6 transition hover:bg-slate-50 lg:flex-row lg:items-center lg:justify-between"
            >

              <div className="flex items-center gap-5">

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 font-bold text-indigo-700">
                  #{employee.rank}
                </div>

                <div>

                  <h3 className="text-lg font-semibold">
                    {employee.name}
                  </h3>

                  <p className="text-slate-500">
                    {employee.department}
                  </p>

                </div>

              </div>

              <div className="flex flex-wrap gap-8">

                <div>

                  <p className="text-xs uppercase text-slate-400">
                    Level
                  </p>

                  <p className="font-semibold">
                    {employee.level}
                  </p>

                </div>

                <div>

                  <p className="text-xs uppercase text-slate-400">
                    Points
                  </p>

                  <p className="font-bold text-indigo-600">
                    {employee.points.toLocaleString()}
                  </p>

                </div>

                <div>

                  <p className="text-xs uppercase text-slate-400">
                    Ideas
                  </p>

                  <p className="font-semibold">
                    {employee.ideas}
                  </p>

                </div>

                <div>

                  <p className="text-xs uppercase text-slate-400">
                    Badges
                  </p>

                  <p className="font-semibold">
                    {employee.badges}
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}