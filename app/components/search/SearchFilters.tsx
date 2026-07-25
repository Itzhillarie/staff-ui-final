"use client";

import { Filter } from "lucide-react";

interface SearchFiltersProps {
  category: string;
  status: string;
  priority: string;

  onCategoryChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onPriorityChange: (value: string) => void;
}

export default function SearchFilters({
  category,
  status,
  priority,
  onCategoryChange,
  onStatusChange,
  onPriorityChange,
}: SearchFiltersProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-5 flex items-center gap-3">

        <div className="rounded-xl bg-indigo-100 p-2">
          <Filter className="h-5 w-5 text-indigo-600" />
        </div>

        <div>
          <h2 className="font-semibold text-slate-800">
            Search Filters
          </h2>

          <p className="text-sm text-slate-500">
            Narrow your search results.
          </p>
        </div>

      </div>

      <div className="grid gap-4 md:grid-cols-3">

        {/* CATEGORY */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-600">
            Category
          </label>

          <select
            value={category}
            onChange={(e) =>
              onCategoryChange(e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="all">All</option>
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

        {/* STATUS */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-600">
            Status
          </label>

          <select
            value={status}
            onChange={(e) =>
              onStatusChange(e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="">Any Status</option>
            <option value="draft">Draft</option>
            <option value="submitted">
              Submitted
            </option>
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

        {/* PRIORITY */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-600">
            Priority
          </label>

          <select
            value={priority}
            onChange={(e) =>
              onPriorityChange(e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          >
            <option value="">Any Priority</option>
            <option value="High">High</option>
            <option value="Medium">
              Medium
            </option>
            <option value="Low">Low</option>
          </select>

        </div>

      </div>

    </div>
  );
}