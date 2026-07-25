"use client";

import {
  Shield,
  KeyRound,
  Smartphone,
  LogOut,
  ChevronRight,
} from "lucide-react";

interface SecuritySettingsProps {
  twoFactorEnabled: boolean;
  activeSessions: number;

  onChangePassword: () => void;
  onManageTwoFactor: () => void;
  onLogoutOtherSessions: () => void;
}

export default function SecuritySettings({
  twoFactorEnabled,
  activeSessions,
  onChangePassword,
  onManageTwoFactor,
  onLogoutOtherSessions,
}: SecuritySettingsProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}

      <div className="border-b border-slate-200 p-6">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-indigo-100 p-3">
            <Shield className="h-6 w-6 text-indigo-600" />
          </div>

          <div>

            <h2 className="text-2xl font-bold text-slate-800">
              Security
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Manage your account security and authentication.
            </p>

          </div>

        </div>

      </div>

      {/* Body */}

      <div className="divide-y divide-slate-100">

        {/* Password */}

        <button
          onClick={onChangePassword}
          className="flex w-full items-center justify-between p-6 transition hover:bg-slate-50"
        >

          <div className="flex items-center gap-4">

            <div className="rounded-xl bg-blue-100 p-3">
              <KeyRound className="h-5 w-5 text-blue-600" />
            </div>

            <div className="text-left">

              <h3 className="font-semibold text-slate-800">
                Change Password
              </h3>

              <p className="text-sm text-slate-500">
                Update your account password.
              </p>

            </div>

          </div>

          <ChevronRight className="h-5 w-5 text-slate-400" />

        </button>

        {/* Two Factor */}

        <button
          onClick={onManageTwoFactor}
          className="flex w-full items-center justify-between p-6 transition hover:bg-slate-50"
        >

          <div className="flex items-center gap-4">

            <div className="rounded-xl bg-green-100 p-3">
              <Smartphone className="h-5 w-5 text-green-600" />
            </div>

            <div className="text-left">

              <h3 className="font-semibold text-slate-800">
                Two-Factor Authentication
              </h3>

              <p className="text-sm text-slate-500">
                {twoFactorEnabled
                  ? "Enabled"
                  : "Disabled"}
              </p>

            </div>

          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              twoFactorEnabled
                ? "bg-green-100 text-green-700"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            {twoFactorEnabled ? "ON" : "OFF"}
          </span>

        </button>

        {/* Sessions */}

        <div className="flex items-center justify-between p-6">

          <div className="flex items-center gap-4">

            <div className="rounded-xl bg-orange-100 p-3">
              <LogOut className="h-5 w-5 text-orange-600" />
            </div>

            <div>

              <h3 className="font-semibold text-slate-800">
                Active Sessions
              </h3>

              <p className="text-sm text-slate-500">
                {activeSessions} active session
                {activeSessions !== 1 && "s"}
              </p>

            </div>

          </div>

          <button
            onClick={onLogoutOtherSessions}
            className="rounded-xl bg-red-100 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-200"
          >
            Logout Others
          </button>

        </div>

      </div>

    </div>
  );
}