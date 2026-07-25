import { apiFetch } from "@/app/utils/apiFetch";

const API = process.env.NEXT_PUBLIC_API_URL;

/* ------------------------------------------
   GET ALL NOTIFICATIONS
------------------------------------------ */

export async function getNotifications() {
  return apiFetch(`${API}/notifications/list/`, {
    method: "GET",
  });
}

/* ------------------------------------------
   GET SINGLE NOTIFICATION
------------------------------------------ */

export async function getNotification(id: string) {
  return apiFetch(`${API}/notifications/detail/${id}/`, {
    method: "GET",
  });
}

/* ------------------------------------------
   MARK AS READ
------------------------------------------ */

export async function markAsRead(id: string) {
  return apiFetch(`${API}/notifications/read/${id}/`, {
    method: "POST",
  });
}

/* ------------------------------------------
   MARK ALL AS READ
------------------------------------------ */

export async function markAllAsRead() {
  return apiFetch(`${API}/notifications/read-all/`, {
    method: "POST",
  });
}

/* ------------------------------------------
   ARCHIVE NOTIFICATION
------------------------------------------ */

export async function archiveNotification(id: string) {
  return apiFetch(`${API}/notifications/archive/${id}/`, {
    method: "POST",
  });
}

/* ------------------------------------------
   DELETE NOTIFICATION
------------------------------------------ */

export async function deleteNotification(id: string) {
  return apiFetch(`${API}/notifications/delete/${id}/`, {
    method: "DELETE",
  });
}

/* ------------------------------------------
   GET ARCHIVED NOTIFICATIONS
------------------------------------------ */

export async function getArchivedNotifications() {
  return apiFetch(`${API}/notifications/archive/list/`, {
    method: "GET",
  });
}

/* ------------------------------------------
   RESTORE ARCHIVED NOTIFICATION
------------------------------------------ */

export async function restoreNotification(id: string) {
  return apiFetch(`${API}/notifications/restore/${id}/`, {
    method: "POST",
  });
}

/* ------------------------------------------
   GET NOTIFICATION SETTINGS
------------------------------------------ */

export async function getNotificationSettings() {
  return apiFetch(`${API}/notifications/settings/`, {
    method: "GET",
  });
}

/* ------------------------------------------
   UPDATE NOTIFICATION SETTINGS
------------------------------------------ */

export async function updateNotificationSettings(data: {
  email_notifications: boolean;
  push_notifications: boolean;
  idea_updates: boolean;
  peer_reviews: boolean;
  pm_reviews: boolean;
  implementation_updates: boolean;
  achievements: boolean;
}) {
  return apiFetch(`${API}/notifications/settings/update/`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}