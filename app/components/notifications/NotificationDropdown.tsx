"use client";

import Link from "next/link";
import {
  Bell,
  CheckCheck,
  Eye,
  Archive,
  Lightbulb,
  FolderKanban,
  ClipboardList,
  Award,
  Settings,
  MessageSquare,
} from "lucide-react";

interface Notification {
  id: number;
  title: string;
  message: string;
  type:
    | "Idea"
    | "Project"
    | "Task"
    | "Review"
    | "Gamification"
    | "System";
  time: string;
  read: boolean;
}

interface NotificationDropdownProps {
  open: boolean;
  notifications: Notification[];
  onClose: () => void;
  onView: (notification: Notification) => void;
  onMarkAllRead: () => void;
  onArchive: (notification: Notification) => void;
}

export default function NotificationDropdown({
  open,
  notifications,
  onClose,
  onView,
  onMarkAllRead,
  onArchive,
}: NotificationDropdownProps) {
  if (!open) return null;

  const icons = {
    Idea: Lightbulb,
    Project: FolderKanban,
    Task: ClipboardList,
    Review: MessageSquare,
    Gamification: Award,
    System: Settings,
  };

  const unreadCount = notifications.filter(
    (n) => !n.read
  ).length;

  return (
    <>
      {/* Backdrop */}

      <div
        onClick={onClose}
        className="fixed inset-0 z-40"
      />

      {/* Dropdown */}

      <div className="absolute right-0 top-14 z-50 w-105 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b p-5">

          <div>

            <h2 className="text-lg font-bold text-slate-800">
              Notifications
            </h2>

            <p className="text-sm text-slate-500">
              {unreadCount} unread notification
              {unreadCount !== 1 ? "s" : ""}
            </p>

          </div>

          <button
            onClick={onMarkAllRead}
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-indigo-600 transition hover:bg-indigo-50"
          >
            <CheckCheck size={18} />
            Mark all
          </button>

        </div>

        {/* Notification List */}

        <div className="max-h-105 overflow-y-auto">

          {notifications.length === 0 ? (

            <div className="flex flex-col items-center justify-center px-6 py-12">

              <Bell
                size={46}
                className="text-slate-300"
              />

              <p className="mt-4 font-semibold text-slate-600">
                No notifications
              </p>

              <p className="text-sm text-slate-500">
                You're all caught up.
              </p>

            </div>

          ) : (

            notifications.map((notification) => {

              const Icon = icons[notification.type];

              return (
                <div
                  key={notification.id}
                  className={`border-b p-4 transition hover:bg-slate-50 ${
                    !notification.read
                      ? "bg-indigo-50/40"
                      : ""
                  }`}
                >
                  <div className="flex gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100">
                      <Icon
                        size={20}
                        className="text-indigo-600"
                      />
                    </div>

                    <div className="flex-1">

                      <div className="flex items-center justify-between">

                        <h3 className="font-semibold text-slate-800">
                          {notification.title}
                        </h3>

                        {!notification.read && (
                          <span className="h-2.5 w-2.5 rounded-full bg-indigo-600" />
                        )}

                      </div>

                      <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                        {notification.message}
                      </p>

                      <p className="mt-2 text-xs text-slate-400">
                        {notification.time}
                      </p>

                      <div className="mt-4 flex gap-2">

                        <button
                          onClick={() =>
                            onView(notification)
                          }
                          className="flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-1.5 text-sm transition hover:bg-slate-100"
                        >
                          <Eye size={15} />
                          View
                        </button>

                        <button
                          onClick={() =>
                            onArchive(notification)
                          }
                          className="flex items-center gap-1 rounded-lg border border-slate-300 px-3 py-1.5 text-sm transition hover:bg-slate-100"
                        >
                          <Archive size={15} />
                          Archive
                        </button>

                      </div>

                    </div>

                  </div>

                </div>
              );
            })

          )}

        </div>

        {/* Footer */}

        <div className="border-t bg-slate-50 p-4">

          <Link
            href="/dashboard/notifications"
            className="block rounded-xl bg-indigo-600 py-3 text-center font-semibold text-white transition hover:bg-indigo-700"
          >
            View All Notifications
          </Link>

        </div>

      </div>
    </>
  );
}