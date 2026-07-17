"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
    href: "/implementation",
    icon: Rocket,
  },
  {
    name: "Gamification",
    href: "/dashboard/gamifications",
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

  return (
    <aside className="w-72 bg-white border-r h-screen sticky top-0 shadow-sm">
      <div className="h-20 flex items-center px-8 border-b">
        <h1 className="text-3xl font-bold text-blue-600">
          💡 InnoBoard
        </h1>
      </div>

      <nav className="mt-6 space-y-2 px-4">
        {links.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-4 rounded-xl px-5 py-4 transition-all
              ${
                pathname === item.href
                  ? "bg-blue-600 text-white shadow-lg"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <Icon size={22} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}