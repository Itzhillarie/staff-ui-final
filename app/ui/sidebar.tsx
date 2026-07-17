// src/app/ui/sidebar.tsx

"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Overview",           href: "/dashboard",                icon: "🏠" },
  { label: "Submit Idea",        href: "/dashboard/submit-idea",    icon: "📝" },
  { label: "Idea Board",         href: "/dashboard/idea-board",     icon: "💡" },
  { label: "PM Review",          href: "/dashboard/pm-review",      icon: "🔍" },
  { label: "Implementation",     href: "/dashboard/implementation",  icon: "🚀" },
  { label: "Notifications",      href: "/dashboard/notifications",   icon: "🔔" },
  { label: "Gamification",       href: "/dashboard/gamification",    icon: "🏆" },
  { label: "Settings",           href: "/dashboard/settings",        icon: "⚙️" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white shadow-md flex flex-col">
      {/* Logo */}
      <div className="px-6 py-5 border-b">
        <span className="text-2xl font-bold text-blue-600">InnoBoard</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User Info */}
      <div className="px-6 py-4 border-t text-sm text-gray-500">
        Logged in as <span className="font-semibold">Employee</span>
      </div>
    </aside>
  );
}