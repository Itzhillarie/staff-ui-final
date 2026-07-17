"use client";

import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  color?: string;
  subtitle?: string;
}

export default function StatCard({
  title,
  value,
  icon,
  color = "bg-blue-500",
  subtitle,
}: StatCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Top color line */}
      <div className={`absolute top-0 left-0 h-1 w-full ${color}`} />

      {/* Icon */}
      <div
        className={`flex h-14 w-14 items-center justify-center rounded-xl ${color} text-white shadow-md`}
      >
        {icon}
      </div>

      {/* Value */}
      <h2 className="mt-6 text-3xl font-bold text-slate-900">
        {value}
      </h2>

      {/* Title */}
      <p className="mt-1 text-sm font-semibold text-slate-600">
        {title}
      </p>

      {/* Subtitle */}
      {subtitle && (
        <p className="mt-3 text-xs text-slate-400">
          {subtitle}
        </p>
      )}
    </div>
  );
}