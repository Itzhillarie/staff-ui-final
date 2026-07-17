"use client";

import { ClipboardList } from "lucide-react";

export interface AuditLog {
  id: number;
  user: string;
  action: string;
  module: string;
  date: string;
  status: "Success" | "Failed";
}

interface AuditLogTableProps {
  logs: AuditLog[];
}

export default function AuditLogTable({
  logs,
}: AuditLogTableProps) {
  return (
    <div className="rounded-xl bg-white shadow-sm">

      {/* Header */}

      <div className="flex items-center gap-3 border-b p-6">

        <div className="rounded-lg bg-indigo-100 p-3">
          <ClipboardList
            size={22}
            className="text-indigo-600"
          />
        </div>

        <div>

          <h2 className="text-xl font-semibold">
            Audit Logs
          </h2>

          <p className="text-sm text-slate-500">
            Monitor user activities across the system.
          </p>

        </div>

      </div>

      {/* Table */}

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-slate-50">

            <tr>

              <th className="px-6 py-3 text-left text-sm font-semibold">
                User
              </th>

              <th className="px-6 py-3 text-left text-sm font-semibold">
                Action
              </th>

              <th className="px-6 py-3 text-left text-sm font-semibold">
                Module
              </th>

              <th className="px-6 py-3 text-left text-sm font-semibold">
                Date
              </th>

              <th className="px-6 py-3 text-left text-sm font-semibold">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {logs.length === 0 ? (

              <tr>

                <td
                  colSpan={5}
                  className="py-10 text-center text-slate-500"
                >
                  No audit logs found.
                </td>

              </tr>

            ) : (

              logs.map((log) => (

                <tr
                  key={log.id}
                  className="border-t hover:bg-slate-50"
                >

                  <td className="px-6 py-4">
                    {log.user}
                  </td>

                  <td className="px-6 py-4">
                    {log.action}
                  </td>

                  <td className="px-6 py-4">
                    {log.module}
                  </td>

                  <td className="px-6 py-4">
                    {log.date}
                  </td>

                  <td className="px-6 py-4">

                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${
                        log.status === "Success"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {log.status}
                    </span>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}