"use client";

import { Bell } from "lucide-react";

interface NotificationBellProps {
  unreadCount: number;
  onClick?: () => void;
}

export default function NotificationBell({
  unreadCount,
  onClick,
}: NotificationBellProps) {
  return (
    <button
      onClick={onClick}
      className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:bg-slate-100 hover:shadow-md"
      aria-label="Notifications"
    >
      {/* Notification Icon */}
      <Bell
        size={22}
        className="text-slate-700"
      />

      {/* Notification Badge */}

      {unreadCount > 0 && (
        <span
          className="
            absolute
            -right-1
            -top-1
            flex
            h-6
            min-w-6
            items-center
            justify-center
            rounded-full
            bg-red-600
            px-1
            text-xs
            font-bold
            text-white
            ring-2
            ring-white
          "
        >
          {unreadCount > 99 ? "99+" : unreadCount}
        </span>
      )}

      {/* Animated Dot */}

      {unreadCount > 0 && (
        <span className="absolute right-1 top-1 h-2.5 w-2.5 animate-ping rounded-full bg-red-500" />
      )}
    </button>
  );
}