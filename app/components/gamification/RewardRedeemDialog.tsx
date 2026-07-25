"use client";

import {
  AlertTriangle,
  Loader2,
  Gift,
} from "lucide-react";

interface RewardRedeemDialogProps {
  open: boolean;
  rewardName: string;
  rewardCost: number;
  loading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function RewardRedeemDialog({
  open,
  rewardName,
  rewardCost,
  loading = false,
  onClose,
  onConfirm,
}: RewardRedeemDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">

      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

        <div className="flex justify-center">

          <div className="rounded-full bg-amber-100 p-4">

            <AlertTriangle className="h-10 w-10 text-amber-600" />

          </div>

        </div>

        <h2 className="mt-5 text-center text-2xl font-bold text-slate-800">
          Redeem Reward
        </h2>

        <p className="mt-3 text-center text-slate-500">
          Are you sure you want to redeem
        </p>

        <h3 className="mt-2 text-center text-xl font-semibold text-indigo-700">
          {rewardName}
        </h3>

        <div className="mt-6 rounded-xl bg-slate-100 p-4 text-center">

          <p className="text-sm text-slate-500">
            Cost
          </p>

          <p className="mt-1 text-2xl font-bold text-amber-600">
            {rewardCost.toLocaleString()} Points
          </p>

        </div>

        <p className="mt-5 text-center text-sm text-slate-500">
          This action cannot be undone.
        </p>

        <div className="mt-8 flex gap-3">

          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 rounded-xl border border-slate-300 py-3 font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-60"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Redeeming...
              </>
            ) : (
              <>
                <Gift className="h-5 w-5" />
                Redeem
              </>
            )}
          </button>

        </div>

      </div>

    </div>
  );
}