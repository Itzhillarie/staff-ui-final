"use client";

import {
  Award,
  Calendar,
  CheckCircle2,
  Lock,
  Shield,
  Star,
  X,
} from "lucide-react";

export interface Badge {
  id: number;
  name: string;
  description: string;
  category: string;
  rarity: "Common" | "Rare" | "Epic" | "Legendary";
  points: number;
  unlocked: boolean;
  unlockedDate?: string;
  criteria: string;
}

interface BadgeDialogProps {
  open: boolean;
  badge: Badge | null;
  onClose: () => void;
}

export default function BadgeDialog({
  open,
  badge,
  onClose,
}: BadgeDialogProps) {
  if (!open || !badge) return null;

  const rarityStyles = {
    Common: {
      bg: "bg-slate-100",
      text: "text-slate-700",
      icon: "text-slate-600",
      border: "border-slate-200",
    },
    Rare: {
      bg: "bg-blue-100",
      text: "text-blue-700",
      icon: "text-blue-600",
      border: "border-blue-200",
    },
    Epic: {
      bg: "bg-purple-100",
      text: "text-purple-700",
      icon: "text-purple-600",
      border: "border-purple-200",
    },
    Legendary: {
      bg: "bg-yellow-100",
      text: "text-yellow-700",
      icon: "text-yellow-600",
      border: "border-yellow-300",
    },
  };

  const style = rarityStyles[badge.rarity];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl overflow-hidden rounded-3xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between bg-linear-to-r from-indigo-600 to-purple-600 p-6 text-white">

          <div className="flex items-center gap-4">

            <div className="rounded-2xl bg-white/20 p-4">
              <Award size={34} />
            </div>

            <div>

              <h2 className="text-2xl font-bold">
                {badge.name}
              </h2>

              <p className="text-indigo-100">
                {badge.category}
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

        {/* Content */}

        <div className="space-y-6 p-6">

          <div className="flex items-center justify-between">

            <span
              className={`rounded-full px-4 py-2 text-sm font-semibold ${style.bg} ${style.text}`}
            >
              {badge.rarity}
            </span>

            {badge.unlocked ? (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle2 size={20} />
                <span className="font-medium">
                  Badge Earned
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-slate-500">
                <Lock size={20} />
                <span>Locked</span>
              </div>
            )}

          </div>

          <div>

            <h3 className="mb-2 font-semibold text-slate-800">
              Description
            </h3>

            <p className="leading-7 text-slate-600">
              {badge.description}
            </p>

          </div>

          <div>

            <h3 className="mb-2 font-semibold text-slate-800">
              Unlock Criteria
            </h3>

            <div className="rounded-xl bg-slate-50 p-4">
              <p className="leading-7 text-slate-600">
                {badge.criteria}
              </p>
            </div>

          </div>

          <div className="grid gap-5 md:grid-cols-2">

            <div className="rounded-xl bg-slate-50 p-5">

              <div className="flex items-center gap-2">

                <Star
                  size={18}
                  className="text-yellow-500"
                />

                <span className="text-sm text-slate-500">
                  Reward Points
                </span>

              </div>

              <h3 className="mt-3 text-3xl font-bold text-indigo-600">
                +{badge.points}
              </h3>

            </div>

            <div className="rounded-xl bg-slate-50 p-5">

              <div className="flex items-center gap-2">

                <Shield
                  size={18}
                  className={style.icon}
                />

                <span className="text-sm text-slate-500">
                  Badge Type
                </span>

              </div>

              <h3 className="mt-3 font-semibold text-slate-800">
                {badge.rarity}
              </h3>

            </div>

          </div>

          {badge.unlocked && badge.unlockedDate && (

            <div className="rounded-xl border border-green-200 bg-green-50 p-5">

              <div className="flex items-center gap-3">

                <Calendar
                  size={20}
                  className="text-green-600"
                />

                <div>

                  <p className="font-semibold text-green-700">
                    Earned On
                  </p>

                  <p className="text-green-600">
                    {badge.unlockedDate}
                  </p>

                </div>

              </div>

            </div>

          )}

        </div>

        {/* Footer */}

        <div className="flex justify-end border-t border-slate-200 p-6">

          <button
            onClick={onClose}
            className="rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700"
          >
            Close
          </button>

        </div>

      </div>
    </div>
  );
}