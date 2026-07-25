"use client";

import { Settings2, RefreshCw } from "lucide-react";

interface EmptySettingsProps {
  title?: string;
  description?: string;
  buttonText?: string;
  onRetry?: () => void;
}

export default function EmptySettings({
  title = "No Settings Available",
  description = "We couldn't load this settings section. Please try again later.",
  buttonText = "Reload",
  onRetry,
}: EmptySettingsProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-white px-8 py-20 text-center">

      <div className="rounded-full bg-slate-100 p-6">

        <Settings2 className="h-12 w-12 text-slate-400" />

      </div>

      <h2 className="mt-6 text-2xl font-bold text-slate-800">
        {title}
      </h2>

      <p className="mt-3 max-w-lg text-slate-500">
        {description}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-8 flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700"
        >
          <RefreshCw className="h-4 w-4" />
          {buttonText}
        </button>
      )}

    </div>
  );
}