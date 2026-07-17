import DashboardHeader from "@/app/components/dashboard/DashboardHeader";
import DashboardStats from "@/app/components/dashboard/DashboardStats";
import QuickActions from "@/app/components/dashboard/QuickActions";
import RecentActivity from "@/app/components/dashboard/RecentActivity";
import IdeaPipeline from "@/app/components/dashboard/IdeaPipeline";
import RecentIdeas from "@/app/components/dashboard/RecentIdeas";
import Leaderboard from "@/app/components/dashboard/Leaderboard";

async function getDashboard() {
  return {
    ideas: [],
    projects: {},
    leaderboard: [],
    pipeline: [],
    recentIdeas: [],
  };
}

export default async function Dashboard() {
  const dashboard = await getDashboard() as {
    ideas: any;
    projects: any;
    leaderboard: any;
    pipeline?: any[];
    recentIdeas?: any[];
  };

  return (
    <div className="space-y-8">
      <DashboardHeader />

      <DashboardStats stats={dashboard.projects} />

      <QuickActions />

      <div className="grid gap-8 xl:grid-cols-2">
        {/* recentActivity may not be provided by getDashboard; default to empty array */}
        <RecentActivity activities={[] } />

        <IdeaPipeline pipeline={dashboard.pipeline ?? []} />
      </div>

      <RecentIdeas ideas={dashboard.recentIdeas ?? []} />

      <Leaderboard users={dashboard.leaderboard} />
    </div>
  );
}