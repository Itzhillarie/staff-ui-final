"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Sparkles } from "lucide-react";

export default function DashboardHeader() {
  const [stats, setStats] = useState({ goal: "", ideas: 0, peer_reviews: 0, pm_reviews: 0 });

  useEffect(() => {
  const fetchStats = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/ideas/list/`,
        {
          method: "GET",
          credentials: "include", // send Django session cookie
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      setStats(data);
    } catch (err) {
      console.error("Failed to fetch dashboard stats:", err);
    }
  };

  fetchStats();
}, []);

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section className="mb-8">
      <div className="flex flex-col gap-6 rounded-3xl bg-linear-to-r from-blue-600 via-indigo-600 to-violet-700 p-8 text-white shadow-xl lg:flex-row lg:items-center lg:justify-between">
        {/* Left Side */}
        <div>
          <div className="mb-3 flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-yellow-300" />
            <span className="rounded-full bg-white/20 px-3 py-1 text-sm font-medium">
              Welcome back, Innovator!
            </span>
          </div>

          <h1 className="text-4xl font-bold">Welcome to InnoBoard</h1>
          <p className="mt-3 max-w-2xl text-blue-100">
            Manage ideas, collaborate with colleagues, review innovations, and monitor implementation projects from one centralized dashboard.
          </p>
        </div>

        {/* Right Side */}
        <div className="rounded-2xl bg-white/10 p-6 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <CalendarDays className="h-6 w-6 text-yellow-300" />
            <div>
              <p className="text-sm text-blue-100">Today</p>
              <h3 className="font-semibold">{formattedDate}</h3>
            </div>
          </div>

          <div className="mt-6 border-t border-white/20 pt-4">
            <p className="text-sm text-blue-100">Today's Goal</p>
            <h4 className="mt-2 text-lg font-semibold">
              {stats.goal || "Loading..."}
            </h4>

            <p className="text-sm text-blue-100 mt-4">Ideas Submitted</p>
            <h4 className="mt-2 text-lg font-semibold">{stats.ideas}</h4>

            <p className="text-sm text-blue-100 mt-4">Peer Reviews</p>
            <h4 className="mt-2 text-lg font-semibold">{stats.peer_reviews}</h4>

            <p className="text-sm text-blue-100 mt-4">PM Reviews</p>
            <h4 className="mt-2 text-lg font-semibold">{stats.pm_reviews}</h4>
          </div>
        </div>
      </div>
    </section>
  );
}
