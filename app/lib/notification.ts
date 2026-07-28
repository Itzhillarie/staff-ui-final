import type {
  Notification,
  NotificationSettingsData,
} from "@/app/components/notifications";

type NotificationCategory =
  | "idea_updates"
  | "peer_reviews"
  | "pm_reviews"
  | "implementation_updates"
  | "achievements";

type CreateNotificationInput = {
  title: string;
  message: string;
  type: string;
  category?: NotificationCategory;
};

const NOTIFICATIONS_KEY = "innovport.notifications";
const ARCHIVED_NOTIFICATIONS_KEY = "innovport.notifications.archived";
const NOTIFICATION_SETTINGS_KEY = "innovport.notification-settings";

const defaultSettings: NotificationSettingsData = {
  email_notifications: true,
  push_notifications: true,
  idea_updates: true,
  peer_reviews: true,
  pm_reviews: true,
  implementation_updates: true,
  achievements: true,
};

function canUseStorage() {
  return typeof window !== "undefined";
}

function readJson<T>(key: string, fallback: T): T {
  if (!canUseStorage()) {
    return fallback;
  }

  const value = window.localStorage.getItem(key);

  if (!value) {
    return fallback;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event("innovport-notifications-changed"));
}

function createId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function getLocalSettings() {
  return {
    ...defaultSettings,
    ...readJson<Partial<NotificationSettingsData>>(
      NOTIFICATION_SETTINGS_KEY,
      {}
    ),
  };
}

function getLocalNotifications() {
  return readJson<Notification[]>(NOTIFICATIONS_KEY, []);
}

function getLocalArchivedNotifications() {
  return readJson<Notification[]>(ARCHIVED_NOTIFICATIONS_KEY, []);
}

function setLocalNotifications(notifications: Notification[]) {
  writeJson(NOTIFICATIONS_KEY, notifications);
}

function setLocalArchivedNotifications(notifications: Notification[]) {
  writeJson(ARCHIVED_NOTIFICATIONS_KEY, notifications);
}

export async function createLocalNotification({
  title,
  message,
  type,
  category = "idea_updates",
}: CreateNotificationInput) {
  const settings = getLocalSettings();

  if (!settings[category]) {
    return null;
  }

  const notification: Notification = {
    id: createId(),
    title,
    message,
    type,
    is_read: false,
    created_at: new Date().toISOString(),
  };

  setLocalNotifications([notification, ...getLocalNotifications()]);

  return notification;
}

export async function createSettingsNotification() {
  const notification: Notification = {
    id: createId(),
    title: "Notification settings updated",
    message: "Your notification preferences have been saved.",
    type: "settings",
    is_read: false,
    created_at: new Date().toISOString(),
  };

  setLocalNotifications([notification, ...getLocalNotifications()]);

  return notification;
}

export async function getNotifications() {
  return getLocalNotifications();
}

export async function getNotification(id: string) {
  return getLocalNotifications().find(
    (notification) => notification.id === id
  );
}

export async function markAsRead(id: string) {
  setLocalNotifications(
    getLocalNotifications().map((notification) =>
      notification.id === id
        ? { ...notification, is_read: true }
        : notification
    )
  );
}

export async function markAllAsRead() {
  setLocalNotifications(
    getLocalNotifications().map((notification) => ({
      ...notification,
      is_read: true,
    }))
  );
}

export async function archiveNotification(id: string) {
  const notifications = getLocalNotifications();
  const notification = notifications.find((item) => item.id === id);

  if (!notification) {
    return;
  }

  setLocalNotifications(
    notifications.filter((item) => item.id !== id)
  );
  setLocalArchivedNotifications([
    notification,
    ...getLocalArchivedNotifications(),
  ]);
}

export async function deleteNotification(id: string) {
  setLocalNotifications(
    getLocalNotifications().filter((item) => item.id !== id)
  );
  setLocalArchivedNotifications(
    getLocalArchivedNotifications().filter((item) => item.id !== id)
  );
}

export async function getArchivedNotifications() {
  return getLocalArchivedNotifications();
}

export async function restoreNotification(id: string) {
  const archived = getLocalArchivedNotifications();
  const notification = archived.find((item) => item.id === id);

  if (!notification) {
    return;
  }

  setLocalArchivedNotifications(
    archived.filter((item) => item.id !== id)
  );
  setLocalNotifications([notification, ...getLocalNotifications()]);
}

export async function getNotificationSettings() {
  return getLocalSettings();
}

export async function updateNotificationSettings(
  data: NotificationSettingsData
) {
  writeJson(NOTIFICATION_SETTINGS_KEY, {
    ...defaultSettings,
    ...data,
  });

  await createSettingsNotification();
}
