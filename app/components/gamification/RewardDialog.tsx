"use client";

import { Gift, Coins, Calendar, X } from "lucide-react";

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

interface RewardDialogProps {
  open: boolean;
  reward: Reward | null;
  userPoints: number;
  onClose: () => void;
  onRedeem: (reward: Reward) => void;
}

export default function RewardDialog({
  open,
  reward,
  userPoints,
  onClose,
  onRedeem,
}: RewardDialogProps) {
  if (!open || !reward) return null;

  const canRedeem =
    reward.available &&
    !reward.redeemed &&
    userPoints >= reward.pointsRequired;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between rounded-t-3xl bg-linear-to-r from-indigo-600 to-purple-600 p-6 text-white">

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

          <button
            onClick={onClose}
            className="rounded-full p-2 transition hover:bg-white/20"
          >
            <X size={24} />
          </button>

        </div>

        {/* Body */}

        <div className="space-y-6 p-6">

          <div>
            <h3 className="mb-2 font-semibold text-slate-800">
              Description
            </h3>

            <p className="leading-7 text-slate-600">
              {reward.description}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">

            <div className="rounded-xl bg-slate-50 p-5">

              <div className="flex items-center gap-2">

                <Coins
                  size={20}
                  className="text-yellow-600"
                />

                <span className="font-medium text-slate-600">
                  Cost
                </span>

              </div>

              <h3 className="mt-3 text-3xl font-bold text-indigo-600">
                {reward.pointsRequired.toLocaleString()} pts
              </h3>

            </div>

            <div className="rounded-xl bg-slate-50 p-5">

              <div className="flex items-center gap-2">

                <Coins
                  size={20}
                  className="text-green-600"
                />

                <span className="font-medium text-slate-600">
                  Your Balance
                </span>

              </div>

              <h3 className="mt-3 text-3xl font-bold text-green-600">
                {userPoints.toLocaleString()} pts
              </h3>

            </div>

          </div>

          {reward.redeemed && reward.redeemedDate && (
            <div className="rounded-xl border border-green-200 bg-green-50 p-5">

              <div className="flex items-center gap-3">

                <Calendar
                  size={20}
                  className="text-green-600"
                />

                <div>

                  <p className="font-semibold text-green-700">
                    Redeemed
                  </p>

                  <p className="text-green-600">
                    {reward.redeemedDate}
                  </p>

                </div>

              </div>

            </div>
          )}

          {!reward.redeemed && !canRedeem && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-5">

              <p className="font-medium text-red-700">
                You don't have enough points to redeem this reward.
              </p>

            </div>
          )}

        </div>

        {/* Footer */}

        <div className="flex justify-end gap-4 border-t border-slate-200 p-6">

          <button
            onClick={onClose}
            className="rounded-xl border border-slate-300 px-6 py-3 font-medium transition hover:bg-slate-100"
          >
            Close
          </button>

          {!reward.redeemed && (
            <button
              disabled={!canRedeem}
              onClick={() => onRedeem(reward)}
              className={`rounded-xl px-6 py-3 font-medium text-white transition ${
                canRedeem
                  ? "bg-indigo-600 hover:bg-indigo-700"
                  : "cursor-not-allowed bg-slate-400"
              }`}
            >
              Redeem Reward
            </button>
          )}

        </div>

      </div>

    </div>
  );
}