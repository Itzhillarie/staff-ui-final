"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/authstore";
import { logout } from "@/app/lib/logout";
import { useDashboardTheme } from "@/app/providers/DashboardThemeProvider";

import {
  Search,
  Bell,
  MessageCircle,
  UserCircle2,
  LogOut,
  Moon,
  Sun,
} from "lucide-react";

export default function TopNavbar() {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const { theme, toggleTheme } = useDashboardTheme();

  const handleLogout = async () => {
    await logout();
    router.replace("/auth/login");
  };

  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white px-8 transition-colors duration-300 dark:border-slate-800 dark:bg-slate-950">

      {/* Search */}
      <div className="relative w-105">
        <Search
          size={20}
          className="absolute left-4 top-3.5 text-slate-400 dark:text-slate-500"
        />

        <input
          type="text"
          placeholder="Search ideas..."
          className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:ring-cyan-300/40"
        />
      </div>


      {/* Right Side */}
      <div className="flex items-center gap-6">

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 dark:border-slate-800 dark:bg-slate-900 dark:text-cyan-200 dark:hover:border-cyan-300/40 dark:hover:bg-cyan-300/10"
        >
          {theme === "dark" ? (
            <Sun size={19} />
          ) : (
            <Moon size={19} />
          )}
        </button>

        <Bell
          className="cursor-pointer text-slate-600 transition hover:text-blue-600 dark:text-slate-400 dark:hover:text-cyan-300"
        />

        <MessageCircle
          className="cursor-pointer text-slate-600 transition hover:text-blue-600 dark:text-slate-400 dark:hover:text-cyan-300"
        />


        {/* Logged in User */}
        <div className="flex items-center gap-3 border-l border-slate-200 pl-6 dark:border-slate-800">

          <div className="relative">
            <UserCircle2
              size={44}
              className="text-blue-600 dark:text-cyan-300"
            />

            {/* Online indicator */}
            <span className="absolute bottom-1 right-1 h-3 w-3 rounded-full border-2 border-white bg-green-500 dark:border-slate-950" />
          </div>


          <div className="leading-tight">

            <p className="font-semibold text-slate-800 dark:text-slate-100">
              {user?.username || "Guest User"}
            </p>

            <p className="text-sm text-slate-500 capitalize dark:text-slate-400">
              {user?.role || "No Role"}
            </p>

          </div>

        </div>


        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
        >
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </header>
  );
}
