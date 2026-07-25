"use client";

import { Settings, Save, RefreshCw } from "lucide-react";

interface SettingsHeaderProps {
  loading?: boolean;
  saving?: boolean;
  onRefresh?: () => void;
  onSave?: () => void;
}

export default function SettingsHeader({
  loading = false,
  saving = false,
  onRefresh,
  onSave,
}: SettingsHeaderProps) {
  return (
    <div className="rounded-3xl bg-linear-to-r from-slate-900 via-indigo-700 to-purple-700 p-8 text-white shadow-xl">

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        {/* Left */}

        <div className="flex items-center gap-5">

          <div className="rounded-2xl bg-white/15 p-4 backdrop-blur-sm">

            <Settings className="h-9 w-9" />

          </div>

          <div>

            <h1 className="text-3xl font-bold">
              Settings
            </h1>

            <p className="mt-2 text-sm text-indigo-100">
              Manage your profile, security, notifications,
              integrations and organization preferences.
            </p>

          </div>

        </div>

        {/* Right */}

        <div className="flex flex-wrap gap-3">

          <button
            onClick={onRefresh}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-white/10 px-5 py-3 font-medium backdrop-blur-sm transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              className={`h-5 w-5 ${
                loading ? "animate-spin" : ""
              }`}
            />

            {loading ? "Refreshing..." : "Refresh"}
          </button>

          <button
            onClick={onSave}
            disabled={saving}
            className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-indigo-700 transition hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save
              className={`h-5 w-5 ${
                saving ? "animate-pulse" : ""
              }`}
            />

            {saving ? "Saving..." : "Save Changes"}
          </button>

        </div>

      </div>

    </div>
  );
}