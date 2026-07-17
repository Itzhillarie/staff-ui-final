"use client";

import {
  Lightbulb,
  Users,
  ClipboardCheck,
  Rocket,
  Trophy,
  Award,
} from "lucide-react";

import StatCard from "@/app/components/common/StatCard";

interface DashboardStatsProps {
  stats: {
    totalIdeas: number;
    peerReview: number;
    pmReview: number;
    projects: number;
    innovationPoints: number;
    topBadge: string;
  };
}

export default function DashboardStats({
  stats,
}: DashboardStatsProps) {
  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">

      <StatCard
        title="Ideas Submitted"
        value={stats.totalIdeas}
        subtitle="Total ideas submitted"
        icon={<Lightbulb size={28} />}
        color="bg-blue-600"
      />

      <StatCard
        title="Peer Reviews"
        value={stats.peerReview}
        subtitle="Ideas awaiting peer review"
        icon={<Users size={28} />}
        color="bg-purple-600"
      />

      <StatCard
        title="PM Reviews"
        value={stats.pmReview}
        subtitle="Awaiting manager approval"
        icon={<ClipboardCheck size={28} />}
        color="bg-orange-500"
      />

      <StatCard
        title="Projects"
        value={stats.projects}
        subtitle="Implementation projects"
        icon={<Rocket size={28} />}
        color="bg-cyan-600"
      />

      <StatCard
        title="Innovation Points"
        value={stats.innovationPoints}
        subtitle="Organization points"
        icon={<Trophy size={28} />}
        color="bg-yellow-500"
      />

      <StatCard
        title="Top Badge"
        value={stats.topBadge}
        subtitle="Highest achievement"
        icon={<Award size={28} />}
        color="bg-green-600"
      />

    </section>
  );
}