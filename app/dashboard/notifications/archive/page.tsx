"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  NotificationHeader,
  NotificationList,
  LoadingNotifications,
} from "@/app/components/notifications";

import {
  getArchivedNotifications,
  restoreNotification,
  deleteNotification,
} from "@/app/lib/notification";

import type { Notification } from "@/app/components/notifications";

export default function ArchivedNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadArchived() {
    try {
      setLoading(true);

      const data = await getArchivedNotifications();

      setNotifications(data);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to load archived notifications."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadArchived();
  }, []);

  async function handleRestore(id: string) {
    try {
      await restoreNotification(id);

      setNotifications((prev) =>
        prev.filter((item) => item.id !== id)
      );

      toast.success("Notification restored.");
    } catch {
      toast.error("Unable to restore notification.");
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteNotification(id);

      setNotifications((prev) =>
        prev.filter((item) => item.id !== id)
      );

      toast.success("Notification permanently deleted.");
    } catch {
      toast.error("Unable to delete notification.");
    }
  }

  if (loading) {
    return (
      <LoadingNotifications message="Loading archived notifications..." />
    );
  }

  return (
    <div className="space-y-8">

      <NotificationHeader
        total={notifications.length}
        unread={0}
      />

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <div className="mb-6 flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold text-slate-800">
              Archived Notifications
            </h2>

            <p className="mt-1 text-slate-500">
              Notifications you have archived.
            </p>

          </div>

        </div>

        <NotificationList
          notifications={notifications}
          onArchive={handleRestore}
          onDelete={handleDelete}
        />

      </div>

    </div>
  );
}
