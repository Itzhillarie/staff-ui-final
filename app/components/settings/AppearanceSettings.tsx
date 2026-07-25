"use client";

import { Moon, Sun, Monitor, Palette } from "lucide-react";

export interface AppearanceSettingsData {
  theme: "light" | "dark" | "system";
  accentColor: string;
  compactMode: boolean;
  animations: boolean;
}

interface AppearanceSettingsProps {
  settings: AppearanceSettingsData;
  onThemeChange: (theme: AppearanceSettingsData["theme"]) => void;
  onAccentChange: (color: string) => void;
  onToggle: (
    field: "compactMode" | "animations",
    value: boolean
  ) => void;
}

const colors = [
  "#4F46E5",
  "#7C3AED",
  "#2563EB",
  "#059669",
  "#EA580C",
  "#DC2626",
];

export default function AppearanceSettings({
  settings,
  onThemeChange,
  onAccentChange,
  onToggle,
}: AppearanceSettingsProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}

      <div className="border-b border-slate-200 p-6">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-purple-100 p-3">
            <Palette className="h-6 w-6 text-purple-600" />
          </div>

          <div>

            <h2 className="text-2xl font-bold text-slate-800">
              Appearance
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Personalize the look and feel of your dashboard.
            </p>

          </div>

        </div>

      </div>

      <div className="space-y-8 p-8">

        {/* Theme */}

        <div>

          <h3 className="mb-4 font-semibold text-slate-800">
            Theme
          </h3>

          <div className="grid gap-4 md:grid-cols-3">

            <button
              onClick={() => onThemeChange("light")}
              className={`rounded-2xl border p-5 transition ${
                settings.theme === "light"
                  ? "border-indigo-600 bg-indigo-50"
                  : "border-slate-200 hover:border-indigo-300"
              }`}
            >
              <Sun className="mx-auto mb-3 h-8 w-8 text-yellow-500" />
              <p className="font-medium">Light</p>
            </button>

            <button
              onClick={() => onThemeChange("dark")}
              className={`rounded-2xl border p-5 transition ${
                settings.theme === "dark"
                  ? "border-indigo-600 bg-indigo-50"
                  : "border-slate-200 hover:border-indigo-300"
              }`}
            >
              <Moon className="mx-auto mb-3 h-8 w-8 text-slate-700" />
              <p className="font-medium">Dark</p>
            </button>

            <button
              onClick={() => onThemeChange("system")}
              className={`rounded-2xl border p-5 transition ${
                settings.theme === "system"
                  ? "border-indigo-600 bg-indigo-50"
                  : "border-slate-200 hover:border-indigo-300"
              }`}
            >
              <Monitor className="mx-auto mb-3 h-8 w-8 text-indigo-600" />
              <p className="font-medium">System</p>
            </button>

          </div>

        </div>

        {/* Accent Color */}

        <div>

          <h3 className="mb-4 font-semibold text-slate-800">
            Accent Color
          </h3>

          <div className="flex flex-wrap gap-4">

            {colors.map((color) => (
              <button
                key={color}
                onClick={() => onAccentChange(color)}
                className={`h-12 w-12 rounded-full border-4 transition ${
                  settings.accentColor === color
                    ? "border-slate-900"
                    : "border-transparent"
                }`}
                style={{ backgroundColor: color }}
              />
            ))}

          </div>

        </div>

        {/* Toggles */}

        <div className="space-y-5">

          <label className="flex items-center justify-between rounded-2xl border border-slate-200 p-5">

            <div>

              <h4 className="font-semibold text-slate-800">
                Compact Mode
              </h4>

              <p className="text-sm text-slate-500">
                Reduce spacing throughout the application.
              </p>

            </div>

            <input
              type="checkbox"
              checked={settings.compactMode}
              onChange={(e) =>
                onToggle(
                  "compactMode",
                  e.target.checked
                )
              }
              className="h-5 w-5"
            />

          </label>

          <label className="flex items-center justify-between rounded-2xl border border-slate-200 p-5">

            <div>

              <h4 className="font-semibold text-slate-800">
                Animations
              </h4>

              <p className="text-sm text-slate-500">
                Enable interface animations.
              </p>

            </div>

            <input
              type="checkbox"
              checked={settings.animations}
              onChange={(e) =>
                onToggle(
                  "animations",
                  e.target.checked
                )
              }
              className="h-5 w-5"
            />

          </label>

        </div>

      </div>

    </div>
  );
}