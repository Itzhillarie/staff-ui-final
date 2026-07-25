"use client";

import { useEffect } from "react";
import { Search, X } from "lucide-react";

import SearchBar from "./SearchBar";
import SearchSuggestions, {
  SearchSuggestion,
} from "./SearchSuggestions";
import SearchResult from "./SearchResult";
import type { SearchResult as Result } from "./SearchResultCard";

interface SearchDialogProps {
  open: boolean;
  query: string;
  loading?: boolean;

  suggestions: SearchSuggestion[];
  results: Result[];

  onClose: () => void;
  onQueryChange: (value: string) => void;
  onSearch: () => void;
  onSuggestionSelect: (item: SearchSuggestion) => void;
}

export default function SearchDialog({
  open,
  query,
  loading = false,
  suggestions,
  results,
  onClose,
  onQueryChange,
  onSearch,
  onSuggestionSelect,
}: SearchDialogProps) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    if (open) {
      window.addEventListener("keydown", handleKey);
    }

    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-100 bg-black/50 backdrop-blur-sm">

      <div className="mx-auto mt-16 w-full max-w-4xl rounded-3xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-200 p-6">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-indigo-100 p-2">
              <Search className="h-6 w-6 text-indigo-600" />
            </div>

            <div>

              <h2 className="text-2xl font-bold text-slate-800">
                Global Search
              </h2>

              <p className="text-sm text-slate-500">
                Search across the entire system
              </p>

            </div>

          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 transition hover:bg-slate-100"
          >
            <X className="h-6 w-6 text-slate-600" />
          </button>

        </div>

        {/* Search */}

        <div className="relative p-6">

          <SearchBar
            value={query}
            loading={loading}
            onChange={onQueryChange}
            onSearch={onSearch}
            onClear={() => onQueryChange("")}
            placeholder="Search ideas, projects, tasks, users..."
          />

          <SearchSuggestions
            visible={query.length > 0}
            suggestions={suggestions}
            onSelect={onSuggestionSelect}
          />

        </div>

        {/* Results */}

        <div className="max-h-[60vh] overflow-y-auto border-t border-slate-200 p-6">

          {query ? (
            <SearchResult results={results} />
          ) : (
            <div className="py-16 text-center">

              <Search className="mx-auto h-14 w-14 text-slate-300" />

              <h3 className="mt-6 text-2xl font-bold text-slate-700">
                Start Typing...
              </h3>

              <p className="mt-2 text-slate-500">
                Search Ideas, Projects, Tasks, Users,
                Notifications and more.
              </p>

              <div className="mt-8 inline-flex items-center gap-2 rounded-xl bg-slate-100 px-4 py-2 text-sm text-slate-600">
                <kbd className="rounded bg-white px-2 py-1 shadow">
                  Esc
                </kbd>

                Close Search
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}