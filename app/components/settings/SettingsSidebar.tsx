"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  User,
  Shield,
  Bell,
  Palette,
  Building2,
  Users,
  Plug,
  ClipboardList,
  Settings,
} from "lucide-react";

const menuItems = [
  {
    name: "General",
    href: "/dashboard/settings",
    icon: Settings,
  },
  {
    name: "Profile",
    href: "/dashboard/settings/profile",
    icon: User,
  },
  {
    name: "Security",
    href: "/dashboard/settings/security",
    icon: Shield,
  },
  {
    name: "Notifications",
    href: "/dashboard/settings/notifications",
    icon: Bell,
  },
  {
    name: "Appearance",
    href: "/dashboard/settings/appearance",
    icon: Palette,
  },
  {
    name: "Organization",
    href: "/dashboard/settings/organization",
    icon: Building2,
  },
  {
    name: "Roles",
    href: "/dashboard/settings/roles",
    icon: Users,
  },
  {
    name: "Integrations",
    href: "/dashboard/settings/integrations",
    icon: Plug,
  },
  {
    name: "Audit Logs",
    href: "/dashboard/settings/audit-logs",
    icon: ClipboardList,
  },
];

export default function SettingsSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full rounded-xl bg-white p-4 shadow-sm lg:w-64">
      <h2 className="mb-6 text-lg font-bold text-slate-800">
        Settings
      </h2>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                active
                  ? "bg-indigo-600 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <Icon size={18} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}