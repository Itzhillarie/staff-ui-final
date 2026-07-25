"use client";

import {
  CheckCircle2,
  XCircle,
  ExternalLink,
  Link2,
  Loader2,
} from "lucide-react";

interface IntegrationCardProps {
  id: string;
  name: string;
  description: string;
  logo?: string;
  connected: boolean;
  loading?: boolean;

  onConnect: (id: string) => void;
  onDisconnect: (id: string) => void;
}

export default function IntegrationCard({
  id,
  name,
  description,
  logo,
  connected,
  loading = false,
  onConnect,
  onDisconnect,
}: IntegrationCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">

      {/* Header */}

      <div className="flex items-start justify-between">

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">

            {logo ? (
              <img
                src={logo}
                alt={name}
                className="h-10 w-10 object-contain"
              />
            ) : (
              <Link2 className="h-7 w-7 text-slate-500" />
            )}

          </div>

          <div>

            <h3 className="text-lg font-semibold text-slate-800">
              {name}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {description}
            </p>

          </div>

        </div>

        {connected ? (
          <span className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
            <CheckCircle2 className="h-4 w-4" />
            Connected
          </span>
        ) : (
          <span className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
            <XCircle className="h-4 w-4" />
            Not Connected
          </span>
        )}

      </div>

      {/* Actions */}

      <div className="mt-6 flex gap-3">

        {connected ? (
          <button
            disabled={loading}
            onClick={() => onDisconnect(id)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-3 font-medium text-red-700 transition hover:bg-red-100 disabled:opacity-60"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <XCircle className="h-4 w-4" />
            )}

            Disconnect
          </button>
        ) : (
          <button
            disabled={loading}
            onClick={() => onConnect(id)}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 font-medium text-white transition hover:bg-indigo-700 disabled:opacity-60"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Link2 className="h-4 w-4" />
            )}

            Connect
          </button>
        )}

        <button
          className="rounded-xl border border-slate-200 px-4 py-3 transition hover:bg-slate-100"
        >
          <ExternalLink className="h-5 w-5 text-slate-600" />
        </button>

      </div>

    </div>
  );
}