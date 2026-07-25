"use client";

import NotificationCard, {
  Notification,
} from "./NotificationCard";
import EmptyNotifications from "./EmptyNotifications";

interface NotificationListProps {
  notifications: Notification[];
  onRead?: (id: string) => void;
  onArchive?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export default function NotificationList({
  notifications,
  onRead,
  onArchive,
  onDelete,
}: NotificationListProps) {
  if (!notifications.length) {
    return (
      <EmptyNotifications
        title="No Notifications"
        description="You're all caught up. New notifications will appear here."
      />
    );
  }

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          notification={notification}
          onRead={onRead}
          onArchive={onArchive}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}