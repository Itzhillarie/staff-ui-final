"use client";

import { Mail, UserCircle } from "lucide-react";

export interface Account {
  username: string;
  email: string;
  role: string;
  accountStatus: string;
}

interface AccountSettingsProps {
  account: Account;
  onSave: (account: Account) => void;
}

export default function AccountSettings({
  account,
  onSave,
}: AccountSettingsProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">

      {/* Header */}

      <div className="mb-6 flex items-center gap-3">

        <div className="rounded-lg bg-indigo-100 p-3">
          <UserCircle
            size={22}
            className="text-indigo-600"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold">
            Account Settings
          </h2>

          <p className="text-sm text-slate-500">
            View your account information.
          </p>
        </div>

      </div>

      {/* Details */}

      <div className="grid gap-4 md:grid-cols-2">

        <div>
          <label className="mb-1 block text-sm text-slate-500">
            Username
          </label>

          <input
            value={account.username}
            readOnly
            className="w-full rounded-lg border bg-slate-100 p-3"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-slate-500">
            Email
          </label>

          <div className="relative">

            <Mail
              size={18}
              className="absolute left-3 top-3.5 text-slate-400"
            />

            <input
              value={account.email}
              readOnly
              className="w-full rounded-lg border bg-slate-100 py-3 pl-10 pr-3"
            />

          </div>

        </div>

        <div>
          <label className="mb-1 block text-sm text-slate-500">
            Role
          </label>

          <input
            value={account.role}
            readOnly
            className="w-full rounded-lg border bg-slate-100 p-3"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm text-slate-500">
            Account Status
          </label>

          <input
            value={account.accountStatus}
            readOnly
            className="w-full rounded-lg border bg-slate-100 p-3"
          />
        </div>

      </div>

      {/* Footer */}

      <div className="mt-6 flex justify-end">

        <button
          onClick={() => onSave(account)}
          className="rounded-lg bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700"
        >
          Refresh
        </button>

      </div>

    </div>
  );
}