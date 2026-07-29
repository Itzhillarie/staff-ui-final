"use client";

import { useState } from "react";
import { Save } from "lucide-react";

export interface NotificationSettingsData {
  email_notifications: boolean;
  push_notifications: boolean;
  idea_updates: boolean;
  peer_reviews: boolean;
  pm_reviews: boolean;
  implementation_updates: boolean;
  achievements: boolean;
}

interface NotificationSettingsProps {
  settings: NotificationSettingsData;
  loading?: boolean;
  onSave: (settings: NotificationSettingsData) => void;
}

export default function NotificationSettings({
  settings,
  loading = false,
  onSave,
}: NotificationSettingsProps) {
  const [form, setForm] =
    useState<NotificationSettingsData>(settings);

  function toggle(
    key: keyof NotificationSettingsData
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

  const options = [
    {
      key: "email_notifications",
      label: "Email Notifications",
      description:
        "Receive notifications through email.",
    },
    {
      key: "push_notifications",
      label: "Push Notifications",
      description:
        "Receive browser push notifications.",
    },
    {
      key: "idea_updates",
      label: "Idea Updates",
      description:
        "Notifications when ideas are updated.",
    },
    {
      key: "peer_reviews",
      label: "Peer Reviews",
      description:
        "Notifications about peer reviews.",
    },
    {
      key: "pm_reviews",
      label: "Product Manager Reviews",
      description:
        "Notifications from product managers.",
    },
    {
      key: "implementation_updates",
      label: "Implementation Updates",
      description:
        "Project and task notifications.",
    },
    {
      key: "achievements",
      label: "Achievements & Rewards",
      description:
        "Gamification notifications.",
    },
  ] as const;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="border-b border-slate-200 p-6">

        <h2 className="text-2xl font-bold text-slate-800">
          Notification Settings
        </h2>

        <p className="mt-1 text-slate-500">
          Choose which notifications you want to receive.
        </p>

      </div>

      <div className="divide-y divide-slate-200">

        {options.map((option) => (

          <div
            key={option.key}
            className="flex items-center justify-between p-6"
          >

            <div>

              <h3 className="font-semibold text-slate-800">
                {option.label}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {option.description}
              </p>

            </div>

            <button
              onClick={() => toggle(option.key)}
              className={`relative h-7 w-14 rounded-full transition ${
                form[option.key]
                  ? "bg-indigo-600"
                  : "bg-slate-300"
              }`}
            >

              <span
                className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                  form[option.key]
                    ? "left-8"
                    : "left-1"
                }`}
              />

            </button>

          </div>

        ))}

      </div>

      <div className="border-t border-slate-200 p-6">

        <button
          onClick={() => onSave(form)}
          disabled={loading}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-60"
        >
          <Save className="h-5 w-5" />

          {loading ? "Saving..." : "Save Settings"}

        </button>

      </div>

    </div>
  );
}