"use client";

import {
  Search,
  Filter,
  Calendar,
  RotateCcw,
} from "lucide-react";

interface NotificationFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;

  category: string;
  onCategoryChange: (value: string) => void;

  priority: string;
  onPriorityChange: (value: string) => void;

  status: string;
  onStatusChange: (value: string) => void;

  date: string;
  onDateChange: (value: string) => void;

  onReset: () => void;
}

export default function NotificationFilters({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  priority,
  onPriorityChange,
  status,
  onStatusChange,
  date,
  onDateChange,
  onReset,
}: NotificationFiltersProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <div className="flex items-center gap-2">

          <Filter
            size={22}
            className="text-indigo-600"
          />

          <h2 className="text-xl font-semibold text-slate-800">
            Filters
          </h2>

        </div>

        <button
          onClick={onReset}
          className="flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-sm transition hover:bg-slate-100"
        >
          <RotateCcw size={16} />
          Reset
        </button>

      </div>

      {/* Filter Controls */}

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">

        {/* Search */}

        <div className="relative xl:col-span-2">

          <Search
            size={18}
            className="absolute left-4 top-3.5 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              onSearchChange(e.target.value)
            }
            placeholder="Search notifications..."
            className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 focus:border-indigo-600 focus:outline-none"
          />

        </div>

        {/* Category */}

        <select
          value={category}
          onChange={(e) =>
            onCategoryChange(e.target.value)
          }
          className="rounded-xl border border-slate-300 px-4 py-3 focus:border-indigo-600 focus:outline-none"
        >
          <option value="">All Categories</option>
          <option value="Idea">Idea</option>
          <option value="Project">Project</option>
          <option value="Task">Task</option>
          <option value="Review">Review</option>
          <option value="System">System</option>
          <option value="Gamification">Gamification</option>
        </select>

        {/* Priority */}

        <select
          value={priority}
          onChange={(e) =>
            onPriorityChange(e.target.value)
          }
          className="rounded-xl border border-slate-300 px-4 py-3 focus:border-indigo-600 focus:outline-none"
        >
          <option value="">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        {/* Status */}

        <select
          value={status}
          onChange={(e) =>
            onStatusChange(e.target.value)
          }
          className="rounded-xl border border-slate-300 px-4 py-3 focus:border-indigo-600 focus:outline-none"
        >
          <option value="">All Status</option>
          <option value="Unread">Unread</option>
          <option value="Read">Read</option>
          <option value="Archived">Archived</option>
        </select>

      </div>

      {/* Date Filter */}

      <div className="mt-5 flex flex-wrap items-center gap-4">

        <div className="flex items-center gap-2">

          <Calendar
            size={18}
            className="text-slate-500"
          />

          <span className="text-sm font-medium text-slate-600">
            Date
          </span>

        </div>

        <input
          type="date"
          value={date}
          onChange={(e) =>
            onDateChange(e.target.value)
          }
          className="rounded-xl border border-slate-300 px-4 py-3 focus:border-indigo-600 focus:outline-none"
        />

      </div>

    </div>
  );
}