"use client";

import { Bell } from "lucide-react";
import NotificationBadge from "./NotificationBadge";

interface NotificationBellProps {
  unread: number;
  onClick: () => void;
}

export default function NotificationBell({
  unread,
  onClick,
}: NotificationBellProps) {
  return (
    <button
      onClick={onClick}
      className="relative rounded-xl p-2 transition hover:bg-slate-100"
    >
      <Bell className="h-6 w-6 text-slate-700" />

      <NotificationBadge count={unread} />
    </button>
  );
}