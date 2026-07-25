"use client";

import { BellOff } from "lucide-react";

interface EmptyNotificationsProps {
  title?: string;
  description?: string;
}

export default function EmptyNotifications({
  title = "No Notifications",
  description = "You're all caught up.",
}: EmptyNotificationsProps) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-16 text-center">

      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
        <BellOff className="h-10 w-10 text-slate-400" />
      </div>

      <h2 className="mt-6 text-2xl font-bold text-slate-800">
        {title}
      </h2>

      <p className="mt-2 text-slate-500">
        {description}
      </p>

    </div>
  );
}