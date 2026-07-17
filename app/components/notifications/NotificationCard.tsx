"use client";

import {
  Bell,
  CheckCircle2,
  Clock3,
  MessageSquare,
  Lightbulb,
  FolderKanban,
  ClipboardList,
  Award,
  Settings,
  MoreVertical,
  Eye,
  Archive,
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
  sender: string;
  time: string;
  priority: "High" | "Medium" | "Low";
  read: boolean;
}

interface NotificationCardProps {
  notification: Notification;
  onView?: () => void;
  onArchive?: () => void;
  onMarkRead?: () => void;
}

export default function NotificationCard({
  notification,
  onView,
  onArchive,
  onMarkRead,
}: NotificationCardProps) {
  const iconMap = {
    Idea: Lightbulb,
    Project: FolderKanban,
    Task: ClipboardList,
    Review: MessageSquare,
    Gamification: Award,
    System: Settings,
  };

  const Icon = iconMap[notification.type];

  const priorityColor = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Low: "bg-green-100 text-green-700",
  };

  return (
    <div
      className={`rounded-2xl border transition-all duration-300 hover:shadow-lg ${
        notification.read
          ? "border-slate-200 bg-white"
          : "border-indigo-300 bg-indigo-50/40"
      }`}
    >
      {/* Header */}

      <div className="flex items-start justify-between border-b p-6">

        <div className="flex gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100">
            <Icon
              size={28}
              className="text-indigo-600"
            />
          </div>

          <div>

            <div className="flex items-center gap-3">

              <h3 className="text-lg font-bold text-slate-800">
                {notification.title}
              </h3>

              {!notification.read && (
                <span className="rounded-full bg-indigo-600 px-2 py-1 text-xs font-semibold text-white">
                  NEW
                </span>
              )}

            </div>

            <p className="mt-2 text-slate-600">
              {notification.message}
            </p>

          </div>

        </div>

        <button className="rounded-lg p-2 hover:bg-slate-100">
          <MoreVertical size={18} />
        </button>

      </div>

      {/* Details */}

      <div className="grid gap-5 p-6 md:grid-cols-4">

        <div>

          <p className="text-xs uppercase text-slate-500">
            Type
          </p>

          <div className="mt-2 flex items-center gap-2">

            <Bell
              size={18}
              className="text-indigo-600"
            />

            <span className="font-semibold">
              {notification.type}
            </span>

          </div>

        </div>

        <div>

          <p className="text-xs uppercase text-slate-500">
            Sender
          </p>

          <p className="mt-2 font-semibold">
            {notification.sender}
          </p>

        </div>

        <div>

          <p className="text-xs uppercase text-slate-500">
            Time
          </p>

          <div className="mt-2 flex items-center gap-2">

            <Clock3
              size={18}
              className="text-slate-500"
            />

            <span>{notification.time}</span>

          </div>

        </div>

        <div>

          <p className="text-xs uppercase text-slate-500">
            Priority
          </p>

          <span
            className={`mt-2 inline-block rounded-full px-3 py-1 text-sm font-semibold ${priorityColor[notification.priority]}`}
          >
            {notification.priority}
          </span>

        </div>

      </div>

      {/* Footer */}

      <div className="flex flex-wrap items-center justify-between border-t bg-slate-50 px-6 py-5">

        <div className="flex items-center gap-2 text-sm text-slate-500">

          {notification.read ? (
            <>
              <CheckCircle2
                size={18}
                className="text-green-600"
              />
              Read
            </>
          ) : (
            <>
              <Bell
                size={18}
                className="text-indigo-600"
              />
              Unread
            </>
          )}

        </div>

        <div className="flex gap-3">

          {!notification.read && (
            <button
              onClick={onMarkRead}
              className="rounded-xl border border-slate-300 px-4 py-2 transition hover:bg-slate-100"
            >
              Mark as Read
            </button>
          )}

          <button
            onClick={onArchive}
            className="flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 transition hover:bg-slate-100"
          >
            <Archive size={16} />
            Archive
          </button>

          <button
            onClick={onView}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2 text-white transition hover:bg-indigo-700"
          >
            <Eye size={16} />
            View
          </button>

        </div>

      </div>

    </div>
  );
}