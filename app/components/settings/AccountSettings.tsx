"use client";

import { Globe, Languages, Clock } from "lucide-react";

export interface AccountSettingsData {
  language: string;
  timezone: string;
  date_format: string;
}

interface AccountSettingsProps {
  settings: AccountSettingsData;
  onChange: (
    field: keyof AccountSettingsData,
    value: string
  ) => void;
}

export default function AccountSettings({
  settings,
  onChange,
}: AccountSettingsProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}

      <div className="border-b border-slate-200 p-6">

        <h2 className="text-2xl font-bold text-slate-800">
          Account Preferences
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Customize your account preferences and regional settings.
        </p>

      </div>

      {/* Body */}

      <div className="space-y-8 p-8">

        {/* Language */}

        <div>

          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-600">

            <Languages className="h-4 w-4" />

            Language

          </label>

          <select
            value={settings.language}
            onChange={(e) =>
              onChange("language", e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="en">English</option>
            <option value="sw">Swahili</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>

        </div>

        {/* Timezone */}

        <div>

          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-600">

            <Clock className="h-4 w-4" />

            Time Zone

          </label>

          <select
            value={settings.timezone}
            onChange={(e) =>
              onChange("timezone", e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="Africa/Nairobi">
              Africa/Nairobi (EAT)
            </option>

            <option value="UTC">
              UTC
            </option>

            <option value="Europe/London">
              Europe/London
            </option>

            <option value="America/New_York">
              America/New_York
            </option>

            <option value="Asia/Dubai">
              Asia/Dubai
            </option>

          </select>

        </div>

        {/* Date Format */}

        <div>

          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-600">

            <Globe className="h-4 w-4" />

            Date Format

          </label>

          <select
            value={settings.date_format}
            onChange={(e) =>
              onChange("date_format", e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="DD/MM/YYYY">
              DD/MM/YYYY
            </option>

            <option value="MM/DD/YYYY">
              MM/DD/YYYY
            </option>

            <option value="YYYY-MM-DD">
              YYYY-MM-DD
            </option>

          </select>

        </div>

      </div>

    </div>
  );
}