"use client";

import { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

interface SettingCardProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  children: ReactNode;
  action?: ReactNode;
}

export default function SettingCard({
  title,
  description,
  icon,
  children,
  action,
}: SettingCardProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-slate-100 p-5">

        <div className="flex items-center gap-4">

          {icon && (
            <div className="rounded-lg bg-indigo-100 p-3 text-indigo-600">
              {icon}
            </div>
          )}

          <div>

            <h2 className="text-lg font-semibold text-slate-800">
              {title}
            </h2>

            {description && (
              <p className="mt-1 text-sm text-slate-500">
                {description}
              </p>
            )}

          </div>

        </div>

        {action && (
          <div className="flex items-center gap-2">
            {action}
            <ChevronRight
              size={18}
              className="text-slate-400"
            />
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