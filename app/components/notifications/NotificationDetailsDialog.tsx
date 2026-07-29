"use client";

import { X, Clock } from "lucide-react";
import { Notification } from "./NotificationCard";

interface NotificationDetailsDialogProps {
  open: boolean;
  notification: Notification | null;
  onClose: () => void;
}

export default function NotificationDetailsDialog({
  open,
  notification,
  onClose,
}: NotificationDetailsDialogProps) {
  if (!open || !notification) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-cyan/50 p-4 backdrop-blur-sm">

      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">

        <div className="flex items-center justify-between border-b border-slate-200 p-6">

          <div>

            <h2 className="text-2xl font-bold text-slate-800">
              Notification Details
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              View complete notification information.
            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 transition hover:bg-cyan-100"
          >
            <X className="h-6 w-6 text-slate-600" />
          </button>

        </div>

        <div className="space-y-6 p-6">

          <div>

            <label className="mb-2 block text-sm font-semibold text-slate-600">
              Title
            </label>

            <div className="rounded-xl bg-slate-cyan p-4 text-slate-800">
              {notification.title}
            </div>

          </div>

          <div>

            <label className="mb-2 block text-sm font-semibold text-slate-600">
              Message
            </label>

            <div className="min-h-35 rounded-xl bg-cyan-50 p-4 leading-7 text-slate-700">
              {notification.message}
            </div>

          </div>

          <div className="grid gap-4 md:grid-cols-3">

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-600">
                Type
              </label>

              <div className="rounded-xl bg-cyan-50 px-4 py-3 font-medium capitalize text-blue-300">
                {notification.type.replace("_", " ")}
              </div>

            </div>

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-600">
                Status
              </label>

              <div
                className={`rounded-xl px-4 py-3 font-medium ${
                  notification.is_read
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {notification.is_read ? "Read" : "Unread"}
              </div>

            </div>

            <div>

              <label className="mb-2 block text-sm font-semibold text-slate-600">
                Date
              </label>

              <div className="flex items-center gap-2 rounded-xl bg-cyan-50 px-4 py-3 text-slate-700">
                <Clock className="h-4 w-4" />
                {new Date(notification.created_at).toLocaleString()}
              </div>

            </div>

          </div>

        </div>

        <div className="flex justify-end border-t border-slate-200 p-6">

          <button
            onClick={onClose}
            className="rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white transition hover:bg-cyan-700"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}