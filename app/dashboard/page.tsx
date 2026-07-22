import DashboardHeader from "@/app/components/dashboard/DashboardHeader";
import DashboardStats from "@/app/components/dashboard/DashboardStats";
import QuickActions from "@/app/components/dashboard/QuickActions";
import RecentActivity from "@/app/components/dashboard/RecentActivity";
import IdeaPipeline from "@/app/components/dashboard/IdeaPipeline";
import RecentIdeas from "@/app/components/dashboard/RecentIdeas";
import Leaderboard from "@/app/components/dashboard/Leaderboard";

export default function Dashboard() {
  return (
    <main className="space-y-8">

      {/* Dashboard Header */}
      <DashboardHeader />

      {/* Dashboard Statistics */}
      <DashboardStats />

      {/* Quick Actions */}
      <QuickActions />

      {/* Activity & Pipeline */}
      <section className="grid gap-8 xl:grid-cols-2">
        <RecentActivity />
        <IdeaPipeline />
      </section>

      {/* Recent Ideas */}
      <RecentIdeas />

      {/* Leaderboard */}
      <Leaderboard />

    </main>
  );
}