"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/app/utils/apiFetch";
import DashboardHeader from "@/app/components/dashboard/DashboardHeader";
import StatCard from "@/app/components/common/StatCard";
import {
  Lightbulb,
  Users,
  ClipboardCheck,
  Rocket,
  Trophy,
  Award,
} from "lucide-react";

import Dashboard from "@/app/dashboard/page";
// import Dashboard from "@/app/dashboard/page";

interface DashboardStatsData {
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

const initialState: DashboardStatsData = {
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

// interface DashboardData {
//   totalIdeas: number;
//   peerReview: number;
//   pmReview: number;
//   projects: number;
//   innovationPoints: number;
//   topBadge: string;
// }

// const initialStats: DashboardData = {
//   totalIdeas: 0,
//   peerReview: 0,
//   pmReview: 0,
//   projects: 0,
//   innovationPoints: 0,
//   topBadge: "",
// };

export default function DashboardStats() {
  const [stats, setStats] = useState<DashboardStatsData>(initialState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardStats() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/dashboard/`,
          {
            method: "GET",
            credentials: "include",
            cache: "no-store",
            headers: {
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "1",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch dashboard statistics");
        }

        const data = await response.json();

        setStats(data);
      } catch (error) {
        console.error("Dashboard statistics error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardStats();
  }, []);

  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">

      <StatCard
        title="Ideas Submitted"
        value={loading ? "..." : stats.ideas.total}
        subtitle="Total ideas submitted"
        icon={<Lightbulb size={40} />}
        color="bg-blue-600"
      />

      <StatCard
        title="Peer Reviews"
        value={loading ? "..." : stats.ideas.peer_review}
        subtitle="Ideas awaiting peer review"
        icon={<Users size={28} />}
        color="bg-purple-600"
      />

      <StatCard
        title="PM Reviews"
        value={loading ? "..." : stats.ideas.pm_review}
        subtitle="Awaiting manager approval"
        icon={<ClipboardCheck size={28} />}
        color="bg-orange-500"
      />

      <StatCard
        title="Projects"
        value={loading ? "..." : stats.projects.total}
        subtitle="Implementation projects"
        icon={<Rocket size={28} />}
        color="bg-cyan-600"
      />

      <StatCard
        title="Innovation Points"
        value={loading ? "..." : stats.projects.average_progress}
        subtitle="Current innovation score"
        icon={<Trophy size={28} />}
        color="bg-yellow-500"
      />

      <StatCard
        title="Current Badge"
        value={loading ? "..." : String(stats.users.active_users)}
        subtitle="Latest badge earned"
        icon={<Award size={28} />}
        color="bg-green-600"
      />

    </section>
  );
}