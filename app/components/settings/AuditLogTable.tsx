"use client";

import { Search, Clock3, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";

export interface AuditLog {
  id: number;
  user: string;
  action: string;
  target: string;
  ip: string;
  created_at: string;
}

interface AuditLogTableProps {
  logs: AuditLog[];
}

export default function AuditLogTable({
  logs,
}: AuditLogTableProps) {
  const [search, setSearch] = useState("");

  const filteredLogs = useMemo(() => {
    return logs.filter(
      (log) =>
        log.user.toLowerCase().includes(search.toLowerCase()) ||
        log.action.toLowerCase().includes(search.toLowerCase()) ||
        log.target.toLowerCase().includes(search.toLowerCase())
    );
  }, [logs, search]);

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
              Audit Logs
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Monitor security and administrative activity.
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
            placeholder="Search logs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />

        </div>

      </div>

      {/* Table */}

      <div className="overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-slate-50">

            <tr>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                User
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Action
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Target
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                IP Address
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold">
                Time
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredLogs.map((log) => (

              <tr
                key={log.id}
                className="border-t border-slate-100 hover:bg-slate-50"
              >

                <td className="px-6 py-5 font-medium">
                  {log.user}
                </td>

                <td className="px-6 py-5">

                  <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                    {log.action}
                  </span>

                </td>

                <td className="px-6 py-5 text-slate-600">
                  {log.target}
                </td>

                <td className="px-6 py-5 font-mono text-sm text-slate-500">
                  {log.ip}
                </td>

                <td className="px-6 py-5">

                  <div className="flex items-center gap-2 text-slate-500">

                    <Clock3 className="h-4 w-4" />

                    {new Date(log.created_at).toLocaleString()}

                  </div>

                </td>

              </tr>

            ))}

            {filteredLogs.length === 0 && (

              <tr>

                <td
                  colSpan={5}
                  className="py-16 text-center text-slate-500"
                >
                  No audit logs found.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}