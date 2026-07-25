"use client";

import { Search, X } from "lucide-react";

interface SearchBarProps {
  value: string;
  loading?: boolean;
  placeholder?: string;
  onChange: (value: string) => void;
  onSearch?: () => void;
  onClear?: () => void;
}

export default function SearchBar({
  value,
  loading = false,
  placeholder = "Search ideas, projects, tasks, users...",
  onChange,
  onSearch,
  onClear,
}: SearchBarProps) {
  return (
    <div className="relative w-full">

      <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onSearch?.();
          }
        }}
        className="h-14 w-full rounded-2xl border border-slate-300 bg-white pl-12 pr-24 text-slate-800 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
      />

      <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-2">

        {value && (
          <button
            onClick={onClear}
            className="rounded-lg p-1.5 transition hover:bg-slate-100"
          >
            <X className="h-4 w-4 text-slate-500" />
          </button>
        )}

        <button
          onClick={onSearch}
          disabled={loading}
          className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Searching..." : "Search"}
        </button>

      </div>

    </div>
  );
}