"use client";

import { Clock, Search } from "lucide-react";

export interface RecentSearch {
  id: number;
  query: string;
  searchedAt: string;
}

interface RecentSearchesProps {
  searches: RecentSearch[];
  onSelect?: (query: string) => void;
}

export default function RecentSearches({
  searches,
  onSelect,
}: RecentSearchesProps) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">

      <div className="mb-4 flex items-center gap-2">
        <Clock className="text-indigo-600" size={20} />
        <h2 className="text-lg font-semibold">
          Recent Searches
        </h2>
      </div>

      {searches.length === 0 ? (
        <p className="text-sm text-slate-500">
          No recent searches.
        </p>
      ) : (
        <div className="space-y-2">
          {searches.map((item) => (
            <button
              key={item.id}
              onClick={() => onSelect?.(item.query)}
              className="flex w-full items-center justify-between rounded-lg p-3 text-left transition hover:bg-slate-100"
            >
              <div className="flex items-center gap-3">
                <Search
                  size={16}
                  className="text-slate-500"
                />

                <span className="font-medium">
                  {item.query}
                </span>
              </div>

              <span className="text-xs text-slate-400">
                {item.searchedAt}
              </span>
            </button>
          ))}
        </div>
      )}

    </div>
  );
}