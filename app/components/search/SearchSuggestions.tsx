"use client";

import { Search } from "lucide-react";

export interface SearchSuggestion {
  id: number;
  title: string;
  type: "Idea" | "Project" | "Task" | "Employee";
}

interface SearchSuggestionsProps {
  suggestions: SearchSuggestion[];
  onSelect?: (suggestion: SearchSuggestion) => void;
}

export default function SearchSuggestions({
  suggestions,
  onSelect,
}: SearchSuggestionsProps) {
  if (suggestions.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-xl border bg-white shadow-lg">

      {suggestions.map((item) => (

        <button
          key={item.id}
          onClick={() => onSelect?.(item)}
          className="flex w-full items-center justify-between border-b p-3 text-left transition hover:bg-slate-50 last:border-none"
        >

          <div className="flex items-center gap-3">

            <Search
              size={16}
              className="text-slate-500"
            />

            <span className="font-medium">
              {item.title}
            </span>

          </div>

          <span className="rounded-full bg-indigo-100 px-2 py-1 text-xs text-indigo-700">
            {item.type}
          </span>

        </button>

      ))}

    </div>
  );
}