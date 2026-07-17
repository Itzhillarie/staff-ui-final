"use client";

import {
  Gift,
  Coins,
  CheckCircle2,
  Lock,
  Calendar,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";

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

interface RewardCardProps {
  reward: Reward;
  userPoints: number;
  onRedeem?: (reward: Reward) => void;
}

export default function RewardCard({
  reward,
  userPoints,
  onRedeem,
}: RewardCardProps) {
  const canRedeem =
    reward.available &&
    !reward.redeemed &&
    userPoints >= reward.pointsRequired;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-slate-100 bg-linear-to-r from-indigo-600 to-purple-600 p-6 text-white">

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-white/20 p-4">

            <Gift size={34} />

          </div>

          <div>

            <h2 className="text-2xl font-bold">
              {reward.title}
            </h2>

            <p className="text-indigo-100">
              {reward.category}
            </p>

          </div>

        </div>

        <ShoppingBag size={28} />

      </div>

      {/* Body */}

      <div className="space-y-6 p-6">

        <p className="leading-7 text-slate-600">
          {reward.description}
        </p>

        {/* Cost */}

        <div className="rounded-xl bg-slate-50 p-5">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              <Coins
                size={22}
                className="text-yellow-500"
              />

              <span className="font-medium text-slate-700">
                Cost
              </span>

            </div>

            <span className="text-2xl font-bold text-indigo-600">
              {reward.pointsRequired.toLocaleString()} pts
            </span>

          </div>

        </div>

        {/* User Balance */}

        <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-5">

          <div className="flex items-center justify-between">

            <span className="font-medium text-slate-700">
              Your Balance
            </span>

            <span className="text-xl font-bold text-indigo-700">
              {userPoints.toLocaleString()} pts
            </span>

          </div>

        </div>

        {/* Status */}

        {reward.redeemed ? (
          <div className="rounded-xl border border-green-200 bg-green-50 p-5">

            <div className="flex items-center gap-3">

              <CheckCircle2
                size={24}
                className="text-green-600"
              />

              <div>

                <h3 className="font-semibold text-green-700">
                  Reward Redeemed
                </h3>

                <div className="mt-1 flex items-center gap-2 text-sm text-green-600">

                  <Calendar size={16} />

                  {reward.redeemedDate}

                </div>

              </div>

            </div>

          </div>
        ) : canRedeem ? (
          <button
            onClick={() => onRedeem?.(reward)}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-indigo-600 px-6 py-4 font-semibold text-white transition hover:bg-indigo-700"
          >
            Redeem Reward
            <ArrowRight size={20} />
          </button>
        ) : (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">

            <div className="flex items-center gap-3">

              <Lock
                size={22}
                className="text-slate-500"
              />

              <div>

                <h3 className="font-semibold text-slate-700">
                  Locked
                </h3>

                <p className="text-sm text-slate-500">
                  Earn more points to unlock this reward.
                </p>

              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}