"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, Bell, Settings } from "lucide-react";
import { toast } from "sonner";

import {
  LoadingNotifications,
  NotificationSettings,
} from "@/app/components/notifications";
import {
  getNotificationSettings,
  updateNotificationSettings,
} from "@/app/lib/notification";
import type { NotificationSettingsData } from "@/app/components/notifications";

const defaultSettings: NotificationSettingsData = {
  email_notifications: true,
  push_notifications: true,
  idea_updates: true,
  peer_reviews: true,
  pm_reviews: true,
  implementation_updates: true,
  achievements: true,
};

export default function NotificationSettingsPage() {
  const [settings, setSettings] =
    useState<NotificationSettingsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function loadSettings() {
    try {
      setLoading(true);
      const data = await getNotificationSettings();
      setSettings({
        ...defaultSettings,
        ...data,
      });
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to load notification settings."
      );
      setSettings(defaultSettings);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadSettings();
  }, []);

  async function handleSave(values: NotificationSettingsData) {
    try {
      setSaving(true);
      await updateNotificationSettings(values);
      setSettings(values);
      toast.success("Notification settings updated successfully.");
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update notification settings."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading || !settings) {
    return (
      <LoadingNotifications message="Loading notification settings..." />
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="rounded-2xl bg-cyan-100 p-4">
            <Settings size={32} className="text-cyan-600" />
          </div>

          <div>
            <h1 className="text-4xl font-bold text-slate-800">
              Notification Settings
            </h1>
            <p className="mt-2 text-slate-500">
              Customize how and when you receive notifications throughout the
              Innovation Management System.
            </p>
          </div>
        </div>

        <Link
          href="/dashboard/notifications"
          className="flex items-center gap-2 rounded-xl border border-slate-300 bg-cyan px-5 py-3 font-medium transition hover:bg-cyan-100"
        >
          <ArrowLeft size={18} />
          Back to Notifications
        </Link>
      </div>

      <div className="flex items-start gap-4 rounded-2xl border border-blue-200 bg-cyan-50 p-6">
        <Bell size={28} className="mt-1 text-blue-600" />
        <div>
          <h2 className="text-lg font-semibold text-slate-300">
            Notification Preferences
          </h2>
          <p className="mt-2 leading-7 text-slate-600">
            These settings determine how you receive alerts for ideas,
            implementation projects, assigned tasks, Product Manager reviews,
            approvals, comments, system announcements, badges, and security
            events.
          </p>
        </div>
      </div>

      <NotificationSettings
        settings={settings}
        loading={saving}
        onSave={handleSave}
      />
    </div>
  );
}
