"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Archive,
  ArrowLeft,
  RotateCcw,
  Trash2,
  Eye,
} from "lucide-react";

import NotificationCard from "@/app/components/notifications/NotificationCard";
import NotificationDetailsDialog from "@/app/components/notifications/NotificationDetailsDialog";
import EmptyNotifications from "@/app/components/notifications/EmptyNotifications";

type NotificationType =
  | "Idea"
  | "Project"
  | "Task"
  | "Review"
  | "Gamification"
  | "System";

interface Notification {
  id: number;
  title: string;
  message: string;
  type: NotificationType;
  sender: string;
  time: string;
  priority: "High" | "Medium" | "Low";
  read: boolean;
  createdAt: string;
  link?: string;
}

export default function ArchivedNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "Implementation Completed",
      message:
        "Employee Leave Automation project has been successfully completed.",
      type: "Project",
      sender: "Implementation Team",
      time: "3 days ago",
      priority: "Medium",
      read: true,
      createdAt: "3 days ago",
    },
    {
      id: 2,
      title: "Idea Approved",
      message:
        "Your Digital Procurement idea was approved and archived after implementation.",
      type: "Idea",
      sender: "Product Manager",
      time: "1 week ago",
      priority: "High",
      read: true,
      createdAt: "1 week ago",
    },
  ]);

  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);

  const [openDialog, setOpenDialog] = useState(false);

  const restoreNotification = (id: number) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );

    // Later:
    // Update archived=false in the database.
  };

  const deleteNotification = (id: number) => {
    if (!confirm("Delete this notification permanently?")) return;

    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );

    // Later:
    // Delete notification permanently from the database.
  };

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-wrap items-center justify-between gap-4">

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-slate-100 p-4">

            <Archive
              size={32}
              className="text-slate-700"
            />

          </div>

          <div>

            <h1 className="text-4xl font-bold text-slate-800">
              Archived Notifications
            </h1>

            <p className="mt-2 text-slate-500">
              Notifications you have archived for future reference.
            </p>

          </div>

        </div>

        <Link
          href="/dashboard/notifications"
          className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3 font-medium transition hover:bg-slate-100"
        >
          <ArrowLeft size={18} />
          Back to Notifications
        </Link>

      </div>

      {/* Summary */}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

        <h2 className="text-xl font-semibold text-slate-800">
          Archive Summary
        </h2>

        <div className="mt-6 grid gap-6 md:grid-cols-3">

          <div className="rounded-xl bg-slate-50 p-5">

            <p className="text-sm text-slate-500">
              Archived
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              {notifications.length}
            </h3>

          </div>

          <div className="rounded-xl bg-slate-50 p-5">

            <p className="text-sm text-slate-500">
              Read
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              {notifications.filter(n => n.read).length}
            </h3>

          </div>

          <div className="rounded-xl bg-slate-50 p-5">

            <p className="text-sm text-slate-500">
              High Priority
            </p>

            <h3 className="mt-2 text-3xl font-bold">
              {
                notifications.filter(
                  n => n.priority === "High"
                ).length
              }
            </h3>

          </div>

        </div>

      </div>

      {/* Notifications */}

      {notifications.length === 0 ? (

        <EmptyNotifications
          title="Archive is Empty"
          description="Archived notifications will appear here after you archive them."
          showRefresh={false}
        />

      ) : (

        <div className="space-y-6">

          {notifications.map((notification) => (

            <div
              key={notification.id}
              className="relative"
            >

              <NotificationCard
                notification={notification}
                onView={() => {
                  setSelectedNotification(notification);
                  setOpenDialog(true);
                }}
              />

              {/* Archive Actions */}

              <div className="mt-4 flex flex-wrap justify-end gap-3">

                <button
                  onClick={() =>
                    restoreNotification(notification.id)
                  }
                  className="flex items-center gap-2 rounded-xl border border-green-300 bg-green-50 px-5 py-2.5 font-medium text-green-700 transition hover:bg-green-100"
                >
                  <RotateCcw size={18} />
                  Restore
                </button>

                <button
                  onClick={() =>
                    deleteNotification(notification.id)
                  }
                  className="flex items-center gap-2 rounded-xl border border-red-300 bg-red-50 px-5 py-2.5 font-medium text-red-700 transition hover:bg-red-100"
                >
                  <Trash2 size={18} />
                  Delete
                </button>

                <button
                  onClick={() => {
                    setSelectedNotification(notification);
                    setOpenDialog(true);
                  }}
                  className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 font-medium text-white transition hover:bg-indigo-700"
                >
                  <Eye size={18} />
                  View Details
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

      {/* Details Dialog */}

      <NotificationDetailsDialog
        open={openDialog}
        notification={selectedNotification}
        onClose={() => {
          setOpenDialog(false);
          setSelectedNotification(null);
        }}
        onArchive={() => {}}
        onMarkRead={() => {}}
      />

    </div>
  );
}