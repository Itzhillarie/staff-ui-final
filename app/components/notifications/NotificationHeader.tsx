"use client";

import { Bell } from "lucide-react";

interface NotificationHeaderProps {
  total: number;
  unread: number;
}

export default function NotificationHeader({
  total,
  unread,
}: NotificationHeaderProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-cyan-700 via-cyan-700 to-cyan-700 p-8 text-white shadow-2xl">

      <div className="absolute -right-12 -top-12 h-52 w-52 rounded-full bg-white/10 blur-3xl" />

      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div className="flex items-center gap-5">

          <div className="rounded-2xl bg-white/15 p-4 backdrop-blur-sm">
            <Bell className="h-10 w-10 text-yellow-300" />
          </div>

          <div>

            <h1 className="text-4xl font-bold">
              Notifications
            </h1>

            <p className="mt-2 text-indigo-100">
              Stay updated with ideas, reviews, projects and achievements.
            </p>

          </div>

        </div>

        <div className="grid grid-cols-2 gap-4">

          <div className="rounded-2xl bg-white/10 p-5 text-center backdrop-blur-sm">

            <p className="text-sm text-indigo-100">
              Total
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {total}
            </h2>

          </div>

          <div className="rounded-2xl bg-white/10 p-5 text-center backdrop-blur-sm">

            <p className="text-sm text-cyan-100">
              Unread
            </p>

            <h2 className="mt-2 text-3xl font-bold text-yellow-300">
              {unread}
            </h2>

          </div>

        </div>

      </div>

    </div>
  );
}