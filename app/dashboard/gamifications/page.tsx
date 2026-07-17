"use client";

import { useState } from "react";

import GamificationStats from "../../components/gamification/GamificationStats";
import UserLevel from "../../components/gamification/UserLevel";
import LevelProgress from "../../components/gamification/LevelProgress";
import LeaderboardCard from "../../components/gamification/LeaderboardCard";
import AchievementCard from "../../components/gamification/AchievementCard";
import BadgeCard from "../../components/gamification/BadgeCard";
import RewardCard from "../../components/gamification/RewardCard";
import ChallengeCard from "../../components/gamification/ChallengeCard";
import ActivityTimeline from "../../components/gamification/ActivityTimeline";
import PointsHistory from "../../components/gamification/PointsHistory";

import RewardDialog from "../../components/gamification/RewardDialog";
import BadgeDialog from "../../components/gamification/BadgeDialog";
import AchievementDialog from "../../components/gamification/achievementDialog";
import MonthlyWinner from "@/app/components/gamification/MontlyWinners";

export default function GamificationPage() {
  const [rewardOpen, setRewardOpen] = useState(false);
  const [badgeOpen, setBadgeOpen] = useState(false);
  const [achievementOpen, setAchievementOpen] = useState(false);

  const [selectedReward, setSelectedReward] = useState<any>(null);
  const [selectedBadge, setSelectedBadge] = useState<any>(null);
  const [selectedAchievement, setSelectedAchievement] = useState<any>(null);

  const userPoints = 4850;
  const activities: any[] = [
    {
      id: 1,
      title: "Submitted Idea: Smart Inventory",
      description: "Submitted an idea to improve inventory tracking.",
      date: "10 Jul 2026",
      points: 150,
    },
    {
      id: 2,
      title: "Reviewed Idea: Energy Saver",
      description: "Provided feedback on an energy saving proposal.",
      date: "08 Jul 2026",
      points: 50,
    },
  ];

  const pointsHistory: {
    id: number;
    month: string;
    points: number;
    activity: string;
    description: string;
    type: "Earned" | "Redeemed";
    category: string;
    date: string;
  }[] = [
    {
      id: 1,
      month: "Mar 2026",
      points: 120,
      activity: "Submitted Idea",
      description: "Submitted an idea in March",
      type: "Earned",
      category: "Innovation",
      date: "15 Mar 2026",
    },
    {
      id: 2,
      month: "Apr 2026",
      points: 980,
      activity: "Project Completion",
      description: "Completed a project in April",
      type: "Earned",
      category: "Delivery",
      date: "22 Apr 2026",
    },
    {
      id: 3,
      month: "May 2026",
      points: 650,
      activity: "Peer Review",
      description: "Reviewed ideas in May",
      type: "Earned",
      category: "Collaboration",
      date: "09 May 2026",
    },
    {
      id: 4,
      month: "Jun 2026",
      points: 1100,
      activity: "Challenge Participation",
      description: "Participated in June challenge",
      type: "Earned",
      category: "Engagement",
      date: "30 Jun 2026",
    },
    {
      id: 5,
      month: "Jul 2026",
      points: 1250,
      activity: "Top Innovator Bonus",
      description: "Monthly bonus for top performers",
      type: "Earned",
      category: "Reward",
      date: "12 Jul 2026",
    },
  ];

  const currentUser = {
    id: 1,
    name: "You",
    avatar: "/avatars/default.png",
    points: userPoints,
    department: "Innovation",
    level: 5,
    rank: 1,
    ideas: 18,
    completedProjects: 12,
    badges: 18,
    trend: "up",
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8 space-y-8">

      {/* Header */}

      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          Gamification Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          Encourage innovation through points, rewards, badges and achievements.
        </p>
      </div>

      {/* Statistics */}

      <GamificationStats
        totalPoints={userPoints}
        currentLevel="5"
        badgesEarned={18}
        achievementsUnlocked={12}
        leaderboardRank={1}
        monthlyPoints={1250}
      />

      {/* User Progress */}

      <div className="grid gap-6 lg:grid-cols-3">
        <UserLevel 
          employeeName="You"
          currentLevel="5"
          currentXP={3200}
          nextLevelXP={5000}
          totalPoints={userPoints}
          rank={1}
        />
        <div className="lg:col-span-2">
          <LevelProgress currentXP={3200} />
        </div>
      </div>

      {/* Leaderboard */}

      <section>
        <h2 className="mb-4 text-2xl font-bold">
          Top Innovators
        </h2>

        <LeaderboardCard user={{
          ...currentUser,
          level: String(currentUser.level),
          // ensure trend matches expected union type
          trend: (currentUser.trend as "up" | "down" | "same")
        }} />
      </section>

      {/* Achievements */}

      <section>

        <h2 className="mb-4 text-2xl font-bold">
          Latest Achievements
        </h2>

        <div className="grid gap-6 md:grid-cols-2">

          <AchievementCard
            achievement={{
              id: 1,
              title: "Innovation Champion",
              description: "Submit 25 approved ideas.",
              category: "Innovation",
              reward: "Champion Badge",
              progress: 18,
              target: 25,
              points: 500,
              unlocked: false,
              difficulty: "Hard",
            }}
          />

        </div>

      </section>

      {/* Badges */}

      <section>

        <h2 className="mb-4 text-2xl font-bold">
          Recent Badges
        </h2>

        <div className="grid gap-6 md:grid-cols-3">

          <BadgeCard
            badge={{
              id: 1,
              name: "Creative Thinker",
              description: "Awarded for innovation.",
              category: "Innovation",
              rarity: "Rare",
              points: 250,
              unlocked: true,
              unlockedDate: "12 Jul 2026",
              criteria: "Submit 10 approved ideas.",
            }}
          />

        </div>

      </section>

      {/* Rewards */}

      <section>

        <h2 className="mb-4 text-2xl font-bold">
          Rewards Store
        </h2>

        <div className="grid gap-6 md:grid-cols-2">

          <RewardCard
            userPoints={userPoints}
            reward={{
              id: 1,
              title: "KES 5,000 Shopping Voucher",
              description: "Redeem shopping voucher.",
              category: "Voucher",
              pointsRequired: 4500,
              available: true,
              redeemed: false,
            }}
            onRedeem={(reward: any) => {
              setSelectedReward(reward);
              setRewardOpen(true);
            }}
          />

        </div>

      </section>

      {/* Challenge */}

      <section>

        <h2 className="mb-4 text-2xl font-bold">
          Current Challenge
        </h2>

        <ChallengeCard
          challenge={{
            id: 1,
            title: "Innovation Sprint",
            description: "Submit 5 ideas and review 10 ideas.",
            category: "Monthly",
            startDate: "01 Jul 2026",
            endDate: "31 Jul 2026",
            rewardPoints: 1000,
            progress: 6,
            target: 15,
            completed: false,
            difficulty: "Medium",
          }}
        />

      </section>

      {/* Winner */}

      <MonthlyWinner
        winner={{
          id: 1,
          name: "Hillary Chelimo",
          department: "ICT Department",
          level: "Innovation Champion",
          totalPoints: 8450,
          ideasSubmitted: 26,
          projectsCompleted: 12,
          badges: 18,
          month: "July 2026",
          achievement: "Top Innovator of the Month",
        }}
      />

      {/* Activity */}

      <div className="grid gap-6 xl:grid-cols-2">

        

        <ActivityTimeline activities={activities} />

      </div>

      {/* Dialogs */}

      <RewardDialog
        open={rewardOpen}
        reward={selectedReward}
        userPoints={userPoints}
        onClose={() => setRewardOpen(false)}
        onRedeem={() => setRewardOpen(false)}
      />

      <BadgeDialog
        open={badgeOpen}
        badge={selectedBadge}
        onClose={() => setBadgeOpen(false)}
      />

      <AchievementDialog
        open={achievementOpen}
        achievement={selectedAchievement}
        onClose={() => setAchievementOpen(false)}
      />

    </div>
  );
}