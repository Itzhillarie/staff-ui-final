"use client";

import NotificationCard from "./NotificationCard";
import EmptyNotifications from "./EmptyNotifications";

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

interface NotificationListProps {
  notifications: Notification[];
  onView?: (notification: Notification) => void;
  onArchive?: (notification: Notification) => void;
  onMarkRead?: (notification: Notification) => void;
}

export default function NotificationList({
  notifications,
  onView,
  onArchive,
  onMarkRead,
}: NotificationListProps) {
  if (notifications.length === 0) {
    return <EmptyNotifications />;
  }

  return (
    <div className="space-y-6">
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          notification={notification}
          onView={() => onView?.(notification)}
          onArchive={() => onArchive?.(notification)}
          onMarkRead={() => onMarkRead?.(notification)}
        />
      ))}
    </div>
  );
}