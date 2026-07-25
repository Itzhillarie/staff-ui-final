"use client";

import {
  Bell,
  CheckCircle2,
  Archive,
  Trash2,
  FileText,
  Users,
  ClipboardCheck,
  Rocket,
  CalendarClock,
  Trophy,
  Gift,
} from "lucide-react";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  created_at: string;
}

interface NotificationCardProps {
  notification: Notification;
  onRead?: (id: string) => void;
  onArchive?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function NotificationCard({
  notification,
  onRead,
  onArchive,
  onDelete,
}: NotificationCardProps) {
  function getType() {
    switch (notification.type.toLowerCase()) {
      case "idea":
        return {
          icon: FileText,
          bg: "bg-blue-100",
          color: "text-blue-600",
        };

      case "peer_review":
        return {
          icon: Users,
          bg: "bg-purple-100",
          color: "text-purple-600",
        };

      case "pm_review":
        return {
          icon: ClipboardCheck,
          bg: "bg-orange-100",
          color: "text-orange-600",
        };

      case "implementation":
        return {
          icon: Rocket,
          bg: "bg-green-100",
          color: "text-green-600",
        };

      case "task":
        return {
          icon: CalendarClock,
          bg: "bg-red-100",
          color: "text-red-600",
        };

      case "achievement":
        return {
          icon: Trophy,
          bg: "bg-yellow-100",
          color: "text-yellow-600",
        };

      case "reward":
        return {
          icon: Gift,
          bg: "bg-emerald-100",
          color: "text-emerald-600",
        };

      default:
        return {
          icon: Bell,
          bg: "bg-slate-100",
          color: "text-slate-600",
        };
    }
  }

  const style = getType();
  const Icon = style.icon;

  return (
    <div
      className={`rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-lg ${
        !notification.is_read
          ? "border-indigo-300"
          : "border-slate-200"
      }`}
    >
      <div className="flex items-start justify-between">

        <div className="flex gap-4">

          <div className={`rounded-2xl ${style.bg} p-3`}>
            <Icon className={`h-6 w-6 ${style.color}`} />
          </div>

          <div>

            <div className="flex items-center gap-2">

              <h2 className="text-lg font-bold text-slate-800">
                {notification.title}
              </h2>

              {!notification.is_read && (
                <span className="h-2.5 w-2.5 rounded-full bg-indigo-600" />
              )}

            </div>

            <p className="mt-2 text-slate-500">
              {notification.message}
            </p>

            <p className="mt-3 text-sm text-slate-400">
              {new Date(notification.created_at).toLocaleString()}
            </p>

          </div>

        </div>

        <div className="flex gap-2">

          {!notification.is_read && (
            <button
              onClick={() => onRead?.(notification.id)}
              className="rounded-xl bg-green-100 p-2 text-green-600 transition hover:bg-green-200"
            >
              <CheckCircle2 className="h-5 w-5" />
            </button>
          )}

          <button
            onClick={() => onArchive?.(notification.id)}
            className="rounded-xl bg-yellow-100 p-2 text-yellow-600 transition hover:bg-yellow-200"
          >
            <Archive className="h-5 w-5" />
          </button>

          <button
            onClick={() => onDelete?.(notification.id)}
            className="rounded-xl bg-red-100 p-2 text-red-600 transition hover:bg-red-200"
          >
            <Trash2 className="h-5 w-5" />
          </button>

        </div>

      </div>
    </div>
  );
}