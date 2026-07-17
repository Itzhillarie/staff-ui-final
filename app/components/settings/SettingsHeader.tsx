"use client";

import { Settings } from "lucide-react";

interface SettingsHeaderProps {
  title: string;
  description: string;
}

export default function SettingsHeader({
  title,
  description,
}: SettingsHeaderProps) {
  return (
    <div className="mb-6 rounded-xl bg-white p-6 shadow-sm">

      <div className="flex items-center gap-4">

        <div className="rounded-lg bg-indigo-100 p-3">
          <Settings
            size={24}
            className="text-indigo-600"
          />
        </div>

        <div>

          <h1 className="text-2xl font-bold text-slate-800">
            {title}
          </h1>

          <p className="mt-1 text-slate-500">
            {description}
          </p>

        </div>

      </div>

    </div>
  );
}