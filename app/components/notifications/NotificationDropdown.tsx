"use client";

import Link from "next/link";
import NotificationCard, {
  Notification,
} from "./NotificationCard";

interface NotificationDropdownProps {
  open: boolean;
  notifications: Notification[];
  onRead?: (id: string) => void;
  onArchive?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function NotificationDropdown({
  open,
  notifications,
  onRead,
  onArchive,
  onDelete,
}: NotificationDropdownProps) {
  if (!open) return null;

  return (
    <div className="absolute right-0 top-14 z-50 w-105 rounded-2xl border border-slate-200 bg-white shadow-2xl">

      <div className="flex items-center justify-between border-b border-slate-200 p-5">

        <h2 className="text-lg font-bold text-slate-800">
          Notifications
        </h2>

        <Link
          href="/dashboard/notifications"
          className="text-sm font-semibold text-indigo-600 hover:text-indigo-800"
        >
          View All
        </Link>

      </div>

      <div className="max-h-125 overflow-y-auto p-4 space-y-3">

        {notifications.length === 0 ? (

          <div className="py-10 text-center text-slate-500">
            No notifications.
          </div>

        ) : (

          notifications.slice(0, 5).map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              onRead={onRead}
              onArchive={onArchive}
              onDelete={onDelete}
            />
          ))

        )}

      </div>

    </div>
  );
}