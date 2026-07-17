"use client";

import {
  Award,
  Lock,
  CheckCircle2,
  Calendar,
  Star,
  Shield,
} from "lucide-react";

interface Badge {
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

interface BadgeCardProps {
  badge: Badge;
}

export default function BadgeCard({
  badge,
}: BadgeCardProps) {
  const rarityStyles = {
    Common: {
      bg: "bg-slate-100",
      text: "text-slate-700",
      border: "border-slate-200",
      icon: "text-slate-600",
    },
    Rare: {
      bg: "bg-blue-100",
      text: "text-blue-700",
      border: "border-blue-200",
      icon: "text-blue-600",
    },
    Epic: {
      bg: "bg-purple-100",
      text: "text-purple-700",
      border: "border-purple-200",
      icon: "text-purple-600",
    },
    Legendary: {
      bg: "bg-yellow-100",
      text: "text-yellow-700",
      border: "border-yellow-300",
      icon: "text-yellow-600",
    },
  };

  const style = rarityStyles[badge.rarity];

  return (
    <div
      className={`overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
        badge.unlocked
          ? style.border
          : "border-slate-200"
      }`}
    >
      {/* Header */}

      <div
        className={`flex items-center justify-between p-6 ${
          badge.unlocked ? style.bg : "bg-slate-50"
        }`}
      >
        <div className="flex items-center gap-4">
          <div
            className={`rounded-2xl p-4 ${
              badge.unlocked
                ? style.bg
                : "bg-slate-200"
            }`}
          >
            {badge.unlocked ? (
              <Award
                size={34}
                className={style.icon}
              />
            ) : (
              <Lock
                size={34}
                className="text-slate-500"
              />
            )}
          </div>

          <div>
            <h2 className="text-xl font-bold text-slate-800">
              {badge.name}
            </h2>

            <p className="text-slate-500">
              {badge.category}
            </p>
          </div>
        </div>

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${style.bg} ${style.text}`}
        >
          {badge.rarity}
        </span>
      </div>

      {/* Content */}

      <div className="space-y-6 p-6">
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

          <p className="leading-7 text-slate-600">
            {badge.criteria}
          </p>
        </div>

        {/* Reward */}

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl bg-slate-50 p-4">
            <div className="flex items-center gap-2">
              <Star
                size={18}
                className="text-yellow-500"
              />

              <span className="text-sm text-slate-500">
                Reward Points
              </span>
            </div>

            <h3 className="mt-2 text-2xl font-bold text-indigo-600">
              +{badge.points}
            </h3>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <div className="flex items-center gap-2">
              <Shield
                size={18}
                className={style.icon}
              />

              <span className="text-sm text-slate-500">
                Badge Type
              </span>
            </div>

            <h3 className="mt-2 font-semibold text-slate-800">
              {badge.rarity}
            </h3>
          </div>
        </div>

        {/* Footer */}

        <div className="flex items-center justify-between border-t border-slate-100 pt-5">
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

          {badge.unlockedDate && (
            <div className="flex items-center gap-2 text-slate-500">
              <Calendar size={18} />
              <span className="text-sm">
                {badge.unlockedDate}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}