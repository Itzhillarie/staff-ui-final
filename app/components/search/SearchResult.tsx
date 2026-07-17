"use client";

import SearchResultCard, {
  SearchResult,
} from "./SearchResultCard";

interface SearchResultsProps {
  results: SearchResult[];
  onView?: (result: SearchResult) => void;
}

export default function SearchResults({
  results,
  onView,
}: SearchResultsProps) {
  if (results.length === 0) {
    return (
      <div className="rounded-xl bg-white p-10 text-center shadow-sm">
        <h3 className="text-lg font-semibold text-slate-700">
          No Results Found
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Try a different keyword or filter.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {results.map((result) => (
        <SearchResultCard
          key={result.id}
          result={result}
          onView={onView}
        />
      ))}
    </div>
  );
}