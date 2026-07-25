"use client";

import { apiFetch } from "@/app/utils/apiFetch";

const API = process.env.NEXT_PUBLIC_API_URL;

export interface UserProfile {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone?: string;
  bio?: string;
  avatar?: string;
}

export interface AccountSettings {
  language: string;
  timezone: string;
  date_format: string;
}

export interface AppearanceSettings {
  theme: "light" | "dark" | "system";
  accentColor: string;
  compactMode: boolean;
  animations: boolean;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  inAppNotifications: boolean;
  weeklyDigest: boolean;
  reminderFrequency: "daily" | "weekly" | "monthly";
}

export interface OrganizationSettings {
  organizationName: string;
  department: string;
  location: string;
  timezone: string;
  website: string;
}

export interface UserRole {
  id: number;
  name: string;
  email: string;
  department: string;
  role: string;
}

export interface AuditLog {
  id: number;
  user: string;
  action: string;
  target: string;
  ip: string;
  created_at: string;
}

/* -------------------------------------------------------------------------- */
/*                               PROFILE                                      */
/* -------------------------------------------------------------------------- */

export async function getProfile(): Promise<UserProfile> {
  return apiFetch(`${API}/settings/profile/`);
}

export async function updateProfile(data: UserProfile) {
  return apiFetch(`${API}/settings/profile/`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

/* -------------------------------------------------------------------------- */
/*                             ACCOUNT SETTINGS                               */
/* -------------------------------------------------------------------------- */

export async function getAccountSettings(): Promise<AccountSettings> {
  return apiFetch(`${API}/settings/account/`);
}

export async function updateAccountSettings(
  data: AccountSettings
) {
  return apiFetch(`${API}/settings/account/`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

/* -------------------------------------------------------------------------- */
/*                           APPEARANCE SETTINGS                              */
/* -------------------------------------------------------------------------- */

export async function getAppearanceSettings(): Promise<AppearanceSettings> {
  return apiFetch(`${API}/settings/appearance/`);
}

export async function updateAppearanceSettings(
  data: AppearanceSettings
) {
  return apiFetch(`${API}/settings/appearance/`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

/* -------------------------------------------------------------------------- */
/*                         NOTIFICATION SETTINGS                              */
/* -------------------------------------------------------------------------- */

export async function getNotificationSettings(): Promise<NotificationSettings> {
  return apiFetch(`${API}/settings/notifications/`);
}

export async function updateNotificationSettings(
  data: NotificationSettings
) {
  return apiFetch(`${API}/settings/notifications/`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

/* -------------------------------------------------------------------------- */
/*                        ORGANIZATION SETTINGS                               */
/* -------------------------------------------------------------------------- */

export async function getOrganizationSettings(): Promise<OrganizationSettings> {
  return apiFetch(`${API}/settings/organization/`);
}

export async function updateOrganizationSettings(
  data: OrganizationSettings
) {
  return apiFetch(`${API}/settings/organization/`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

/* -------------------------------------------------------------------------- */
/*                               PASSWORD                                     */
/* -------------------------------------------------------------------------- */

export async function changePassword(
  currentPassword: string,
  newPassword: string
) {
  return apiFetch(`${API}/settings/change-password/`, {
    method: "POST",
    body: JSON.stringify({
      current_password: currentPassword,
      new_password: newPassword,
    }),
  });
}

/* -------------------------------------------------------------------------- */
/*                           TWO FACTOR AUTH                                  */
/* -------------------------------------------------------------------------- */

export async function getTwoFactorSetup() {
  return apiFetch(`${API}/settings/two-factor/setup/`);
}

export async function enableTwoFactor(code: string) {
  return apiFetch(`${API}/settings/two-factor/enable/`, {
    method: "POST",
    body: JSON.stringify({
      code,
    }),
  });
}

export async function disableTwoFactor() {
  return apiFetch(`${API}/settings/two-factor/disable/`, {
    method: "POST",
  });
}

/* -------------------------------------------------------------------------- */
/*                              INTEGRATIONS                                  */
/* -------------------------------------------------------------------------- */

export async function getIntegrations() {
  return apiFetch(`${API}/settings/integrations/`);
}

export async function connectIntegration(id: string) {
  return apiFetch(`${API}/settings/integrations/${id}/connect/`, {
    method: "POST",
  });
}

export async function disconnectIntegration(id: string) {
  return apiFetch(`${API}/settings/integrations/${id}/disconnect/`, {
    method: "POST",
  });
}

/* -------------------------------------------------------------------------- */
/*                              USER ROLES                                    */
/* -------------------------------------------------------------------------- */

export async function getRoles(): Promise<UserRole[]> {
  return apiFetch(`${API}/settings/roles/`);
}

export async function updateUserRole(
  userId: number,
  role: string
) {
  return apiFetch(`${API}/settings/roles/${userId}/`, {
    method: "PUT",
    body: JSON.stringify({
      role,
    }),
  });
}

/* -------------------------------------------------------------------------- */
/*                               AUDIT LOGS                                   */
/* -------------------------------------------------------------------------- */

export async function getAuditLogs(): Promise<AuditLog[]> {
  return apiFetch(`${API}/settings/audit-logs/`);
}

/* -------------------------------------------------------------------------- */
/*                               SESSIONS                                     */
/* -------------------------------------------------------------------------- */

export async function logoutOtherSessions() {
  return apiFetch(`${API}/settings/logout-others/`, {
    method: "POST",
  });
}

/* -------------------------------------------------------------------------- */
/*                           DELETE ACCOUNT                                   */
/* -------------------------------------------------------------------------- */

export async function deleteAccount(password: string) {
  return apiFetch(`${API}/settings/delete-account/`, {
    method: "DELETE",
    body: JSON.stringify({
      password,
    }),
  });
}