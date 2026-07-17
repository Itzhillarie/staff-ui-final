"use client";

import { useMemo, useState } from "react";
import {
  Award,
  Search,
  Filter,
  Shield,
  Trophy,
  Lock,
} from "lucide-react";

import BadgeCard from "@/app/components/gamification/BadgeCard";
import BadgeDialog, {
  Badge,
} from "@/app/components/gamification/BadgeDialog";

export default function BadgesPage() {
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [rarity, setRarity] = useState("All");
  const [status, setStatus] = useState("All");

  const badges: Badge[] = [
    {
      id: 1,
      name: "Creative Thinker",
      description: "Awarded for submitting 10 innovative ideas.",
      category: "Innovation",
      rarity: "Rare",
      points: 250,
      unlocked: true,
      unlockedDate: "12 Jul 2026",
      criteria: "Submit 10 approved ideas.",
    },
    {
      id: 2,
      name: "Collaboration Hero",
      description: "Review 50 innovation ideas.",
      category: "Collaboration",
      rarity: "Epic",
      points: 500,
      unlocked: true,
      unlockedDate: "01 Jul 2026",
      criteria: "Complete 50 peer reviews.",
    },
    {
      id: 3,
      name: "Innovation Champion",
      description: "Complete 25 implemented projects.",
      category: "Implementation",
      rarity: "Legendary",
      points: 1000,
      unlocked: false,
      criteria: "Complete 25 successful projects.",
    },
    {
      id: 4,
      name: "Quick Starter",
      description: "Submit your first innovation idea.",
      category: "Innovation",
      rarity: "Common",
      points: 100,
      unlocked: true,
      unlockedDate: "10 Jan 2026",
      criteria: "Submit your first idea.",
    },
    {
      id: 5,
      name: "Mentor",
      description: "Help new innovators succeed.",
      category: "Leadership",
      rarity: "Epic",
      points: 700,
      unlocked: false,
      criteria: "Mentor 10 employees.",
    },
    {
      id: 6,
      name: "Idea Machine",
      description: "Submit 50 approved ideas.",
      category: "Innovation",
      rarity: "Legendary",
      points: 1500,
      unlocked: false,
      criteria: "Submit 50 approved ideas.",
    },
  ];

  const filteredBadges = useMemo(() => {
    return badges.filter((badge) => {
      const matchesSearch =
        badge.name.toLowerCase().includes(search.toLowerCase()) ||
        badge.description.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        category === "All" || badge.category === category;

      const matchesRarity =
        rarity === "All" || badge.rarity === rarity;

      const matchesStatus =
        status === "All" ||
        (status === "Earned" && badge.unlocked) ||
        (status === "Locked" && !badge.unlocked);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesRarity &&
        matchesStatus
      );
    });
  }, [search, category, rarity, status]);

  const earned = badges.filter((b) => b.unlocked).length;
  const locked = badges.length - earned;
  const completion = Math.round((earned / badges.length) * 100);

  return (
    <div className="min-h-screen bg-slate-50 p-8">

      {/* Header */}

      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="text-4xl font-bold text-slate-800">
            Achievement Badges
          </h1>

          <p className="mt-2 text-slate-500">
            View your earned badges and track your progress toward unlocking
            new achievements.
          </p>

        </div>

      </div>

      {/* Statistics */}

      <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <Award className="mb-3 text-indigo-600" size={32} />

          <h2 className="text-3xl font-bold">
            {badges.length}
          </h2>

          <p className="text-slate-500">
            Total Badges
          </p>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <Trophy className="mb-3 text-yellow-500" size={32} />

          <h2 className="text-3xl font-bold">
            {earned}
          </h2>

          <p className="text-slate-500">
            Earned
          </p>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <Lock className="mb-3 text-red-500" size={32} />

          <h2 className="text-3xl font-bold">
            {locked}
          </h2>

          <p className="text-slate-500">
            Locked
          </p>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <Shield className="mb-3 text-green-600" size={32} />

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

        <div className="grid gap-4 lg:grid-cols-4">

          <div className="relative">

            <Search
              size={18}
              className="absolute left-4 top-3.5 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search badge..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 focus:border-indigo-500 focus:outline-none"
            />

          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-xl border border-slate-300 px-4 py-3"
          >
            <option>All</option>
            <option>Innovation</option>
            <option>Collaboration</option>
            <option>Leadership</option>
            <option>Implementation</option>
          </select>

          <select
            value={rarity}
            onChange={(e) => setRarity(e.target.value)}
            className="rounded-xl border border-slate-300 px-4 py-3"
          >
            <option>All</option>
            <option>Common</option>
            <option>Rare</option>
            <option>Epic</option>
            <option>Legendary</option>
          </select>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="rounded-xl border border-slate-300 px-4 py-3"
          >
            <option>All</option>
            <option>Earned</option>
            <option>Locked</option>
          </select>

        </div>

      </div>

      {/* Badge Grid */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {filteredBadges.map((badge) => (
          <BadgeCard
            key={badge.id}
            badge={badge}
          />
        ))}

      </div>

      {filteredBadges.length === 0 && (
        <div className="rounded-2xl bg-white py-20 text-center shadow-sm">

          <Filter
            size={60}
            className="mx-auto text-slate-300"
          />

          <h3 className="mt-4 text-2xl font-bold text-slate-700">
            No badges found
          </h3>

          <p className="mt-2 text-slate-500">
            Try changing your search or filter criteria.
          </p>

        </div>
      )}

      {/* Badge Details Dialog */}

      <BadgeDialog
        open={dialogOpen}
        badge={selectedBadge}
        onClose={() => {
          setDialogOpen(false);
          setSelectedBadge(null);
        }}
      />

    </div>
  );
}