"use client";

import { Shield, Key, Smartphone } from "lucide-react";

export interface SecuritySettingsData {
  twoFactorEnabled: boolean;
  lastPasswordChange: string;
}

interface SecuritySettingsProps {
  security: SecuritySettingsData;
  onChangePassword: () => void;
  onToggleTwoFactor: () => void;
}

export default function SecuritySettings({
  security,
  onChangePassword,
  onToggleTwoFactor,
}: SecuritySettingsProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">

      {/* Header */}

      <div className="mb-6 flex items-center gap-3">

        <div className="rounded-lg bg-indigo-100 p-3">
          <Shield
            size={22}
            className="text-indigo-600"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold">
            Security Settings
          </h2>

          <p className="text-sm text-slate-500">
            Manage your account security.
          </p>
        </div>

      </div>

      {/* Password */}

      <div className="mb-4 flex items-center justify-between rounded-lg border p-4">

        <div className="flex items-center gap-3">

          <Key className="text-indigo-600" />

          <div>
            <h3 className="font-medium">
              Password
            </h3>

            <p className="text-sm text-slate-500">
              Last changed: {security.lastPasswordChange}
            </p>
          </div>

        </div>

        <button
          onClick={onChangePassword}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
        >
          Change
        </button>

      </div>

      {/* Two Factor */}

      <div className="flex items-center justify-between rounded-lg border p-4">

        <div className="flex items-center gap-3">

          <Smartphone className="text-green-600" />

          <div>
            <h3 className="font-medium">
              Two-Factor Authentication
            </h3>

            <p className="text-sm text-slate-500">
              {security.twoFactorEnabled
                ? "Enabled"
                : "Disabled"}
            </p>
          </div>

        </div>

        <button
          onClick={onToggleTwoFactor}
          className={`rounded-lg px-4 py-2 text-white ${
            security.twoFactorEnabled
              ? "bg-red-600 hover:bg-red-700"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {security.twoFactorEnabled
            ? "Disable"
            : "Enable"}
        </button>

      </div>

    </div>
  );
}