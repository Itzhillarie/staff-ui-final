"use client";

import { useMemo, useState } from "react";
import {
  Trophy,
  Target,
  Lock,
  Search,
  Filter,
} from "lucide-react";

import AchievementCard from "@/app/components/gamification/AchievementCard";
import AchievementDialog, {
  Achievement,
} from "@/app/components/gamification/achievementDialog";

export default function AchievementsPage () {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [status, setStatus] = useState("All");

  const [selectedAchievement, setSelectedAchievement] =
    useState<Achievement | null>(null);

  const [dialogOpen, setDialogOpen] = useState(false);

  const achievements: Achievement[] = [
    {
      id: 1,
      title: "Innovation Champion",
      description: "Submit 25 approved innovation ideas.",
      category: "Innovation",
      reward: "Champion Badge",
      progress: 20,
      target: 25,
      points: 500,
      unlocked: false,
      difficulty: "Hard",
    },
    {
      id: 2,
      title: "Creative Thinker",
      description: "Submit your first approved idea.",
      category: "Innovation",
      reward: "Creative Badge",
      progress: 1,
      target: 1,
      points: 100,
      unlocked: true,
      unlockedDate: "12 Jul 2026",
      difficulty: "Easy",
    },
    {
      id: 3,
      title: "Master Reviewer",
      description: "Review 100 innovation ideas.",
      category: "Collaboration",
      reward: "Reviewer Badge",
      progress: 60,
      target: 100,
      points: 400,
      unlocked: false,
      difficulty: "Medium",
    },
    {
      id: 4,
      title: "Project Leader",
      description: "Successfully implement 10 projects.",
      category: "Implementation",
      reward: "Leadership Badge",
      progress: 10,
      target: 10,
      points: 800,
      unlocked: true,
      unlockedDate: "20 Jun 2026",
      difficulty: "Hard",
    },
    {
      id: 5,
      title: "Legendary Innovator",
      description: "Earn 10,000 innovation points.",
      category: "Recognition",
      reward: "Legendary Trophy",
      progress: 4850,
      target: 10000,
      points: 1500,
      unlocked: false,
      difficulty: "Legendary",
    },
    {
      id: 6,
      title: "Team Mentor",
      description: "Mentor five innovation teams.",
      category: "Leadership",
      reward: "Mentor Badge",
      progress: 5,
      target: 5,
      points: 600,
      unlocked: true,
      unlockedDate: "01 Jul 2026",
      difficulty: "Medium",
    },
  ];

  const filteredAchievements = useMemo(() => {
    return achievements.filter((achievement) => {
      const matchesSearch =
        achievement.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        achievement.description
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesDifficulty =
        difficulty === "All" ||
        achievement.difficulty === difficulty;

      const matchesStatus =
        status === "All" ||
        (status === "Unlocked" &&
          achievement.unlocked) ||
        (status === "Locked" &&
          !achievement.unlocked);

      return (
        matchesSearch &&
        matchesDifficulty &&
        matchesStatus
      );
    });
  }, [search, difficulty, status]);

  const unlocked = achievements.filter(
    (a) => a.unlocked
  ).length;

  const locked = achievements.length - unlocked;

  const completion = Math.round(
    (unlocked / achievements.length) * 100
  );

  return (
    <div className="min-h-screen bg-slate-50 p-8">

      {/* Header */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-slate-800">
          Achievements
        </h1>

        <p className="mt-2 text-slate-500">
          Track your innovation milestones and unlock
          achievements.
        </p>

      </div>

      {/* Statistics */}

      <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <Trophy
            className="mb-3 text-yellow-500"
            size={32}
          />

          <h2 className="text-3xl font-bold">
            {achievements.length}
          </h2>

          <p className="text-slate-500">
            Total Achievements
          </p>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <Target
            className="mb-3 text-green-600"
            size={32}
          />

          <h2 className="text-3xl font-bold">
            {unlocked}
          </h2>

          <p className="text-slate-500">
            Unlocked
          </p>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <Lock
            className="mb-3 text-red-500"
            size={32}
          />

          <h2 className="text-3xl font-bold">
            {locked}
          </h2>

          <p className="text-slate-500">
            Locked
          </p>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <Filter
            className="mb-3 text-indigo-600"
            size={32}
          />

          <h2 className="text-3xl font-bold">
            {completion}%
          </h2>

          <p className="text-slate-500">
            Completion
          </p>

        </div>

      </div>

      {/* Filters */}

      <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">

        <div className="grid gap-4 lg:grid-cols-3">

          <div className="relative">

            <Search
              size={18}
              className="absolute left-4 top-3.5 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search achievement..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 focus:border-indigo-500 focus:outline-none"
            />

          </div>

          <select
            value={difficulty}
            onChange={(e) =>
              setDifficulty(e.target.value)
            }
            className="rounded-xl border border-slate-300 px-4 py-3"
          >
            <option>All</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
            <option>Legendary</option>
          </select>

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="rounded-xl border border-slate-300 px-4 py-3"
          >
            <option>All</option>
            <option>Unlocked</option>
            <option>Locked</option>
          </select>

        </div>

      </div>

      {/* Achievement Grid */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {filteredAchievements.map((achievement) => (
          <AchievementCard
            key={achievement.id}
            achievement={achievement}
          />
        ))}

      </div>

      {/* Empty State */}

      {filteredAchievements.length === 0 && (

        <div className="mt-10 rounded-2xl bg-white py-20 text-center shadow-sm">

          <Filter
            size={60}
            className="mx-auto text-slate-300"
          />

          <h2 className="mt-4 text-2xl font-bold">
            No Achievements Found
          </h2>

          <p className="mt-2 text-slate-500">
            Try changing your search or filters.
          </p>

        </div>

      )}

      {/* Achievement Dialog */}

      <AchievementDialog
        open={dialogOpen}
        achievement={selectedAchievement}
        onClose={() => {
          setDialogOpen(false);
          setSelectedAchievement(null);
        }}
      />

    </div>
  );
}