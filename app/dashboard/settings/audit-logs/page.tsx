"use client";

import { useEffect, useState } from "react";
import { FileSearch, RefreshCw } from "lucide-react";

import AuditLogTable, {
  AuditLog,
} from "@/app/components/settings/AuditLogTable";

import LoadingSettings from "@/app/components/settings/LoadingSettings";
import EmptySettings from "@/app/components/settings/EmptySettings";

import { getAuditLogs } from "@/app/lib/settings";
import { showErrorToast } from "@/app/lib/notification";

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchLogs() {
    try {
      setLoading(true);

      const data = await getAuditLogs();

      setLogs(data);
    } catch (error) {
      console.error(error);

      showErrorToast(
        "Unable to load audit logs."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLogs();
  }, []);

  if (loading) {
    return <LoadingSettings />;
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="rounded-3xl bg-linear-to-r from-slate-900 via-indigo-700 to-purple-700 p-8 text-white shadow-xl">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <div className="mb-4 inline-flex rounded-xl bg-white/20 p-3">

              <FileSearch className="h-8 w-8" />

            </div>

            <h1 className="text-3xl font-bold">
              Audit Logs
            </h1>

            <p className="mt-2 text-indigo-100">
              Monitor administrative actions, security events and
              system activity.
            </p>

          </div>

          <button
            onClick={fetchLogs}
            className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-indigo-700 transition hover:bg-slate-100"
          >
            <RefreshCw className="h-5 w-5" />

            Refresh
          </button>

        </div>

      </div>

      {/* Content */}

      {logs.length === 0 ? (
        <EmptySettings
          title="No Audit Logs"
          description="There are currently no audit records available."
          buttonText="Reload"
          onRetry={fetchLogs}
        />
      ) : (
        <AuditLogTable logs={logs} />
      )}

    </div>
  );
}