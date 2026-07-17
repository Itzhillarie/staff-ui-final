"use client";

import { Palette } from "lucide-react";

export interface AppearanceSettingsData {
  theme: "Light" | "Dark" | "System";
  compactMode: boolean;
}

interface AppearanceSettingsProps {
  settings: AppearanceSettingsData;
  onChange: (settings: AppearanceSettingsData) => void;
}

export default function AppearanceSettings({
  settings,
  onChange,
}: AppearanceSettingsProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">

      {/* Header */}

      <div className="mb-6 flex items-center gap-3">

        <div className="rounded-lg bg-indigo-100 p-3">
          <Palette
            size={22}
            className="text-indigo-600"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold">
            Appearance
          </h2>

          <p className="text-sm text-slate-500">
            Customize the look and feel of your dashboard.
          </p>
        </div>

      </div>

      {/* Theme */}

      <div className="mb-5">

        <label className="mb-2 block text-sm font-medium text-slate-700">
          Theme
        </label>

        <select
          value={settings.theme}
          onChange={(e) =>
            onChange({
              ...settings,
              theme: e.target.value as
                | "Light"
                | "Dark"
                | "System",
            })
          }
          className="w-full rounded-lg border p-3"
        >
          <option value="Light">Light</option>
          <option value="Dark">Dark</option>
          <option value="System">System Default</option>
        </select>

      </div>

      {/* Compact Mode */}

      <div className="flex items-center justify-between rounded-lg border p-4">

        <div>
          <h3 className="font-medium">
            Compact Mode
          </h3>

          <p className="text-sm text-slate-500">
            Reduce spacing for a denser layout.
          </p>
        </div>

        <input
          type="checkbox"
          checked={settings.compactMode}
          onChange={() =>
            onChange({
              ...settings,
              compactMode: !settings.compactMode,
            })
          }
          className="h-5 w-5"
        />

      </div>

    </div>
  );
}