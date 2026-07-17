"use client";

import { useEffect, useState } from "react";

import SettingsSidebar from "@/app/components/settings/SettingsSidebar";
import ProfileForm from "@/app/components/settings/ProfileForm";
import AccountSettings from "@/app/components/settings/AccountSettings";
import SecuritySettings from "@/app/components/settings/SecuritySettings";
import NotificationSettings from "@/app/components/settings/Notificationsettings";
import AppearanceSettings from "@/app/components/settings/AppearanceSettings";
import OrganizationSettings from "@/app/components/settings/OrganizationSettings";
import RoleManagement from "@/app/components/settings/RoleManagement";
import IntegrationCard from "@/app/components/settings/IntegrationCard";
import AuditLogTable from "@/app/components/settings/AuditLogTable";
import SaveChangesBar from "@/app/components/settings/SaveChangesBar";
import EmptySettings from "@/app/components/settings/EmptySettings";

interface SettingsData {
  profile: any;
  account: any;
  security: any;
  notifications: any;
  appearance: any;
  organization: any;
  users: any[];
  integrations: any[];
  auditLogs: any[];
}

export default function SettingsPage() {
  const [settings, setSettings] =
    useState<SettingsData | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [hasChanges, setHasChanges] =
    useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/settings/`,
        {
          credentials: "include",
        }
      );

      const data = await res.json();

      setSettings(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function saveSettings() {
    if (!settings) return;

    setSaving(true);

    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/settings/`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(settings),
        }
      );

      setHasChanges(false);
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading Settings...
      </div>
    );
  }

  if (!settings) {
    return <EmptySettings />;
  }

  return (
    <div className="flex min-h-screen bg-slate-100">

      {/* Sidebar */}

      <aside className="hidden w-72 border-r bg-white lg:block">
        <SettingsSidebar />
      </aside>

      {/* Main Content */}

      <main className="flex-1 overflow-y-auto p-8">

        <div className="mb-8">

          <h1 className="text-3xl font-bold">
            Settings
          </h1>

          <p className="text-slate-500">
            Manage your account and system preferences.
          </p>

        </div>

        <div className="space-y-8">

          <ProfileForm
            profile={settings.profile}
            onSave={(profile) => {
              setSettings({
                ...settings,
                profile,
              });

              setHasChanges(true);
            }}
          />

          <AccountSettings
            account={settings.account}
            onSave={() => {}}
          />

          <SecuritySettings
            security={settings.security}
            onChangePassword={() => {}}
            onToggleTwoFactor={() => {}}
          />

          <NotificationSettings
            settings={settings.notifications}
            onChange={(notifications) => {
              setSettings({
                ...settings,
                notifications,
              });

              setHasChanges(true);
            }}
          />

          <AppearanceSettings
            settings={settings.appearance}
            onChange={(appearance) => {
              setSettings({
                ...settings,
                appearance,
              });

              setHasChanges(true);
            }}
          />

          <OrganizationSettings
            organization={settings.organization}
            onChange={(organization: any) => {
              setSettings({
                ...settings,
                organization,
              });

              setHasChanges(true);
            }}
            onSave={() => {}}
          />

          <RoleManagement
            users={settings.users}
            onRoleChange={(id, role) => {
              setSettings({
                ...settings,
                users: settings.users.map((user) =>
                  user.id === id
                    ? { ...user, role }
                    : user
                ),
              });

              setHasChanges(true);
            }}
          />

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {settings.integrations.map((item) => (
              <IntegrationCard
                key={item.id}
                integration={item}
                onToggle={(id) => {
                  setSettings({
                    ...settings,
                    integrations:
                      settings.integrations.map(
                        (integration) =>
                          integration.id === id
                            ? {
                                ...integration,
                                connected:
                                  !integration.connected,
                              }
                            : integration
                      ),
                  });

                  setHasChanges(true);
                }}
              />
            ))}
          </div>

          <AuditLogTable
            logs={settings.auditLogs}
          />

        </div>

      </main>

      <SaveChangesBar
        visible={hasChanges}
        saving={saving}
        onSave={saveSettings}
        onDiscard={() => {
          setHasChanges(false);
          loadSettings();
        }}
      />

    </div>
  );
}