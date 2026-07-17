"use client";

import {
  Crown,
  Trophy,
  Star,
  Medal,
  Lightbulb,
  CheckCircle2,
  Calendar,
  Sparkles,
} from "lucide-react";

interface MonthlyWinnerProps {
  winner: {
    id: number;
    name: string;
    department: string;
    avatar?: string;
    level: string;
    totalPoints: number;
    ideasSubmitted: number;
    projectsCompleted: number;
    badges: number;
    month: string;
    achievement: string;
  };
}

export default function MonthlyWinner({
  winner,
}: MonthlyWinnerProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-yellow-200 bg-white shadow-lg">

      {/* Hero Section */}

      <div className="relative bg-linear-to-r from-yellow-500 via-amber-500 to-orange-500 p-10 text-white">

        <div className="absolute right-6 top-6 opacity-20">
          <Sparkles size={120} />
        </div>

        <div className="relative flex flex-col items-center gap-6 text-center lg:flex-row lg:text-left">

          {/* Avatar */}

          <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-white text-5xl font-bold text-amber-600 shadow-xl">
            {winner.avatar
              ? (
                <img
                  src={winner.avatar}
                  alt={winner.name}
                  className="h-full w-full rounded-full object-cover"
                />
              )
              : winner.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .substring(0, 2)}
          </div>

          {/* Details */}

          <div className="flex-1">

            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-5 py-2 backdrop-blur">

              <Crown size={20} />

              <span className="font-semibold">
                Employee of the Month
              </span>

            </div>

            <h1 className="mt-5 text-4xl font-bold">
              {winner.name}
            </h1>

            <p className="mt-2 text-lg text-yellow-100">
              {winner.department}
            </p>

            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2">

              <Star size={18} />

              <span>{winner.level}</span>

            </div>

          </div>

          {/* Trophy */}

          <div className="hidden lg:block">

            <Trophy
              size={120}
              className="text-yellow-200"
            />

          </div>

        </div>

      </div>

      {/* Achievement */}

      <div className="border-b border-slate-200 p-8">

        <div className="flex items-center gap-3">

          <Medal
            size={28}
            className="text-yellow-600"
          />

          <h2 className="text-2xl font-bold text-slate-800">
            Outstanding Achievement
          </h2>

        </div>

        <p className="mt-4 leading-7 text-slate-600">
          {winner.achievement}
        </p>

      </div>

      {/* Statistics */}

      <div className="grid gap-6 p-8 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl bg-slate-50 p-6 text-center">

          <Trophy
            className="mx-auto text-yellow-600"
            size={30}
          />

          <h3 className="mt-3 text-3xl font-bold text-indigo-600">
            {winner.totalPoints.toLocaleString()}
          </h3>

          <p className="mt-1 text-slate-500">
            Total Points
          </p>

        </div>

        <div className="rounded-2xl bg-slate-50 p-6 text-center">

          <Lightbulb
            className="mx-auto text-yellow-500"
            size={30}
          />

          <h3 className="mt-3 text-3xl font-bold">
            {winner.ideasSubmitted}
          </h3>

          <p className="mt-1 text-slate-500">
            Ideas Submitted
          </p>

        </div>

        <div className="rounded-2xl bg-slate-50 p-6 text-center">

          <CheckCircle2
            className="mx-auto text-green-600"
            size={30}
          />

          <h3 className="mt-3 text-3xl font-bold">
            {winner.projectsCompleted}
          </h3>

          <p className="mt-1 text-slate-500">
            Projects Completed
          </p>

        </div>

        <div className="rounded-2xl bg-slate-50 p-6 text-center">

          <Medal
            className="mx-auto text-purple-600"
            size={30}
          />

          <h3 className="mt-3 text-3xl font-bold">
            {winner.badges}
          </h3>

          <p className="mt-1 text-slate-500">
            Badges Earned
          </p>

        </div>

      </div>

      {/* Footer */}

      <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 bg-slate-50 p-6 lg:flex-row">

        <div className="flex items-center gap-3">

          <Calendar
            size={20}
            className="text-indigo-600"
          />

          <span className="font-medium text-slate-700">
            Winner for {winner.month}
          </span>

        </div>

        <div className="rounded-full bg-yellow-100 px-5 py-2 font-semibold text-yellow-700">
          🏆 Hall of Innovation
        </div>

      </div>

    </div>
  );
}