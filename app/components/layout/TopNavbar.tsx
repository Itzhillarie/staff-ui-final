"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/authstore";
import { logout } from "@/app/lib/logout";

import {
  Search,
  Bell,
  MessageCircle,
  UserCircle2,
  LogOut,
} from "lucide-react";

export default function TopNavbar() {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);

  const handleLogout = async () => {
    await logout();
    router.replace("/auth/login");
  };

  return (
    <header className="h-20 bg-white border-b flex items-center justify-between px-8">

      {/* Search */}
      <div className="relative w-105">
        <Search
          size={20}
          className="absolute left-4 top-3.5 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search ideas..."
          className="w-full rounded-xl border pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>


      {/* Right Side */}
      <div className="flex items-center gap-6">

        <Bell
          className="cursor-pointer text-gray-600 hover:text-blue-600"
        />

        <MessageCircle
          className="cursor-pointer text-gray-600 hover:text-blue-600"
        />


        {/* Logged in User */}
        <div className="flex items-center gap-3 border-l pl-6">

          <div className="relative">
            <UserCircle2
              size={44}
              className="text-blue-600"
            />

            {/* Online indicator */}
            <span className="absolute bottom-1 right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-white" />
          </div>


          <div className="leading-tight">

            <p className="font-semibold text-gray-800">
              {user?.username || "Guest User"}
            </p>

            <p className="text-sm text-gray-500 capitalize">
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