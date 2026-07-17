"use client";

import { Users } from "lucide-react";

export interface UserRole {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface RoleManagementProps {
  users: UserRole[];
  onRoleChange: (id: number, role: string) => void;
}

const roles = [
  "Admin",
  "Product Manager",
  "Department Head",
  "Reviewer",
  "Employee",
];

export default function RoleManagement({
  users,
  onRoleChange,
}: RoleManagementProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">

      {/* Header */}

      <div className="mb-6 flex items-center gap-3">

        <div className="rounded-lg bg-indigo-100 p-3">
          <Users
            size={22}
            className="text-indigo-600"
          />
        </div>

        <div>

          <h2 className="text-xl font-semibold">
            Role Management
          </h2>

          <p className="text-sm text-slate-500">
            Assign and manage user roles.
          </p>

        </div>

      </div>

      {/* Users */}

      <div className="space-y-4">

        {users.length === 0 ? (

          <div className="rounded-lg border border-dashed p-8 text-center text-slate-500">
            No users found.
          </div>

        ) : (

          users.map((user) => (

            <div
              key={user.id}
              className="flex flex-col gap-4 rounded-lg border p-4 md:flex-row md:items-center md:justify-between"
            >

              <div>

                <h3 className="font-semibold text-slate-800">
                  {user.name}
                </h3>

                <p className="text-sm text-slate-500">
                  {user.email}
                </p>

              </div>

              <select
                value={user.role}
                onChange={(e) =>
                  onRoleChange(
                    user.id,
                    e.target.value
                  )
                }
                className="rounded-lg border px-4 py-2"
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

            </div>

          ))

        )}

      </div>

    </div>
  );
}