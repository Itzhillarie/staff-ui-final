"use client";

import {
  Bell,
  BellRing,
  CheckCircle2,
  Archive,
  TrendingUp,
} from "lucide-react";

interface NotificationStatsProps {
  total?: number;
  unread?: number;
  read?: number;
  archived?: number;
}

export default function NotificationStats({
  total = 128,
  unread = 24,
  read = 92,
  archived = 12,
}: NotificationStatsProps) {
  const stats = [
    {
      title: "Total Notifications",
      value: total,
      icon: Bell,
      color: "bg-blue-50 text-blue-600",
      border: "border-blue-100",
    },
    {
      title: "Unread",
      value: unread,
      icon: BellRing,
      color: "bg-amber-50 text-amber-600",
      border: "border-amber-100",
    },
    {
      title: "Read",
      value: read,
      icon: CheckCircle2,
      color: "bg-green-50 text-green-600",
      border: "border-green-100",
    },
    {
      title: "Archived",
      value: archived,
      icon: Archive,
      color: "bg-purple-50 text-purple-600",
      border: "border-purple-100",
    },
  ];

  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className={`rounded-2xl border ${stat.border} bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {stat.title}
                </p>

                <h2 className="mt-3 text-4xl font-bold text-slate-800">
                  {stat.value}
                </h2>
              </div>

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${stat.color}`}
              >
                <Icon size={28} />
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 border-t pt-4 text-sm text-slate-500">
              <TrendingUp size={16} className="text-emerald-500" />
              <span>Updated just now</span>
            </div>
          </div>
        );
      })}
    </section>
  );
}