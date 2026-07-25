"use client";

import { useEffect, useState, type ComponentProps } from "react";
import { toast } from "sonner";

import {
  SearchBar,
  SearchFilters,
  SearchStats,
  SearchResult,
  RecentSearches,
  SavedSearches,
  LoadingSearch,
} from "@/app/components/search";

import type {
  RecentSearch,
  SavedSearch,
} from "@/app/components/search";

import {
  search,
  getRecentSearches,
  getSavedSearches,
  getSearchStats,
  clearRecentSearches,
  deleteSavedSearch,
} from "@/app/lib/search";

type SearchResultType = {
  id: string;
  title?: string;
  description?: string;
  category?: string;
  status?: string;
  priority?: string;
  href: string;
  [key: string]: unknown;
};

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  const [loading, setLoading] = useState(false);

  const [results, setResults] = useState<SearchResultType[]>([]);
  const [recentSearches, setRecentSearches] = useState<
    RecentSearch[]
  >([]);
  const [savedSearches, setSavedSearches] = useState<
    SavedSearch[]
  >([]);

  const [stats, setStats] = useState({
    totalResults: 0,
    searchTime: 0,
    categoriesFound: 0,
    savedSearches: 0,
  });

  useEffect(() => {
    loadPage();
  }, []);

  async function loadPage() {
    try {
      const [
        recent,
        saved,
        searchStats,
      ] = await Promise.all([
        getRecentSearches(),
        getSavedSearches(),
        getSearchStats(),
      ]);

      setRecentSearches(
        Array.isArray(recent)
          ? recent
          : recent.results || []
      );

      const savedData = Array.isArray(saved)
        ? saved
        : saved.results || [];

      setSavedSearches(savedData);

      setStats({
        totalResults: 0,
        searchTime: searchStats.search_time || 0,
        categoriesFound:
          searchStats.categories_found || 0,
        savedSearches: savedData.length,
      });
    } catch {
      toast.error("Failed to load search data.");
    }
  }

  async function handleSearch(customQuery?: string) {
    const value = customQuery ?? query;

    if (!value.trim()) {
      toast.warning("Enter a search term.");
      return;
    }

    try {
      setLoading(true);

      const start = performance.now();

      const data = await search(value, category);

      const end = performance.now();

      const searchResults = Array.isArray(data)
        ? data
        : data.results || [];

      setResults(searchResults);

      setStats((prev) => ({
        ...prev,
        totalResults: searchResults.length,
        searchTime: Math.round(end - start),
      }));

      if (searchResults.length === 0) {
        toast.info("No matching results found.");
      } else {
        toast.success(
          `${searchResults.length} result(s) found.`
        );
      }
    } catch {
      toast.error("Search failed.");
    } finally {
      setLoading(false);
    }
  }

  async function handleClearRecent() {
    try {
      await clearRecentSearches();

      setRecentSearches([]);

      toast.success("Recent searches cleared.");
    } catch {
      toast.error("Unable to clear history.");
    }
  }

  async function handleDeleteSaved(id: string) {
    try {
      await deleteSavedSearch(id);

      setSavedSearches((prev) =>
        prev.filter((item) => item.id !== id)
      );

      toast.success("Saved search deleted.");
    } catch {
      toast.error("Unable to delete saved search.");
    }
  }

  if (loading && results.length === 0) {
    return <LoadingSearch />;
  }

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold text-slate-800">
          Global Search
        </h1>

        <p className="mt-2 text-slate-500">
          Search Ideas, Projects, Tasks,
          Notifications, Users and Reviews.
        </p>

      </div>

      <SearchBar
        value={query}
        loading={loading}
        onChange={setQuery}
        onSearch={() => handleSearch()}
        onClear={() => {
          setQuery("");
          setResults([]);
        }}
      />

      <SearchFilters
        category={category}
        status={status}
        priority={priority}
        onCategoryChange={setCategory}
        onStatusChange={setStatus}
        onPriorityChange={setPriority}
      />

      <SearchStats
        totalResults={stats.totalResults}
        searchTime={stats.searchTime}
        categoriesFound={stats.categoriesFound}
        savedSearches={stats.savedSearches}
      />

      <SearchResult results={results} />

      <div className="grid gap-8 lg:grid-cols-2">

        <RecentSearches
          searches={recentSearches}
          onSelect={(value) => {
            setQuery(value);
            handleSearch(value);
          }}
          onClear={handleClearRecent}
        />

        <SavedSearches
          searches={savedSearches}
          onRun={(item) => {
            setQuery(item.query);
            handleSearch(item.query);
          }}
          onDelete={handleDeleteSaved}
        />

      </div>

    </div>
  );
}