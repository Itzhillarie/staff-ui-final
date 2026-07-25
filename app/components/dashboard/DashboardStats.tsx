"use client";

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
    peer_review: number;
    pm_review: number;
  };

  projects: {
    total: number;
  };

  gamification: {
    points_awarded: number;
  };
}


interface Props {
  stats: DashboardStatsData;
  loading?: boolean;
}


export default function DashboardStats({
  stats,
  loading = false,
}: Props) {


  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">


      <StatCard
        title="Ideas Submitted"
        value={loading ? "..." : stats.ideas.total}
        subtitle="Total ideas submitted"
        icon={<Lightbulb size={30} />}
        color="bg-blue-600"
      />


      <StatCard
        title="Peer Reviews"
        value={loading ? "..." : stats.ideas.peer_review}
        subtitle="Awaiting peer review"
        icon={<Users size={30} />}
        color="bg-purple-600"
      />


      <StatCard
        title="PM Reviews"
        value={loading ? "..." : stats.ideas.pm_review}
        subtitle="Manager review stage"
        icon={<ClipboardCheck size={30} />}
        color="bg-orange-500"
      />


      <StatCard
        title="Projects"
        value={loading ? "..." : stats.projects.total}
        subtitle="Implementation projects"
        icon={<Rocket size={30} />}
        color="bg-cyan-600"
      />


      <StatCard
        title="Points Awarded"
        value={
          loading
            ? "..."
            : stats.gamification.points_awarded
        }
        subtitle="Innovation points issued"
        icon={<Trophy size={30} />}
        color="bg-yellow-500"
      />


      <StatCard
        title="Active Users"
        value={
          loading
            ? "..."
            : stats.users.active_users
        }
        subtitle={`${stats.users.total_users} Total Users`}
        icon={<Award size={30} />}
        color="bg-green-600"
      />


    </section>
  );
}