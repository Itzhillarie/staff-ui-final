import { apiFetch } from "@/app/utils/apiFetch";

const API = process.env.NEXT_PUBLIC_API_URL;

/* ==========================================
   TYPES
========================================== */

export interface LeaderboardUser {
  id: number;
  username: string;
  points: number;
  rank: number;
}

export interface Badge {
  id: number;
  name: string;
  description: string;
  icon?: string;
  earned: boolean;
  earned_at?: string;
}

export interface Achievement {
  id: number;
  title: string;
  description: string;
  progress: number;
  target: number;
  completed: boolean;
}

export interface Reward {
  id: number;
  name: string;
  description: string;
  points_required: number;
}

export interface PointHistory {
  id: number;
  action: string;
  points: number;
  created_at: string;
}

export interface GamificationDashboard {
  total_points: number;
  rank: number;
  level: number;
  next_level_points: number;
  badges_count: number;
  achievements_count: number;
  leaderboard: LeaderboardUser[];
  recent_points: PointHistory[];
  badges: Badge[];
  achievements: Achievement[];
  rewards: Reward[];
}

/* ==========================================
   DASHBOARD
========================================== */

export async function getGamificationDashboard() {
  return apiFetch(`${API}/gamification/dashboard/`, {
    method: "GET",
  });
}

/* ==========================================
   LEADERBOARD
========================================== */

export async function getLeaderboard() {
  return apiFetch(`${API}/gamification/leaderboard/`, {
    method: "GET",
  });
}

/* ==========================================
   POINT HISTORY
========================================== */

export async function getPointHistory() {
  return apiFetch(`${API}/gamification/points-history/`, {
    method: "GET",
  });
}

/* ==========================================
   BADGES
========================================== */

export async function getBadges() {
  return apiFetch(`${API}/gamification/badges/`, {
    method: "GET",
  });
}

/* ==========================================
   ACHIEVEMENTS
========================================== */

export async function getAchievements() {
  return apiFetch(`${API}/gamification/achievements/`, {
    method: "GET",
  });
}

/* ==========================================
   REWARDS
========================================== */

export async function getRewards() {
  return apiFetch(`${API}/gamification/rewards/`, {
    method: "GET",
  });
}

/* ==========================================
   REDEEM REWARD
========================================== */

export async function redeemReward(id: string) {
  return apiFetch(`${API}/gamification/rewards/${id}/redeem/`, {
    method: "POST",
  });
}