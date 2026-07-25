"use client";

import { Search } from "lucide-react";

export interface SearchSuggestion {
  id: string;
  text: string;
  category: string;
}

interface SearchSuggestionsProps {
  suggestions: SearchSuggestion[];
  visible: boolean;
  onSelect: (suggestion: SearchSuggestion) => void;
}

export default function SearchSuggestions({
  suggestions,
  visible,
  onSelect,
}: SearchSuggestionsProps) {
  if (!visible || suggestions.length === 0) return null;

  return (
    <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">

      <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">

        <h3 className="text-sm font-semibold text-slate-600">
          Suggestions
        </h3>

      </div>

      <div className="max-h-80 overflow-y-auto">

        {suggestions.map((suggestion) => (

          <button
            key={suggestion.id}
            onClick={() => onSelect(suggestion)}
            className="flex w-full items-center justify-between border-b border-slate-100 px-4 py-3 text-left transition hover:bg-indigo-50 last:border-none"
          >

            <div className="flex items-center gap-3">

              <div className="rounded-lg bg-indigo-100 p-2">

                <Search className="h-4 w-4 text-indigo-600" />

              </div>

              <div>

                <p className="font-medium text-slate-800">
                  {suggestion.text}
                </p>

                <p className="text-xs capitalize text-slate-500">
                  {suggestion.category.replace("_", " ")}
                </p>

              </div>

            </div>

          </button>

        ))}

      </div>

    </div>
  );
}