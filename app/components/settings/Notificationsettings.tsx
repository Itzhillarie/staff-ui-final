"use client";

import {
  Bell,
  Mail,
  Smartphone,
  Monitor,
  CalendarDays,
} from "lucide-react";

export interface NotificationSettingsData {
  emailNotifications: boolean;
  pushNotifications: boolean;
  inAppNotifications: boolean;
  weeklyDigest: boolean;
  reminderFrequency: "daily" | "weekly" | "monthly";
}

interface NotificationSettingsProps {
  settings: NotificationSettingsData;
  onToggle: (
    field: keyof Omit<
      NotificationSettingsData,
      "reminderFrequency"
    >,
    value: boolean
  ) => void;

  onFrequencyChange: (
    frequency: NotificationSettingsData["reminderFrequency"]
  ) => void;
}

export default function NotificationSettings({
  settings,
  onToggle,
  onFrequencyChange,
}: NotificationSettingsProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}

      <div className="border-b border-slate-200 p-6">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-amber-100 p-3">

            <Bell className="h-6 w-6 text-amber-600" />

          </div>

          <div>

            <h2 className="text-2xl font-bold text-slate-800">
              Notification Settings
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Control how and when you receive notifications.
            </p>

          </div>

        </div>

      </div>

      {/* Body */}

      <div className="space-y-5 p-8">

        {/* Email */}

        <label className="flex items-center justify-between rounded-2xl border border-slate-200 p-5">

          <div className="flex items-center gap-4">

            <div className="rounded-xl bg-blue-100 p-3">

              <Mail className="h-5 w-5 text-blue-600" />

            </div>

            <div>

              <h3 className="font-semibold text-slate-800">
                Email Notifications
              </h3>

              <p className="text-sm text-slate-500">
                Receive updates via email.
              </p>

            </div>

          </div>

          <input
            type="checkbox"
            checked={settings.emailNotifications}
            onChange={(e) =>
              onToggle(
                "emailNotifications",
                e.target.checked
              )
            }
            className="h-5 w-5"
          />

        </label>

        {/* Push */}

        <label className="flex items-center justify-between rounded-2xl border border-slate-200 p-5">

          <div className="flex items-center gap-4">

            <div className="rounded-xl bg-green-100 p-3">

              <Smartphone className="h-5 w-5 text-green-600" />

            </div>

            <div>

              <h3 className="font-semibold text-slate-800">
                Push Notifications
              </h3>

              <p className="text-sm text-slate-500">
                Receive push notifications.
              </p>

            </div>

          </div>

          <input
            type="checkbox"
            checked={settings.pushNotifications}
            onChange={(e) =>
              onToggle(
                "pushNotifications",
                e.target.checked
              )
            }
            className="h-5 w-5"
          />

        </label>

        {/* In-App */}

        <label className="flex items-center justify-between rounded-2xl border border-slate-200 p-5">

          <div className="flex items-center gap-4">

            <div className="rounded-xl bg-purple-100 p-3">

              <Monitor className="h-5 w-5 text-purple-600" />

            </div>

            <div>

              <h3 className="font-semibold text-slate-800">
                In-App Notifications
              </h3>

              <p className="text-sm text-slate-500">
                Show notifications inside the application.
              </p>

            </div>

          </div>

          <input
            type="checkbox"
            checked={settings.inAppNotifications}
            onChange={(e) =>
              onToggle(
                "inAppNotifications",
                e.target.checked
              )
            }
            className="h-5 w-5"
          />

        </label>

        {/* Weekly Digest */}

        <label className="flex items-center justify-between rounded-2xl border border-slate-200 p-5">

          <div className="flex items-center gap-4">

            <div className="rounded-xl bg-indigo-100 p-3">

              <CalendarDays className="h-5 w-5 text-indigo-600" />

            </div>

            <div>

              <h3 className="font-semibold text-slate-800">
                Weekly Digest
              </h3>

              <p className="text-sm text-slate-500">
                Receive a weekly summary email.
              </p>

            </div>

          </div>

          <input
            type="checkbox"
            checked={settings.weeklyDigest}
            onChange={(e) =>
              onToggle(
                "weeklyDigest",
                e.target.checked
              )
            }
            className="h-5 w-5"
          />

        </label>

        {/* Reminder Frequency */}

        <div className="rounded-2xl border border-slate-200 p-5">

          <h3 className="mb-4 font-semibold text-slate-800">
            Reminder Frequency
          </h3>

          <select
            value={settings.reminderFrequency}
            onChange={(e) =>
              onFrequencyChange(
                e.target.value as NotificationSettingsData["reminderFrequency"]
              )
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>

        </div>

      </div>

    </div>
  );
}