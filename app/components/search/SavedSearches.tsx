"use client";

import { Bookmark, Trash2 } from "lucide-react";

export interface SavedSearch {
  id: number;
  name: string;
  query: string;
}

interface SavedSearchesProps {
  searches: SavedSearch[];
  onSelect?: (query: string) => void;
  onDelete?: (id: number) => void;
}

export default function SavedSearches({
  searches,
  onSelect,
  onDelete,
}: SavedSearchesProps) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">

      <div className="mb-4 flex items-center gap-2">
        <Bookmark
          size={20}
          className="text-indigo-600"
        />
        <h2 className="text-lg font-semibold">
          Saved Searches
        </h2>
      </div>

      {searches.length === 0 ? (

        <p className="text-sm text-slate-500">
          No saved searches.
        </p>

      ) : (

        <div className="space-y-2">

          {searches.map((item) => (

            <div
              key={item.id}
              className="flex items-center justify-between rounded-lg border p-3 hover:bg-slate-50"
            >

              <button
                onClick={() => onSelect?.(item.query)}
                className="text-left"
              >
                <p className="font-medium text-slate-800">
                  {item.name}
                </p>

                <p className="text-sm text-slate-500">
                  {item.query}
                </p>
              </button>

              <button
                onClick={() => onDelete?.(item.id)}
                className="rounded-lg p-2 text-red-500 hover:bg-red-50"
              >
                <Trash2 size={18} />
              </button>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}