"use client";

import { Trophy } from "lucide-react";

interface EmptyGamificationProps {
  title?: string;
  description?: string;
}

export default function EmptyGamification({
  title = "Nothing to Display",
  description = "There is currently no gamification data available.",
}: EmptyGamificationProps) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-16 text-center shadow-sm">

      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-slate-100">

        <Trophy className="h-12 w-12 text-slate-400" />

      </div>

      <h2 className="mt-6 text-2xl font-bold text-slate-800">
        {title}
      </h2>

      <p className="mx-auto mt-3 max-w-md text-slate-500">
        {description}
      </p>

    </div>
  );
}