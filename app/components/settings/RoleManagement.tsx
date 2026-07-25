"use client";

import { ShieldCheck, Search, UserCog } from "lucide-react";
import { useMemo, useState } from "react";

export interface UserRole {
  id: number;
  name: string;
  email: string;
  department: string;
  role: "Employee" | "Peer Reviewer" | "Product Manager" | "Administrator";
}

interface RoleManagementProps {
  users: UserRole[];
  onRoleChange: (
    userId: number,
    role: UserRole["role"]
  ) => void;
}

const roles: UserRole["role"][] = [
  "Employee",
  "Peer Reviewer",
  "Product Manager",
  "Administrator",
];

export default function RoleManagement({
  users,
  onRoleChange,
}: RoleManagementProps) {
  const [search, setSearch] = useState("");

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.department.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}

      <div className="border-b border-slate-200 p-6">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-indigo-100 p-3">
            <ShieldCheck className="h-6 w-6 text-indigo-600" />
          </div>

          <div>

            <h2 className="text-2xl font-bold text-slate-800">
              Role Management
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Assign and manage user permissions.
            </p>

          </div>

        </div>

      </div>

      {/* Search */}

      <div className="border-b border-slate-100 p-6">

        <div className="relative">

          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />

        </div>

      </div>

      {/* Table */}

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-slate-50">

            <tr>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                User
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                Department
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                Role
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredUsers.map((user) => (

              <tr
                key={user.id}
                className="border-t border-slate-100"
              >

                <td className="px-6 py-5">

                  <div className="flex items-center gap-4">

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100">

                      <UserCog className="h-5 w-5 text-indigo-600" />

                    </div>

                    <div>

                      <p className="font-semibold text-slate-800">
                        {user.name}
                      </p>

                      <p className="text-sm text-slate-500">
                        {user.email}
                      </p>

                    </div>

                  </div>

                </td>

                <td className="px-6 py-5 text-slate-600">
                  {user.department}
                </td>

                <td className="px-6 py-5">

                  <select
                    value={user.role}
                    onChange={(e) =>
                      onRoleChange(
                        user.id,
                        e.target.value as UserRole["role"]
                      )
                    }
                    className="rounded-xl border border-slate-300 px-4 py-2 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  >
                    {roles.map((role) => (
                      <option
                        key={role}
                        value={role}
                      >
                        {role}
                      </option>
                    ))}
                  </select>

                </td>

              </tr>

            ))}

            {filteredUsers.length === 0 && (

              <tr>

                <td
                  colSpan={3}
                  className="py-12 text-center text-slate-500"
                >
                  No users found.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}