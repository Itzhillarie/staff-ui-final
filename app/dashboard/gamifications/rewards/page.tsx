"use client";

import { useMemo, useState } from "react";
import {
  Gift,
  Coins,
  ShoppingBag,
  Award,
  Search,
  Filter,
} from "lucide-react";

import RewardCard from "@/app/components/gamification/RewardCard";
import RewardDialog from "@/app/components/gamification/RewardDialog";

interface Reward {
  id: number;
  title: string;
  description: string;
  category: string;
  pointsRequired: number;
  available: boolean;
  redeemed: boolean;
  redeemedDate?: string;
}

export default function RewardsPage() {
  const userPoints = 4850;

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [selectedReward, setSelectedReward] =
    useState<Reward | null>(null);

  const [dialogOpen, setDialogOpen] = useState(false);

  const rewards: Reward[] = [
    {
      id: 1,
      title: "KES 5,000 Shopping Voucher",
      description:
        "Redeem a shopping voucher from approved retail partners.",
      category: "Voucher",
      pointsRequired: 4500,
      available: true,
      redeemed: false,
    },
    {
      id: 2,
      title: "Extra Leave Day",
      description:
        "Redeem one additional paid leave day.",
      category: "Leave",
      pointsRequired: 6000,
      available: true,
      redeemed: false,
    },
    {
      id: 3,
      title: "Innovation Trophy",
      description:
        "Receive an official innovation excellence trophy.",
      category: "Recognition",
      pointsRequired: 8500,
      available: true,
      redeemed: false,
    },
    {
      id: 4,
      title: "Wireless Headphones",
      description:
        "Premium noise-cancelling wireless headphones.",
      category: "Electronics",
      pointsRequired: 10000,
      available: true,
      redeemed: false,
    },
    {
      id: 5,
      title: "Lunch Voucher",
      description:
        "Free lunch voucher for two people.",
      category: "Voucher",
      pointsRequired: 2000,
      available: true,
      redeemed: true,
      redeemedDate: "10 Jul 2026",
    },
    {
      id: 6,
      title: "Innovation Certificate",
      description:
        "Official certificate recognizing outstanding contribution.",
      category: "Recognition",
      pointsRequired: 3000,
      available: true,
      redeemed: false,
    },
  ];

  const filteredRewards = useMemo(() => {
    return rewards.filter((reward) => {
      const matchesSearch =
        reward.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        reward.description
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === "All" ||
        reward.category === category;

      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  const redeemedRewards = rewards.filter(
    (reward) => reward.redeemed
  ).length;

  const availableRewards = rewards.filter(
    (reward) => reward.available
  ).length;

  return (
    <div className="min-h-screen bg-slate-50 p-8">

      {/* Header */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-slate-800">
          Rewards Store
        </h1>

        <p className="mt-2 text-slate-500">
          Redeem your innovation points for exciting rewards.
        </p>

      </div>

      {/* Statistics */}

      <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <Coins
            size={32}
            className="mb-3 text-yellow-500"
          />

          <h2 className="text-3xl font-bold">
            {userPoints.toLocaleString()}
          </h2>

          <p className="text-slate-500">
            Available Points
          </p>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <Gift
            size={32}
            className="mb-3 text-indigo-600"
          />

          <h2 className="text-3xl font-bold">
            {availableRewards}
          </h2>

          <p className="text-slate-500">
            Rewards Available
          </p>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <ShoppingBag
            size={32}
            className="mb-3 text-green-600"
          />

          <h2 className="text-3xl font-bold">
            {redeemedRewards}
          </h2>

          <p className="text-slate-500">
            Redeemed
          </p>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <Award
            size={32}
            className="mb-3 text-purple-600"
          />

          <h2 className="text-3xl font-bold">
            {rewards.length}
          </h2>

          <p className="text-slate-500">
            Total Rewards
          </p>

        </div>

      </div>

      {/* Filters */}

      <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm">

        <div className="grid gap-4 lg:grid-cols-2">

          <div className="relative">

            <Search
              size={18}
              className="absolute left-4 top-3.5 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search reward..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 focus:border-indigo-500 focus:outline-none"
            />

          </div>

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="rounded-xl border border-slate-300 px-4 py-3"
          >
            <option>All</option>
            <option>Voucher</option>
            <option>Recognition</option>
            <option>Electronics</option>
            <option>Leave</option>
          </select>

        </div>

      </div>

      {/* Reward Cards */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {filteredRewards.map((reward) => (
          <RewardCard
            key={reward.id}
            reward={reward}
            userPoints={userPoints}
            onRedeem={(selectedReward: Reward) => {
              setSelectedReward(selectedReward);
              setDialogOpen(true);
            }}
          />
        ))}

      </div>

      {/* Empty State */}

      {filteredRewards.length === 0 && (

        <div className="mt-10 rounded-2xl bg-white py-20 text-center shadow-sm">

          <Filter
            size={60}
            className="mx-auto text-slate-300"
          />

          <h2 className="mt-5 text-2xl font-bold text-slate-700">
            No Rewards Found
          </h2>

          <p className="mt-2 text-slate-500">
            Try changing your search or filter.
          </p>

        </div>

      )}

      {/* Reward Dialog */}

      <RewardDialog
        open={dialogOpen}
        reward={selectedReward}
        userPoints={userPoints}
        onClose={() => {
          setDialogOpen(false);
          setSelectedReward(null);
        }}
        onRedeem={(reward: Reward) => {
          console.log("Redeemed:", reward);
          setDialogOpen(false);
        }}
      />

    </div>
  );
}