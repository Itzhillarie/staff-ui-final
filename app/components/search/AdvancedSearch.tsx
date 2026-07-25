"use client";

import { Filter, RotateCcw } from "lucide-react";

export interface AdvancedSearchFilters {
  query: string;
  category: string;
  status: string;
  priority: string;
  start_date: string;
  end_date: string;
}

interface AdvancedSearchProps {
  filters: AdvancedSearchFilters;
  loading?: boolean;

  onChange: (
    key: keyof AdvancedSearchFilters,
    value: string
  ) => void;

  onSearch: () => void;
  onReset: () => void;
}

export default function AdvancedSearch({
  filters,
  loading = false,
  onChange,
  onSearch,
  onReset,
}: AdvancedSearchProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}

      <div className="border-b border-slate-200 p-6">

        <div className="flex items-center gap-3">

          <div className="rounded-xl bg-indigo-100 p-2">
            <Filter className="h-5 w-5 text-indigo-600" />
          </div>

          <div>

            <h2 className="text-xl font-bold text-slate-800">
              Advanced Search
            </h2>

            <p className="text-sm text-slate-500">
              Filter search results across the entire system.
            </p>

          </div>

        </div>

      </div>

      {/* Body */}

      <div className="grid gap-6 p-6 md:grid-cols-2 xl:grid-cols-3">

        {/* Search */}

        <div className="xl:col-span-3">

          <label className="mb-2 block text-sm font-medium text-slate-600">
            Search
          </label>

          <input
            value={filters.query}
            onChange={(e) =>
              onChange("query", e.target.value)
            }
            placeholder="Search..."
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />

        </div>

        {/* Category */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-600">
            Category
          </label>

          <select
            value={filters.category}
            onChange={(e) =>
              onChange("category", e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="">All Categories</option>
            <option value="ideas">Ideas</option>
            <option value="projects">Projects</option>
            <option value="tasks">Tasks</option>
            <option value="users">Users</option>
            <option value="notifications">
              Notifications
            </option>
            <option value="peer_reviews">
              Peer Reviews
            </option>
            <option value="pm_reviews">
              PM Reviews
            </option>
          </select>

        </div>

        {/* Status */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-600">
            Status
          </label>

          <select
            value={filters.status}
            onChange={(e) =>
              onChange("status", e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="">Any Status</option>
            <option value="draft">Draft</option>
            <option value="submitted">Submitted</option>
            <option value="peer_review">
              Peer Review
            </option>
            <option value="pm_review">
              PM Review
            </option>
            <option value="approved">
              Approved
            </option>
            <option value="implementation">
              Implementation
            </option>
            <option value="completed">
              Completed
            </option>
          </select>

        </div>

        {/* Priority */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-600">
            Priority
          </label>

          <select
            value={filters.priority}
            onChange={(e) =>
              onChange("priority", e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="">Any Priority</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

        </div>

        {/* Start */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-600">
            From
          </label>

          <input
            type="date"
            value={filters.start_date}
            onChange={(e) =>
              onChange("start_date", e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />

        </div>

        {/* End */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-600">
            To
          </label>

          <input
            type="date"
            value={filters.end_date}
            onChange={(e) =>
              onChange("end_date", e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />

        </div>

      </div>

      {/* Footer */}

      <div className="flex justify-end gap-4 border-t border-slate-200 p-6">

        <button
          onClick={onReset}
          className="flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-100"
        >
          <RotateCcw className="h-4 w-4" />
          Reset
        </button>

        <button
          onClick={onSearch}
          disabled={loading}
          className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-60"
        >
          {loading ? "Searching..." : "Search"}
        </button>

      </div>

    </div>
  );
}