"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Archive, CheckCheck, Settings } from "lucide-react";
import { toast } from "sonner";

import {
  LoadingNotifications,
  NotificationFilters,
  NotificationHeader,
  NotificationList,
} from "@/app/components/notifications";
import { useRouter } from "next/navigation";
import {
  archiveNotification,
  deleteNotification,
  getNotifications,
  markAllAsRead,
  markAsRead,
} from "@/app/lib/notification";
import type { Notification } from "@/app/components/notifications";

function normalizeNotifications(
  data: Notification[] | { results?: Notification[] }
) {
  return Array.isArray(data) ? data : data.results ?? [];
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const router = useRouter();

  async function loadNotifications() {
    try {
      setLoading(true);
      const data = await getNotifications();
      setNotifications(normalizeNotifications(data));
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to load notifications."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadNotifications();
  }, []);

  const filteredNotifications = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return notifications.filter((notification) => {
      const matchesStatus =
        status === "all" ||
        (status === "read" && notification.is_read) ||
        (status === "unread" && !notification.is_read);

      if (!matchesStatus) {
        return false;
      }

      if (!keyword) {
        return true;
      }

      return [
        notification.title,
        notification.message,
        notification.type,
      ]
        .join(" ")
        .toLowerCase()
        .includes(keyword);
    });
  }, [notifications, search, status]);

  const unread = notifications.filter(
    (notification) => !notification.is_read
  ).length;

  async function handleRead(id: string) {
    try {
      await markAsRead(id);
      setNotifications((current) =>
        current.map((notification) =>
          notification.id === id
            ? { ...notification, is_read: true }
            : notification
        )
      );
    } catch {
      toast.error("Unable to mark notification as read.");
    }
  }

  async function handleReadAll() {
    try {
      await markAllAsRead();
      setNotifications((current) =>
        current.map((notification) => ({
          ...notification,
          is_read: true,
        }))
      );
      toast.success("All notifications marked as read.");
    } catch {
      toast.error("Unable to mark all notifications as read.");
    }
  }

  async function handleArchive(id: string) {
    try {
      await archiveNotification(id);
      setNotifications((current) =>
        current.filter((notification) => notification.id !== id)
      );
      toast.success("Notification archived.");
    } catch {
      toast.error("Unable to archive notification.");
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteNotification(id);
      setNotifications((current) =>
        current.filter((notification) => notification.id !== id)
      );
      toast.success("Notification deleted.");
    } catch {
      toast.error("Unable to delete notification.");
    }
  }

  if (loading) {
    return <LoadingNotifications />;
  }

  return (
    <div className="space-y-8">
      <NotificationHeader total={notifications.length} unread={unread} />

      <div className="flex flex-wrap justify-end gap-3">
        <button
          onClick={handleReadAll}
          disabled={unread === 0}
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-cyan px-5 py-3 font-semibold text-slate-700 transition hover:bg-cyan-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <CheckCheck size={18} />
          Mark all read
        </button>
        <Link
          href="/dashboard/notifications/archive"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-cyan px-5 py-3 font-semibold text-slate-700 transition hover:bg-cyan-50"
        >
          <Archive size={18} />
          Archive
        </Link>
        <Link
          href="/dashboard/notifications/settings"
          className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-5 py-3 font-semibold text-white transition hover:bg-cyan-700"
        >
          <Settings size={18} />
          Settings
        </Link>
      </div>

      <NotificationFilters
        search={search}
        status={status}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
      />

      <NotificationList
        notifications={filteredNotifications}
        onRead={handleRead}
        onArchive={handleArchive}
        onDelete={handleDelete}
      />
      <div className="mt-8 flex items-center justify-between border-t pt-6">
  <button
    onClick={() => router.push("/dashboard/gamification")}
    className="rounded-xl bg-cyan-600 px-5 py-2 text-white hover:bg-cyan-700"
  >
    ← Previous
  </button>

  <button
    
    className="rounded-xl bg-slate-300 px-5 py-2 text-white cursor-not-allowed"
  >
    Next →
  </button>
</div>
    </div>
    
  );
}
