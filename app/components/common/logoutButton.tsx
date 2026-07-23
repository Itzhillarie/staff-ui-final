"use client";

import { LogOut } from "lucide-react";
import { logout } from "@/app/lib/logout";

export default function LogoutButton() {
  return (
    <button
      onClick={logout}
      className="flex items-center gap-2 square-lg bg-gray-600 px-4 py-2 text-white hover:bg-orange-700"
    >
      <LogOut size={8} />
      Logout
    </button>
  );
}