"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  canAccessEverywhere,
  canAccessPMReview,
  canViewUsers,
} from "@/app/lib/access";
import { useAuthStore } from "@/app/store/authstore";

const modules = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Submit Idea",
    href: "/dashboard/submit-idea",
  },
  {
    name: "Idea Board",
    href: "/dashboard/idea-board",
  },
  {
    name: "Peer Review",
    href: "/dashboard/peer-review",
  },
  {
    name: "PM Review",
    href: "/dashboard/product-manager-review",
    canAccess: canAccessPMReview,
  },
  {
    name: "Implementation",
    href: "/dashboard/implementation",
  },
  {
    name: "Gamification",
    href: "/dashboard/gamification",
  },
  {
    name: "Notifications",
    href: "/dashboard/notifications",
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    canAccess: canAccessEverywhere,
  },
  {
    name: "Users",
    href: "/dashboard/users",
    canAccess: canViewUsers,
  },
];

function isActiveModule(pathname: string, href: string) {
  if (href === "/dashboard") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function DashboardModulePager() {
  const pathname = usePathname();
  const role = useAuthStore((state) => state.user?.role);
  const accessibleModules = modules.filter(
    (module) => !module.canAccess || module.canAccess(role)
  );
  const currentIndex = accessibleModules.findIndex((module) =>
    isActiveModule(pathname, module.href)
  );

  if (currentIndex === -1) {
    return null;
  }

  const previousModule = accessibleModules[currentIndex - 1];
  const nextModule = accessibleModules[currentIndex + 1];

  return (
    <nav
      aria-label="Module navigation"
      className="mt-8 flex items-center justify-between border-t border-slate-200 pt-6 dark:border-slate-800"
    >
      {previousModule ? (
        <Link
          href={previousModule.href}
          className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-cyan-300 hover:text-cyan-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-cyan-500 dark:hover:text-cyan-200"
        >
          <ChevronLeft size={18} aria-hidden="true" />
          <span>Previous</span>
          <span className="hidden text-slate-500 dark:text-slate-400 sm:inline">
            {previousModule.name}
          </span>
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-400 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-600"
        >
          <ChevronLeft size={18} aria-hidden="true" />
          Previous
        </span>
      )}

      {nextModule ? (
        <Link
          href={nextModule.href}
          className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-cyan-300 hover:text-cyan-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-cyan-500 dark:hover:text-cyan-200"
        >
          <span>Next</span>
          <span className="hidden text-slate-500 dark:text-slate-400 sm:inline">
            {nextModule.name}
          </span>
          <ChevronRight size={18} aria-hidden="true" />
        </Link>
      ) : (
        <span
          aria-disabled="true"
          className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-400 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-600"
        >
          Next
          <ChevronRight size={18} aria-hidden="true" />
        </span>
      )}
    </nav>
  );
}
