"use client";

import {
  Bell,
  BellRing,
  Archive,
  CheckCircle2,
} from "lucide-react";

interface NotificationStatsProps {
  total: number;
  unread: number;
  read: number;
  archived: number;
}

export default function NotificationStats({
  total,
  unread,
  read,
  archived,
}: NotificationStatsProps) {
  const stats = [
    {
      title: "Total Notifications",
      value: total,
      icon: Bell,
      bg: "bg-indigo-100",
      color: "text-indigo-600",
    },
    {
      title: "Unread",
      value: unread,
      icon: BellRing,
      bg: "bg-yellow-100",
      color: "text-yellow-600",
    },
    {
      title: "Read",
      value: read,
      icon: CheckCircle2,
      bg: "bg-green-100",
      color: "text-green-600",
    },
    {
      title: "Archived",
      value: archived,
      icon: Archive,
      bg: "bg-slate-100",
      color: "text-slate-600",
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  {stat.title}
                </p>

                <h2 className="mt-3 text-4xl font-bold text-slate-800">
                  {stat.value}
                </h2>

              </div>

              <div className={`rounded-2xl ${stat.bg} p-4`}>
                <Icon className={`h-8 w-8 ${stat.color}`} />
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
}