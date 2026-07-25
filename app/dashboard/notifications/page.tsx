"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  NotificationSettings,
  LoadingNotifications,
} from "@/app/components/notifications";

import {
  getNotificationSettings,
  updateNotificationSettings,
} from "@/app/lib/notification";

import type { NotificationSettingsData } from "@/app/components/notifications";

export default function NotificationSettingsPage() {
  const [settings, setSettings] =
    useState<NotificationSettingsData | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      setLoading(true);

      const data = await getNotificationSettings();

      setSettings(data);
    } catch (error: any) {
      toast.error(
        error?.body?.message ??
          "Failed to load notification settings."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(
    values: NotificationSettingsData
  ) {
    try {
      setSaving(true);

      await updateNotificationSettings(values);

      setSettings(values);

      toast.success(
        "Notification settings updated successfully."
      );
    } catch (error: any) {
      toast.error(
        error?.body?.message ??
          "Failed to update notification settings."
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

      <div>

        <h1 className="text-3xl font-bold text-slate-800">
          Notification Settings
        </h1>

        <p className="mt-2 text-slate-500">
          Manage how and when you receive notifications across
          the Idea & Innovation Board.
        </p>

      </div>

      <NotificationSettings
        settings={settings}
        loading={saving}
        onSave={handleSave}
      />

    </div>
  );
}