"use client";

import { useState } from "react";
import {
  Bell,
  Mail,
  Smartphone,
  CalendarClock,
  Lightbulb,
  FolderKanban,
  ClipboardList,
  Award,
  Shield,
  Save,
} from "lucide-react";

export default function NotificationSettings() {
  const [settings, setSettings] = useState({
    email: true,
    inApp: true,
    push: false,
    taskAssignments: true,
    taskReminders: true,
    ideaUpdates: true,
    projectUpdates: true,
    reviewNotifications: true,
    gamification: true,
    announcements: true,
    securityAlerts: true,
    weeklyDigest: false,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const options = [
    {
      key: "email",
      title: "Email Notifications",
      description: "Receive notifications through email.",
      icon: Mail,
    },
    {
      key: "inApp",
      title: "In-App Notifications",
      description: "Show notifications inside the system.",
      icon: Bell,
    },
    {
      key: "push",
      title: "Push Notifications",
      description: "Receive browser push notifications.",
      icon: Smartphone,
    },
    {
      key: "taskAssignments",
      title: "Task Assignments",
      description: "Notify when tasks are assigned to you.",
      icon: ClipboardList,
    },
    {
      key: "taskReminders",
      title: "Task Reminders",
      description: "Notify before task due dates.",
      icon: CalendarClock,
    },
    {
      key: "ideaUpdates",
      title: "Idea Updates",
      description: "Idea approvals, comments and likes.",
      icon: Lightbulb,
    },
    {
      key: "projectUpdates",
      title: "Project Updates",
      description: "Project progress and milestones.",
      icon: FolderKanban,
    },
    {
      key: "reviewNotifications",
      title: "Review Notifications",
      description: "Product Manager review activities.",
      icon: ClipboardList,
    },
    {
      key: "gamification",
      title: "Gamification",
      description: "Points, badges and achievements.",
      icon: Award,
    },
    {
      key: "announcements",
      title: "System Announcements",
      description: "Maintenance and organization news.",
      icon: Bell,
    },
    {
      key: "securityAlerts",
      title: "Security Alerts",
      description: "Password changes and login alerts.",
      icon: Shield,
    },
    {
      key: "weeklyDigest",
      title: "Weekly Digest",
      description: "Receive a weekly notification summary.",
      icon: Mail,
    },
  ] as const;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}

      <div className="border-b border-slate-200 p-6">

        <h2 className="text-2xl font-bold text-slate-800">
          Notification Settings
        </h2>

        <p className="mt-2 text-slate-500">
          Choose which notifications you would like to receive.
        </p>

      </div>

      {/* Settings */}

      <div className="divide-y divide-slate-100">

        {options.map((option) => {
          const Icon = option.icon;

          return (
            <div
              key={option.key}
              className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between"
            >
              <div className="flex items-start gap-4">

                <div className="rounded-xl bg-indigo-100 p-3">
                  <Icon
                    size={22}
                    className="text-indigo-600"
                  />
                </div>

                <div>

                  <h3 className="font-semibold text-slate-800">
                    {option.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {option.description}
                  </p>

                </div>

              </div>

              {/* Toggle */}

              <button
                onClick={() => toggleSetting(option.key)}
                className={`relative h-7 w-14 rounded-full transition ${
                  settings[option.key]
                    ? "bg-indigo-600"
                    : "bg-slate-300"
                }`}
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                    settings[option.key]
                      ? "left-8"
                      : "left-1"
                  }`}
                />
              </button>

            </div>
          );
        })}

      </div>

      {/* Footer */}

      <div className="flex justify-end border-t border-slate-200 bg-slate-50 p-6">

        <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700">
          <Save size={18} />
          Save Settings
        </button>

      </div>

    </div>
  );
}