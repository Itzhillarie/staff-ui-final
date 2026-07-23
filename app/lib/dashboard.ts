import { apiFetch } from "@/app/utils/apiFetch";

export interface DashboardData {
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

  charts: {
    leaderboard: {
      username: string;
      points: number;
    }[];
  };
}

export async function getDashboardData(): Promise<DashboardData> {
  return await apiFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/dashboard/`,
    {
      method: "GET",
    }
  );
}