import { cookies } from "next/headers";
import { apiFetch } from "@/app/utils/apiFetchDashboard";


export interface DashboardData {

  user?: {
    username: string;
    role: string;
  };


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


  notifications: {
    unread: number;
  };


  audit_logs?: {
    recent?: {
      event_message: string;
      event_type__name?: string;
      created_at: string;
    }[];
  };


  recent_ideas?: {
    id: number;
    title: string;
    status: string;
    likes?: number;
    comments?: number;
    created_at: string;
  }[];

}



export async function getDashboardData(): Promise<DashboardData> {

  const cookieStore = await cookies();

  const token =
    cookieStore.get("jwt")?.value;


  const apiUrl =
    process.env.API_SERVER_URL ??
    process.env.NEXT_PUBLIC_API_URL;

  return await apiFetch(
    `${apiUrl}/users/dashboard/`,
    {
      method: "GET",

      headers: {
        Authorization: `Bearer ${token}`,
        "ngrok-skip-browser-warning": "1",
      },

      cache: "no-store",
    }
  );

}
