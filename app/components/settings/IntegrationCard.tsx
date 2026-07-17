"use client";

import { Plug, CheckCircle2, XCircle } from "lucide-react";

export interface Integration {
  id: number;
  name: string;
  description: string;
  connected: boolean;
}

interface IntegrationCardProps {
  integration: Integration;
  onToggle: (id: number) => void;
}

export default function IntegrationCard({
  integration,
  onToggle,
}: IntegrationCardProps) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">

      {/* Header */}

      <div className="flex items-start justify-between">

        <div className="flex items-center gap-3">

          <div className="rounded-lg bg-indigo-100 p-3">
            <Plug
              size={22}
              className="text-indigo-600"
            />
          </div>

          <div>

            <h3 className="font-semibold text-slate-800">
              {integration.name}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {integration.description}
            </p>

          </div>

        </div>

        {integration.connected ? (
          <CheckCircle2
            className="text-green-600"
            size={22}
          />
        ) : (
          <XCircle
            className="text-red-500"
            size={22}
          />
        )}

      </div>

      {/* Status */}

      <div className="mt-6 flex items-center justify-between">

        <span
          className={`rounded-full px-3 py-1 text-sm font-medium ${
            integration.connected
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {integration.connected
            ? "Connected"
            : "Disconnected"}
        </span>

        <button
          onClick={() => onToggle(integration.id)}
          className={`rounded-lg px-5 py-2 text-white transition ${
            integration.connected
              ? "bg-red-600 hover:bg-red-700"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {integration.connected
            ? "Disconnect"
            : "Connect"}
        </button>

      </div>

    </div>
  );
}