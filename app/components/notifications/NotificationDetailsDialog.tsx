"use client";

import {
  Bell,
  Calendar,
  Clock3,
  User,
  Tag,
  CheckCircle2,
  Archive,
  X,
  ExternalLink,
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
  createdAt?: string;
  link?: string;
}

interface NotificationDetailsDialogProps {
  open: boolean;
  notification: Notification | null;
  onClose: () => void;
  onMarkRead?: () => void;
  onArchive?: () => void;
}

export default function NotificationDetailsDialog({
  open,
  notification,
  onClose,
  onMarkRead,
  onArchive,
}: NotificationDetailsDialogProps) {
  if (!open || !notification) return null;

  const priorityColor = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Low: "bg-green-100 text-green-700",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-6 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-start justify-between border-b p-6">

          <div className="flex items-center gap-4">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-100">
              <Bell
                size={30}
                className="text-indigo-600"
              />
            </div>

            <div>

              <h2 className="text-2xl font-bold text-slate-800">
                {notification.title}
              </h2>

              <p className="mt-1 text-slate-500">
                Notification Details
              </p>

            </div>

          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 hover:bg-slate-100"
          >
            <X size={22} />
          </button>

        </div>

        {/* Body */}

        <div className="space-y-8 p-6">

          {/* Message */}

          <div>

            <h3 className="mb-3 text-lg font-semibold">
              Message
            </h3>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 leading-7 text-slate-700">
              {notification.message}
            </div>

          </div>

          {/* Details */}

          <div className="grid gap-6 md:grid-cols-2">

            <div className="rounded-xl border p-5">

              <div className="mb-5 flex items-center gap-2">

                <User
                  size={18}
                  className="text-indigo-600"
                />

                <span className="font-semibold">
                  Sender
                </span>

              </div>

              <p>{notification.sender}</p>

            </div>

            <div className="rounded-xl border p-5">

              <div className="mb-5 flex items-center gap-2">

                <Tag
                  size={18}
                  className="text-indigo-600"
                />

                <span className="font-semibold">
                  Type
                </span>

              </div>

              <p>{notification.type}</p>

            </div>

            <div className="rounded-xl border p-5">

              <div className="mb-5 flex items-center gap-2">

                <Clock3
                  size={18}
                  className="text-indigo-600"
                />

                <span className="font-semibold">
                  Time
                </span>

              </div>

              <p>{notification.time}</p>

            </div>

            <div className="rounded-xl border p-5">

              <div className="mb-5 flex items-center gap-2">

                <Calendar
                  size={18}
                  className="text-indigo-600"
                />

                <span className="font-semibold">
                  Created
                </span>

              </div>

              <p>{notification.createdAt ?? "Today"}</p>

            </div>

          </div>

          {/* Priority */}

          <div className="rounded-xl border p-5">

            <h3 className="mb-4 font-semibold">
              Priority
            </h3>

            <span
              className={`rounded-full px-4 py-2 font-semibold ${priorityColor[notification.priority]}`}
            >
              {notification.priority}
            </span>

          </div>

          {/* Status */}

          <div className="rounded-xl border p-5">

            <h3 className="mb-4 font-semibold">
              Status
            </h3>

            {notification.read ? (
              <div className="flex items-center gap-2 text-green-600">

                <CheckCircle2 size={20} />

                Read

              </div>
            ) : (
              <div className="flex items-center gap-2 text-orange-600">

                <Bell size={20} />

                Unread

              </div>
            )}

          </div>

          {/* Related Link */}

          {notification.link && (
            <div className="rounded-xl border p-5">

              <h3 className="mb-4 font-semibold">
                Related Resource
              </h3>

              <a
                href={notification.link}
                className="flex items-center gap-2 text-indigo-600 hover:underline"
              >
                <ExternalLink size={18} />
                Open Related Item
              </a>

            </div>
          )}

        </div>

        {/* Footer */}

        <div className="flex flex-wrap justify-end gap-3 border-t bg-slate-50 p-6">

          {!notification.read && (
            <button
              onClick={onMarkRead}
              className="rounded-xl border border-slate-300 px-5 py-3 hover:bg-slate-100"
            >
              Mark as Read
            </button>
          )}

          <button
            onClick={onArchive}
            className="flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 hover:bg-slate-100"
          >
            <Archive size={18} />
            Archive
          </button>

          <button
            onClick={onClose}
            className="rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-700"
          >
            Close
          </button>

        </div>

      </div>
    </div>
  );
}