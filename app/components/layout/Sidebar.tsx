"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/app/lib/logout";

import {
  LayoutDashboard,
  Lightbulb,
  ClipboardList,
  Users,
  Briefcase,
  Rocket,
  Trophy,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";

const links = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Submit Idea",
    href: "/dashboard/submit-idea",
    icon: Lightbulb,
  },
  {
    name: "Idea Board",
    href: "/dashboard/idea-board",
    icon: ClipboardList,
  },
  {
    name: "Peer Review",
    href: "/dashboard/peer-review",
    icon: Users,
  },
  {
    name: "PM Review",
    href: "/dashboard/product-manager-review",
    icon: Briefcase,
  },
  {
    name: "Implementation",
    href: "/dashboard/implementation",
    icon: Rocket,
  },
  {
    name: "Gamification",
    href: "/dashboard/gamification",
    icon: Trophy,
  },
  {
    name: "Notifications",
    href: "/dashboard/notifications",
    icon: Bell,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.replace("/auth/login");
  }

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-72 flex-col border-r bg-white shadow-sm">

      {/* Logo */}
      <div className="flex h-20 shrink-0 items-center border-b px-8">
        <h1 className="text-3xl font-bold text-blue-600">
          💡 InnoBoard
        </h1>
      </div>

      {/* Scrollable Navigation */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <nav className="space-y-2">

          {links.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-4 rounded-xl px-5 py-4 transition-all ${
                  pathname === item.href
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon size={22} />
                <span>{item.name}</span>
              </Link>
            );
          })}

        </nav>
      </div>

      {/* Fixed Logout */}
      <div className="shrink-0 border-t bg-white p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-red-600 px-4 py-3 font-medium text-white transition hover:bg-red-700"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>

    </aside>
  );
}
