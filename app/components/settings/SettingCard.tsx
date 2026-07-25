"use client";

import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface SettingCardProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  children: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export default function SettingCard({
  title,
  description,
  icon: Icon,
  children,
  actions,
  className = "",
}: SettingCardProps) {
  return (
    <div
      className={`overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm ${className}`}
    >
      {/* Header */}

      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

        <div className="flex items-center gap-4">

          {Icon && (
            <div className="rounded-xl bg-indigo-100 p-3">
              <Icon className="h-6 w-6 text-indigo-600" />
            </div>
          )}

          <div>

            <h2 className="text-xl font-bold text-slate-900">
              {title}
            </h2>

            {description && (
              <p className="mt-1 text-sm text-slate-500">
                {description}
              </p>
            )}

          </div>

        </div>

        {actions && (
          <div className="flex items-center gap-2">
            {actions}
          </div>
        )}

      </div>

      {/* Content */}

      <div className="p-6">
        {children}
      </div>

    </div>
  );
}