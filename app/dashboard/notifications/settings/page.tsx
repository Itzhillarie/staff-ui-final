"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Settings,
  Bell,
} from "lucide-react";

import NotificationSettings from "@/app/components/notifications/NotificationSettings";

export default function NotificationSettingsPage() {
  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-wrap items-center justify-between gap-4">

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-indigo-100 p-4">

            <Settings
              size={32}
              className="text-indigo-600"
            />

          </div>

          <div>

            <h1 className="text-4xl font-bold text-slate-800">
              Notification Settings
            </h1>

            <p className="mt-2 text-slate-500">
              Customize how and when you receive
              notifications throughout the Innovation
              Management System.
            </p>

          </div>

        </div>

        <Link
          href="/dashboard/notifications"
          className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 font-medium transition hover:bg-slate-100"
        >
          <ArrowLeft size={18} />
          Back to Notifications
        </Link>

      </div>

      {/* Information Banner */}

      <div className="flex items-start gap-4 rounded-2xl border border-blue-200 bg-blue-50 p-6">

        <Bell
          size={28}
          className="mt-1 text-blue-600"
        />

        <div>

          <h2 className="text-lg font-semibold text-slate-800">
            Notification Preferences
          </h2>

          <p className="mt-2 leading-7 text-slate-600">
            These settings determine how you receive
            alerts for ideas, implementation projects,
            assigned tasks, Product Manager reviews,
            approvals, comments, system announcements,
            badges, and security events.
          </p>

        </div>

      </div>

      {/* Settings Component */}

      <NotificationSettings />

      {/* Footer */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">

        <h3 className="text-lg font-semibold text-slate-800">
          Changes are saved to your account
        </h3>

        <p className="mt-2 text-slate-500">
          Your notification preferences will be applied
          across all modules including the Idea Board,
          Product Manager Review, Implementation,
          Dashboard, and future mobile notifications.
        </p>

      </div>

    </div>
  );
}