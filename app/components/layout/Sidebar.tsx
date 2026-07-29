"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/app/lib/logout";
import { useAuthStore } from "@/app/store/authstore";
import { canAccessEverywhere, canAccessPMReview, canViewUsers } from "@/app/lib/access";

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
  Sparkles,
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
  {
    name: "Users",
    href: "/dashboard/users",
    icon: Users,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const role = useAuthStore((state) => state.user?.role);

  async function handleLogout() {
    await logout();
    router.replace("/auth/login");
  }

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-72 flex-col border-r border-slate-200 bg-white shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-950 dark:shadow-cyan-950/20">

      {/* Logo */}
      <div className="flex h-20 shrink-0 items-center border-b border-slate-200 px-8 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-600 text-white shadow-lg shadow-blue-600/20 dark:bg-cyan-300 dark:text-slate-950 dark:shadow-cyan-300/20">
            <Sparkles size={20} />
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-950 dark:text-white">
              snipper
            </h1>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Innovation Hub
            </p>
          </div>
        </div>
      </div>

      {/* Scrollable Navigation */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <nav className="space-y-2">

          {links
            .filter((item) => {
              if (item.href === "/dashboard/product-manager-review") {
                return canAccessPMReview(role);
              }

              if (item.href === "/dashboard/settings") {
                return canAccessEverywhere(role);
              }

              if (item.href === "/dashboard/users") {
                return canViewUsers(role);
              }

              return true;
            })
            .map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-4 rounded-xl px-5 py-4 transition-all ${
                  pathname === item.href
                    ? "bg-cyan-600 text-white shadow-lg shadow-blue-600/20 dark:bg-cyan-300 dark:text-slate-950 dark:shadow-cyan-300/20"
                    : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-cyan-900 dark:hover:text-white"
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
      <div className="shrink-0 border-t border-cyan-200 bg-white p-4 transition-colors duration-300 dark:border-cyan-800 dark:bg-white-500">
        <button
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-cyan-600 px-4 py-3 font-medium text-white transition hover:bg-cyan-600"
        >
          <LogOut size={2} />
          Logout
        </button>
      </div>

    </aside>
  );
}
