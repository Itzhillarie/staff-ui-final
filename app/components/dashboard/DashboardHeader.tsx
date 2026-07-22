"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Sparkles, Loader2 } from "lucide-react";
import { apiFetch } from "@/app/utils/apiFetch";

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

const initialState: DashboardData = {
  users: {
    total_users: 0,
    active_users: 0,
  },

  ideas: {
    total: 0,
    draft: 0,
    submitted: 0,
    peer_review: 0,
    pm_review: 0,
    approved: 0,
    rejected: 0,
    implementation: 0,
    impact: 0,
    archived: 0,
  },

  projects: {
    total: 0,
    completed: 0,
    ongoing: 0,
    overdue: 0,
    average_progress: 0,
  },

  tasks: {
    total: 0,
    completed: 0,
    pending: 0,
    overdue: 0,
  },
};

export default function DashboardHeader() {
  const [dashboard, setDashboard] =
    useState<DashboardData>(initialState);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);

        const data = await apiFetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/dashboard/`,
          {
            method: "GET",
          }
        );

        console.log("Dashboard Response:", data);

        setDashboard(data);

        setError("");
      } catch (err) {
        console.error(err);
        setError("Unable to load dashboard.");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

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
    <section className="mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 rounded-3xl bg-linear-to-r from-slate-900 via-blue-700 to-indigo-700 p-10 shadow-2xl">
      
        <div className="flex-1">

          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-yellow-300" />

            <span className="rounded-full bg-white/20 px-4 py-1 text-sm font-medium">
              Welcome back, Innovator!
            </span>

          </div>

          <h1 className="text-4xl font-bold">
            Innovation Dashboard
          </h1>

          <p className="mt-3 max-w-2xl text-blue-100">
            Enterprise Innovation Management System
          </p>

          {error && (
            <div className="mt-6 rounded-lg bg-red-600/20 p-3 text-red-100">
              {error}
            </div>
          )}

        </div>

        <div className="w-full max-w-md rounded-2xl bg-white/10 p-6 backdrop-blur-md">

          <div className="flex items-center gap-3">

            <CalendarDays className="h-6 w-6 text-yellow-300" />

            <div>

              <p className="text-sm text-white/80">
                Today
              </p>

              <h3 className="font-semibold">
                {formattedDate}
              </h3>

            </div>

          </div>

          <div className="mt-6 border-t border-white/20 pt-6">

            {loading ? (

              <div className="flex justify-center py-10">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>

            ) : (

              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

                <div className="rounded-xl bg-white/10 p-4 text-center">

                  <p className="text-xs uppercase text-blue-100">
                    Ideas
                  </p>

                  <h2 className="mt-2 text-3xl font-bold">
                    {dashboard.ideas.total}
                  </h2>

                </div>

                <div className="rounded-xl bg-white/10 p-4 text-center">

                  <p className="text-xs uppercase text-blue-100">
                    Peer Review
                  </p>

                  <h2 className="mt-2 text-3xl font-bold">
                    {dashboard.ideas.peer_review}
                  </h2>

                </div>

                <div className="rounded-xl bg-white/10 p-4 text-center">

                  <p className="text-xs uppercase text-blue-100">
                    PM Review
                  </p>

                  <h2 className="mt-2 text-3xl font-bold">
                    {dashboard.ideas.pm_review}
                  </h2>

                </div>

              </div>

            )}

          </div>

        </div>

      </div>
    </section>
  );
}