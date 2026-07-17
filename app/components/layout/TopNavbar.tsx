"use client";

import {
  Search,
  Bell,
  MessageCircle,
  UserCircle2,
} from "lucide-react";

export default function TopNavbar() {
  return (
    <header className="h-20 bg-white border-b flex items-center justify-between px-8">

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

      <div className="flex items-center gap-6">

        <Bell className="cursor-pointer" />

        <MessageCircle className="cursor-pointer" />

        <div className="flex items-center gap-3">

          <UserCircle2
            size={42}
            className="text-blue-600"
          />

          <div>

            <p className="font-semibold">
              Hillary
            </p>

            <p className="text-xs text-gray-500">
              Employee
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}