"use client";

import {
  User,
  Shield,
  Bell,
  Palette,
  Building2,
  PlugZap,
  Users,
  ClipboardList,
} from "lucide-react";

interface SettingsSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const sections = [
  {
    id: "profile",
    label: "Profile",
    icon: User,
  },
  {
    id: "account",
    label: "Account",
    icon: User,
  },
  {
    id: "security",
    label: "Security",
    icon: Shield,
  },
  {
    id: "appearance",
    label: "Appearance",
    icon: Palette,
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
  },
  {
    id: "organization",
    label: "Organization",
    icon: Building2,
  },
  {
    id: "integrations",
    label: "Integrations",
    icon: PlugZap,
  },
  {
    id: "roles",
    label: "Role Management",
    icon: Users,
  },
  {
    id: "audit",
    label: "Audit Logs",
    icon: ClipboardList,
  },
];

export default function SettingsSidebar({
  activeSection,
  onSectionChange,
}: SettingsSidebarProps) {
  return (
    <aside className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

      <h2 className="mb-5 text-lg font-bold text-slate-800">
        Settings
      </h2>

      <nav className="space-y-2">

        {sections.map((section) => {
          const Icon = section.icon;
          const active = activeSection === section.id;

          return (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition-all ${
                active
                  ? "bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              <Icon className="h-5 w-5" />

              <span className="font-medium">
                {section.label}
              </span>
            </button>
          );
        })}

      </nav>
    </aside>
  );
}