"use client";

import {
  ClipboardCheck,
  CheckCircle2,
  XCircle,
  Rocket,
  TrendingUp,
} from "lucide-react";

const stats = [
  {
    title: "Pending Reviews",
    value: 18,
    change: "+6%",
    description: "Waiting for review",
    icon: ClipboardCheck,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  {
    title: "Approved Ideas",
    value: 42,
    change: "+12%",
    description: "Ready for implementation",
    icon: CheckCircle2,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    title: "Rejected Ideas",
    value: 7,
    change: "-2%",
    description: "Rejected after review",
    icon: XCircle,
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
  },
  {
    title: "Implementation Projects",
    value: 15,
    change: "+9%",
    description: "Projects in progress",
    icon: Rocket,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
];

export default function PMStats() {
  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {stat.title}
                </p>

                <h2 className="mt-3 text-4xl font-bold text-slate-800">
                  {stat.value}
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  {stat.description}
                </p>
              </div>

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-xl ${stat.iconBg}`}
              >
                <Icon className={stat.iconColor} size={28} />
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 border-t pt-4">
              <TrendingUp
                size={16}
                className="text-green-500"
              />

              <span className="text-sm font-semibold text-green-600">
                {stat.change}
              </span>

              <span className="text-sm text-slate-500">
                from last month
              </span>
            </div>
          </div>
        );
      })}
    </section>
  );
}