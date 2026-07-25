"use client";

import {
  Clock3,
  Search,
  Trash2,
} from "lucide-react";

export interface RecentSearch {
  id: string;
  query: string;
  created_at: string;
}

interface RecentSearchesProps {
  searches: RecentSearch[];
  onSelect: (query: string) => void;
  onClear: () => void;
}

export default function RecentSearches({
  searches,
  onSelect,
  onClear,
}: RecentSearchesProps) {
  if (searches.length === 0) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="flex items-center justify-between border-b border-slate-200 p-6">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-indigo-100 p-2">
            <Clock3 className="h-5 w-5 text-indigo-600" />
          </div>

          <div>

            <h2 className="text-xl font-bold text-slate-800">
              Recent Searches
            </h2>

            <p className="text-sm text-slate-500">
              Quickly repeat previous searches.
            </p>

          </div>

        </div>

        <button
          onClick={onClear}
          className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
        >
          <Trash2 className="h-4 w-4" />
          Clear
        </button>

      </div>

      <div className="divide-y divide-slate-100">

        {searches.map((item) => (

          <button
            key={item.id}
            onClick={() => onSelect(item.query)}
            className="flex w-full items-center justify-between px-6 py-4 text-left transition hover:bg-slate-50"
          >

            <div className="flex items-center gap-3">

              <Search className="h-5 w-5 text-slate-400" />

              <div>

                <p className="font-medium text-slate-800">
                  {item.query}
                </p>

                <p className="text-xs text-slate-500">
                  {new Date(
                    item.created_at
                  ).toLocaleString()}
                </p>

              </div>

            </div>

          </button>

        ))}

      </div>

    </div>
  );
}