"use client";

import DashboardHeader from "@/app/components/dashboard/DashboardHeader";
import DashboardStats from "@/app/components/dashboard/DashboardStats";
import QuickActions from "@/app/components/dashboard/QuickActions";
import RecentActivity from "@/app/components/dashboard/RecentActivity";
import IdeaPipeline from "@/app/components/dashboard/IdeaPipeline";
import RecentIdeas from "@/app/components/dashboard/RecentIdeas";
import Leaderboard from "@/app/components/dashboard/Leaderboard";

import type { DashboardData } from "@/app/lib/dashboard";


interface Props {
  dashboard: DashboardData;
}


export default function DashboardClient({
  dashboard,
}: Props) {

  return (
    <main className="space-y-8">


      <DashboardHeader
        dashboard={dashboard}
        username={dashboard.user?.username}
        role={dashboard.user?.role}
      />


      <DashboardStats
        stats={dashboard}
      />


      <QuickActions
        dashboard={dashboard}
      />



      <section className="grid gap-8 xl:grid-cols-2">

        <RecentActivity
          audit_logs={dashboard.audit_logs}
        />


        <IdeaPipeline
          ideas={dashboard.ideas}
        />

      </section>



      <RecentIdeas
        ideas={dashboard.recent_ideas ?? []}
      />



      <Leaderboard
        leaderboard={
          dashboard.charts.leaderboard
        }
      />


    </main>
  );
}
