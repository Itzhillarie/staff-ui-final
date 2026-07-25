"use client";

import SearchResultCard, { type SearchResult } from "./SearchResultCard";
import EmptySearch from "./EmptySearch";

interface SearchResultProps {
  results: SearchResult[];
}

export default function SearchResult({
  results,
}: SearchResultProps) {
  if (!results.length) {
    return (
      <EmptySearch title="No Results Found" />
    );
  }

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <h2 className="text-2xl font-bold text-slate-800">
          Search Results
        </h2>

        <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
          {results.length} Result{results.length !== 1 && "s"}
        </span>

      </div>

      <div className="space-y-4">

        {results.map((result) => (
          <SearchResultCard
            key={`${result.category}-${result.id}`}
            result={result}
          />
        ))}

      </div>

    </div>
  );
}