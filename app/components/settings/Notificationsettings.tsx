"use client";

import { Bell } from "lucide-react";

export interface NotificationSettingsData {
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
}

interface NotificationSettingsProps {
  settings: NotificationSettingsData;
  onChange: (settings: NotificationSettingsData) => void;
}

export default function NotificationSettings({
  settings,
  onChange,
}: NotificationSettingsProps) {
  const toggle = (
    key: keyof NotificationSettingsData
  ) => {
    onChange({
      ...settings,
      [key]: !settings[key],
    });
  };

  const options = [
    {
      key: "emailNotifications",
      label: "Email Notifications",
    },
    {
      key: "pushNotifications",
      label: "Push Notifications",
    },
    {
      key: "smsNotifications",
      label: "SMS Notifications",
    },
  ] as const;

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">

      {/* Header */}

      <div className="mb-6 flex items-center gap-3">

        <div className="rounded-lg bg-indigo-100 p-3">
          <Bell
            size={22}
            className="text-indigo-600"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold">
            Notification Settings
          </h2>

          <p className="text-sm text-slate-500">
            Choose how you want to receive notifications.
          </p>
        </div>

      </div>

      {/* Settings */}

      <div className="space-y-4">

        {options.map((item) => (

          <div
            key={item.key}
            className="flex items-center justify-between rounded-lg border p-4"
          >

            <span className="font-medium">
              {item.label}
            </span>

            <button
              onClick={() => toggle(item.key)}
              className={`h-7 w-14 rounded-full transition ${
                settings[item.key]
                  ? "bg-green-600"
                  : "bg-slate-300"
              }`}
            >
              <div
                className={`h-6 w-6 rounded-full bg-white transition ${
                  settings[item.key]
                    ? "translate-x-7"
                    : "translate-x-0"
                }`}
              />
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}