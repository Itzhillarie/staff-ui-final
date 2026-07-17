"use client";

import { X, Calendar, Tag } from "lucide-react";
import { SearchResult } from "./SearchResultCard";

interface SearchDialogProps {
  open: boolean;
  result: SearchResult | null;
  onClose: () => void;
}

export default function SearchDialog({
  open,
  result,
  onClose,
}: SearchDialogProps) {
  if (!open || !result) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b p-5">

          <div>
            <h2 className="text-xl font-bold text-slate-800">
              Search Result
            </h2>

            <p className="text-sm text-slate-500">
              View search result details
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-100"
          >
            <X size={20} />
          </button>

        </div>

        {/* Content */}

        <div className="space-y-5 p-6">

          <div>

            <h3 className="text-2xl font-bold">
              {result.title}
            </h3>

            <p className="mt-3 text-slate-600">
              {result.description}
            </p>

          </div>

          <div className="grid gap-4 md:grid-cols-3">

            <div className="rounded-xl bg-slate-50 p-4">

              <div className="mb-2 flex items-center gap-2">
                <Tag size={16} />
                <span className="text-sm text-slate-500">
                  Type
                </span>
              </div>

              <p className="font-semibold">
                {result.type}
              </p>

            </div>

            <div className="rounded-xl bg-slate-50 p-4">

              <div className="mb-2 flex items-center gap-2">
                <Tag size={16} />
                <span className="text-sm text-slate-500">
                  Status
                </span>
              </div>

              <p className="font-semibold">
                {result.status}
              </p>

            </div>

            <div className="rounded-xl bg-slate-50 p-4">

              <div className="mb-2 flex items-center gap-2">
                <Calendar size={16} />
                <span className="text-sm text-slate-500">
                  Date
                </span>
              </div>

              <p className="font-semibold">
                {result.date}
              </p>

            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="flex justify-end border-t p-5">

          <button
            onClick={onClose}
            className="rounded-lg bg-indigo-600 px-5 py-2 text-white transition hover:bg-indigo-700"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}