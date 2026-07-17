"use client";

import { Building2 } from "lucide-react";

export interface OrganizationData {
  name: string;
  email: string;
  phone: string;
  website: string;
  address: string;
}

interface OrganizationSettingsProps {
  organization: OrganizationData;
  onChange: (organization: OrganizationData) => void;
  onSave: () => void;
}

export default function OrganizationSettings({
  organization,
  onChange,
  onSave,
}: OrganizationSettingsProps) {
  const handleChange = (
    field: keyof OrganizationData,
    value: string
  ) => {
    onChange({
      ...organization,
      [field]: value,
    });
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">

      {/* Header */}

      <div className="mb-6 flex items-center gap-3">

        <div className="rounded-lg bg-indigo-100 p-3">
          <Building2
            size={22}
            className="text-indigo-600"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold">
            Organization Settings
          </h2>

          <p className="text-sm text-slate-500">
            Manage your organization's information.
          </p>
        </div>

      </div>

      {/* Form */}

      <div className="grid gap-4 md:grid-cols-2">

        <input
          type="text"
          placeholder="Organization Name"
          value={organization.name}
          onChange={(e) =>
            handleChange("name", e.target.value)
          }
          className="rounded-lg border p-3"
        />

        <input
          type="email"
          placeholder="Organization Email"
          value={organization.email}
          onChange={(e) =>
            handleChange("email", e.target.value)
          }
          className="rounded-lg border p-3"
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={organization.phone}
          onChange={(e) =>
            handleChange("phone", e.target.value)
          }
          className="rounded-lg border p-3"
        />

        <input
          type="url"
          placeholder="Website"
          value={organization.website}
          onChange={(e) =>
            handleChange("website", e.target.value)
          }
          className="rounded-lg border p-3"
        />

      </div>

      <div className="mt-4">

        <textarea
          rows={4}
          placeholder="Organization Address"
          value={organization.address}
          onChange={(e) =>
            handleChange("address", e.target.value)
          }
          className="w-full rounded-lg border p-3"
        />

      </div>

      {/* Actions */}

      <div className="mt-6 flex justify-end">

        <button
          onClick={onSave}
          className="rounded-lg bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700"
        >
          Save Changes
        </button>

      </div>

    </div>
  );
}