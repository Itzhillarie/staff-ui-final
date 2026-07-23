"use client";

import { useEffect, useState } from "react";
import { getDashboardData } from "@/app/lib/dashboard";
import StatCard from "@/app/components/common/StatCard";
import {
  Lightbulb,
  Users,
  ClipboardCheck,
  Rocket,
  Trophy,
  Award,
} from "lucide-react";

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

  gamification: {
    top_contributors: {
      username: string;
      points: number;
    }[];
    points_awarded: number;
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

  gamification: {
    top_contributors: [],
    points_awarded: 0,
  },
};

export default function DashboardStats() {
  const [stats, setStats] = useState(initialState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await getDashboardData();
        setStats(data);
      } catch (error) {
        console.error("Dashboard stats error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">

      <StatCard
        title="Ideas Submitted"
        value={loading ? "..." : stats.ideas.total}
        subtitle="Total ideas submitted"
        icon={<Lightbulb size={30} />}
        color="bg-green-600"
      />

      <StatCard
        title="Peer Reviews"
        value={loading ? "..." : stats.ideas.peer_review}
        subtitle="Awaiting peer review"
        icon={<Users size={30} />}
        color="bg-green-600"
      />

      <StatCard
        title="PM Reviews"
        value={loading ? "..." : stats.ideas.pm_review}
        subtitle="Manager review stage"
        icon={<ClipboardCheck size={30} />}
        color="bg-green-500"
      />

      <StatCard
        title="Projects"
        value={loading ? "..." : stats.projects.total}
        subtitle="Implementation projects"
        icon={<Rocket size={30} />}
        color="bg-green-600"
      />

      <StatCard
        title="Points Awarded"
        value={loading ? "..." : stats.gamification.points_awarded}
        subtitle="Innovation points issued"
        icon={<Trophy size={30} />}
        color="bg-green-500"
      />

      <StatCard
        title="Active Users"
        value={loading ? "..." : stats.users.active_users}
        subtitle={`${stats.users.total_users} Total Users`}
        icon={<Award size={30} />}
        color="bg-green-600"
      />

    </section>
  );
}