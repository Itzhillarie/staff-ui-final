"use client";

import { Save, RotateCcw } from "lucide-react";

interface SaveChangesBarProps {
  visible: boolean;
  saving?: boolean;
  onSave: () => void;
  onDiscard: () => void;
}

export default function SaveChangesBar({
  visible,
  saving = false,
  onSave,
  onDiscard,
}: SaveChangesBarProps) {
  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 z-50 w-[95%] max-w-4xl -translate-x-1/2">

      <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-xl">

        {/* Message */}

        <div>

          <h3 className="font-semibold text-slate-800">
            Unsaved Changes
          </h3>

          <p className="text-sm text-slate-500">
            You have unsaved changes. Save them before leaving this page.
          </p>

        </div>

        {/* Buttons */}

        <div className="flex items-center gap-3">

          <button
            onClick={onDiscard}
            className="flex items-center gap-2 rounded-lg border px-4 py-2 hover:bg-slate-100"
          >
            <RotateCcw size={18} />
            Discard
          </button>

          <button
            onClick={onSave}
            disabled={saving}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2 text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save size={18} />

            {saving ? "Saving..." : "Save Changes"}

          </button>

        </div>

      </div>

    </div>
  );
}