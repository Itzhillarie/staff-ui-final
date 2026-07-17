"use client";

import { SearchX } from "lucide-react";

interface EmptySearchProps {
  title?: string;
  message?: string;
  onClear?: () => void;
}

export default function EmptySearch({
  title = "No Results Found",
  message = "Try using different keywords or adjust your filters.",
  onClear,
}: EmptySearchProps) {
  return (
    <div className="rounded-xl bg-white p-10 text-center shadow-sm">

      <SearchX
        size={60}
        className="mx-auto text-slate-300"
      />

      <h2 className="mt-4 text-2xl font-bold text-slate-800">
        {title}
      </h2>

      <p className="mt-2 text-slate-500">
        {message}
      </p>

      {onClear && (
        <button
          onClick={onClear}
          className="mt-6 rounded-lg bg-indigo-600 px-5 py-2 text-white transition hover:bg-indigo-700"
        >
          Clear Search
        </button>
      )}

    </div>
  );
}