"use client";

import { Settings, Plus } from "lucide-react";

interface EmptySettingsProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onAction?: () => void;
}

export default function EmptySettings({
  title = "No Settings Available",
  description = "There are currently no settings to display.",
  buttonText,
  onAction,
}: EmptySettingsProps) {
  return (
    <div className="flex min-h-10 flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">

      {/* Icon */}

      <div className="mb-6 rounded-full bg-indigo-100 p-5">
        <Settings
          size={48}
          className="text-indigo-600"
        />
      </div>

      {/* Title */}

      <h2 className="text-2xl font-bold text-slate-800">
        {title}
      </h2>

      {/* Description */}

      <p className="mt-3 max-w-md text-slate-500">
        {description}
      </p>

      {/* Optional Action */}

      {buttonText && onAction && (
        <button
          onClick={onAction}
          className="mt-8 flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 text-white transition hover:bg-indigo-700"
        >
          <Plus size={18} />
          {buttonText}
        </button>
      )}

    </div>
  );
}