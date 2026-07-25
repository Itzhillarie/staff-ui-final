import { apiFetch } from "@/app/utils/apiFetch";

const API = process.env.NEXT_PUBLIC_API_URL;

/* ==========================================
   TYPES
========================================== */

export interface LeaderboardUser {
  id: number | string;
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
  id: string;
  name: string;
  description: string;
  points_required: number;
  redeemed?: boolean;
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

interface PaginatedResponse<T> {
  results?: T[];
}

type LeaderboardApiUser = {
  id?: number | string;
  username?: string;
  points?: number;
  rank?: number;
};

type BadgeApiItem = Partial<Badge>;

/* ==========================================
   DASHBOARD
========================================== */

export async function getGamificationDashboard() {
  const [leaderboard, badges] = await Promise.all([
    getLeaderboard(),
    getBadges().catch(() => []),
  ]);

  const currentUser = leaderboard[0];
  const earnedBadges = badges.filter((badge) => badge.earned);

  return {
    total_points: currentUser?.points ?? 0,
    rank: currentUser?.rank ?? 0,
    level: Math.max(1, Math.floor((currentUser?.points ?? 0) / 100) + 1),
    next_level_points:
      (Math.floor((currentUser?.points ?? 0) / 100) + 1) * 100,
    badges_count: earnedBadges.length,
    achievements_count: 0,
    leaderboard,
    recent_points: [],
    badges,
    achievements: [],
    rewards: [],
  } satisfies GamificationDashboard;
}

/* ==========================================
   LEADERBOARD
========================================== */

export async function getLeaderboard() {
  const data = await apiFetch<
    LeaderboardApiUser[] | PaginatedResponse<LeaderboardApiUser>
  >(`${API}/Gamification/leaderboard/`, {
    method: "GET",
  });

  const users = Array.isArray(data) ? data : data.results ?? [];

  return users.map((user, index) => ({
    id: user.id ?? `${user.username ?? "user"}-${index}`,
    username: user.username ?? "Unknown user",
    points: user.points ?? 0,
    rank: user.rank ?? index + 1,
  }));
}

/* ==========================================
   POINT HISTORY
========================================== */

export async function getPointHistory() {
  return [];
}

/* ==========================================
   BADGES
========================================== */

export async function getBadges() {
  const data = await apiFetch<
    BadgeApiItem[] | PaginatedResponse<BadgeApiItem>
  >(`${API}/Gamification/my-badges/`, {
    method: "GET",
  });

  const badges = Array.isArray(data) ? data : data.results ?? [];

  return badges.map((badge, index) => ({
    id: badge.id ?? index,
    name: badge.name ?? "Badge",
    description: badge.description ?? "Achievement badge",
    icon: badge.icon,
    earned: badge.earned ?? true,
    earned_at: badge.earned_at,
  }));
}

/* ==========================================
   ACHIEVEMENTS
========================================== */

export async function getAchievements() {
  return [] as Achievement[];
}

/* ==========================================
   REWARDS
========================================== */

export async function getRewards() {
  return [] as Reward[];
}

/* ==========================================
   REDEEM REWARD
========================================== */

export async function redeemReward(id: string) {
  return apiFetch(`${API}/Gamification/rewards/${id}/redeem/`, {
    method: "POST",
  });
}
