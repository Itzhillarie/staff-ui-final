"use client";

import { Loader2 } from "lucide-react";

interface LoadingNotificationsProps {
  message?: string;
}

export default function LoadingNotifications({
  message = "Loading notifications...",
}: LoadingNotificationsProps) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">

      <div className="rounded-2xl bg-white p-10 text-center shadow-lg">

        <Loader2 className="mx-auto h-12 w-12 animate-spin text-indigo-600" />

        <h2 className="mt-5 text-2xl font-bold text-slate-800">
          Please Wait
        </h2>

        <p className="mt-2 text-slate-500">
          {message}
        </p>

      </div>

    </div>
  );
}