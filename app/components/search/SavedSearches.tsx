"use client";

import { Bookmark, Play, Trash2 } from "lucide-react";

export interface SavedSearch {
  id: string;
  name: string;
  query: string;
  category?: string;
}

interface SavedSearchesProps {
  searches: SavedSearch[];
  onRun: (search: SavedSearch) => void;
  onDelete: (id: string) => void;
}

export default function SavedSearches({
  searches,
  onRun,
  onDelete,
}: SavedSearchesProps) {
  if (searches.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">

          <Bookmark className="h-10 w-10 text-slate-400" />

        </div>

        <h2 className="mt-5 text-2xl font-bold text-slate-800">
          No Saved Searches
        </h2>

        <p className="mt-2 text-slate-500">
          Save frequently used searches for quick access.
        </p>

      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="border-b border-slate-200 p-6">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-indigo-100 p-2">

            <Bookmark className="h-5 w-5 text-indigo-600" />

          </div>

          <div>

            <h2 className="text-xl font-bold text-slate-800">
              Saved Searches
            </h2>

            <p className="text-sm text-slate-500">
              Quickly run your favorite searches.
            </p>

          </div>

        </div>

      </div>

      <div className="divide-y divide-slate-100">

        {searches.map((item) => (

          <div
            key={item.id}
            className="flex items-center justify-between p-6 transition hover:bg-slate-50"
          >

            <div>

              <h3 className="text-lg font-semibold text-slate-800">
                {item.name}
              </h3>

              <p className="mt-1 text-slate-500">
                {item.query}
              </p>

              {item.category && (
                <span className="mt-3 inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase text-indigo-700">
                  {item.category.replace("_", " ")}
                </span>
              )}

            </div>

            <div className="flex gap-3">

              <button
                onClick={() => onRun(item)}
                className="rounded-xl bg-green-100 p-3 text-green-600 transition hover:bg-green-200"
                title="Run Search"
              >
                <Play className="h-5 w-5" />
              </button>

              <button
                onClick={() => onDelete(item.id)}
                className="rounded-xl bg-red-100 p-3 text-red-600 transition hover:bg-red-200"
                title="Delete Search"
              >
                <Trash2 className="h-5 w-5" />
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}