"use client";

import {
  Gift,
  Coins,
  CheckCircle2,
  Lock,
} from "lucide-react";

export interface Reward {
  id: string;
  name: string;
  description: string;
  points_required: number;
  redeemed: boolean;
}

interface RewardCardProps {
  reward: Reward;
  onRedeem?: (id: string) => void;
  loading?: boolean;
}

export default function RewardCard({
  reward,
  onRedeem,
  loading = false,
}: RewardCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

      <div className="mb-6 flex items-center justify-between">

        <div className="rounded-full bg-emerald-100 p-4">
          <Gift className="h-8 w-8 text-emerald-600" />
        </div>

        {reward.redeemed ? (
          <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
            Redeemed
          </span>
        ) : (
          <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700">
            Available
          </span>
        )}

      </div>

      <h2 className="text-2xl font-bold text-slate-800">
        {reward.name}
      </h2>

      <p className="mt-3 text-slate-500">
        {reward.description}
      </p>

      <div className="mt-5 flex items-center gap-2 rounded-xl bg-amber-50 p-3">

        <Coins className="h-5 w-5 text-amber-500" />

        <span className="font-semibold text-amber-700">
          {reward.points_required.toLocaleString()} Points
        </span>

      </div>

      <div className="mt-8">

        {reward.redeemed ? (
          <div className="flex items-center justify-center gap-2 rounded-xl bg-green-100 py-3 font-semibold text-green-700">
            <CheckCircle2 className="h-5 w-5" />
            Already Redeemed
          </div>
        ) : (
          <button
            onClick={() => onRedeem?.(reward.id)}
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Lock className="h-5 w-5 animate-pulse" />
                Redeeming...
              </>
            ) : (
              <>
                <Gift className="h-5 w-5" />
                Redeem Reward
              </>
            )}
          </button>
        )}

      </div>

    </div>
  );
}