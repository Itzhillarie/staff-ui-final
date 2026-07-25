"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Coins,
  Gift,
  Loader2,
  ShoppingBag,
} from "lucide-react";
import { toast } from "sonner";

import {
  getRewards,
  redeemReward,
  Reward,
} from "@/app/lib/gamification";

export default function RewardsPage() {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);
  const [redeeming, setRedeeming] = useState<string | null>(null);

  useEffect(() => {
    async function loadRewards() {
      try {
        const data = await getRewards();

        setRewards(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load rewards.");
      } finally {
        setLoading(false);
      }
    }

    void loadRewards();
  }, []);

  async function handleRedeem(id: string) {
    try {
      setRedeeming(id);

      await redeemReward(id);

      toast.success("Reward redeemed successfully.");

      setRewards((prev) =>
        prev.map((reward) =>
          reward.id === id
            ? {
                ...reward,
                redeemed: true,
              }
            : reward
        )
      );
    } catch (error: unknown) {
      toast.error(
        error instanceof Error && error.message
          ? error.message
          : "Unable to redeem reward."
      );
    } finally {
      setRedeeming(null);
    }
  }

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="rounded-3xl bg-gradient-to-r from-emerald-600 via-green-600 to-lime-600 p-8 text-white shadow-xl">
        <div className="flex items-center gap-4">
          <Gift className="h-12 w-12" />

          <div>
            <h1 className="text-4xl font-bold">Rewards Store</h1>
            <p className="mt-2 text-green-100">
              Redeem your innovation points for available rewards.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow">
          <ShoppingBag className="mb-3 h-9 w-9 text-indigo-600" />
          <p className="text-sm text-slate-500">Total Rewards</p>
          <h2 className="mt-2 text-4xl font-bold">{rewards.length}</h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <CheckCircle2 className="mb-3 h-9 w-9 text-green-600" />
          <p className="text-sm text-slate-500">Redeemed</p>
          <h2 className="mt-2 text-4xl font-bold text-green-600">
            {rewards.filter((reward) => reward.redeemed).length}
          </h2>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow">
          <Gift className="mb-3 h-9 w-9 text-orange-600" />
          <p className="text-sm text-slate-500">Available</p>
          <h2 className="mt-2 text-4xl font-bold text-orange-600">
            {rewards.filter((reward) => !reward.redeemed).length}
          </h2>
        </div>
      </div>

      {rewards.length === 0 ? (
        <div className="rounded-2xl bg-white p-16 text-center shadow">
          <Gift className="mx-auto mb-5 h-16 w-16 text-slate-300" />

          <h2 className="text-2xl font-bold">No Rewards Available</h2>
          <p className="mt-2 text-slate-500">
            Rewards added by administrators will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {rewards.map((reward) => (
            <div
              key={reward.id}
              className="rounded-2xl border bg-white p-6 shadow transition hover:shadow-lg"
            >
              <div className="mb-6 flex items-center justify-between">
                <Gift className="h-12 w-12 text-emerald-600" />

                {reward.redeemed && (
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                    Redeemed
                  </span>
                )}
              </div>

              <h2 className="text-2xl font-bold">{reward.name}</h2>
              <p className="mt-3 text-slate-500">{reward.description}</p>

              <div className="mt-5 flex items-center gap-2 font-bold text-amber-600">
                <Coins className="h-5 w-5" />
                {reward.points_required} Points
              </div>

              <button
                disabled={reward.redeemed || redeeming === reward.id}
                onClick={() => handleRedeem(reward.id)}
                className="mt-8 w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {redeeming === reward.id ? (
                  <Loader2 className="mx-auto h-5 w-5 animate-spin" />
                ) : reward.redeemed ? (
                  "Already Redeemed"
                ) : (
                  "Redeem Reward"
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
