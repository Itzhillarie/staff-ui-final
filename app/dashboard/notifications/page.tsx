"use client";

import { useMemo, useState } from "react";

import NotificationStats from "@/app/components/notifications/NotificationStats";
import NotificationFilters from "@/app/components/notifications/NotificationFilters";
import NotificationList from "@/app/components/notifications/NotificationList";
import NotificationDetailsDialog from "@/app/components/notifications/NotificationDetailsDialog";

import { Bell } from "lucide-react";

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
  createdAt?: string;
  link?: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "Idea Approved",
      message:
        "Your Leave Automation idea has been approved and moved to Implementation.",
      type: "Idea",
      sender: "Product Manager",
      time: "5 min ago",
      priority: "High",
      read: false,
      createdAt: "Today",
      link: "/dashboard/implementation",
    },
    {
      id: 2,
      title: "Task Assigned",
      message:
        "You have been assigned 'Design Database Schema'.",
      type: "Task",
      sender: "Project Manager",
      time: "20 min ago",
      priority: "High",
      read: false,
      createdAt: "Today",
      link: "/dashboard/implementation/tasks",
    },
    {
      id: 3,
      title: "Project Completed",
      message:
        "Customer Feedback Portal has been successfully completed.",
      type: "Project",
      sender: "Implementation Team",
      time: "Yesterday",
      priority: "Medium",
      read: true,
      createdAt: "Yesterday",
    },
    {
      id: 4,
      title: "Innovation Champion",
      message:
        "Congratulations! You earned the Innovation Champion badge.",
      type: "Gamification",
      sender: "System",
      time: "2 days ago",
      priority: "Low",
      read: true,
      createdAt: "2 days ago",
    },
  ]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");

  const [selectedNotification, setSelectedNotification] =
    useState<Notification | null>(null);

  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredNotifications = useMemo(() => {
    return notifications.filter((notification) => {
      const matchesSearch =
        notification.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        notification.message
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        category === "" ||
        notification.type === category;

      const matchesPriority =
        priority === "" ||
        notification.priority === priority;

      const matchesStatus =
        status === "" ||
        (status === "Read" && notification.read) ||
        (status === "Unread" && !notification.read);

      const matchesDate =
        date === "" ||
        notification.createdAt === date;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesPriority &&
        matchesStatus &&
        matchesDate
      );
    });
  }, [
    notifications,
    search,
    category,
    priority,
    status,
    date,
  ]);

  const unread = notifications.filter((n) => !n.read).length;
  const read = notifications.filter((n) => n.read).length;

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-wrap items-center justify-between gap-4">

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-indigo-100 p-4">

            <Bell
              size={32}
              className="text-indigo-600"
            />

          </div>

          <div>

            <h1 className="text-4xl font-bold text-slate-800">
              Notifications
            </h1>

            <p className="mt-2 text-slate-500">
              Stay informed about ideas, reviews,
              implementation projects and tasks.
            </p>

          </div>

        </div>

        <button
          onClick={() =>
            setNotifications((prev) =>
              prev.map((n) => ({
                ...n,
                read: true,
              }))
            )
          }
          className="rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700"
        >
          Mark All as Read
        </button>

      </div>

      {/* Statistics */}

      <NotificationStats
        total={notifications.length}
        unread={unread}
        read={read}
        archived={0}
      />

      {/* Filters */}

      <NotificationFilters
        search={search}
        onSearchChange={setSearch}
        category={category}
        onCategoryChange={setCategory}
        priority={priority}
        onPriorityChange={setPriority}
        status={status}
        onStatusChange={setStatus}
        date={date}
        onDateChange={setDate}
        onReset={() => {
          setSearch("");
          setCategory("");
          setPriority("");
          setStatus("");
          setDate("");
        }}
      />

      {/* Notification List */}

      <NotificationList
        notifications={filteredNotifications}
        onView={(notification) => {
          setSelectedNotification(notification);
          setDialogOpen(true);
        }}
        onArchive={(notification) => {
          setNotifications((prev) =>
            prev.filter(
              (item) => item.id !== notification.id
            )
          );
        }}
        onMarkRead={(notification) => {
          setNotifications((prev) =>
            prev.map((item) =>
              item.id === notification.id
                ? {
                    ...item,
                    read: true,
                  }
                : item
            )
          );
        }}
      />

      {/* Details Dialog */}

      <NotificationDetailsDialog
        open={dialogOpen}
        notification={selectedNotification}
        onClose={() => {
          setDialogOpen(false);
          setSelectedNotification(null);
        }}
        onArchive={() => {
          if (!selectedNotification) return;

          setNotifications((prev) =>
            prev.filter(
              (item) =>
                item.id !== selectedNotification.id
            )
          );

          setDialogOpen(false);
        }}
        onMarkRead={() => {
          if (!selectedNotification) return;

          setNotifications((prev) =>
            prev.map((item) =>
              item.id === selectedNotification.id
                ? {
                    ...item,
                    read: true,
                  }
                : item
            )
          );
        }}
      />

    </div>
  );
}