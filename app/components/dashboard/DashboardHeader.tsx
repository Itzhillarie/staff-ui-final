"use client";

import { CalendarDays, Sparkles } from "lucide-react";

interface DashboardData {
  users: {
    total_users: number;
    active_users: number;
  };
  ideas: {
    total: number;
    draft: number;
    submitted: number;
    peer_review: number;
    pm_review: number;
    approved: number;
    rejected: number;
    implementation: number;
    impact: number;
    archived: number;
  };
  projects: {
    total: number;
    completed: number;
    ongoing: number;
    overdue: number;
    average_progress: number;
  };
  tasks: {
    total: number;
    completed: number;
    pending: number;
    overdue: number;
  };
}

interface Props {
  dashboard: DashboardData;
  username?: string;
  role?: string;
}

export default function DashboardHeader({
  dashboard,
  username,
  role,
}: Props) {

  const formattedDate = new Date().toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  return (
    <section className="mb-4">
<div className="flex flex-col gap-4 rounded-3xl bg-linear-to-r from-cyan-500 via-emerald-500 to-green-700 p-5 text-white shadow-xl lg:flex-row lg:items-center lg:justify-between">        <div className="flex-1">

          <div className="mb-3 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-yellow-300" />

            <span className="rounded-full bg-white/20 px-4 py-1 text-sm font-medium">
              Welcome back, {username || "Innovator"}
            </span>
          </div>

          <h1 className="text-3xl font-bold">
            Innovation Dashboard
          </h1>

          <p className="mt-2 text-orange-100">
            Enterprise Innovation Management System
          </p>

          <p className="mt-2 text-sm">
            Role: <span className="font-semibold">{role}</span>
          </p>

        </div>

        <div className="w-full max-w-md rounded-2xl bg-green-400/80 p-4 backdrop-blur-md shadow-2xl">

          <div className="flex items-center gap-3">

            <CalendarDays className="h-6 w-6 text-cyan-300" />

            <div>
              <p className="text-sm text-blue/80">
                Today
              </p>

              <h3 className="font-semibold">
                {formattedDate}
              </h3>
            </div>

          </div>

          <div className="mt-4 border-t border-white/20 pt-4">

            <div className="grid grid-cols-3 gap-3">

              <div className="rounded-xl bg-white/10 p-3 text-center">
                <p className="text-xs uppercase text-white/80">
                  Ideas
                </p>
                <h2 className="text-2xl font-bold">
                  {dashboard.ideas.total}
                </h2>
              </div>

              <div className="rounded-xl bg-white/10 p-3 text-center">
                <p className="text-xs uppercase text-white/80">
                  Peer Review
                </p>
                <h2 className="text-2xl font-bold">
                  {dashboard.ideas.peer_review}
                </h2>
              </div>

              <div className="rounded-xl bg-white/10 p-3 text-center">
                <p className="text-xs uppercase text-white/80">
                  PM Review
                </p>
                <h2 className="text-2xl font-bold">
                  {dashboard.ideas.pm_review}
                </h2>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}