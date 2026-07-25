"use client";

import { Save, RotateCcw, Loader2, AlertCircle } from "lucide-react";

interface SaveChangesBarProps {
  hasChanges: boolean;
  saving?: boolean;
  onSave: () => void;
  onReset: () => void;
}

export default function SaveChangesBar({
  hasChanges,
  saving = false,
  onSave,
  onReset,
}: SaveChangesBarProps) {
  if (!hasChanges) return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-50 w-[95%] max-w-4xl -translate-x-1/2">

      <div className="flex items-center justify-between rounded-2xl border border-indigo-200 bg-white p-4 shadow-2xl">

        {/* Left */}

        <div className="flex items-center gap-3">

          <div className="rounded-full bg-amber-100 p-2">

            <AlertCircle className="h-5 w-5 text-amber-600" />

          </div>

          <div>

            <h3 className="font-semibold text-slate-900">
              Unsaved Changes
            </h3>

            <p className="text-sm text-slate-500">
              You have changes that haven't been saved.
            </p>

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center gap-3">

          <button
            type="button"
            onClick={onReset}
            disabled={saving}
            className="flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RotateCcw className="h-4 w-4" />

            Discard
          </button>

          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}

            {saving ? "Saving..." : "Save Changes"}
          </button>

        </div>

      </div>

    </div>
  );
}