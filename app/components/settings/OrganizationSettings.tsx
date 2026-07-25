"use client";

import {
  Building2,
  Globe,
  MapPin,
  Users,
} from "lucide-react";

export interface OrganizationSettingsData {
  organizationName: string;
  department: string;
  location: string;
  timezone: string;
  website: string;
}

interface OrganizationSettingsProps {
  settings: OrganizationSettingsData;
  onChange: (
    field: keyof OrganizationSettingsData,
    value: string
  ) => void;
}

export default function OrganizationSettings({
  settings,
  onChange,
}: OrganizationSettingsProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}

      <div className="border-b border-slate-200 p-6">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-emerald-100 p-3">
            <Building2 className="h-6 w-6 text-emerald-600" />
          </div>

          <div>

            <h2 className="text-2xl font-bold text-slate-800">
              Organization Settings
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Configure your organization information.
            </p>

          </div>

        </div>

      </div>

      {/* Body */}

      <div className="space-y-6 p-8">

        {/* Organization Name */}

        <div>

          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-600">
            <Building2 className="h-4 w-4" />
            Organization Name
          </label>

          <input
            value={settings.organizationName}
            onChange={(e) =>
              onChange("organizationName", e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />

        </div>

        {/* Department */}

        <div>

          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-600">
            <Users className="h-4 w-4" />
            Department
          </label>

          <input
            value={settings.department}
            onChange={(e) =>
              onChange("department", e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />

        </div>

        {/* Location */}

        <div>

          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-600">
            <MapPin className="h-4 w-4" />
            Location
          </label>

          <input
            value={settings.location}
            onChange={(e) =>
              onChange("location", e.target.value)
            }
            placeholder="Nairobi, Kenya"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />

        </div>

        {/* Timezone */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-600">
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

          </select>

        </div>

        {/* Website */}

        <div>

          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-600">
            <Globe className="h-4 w-4" />
            Website
          </label>

          <input
            type="url"
            value={settings.website}
            onChange={(e) =>
              onChange("website", e.target.value)
            }
            placeholder="https://example.com"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />

        </div>

      </div>

    </div>
  );
}