"use client";

import { useMemo, useState } from "react";

import SearchBar from "../../components/search/SearchBar";
import SearchFilters from "../../components/search/SearchFilters";
import SearchStats from "../../components/search/SearchStats";
import SearchResults from "../../components/search/SearchResult";
import SearchSuggestions, {
  SearchSuggestion,
} from "../../components/search/SearchSuggestions";
import RecentSearches, {
  RecentSearch,
} from "../../components/search/RecentSearches";
import SavedSearches, {
  SavedSearch,
} from "../../components/search/SavedSearches";
import SearchDialog from "../../components/search/SearchDialog";
import AdvancedSearch, {
  AdvancedFilters,
} from "../../components/search/AdvancedSearch";
import EmptySearch from "../../components/search/EmptySearch";

import { SearchResult } from "../../components/search/SearchResultCard";

export default function SearchPage() {
  const [query, setQuery] = useState("");

  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");

  const [filters, setFilters] = useState<AdvancedFilters>({
    department: "",
    category: "",
    status: "",
    priority: "",
  });

  const [selectedResult, setSelectedResult] =
    useState<SearchResult | null>(null);

  const [dialogOpen, setDialogOpen] = useState(false);

  // Sample Results (Replace with API)

  const results: SearchResult[] = [
    {
      id: 1,
      title: "AI Customer Support",
      description: "AI powered customer support solution.",
      type: "Idea",
      status: "Approved",
      date: "14 Jul 2026",
    },
    {
      id: 2,
      title: "Digital Transformation",
      description: "Implementation project.",
      type: "Project",
      status: "In Progress",
      date: "10 Jul 2026",
    },
    {
      id: 3,
      title: "Review Innovation Proposal",
      description: "Pending review task.",
      type: "Task",
      status: "Pending",
      date: "12 Jul 2026",
    },
  ];

  const suggestions: SearchSuggestion[] = [
    {
      id: 1,
      title: "AI Customer Support",
      type: "Idea",
    },
    {
      id: 2,
      title: "Digital Transformation",
      type: "Project",
    },
  ];

  const recentSearches: RecentSearch[] = [
    {
      id: 1,
      query: "AI",
      searchedAt: "Today",
    },
    {
      id: 2,
      query: "Projects",
      searchedAt: "Yesterday",
    },
  ];

  const savedSearches: SavedSearch[] = [
    {
      id: 1,
      name: "Approved Ideas",
      query: "status:approved",
    },
  ];

  const filteredResults = useMemo(() => {
    return results.filter((item) => {
      const matchQuery =
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description
          .toLowerCase()
          .includes(query.toLowerCase());

      const matchCategory =
        category === "All" ||
        item.type === category.slice(0, -1);

      const matchStatus =
        status === "All" || item.status === status;

      return (
        matchQuery &&
        matchCategory &&
        matchStatus
      );
    });
  }, [query, category, status]);

  return (
    <div className="space-y-8 p-8">

      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold">
          Global Search
        </h1>

        <p className="text-slate-500">
          Search ideas, projects, tasks, employees and
          notifications.
        </p>

      </div>

      {/* Search */}

      <SearchBar
        value={query}
        onChange={setQuery}
      />

      <SearchSuggestions
        suggestions={
          query ? suggestions : []
        }
        onSelect={(item) =>
          setQuery(item.title)
        }
      />

      {/* Stats */}

      <SearchStats
        total={filteredResults.length}
        ideas={
          filteredResults.filter(
            (x) => x.type === "Idea"
          ).length
        }
        projects={
          filteredResults.filter(
            (x) => x.type === "Project"
          ).length
        }
        tasks={
          filteredResults.filter(
            (x) => x.type === "Task"
          ).length
        }
      />

      {/* Filters */}

      <SearchFilters
        category={category}
        status={status}
        onCategoryChange={setCategory}
        onStatusChange={setStatus}
      />

      <AdvancedSearch
        filters={filters}
        onChange={setFilters}
        onApply={() =>
          console.log(filters)
        }
        onReset={() =>
          setFilters({
            department: "",
            category: "",
            status: "",
            priority: "",
          })
        }
      />

      {/* Results */}

      {filteredResults.length === 0 ? (
        <EmptySearch
          onClear={() => {
            setQuery("");
            setCategory("All");
            setStatus("All");
          }}
        />
      ) : (
        <SearchResults
          results={filteredResults}
          onView={(item: SearchResult) => {
            setSelectedResult(item);
            setDialogOpen(true);
          }}
        />
      )}

      {/* Bottom */}

      <div className="grid gap-6 lg:grid-cols-2">

        <RecentSearches
          searches={recentSearches}
          onSelect={setQuery}
        />

        <SavedSearches
          searches={savedSearches}
          onSelect={setQuery}
          onDelete={(id) =>
            console.log(id)
          }
        />

      </div>

      {/* Dialog */}

      <SearchDialog
        open={dialogOpen}
        result={selectedResult}
        onClose={() => {
          setDialogOpen(false);
          setSelectedResult(null);
        }}
      />

    </div>
  );
}