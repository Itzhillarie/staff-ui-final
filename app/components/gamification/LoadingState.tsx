"use client";

import { Loader2 } from "lucide-react";

interface LoadingGamificationProps {
  message?: string;
}

export default function LoadingGamification({
  message = "Loading gamification data...",
}: LoadingGamificationProps) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">

      <div className="rounded-2xl bg-white px-10 py-12 text-center shadow-lg">

        <Loader2 className="mx-auto h-12 w-12 animate-spin text-indigo-600" />

        <h2 className="mt-6 text-2xl font-bold text-slate-800">
          Please Wait
        </h2>

        <p className="mt-2 text-slate-500">
          {message}
        </p>

      </div>

    </div>
  );
}