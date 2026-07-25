"use client";

import { Award, Lock, CheckCircle2 } from "lucide-react";

export interface Badge {
  id: string;
  name: string;
  description: string;
  earned: boolean;
  earned_at?: string;
}

interface BadgeCardProps {
  badge: Badge;
}

export default function BadgeCard({
  badge,
}: BadgeCardProps) {
  return (
    <div
      className={`rounded-2xl border p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${
        badge.earned
          ? "border-green-200 bg-white"
          : "border-slate-200 bg-slate-50"
      }`}
    >
      <div className="mb-6 flex justify-center">
        {badge.earned ? (
          <div className="rounded-full bg-yellow-100 p-5">
            <Award className="h-10 w-10 text-yellow-500" />
          </div>
        ) : (
          <div className="rounded-full bg-slate-200 p-5">
            <Lock className="h-10 w-10 text-slate-500" />
          </div>
        )}
      </div>

      <h2 className="text-center text-xl font-bold text-slate-800">
        {badge.name}
      </h2>

      <p className="mt-3 text-center text-sm text-slate-500">
        {badge.description}
      </p>

      <div className="mt-6">
        {badge.earned ? (
          <div className="flex items-center justify-center gap-2 rounded-xl bg-green-100 py-3 font-semibold text-green-700">
            <CheckCircle2 className="h-5 w-5" />
            Earned
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 rounded-xl bg-slate-200 py-3 font-semibold text-slate-600">
            <Lock className="h-5 w-5" />
            Locked
          </div>
        )}
      </div>

      {badge.earned && badge.earned_at && (
        <p className="mt-4 text-center text-xs text-slate-400">
          Earned on{" "}
          {new Date(badge.earned_at).toLocaleDateString()}
        </p>
      )}
    </div>
  );
}