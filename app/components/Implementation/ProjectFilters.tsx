"use client";

import { Search, Filter, X } from "lucide-react";

export default function ProjectFilters() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold text-slate-800">
            Filter Projects
          </h2>

          <p className="text-sm text-slate-500">
            Search and filter implementation projects.
          </p>

        </div>

        <button className="flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-100">
          <Filter size={18} />
          Advanced Filters
        </button>

      </div>

      {/* Filters */}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">

        {/* Search */}

        <div className="xl:col-span-2">

          <label className="mb-2 block text-sm font-medium">
            Search
          </label>

          <div className="relative">

            <Search
              size={18}
              className="absolute left-3 top-3.5 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search project..."
              className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-4 outline-none transition focus:border-indigo-600"
            />

          </div>

        </div>

        {/* Status */}

        <div>

          <label className="mb-2 block text-sm font-medium">
            Status
          </label>

          <select className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-indigo-600">

            <option>All</option>

            <option>Planning</option>

            <option>In Progress</option>

            <option>On Hold</option>

            <option>Completed</option>

            <option>Overdue</option>

          </select>

        </div>

        {/* Priority */}

        <div>

          <label className="mb-2 block text-sm font-medium">
            Priority
          </label>

          <select className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-indigo-600">

            <option>All</option>

            <option>High</option>

            <option>Medium</option>

            <option>Low</option>

          </select>

        </div>

        {/* Department */}

        <div>

          <label className="mb-2 block text-sm font-medium">
            Department
          </label>

          <select className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-indigo-600">

            <option>All</option>

            <option>ICT</option>

            <option>Finance</option>

            <option>HR</option>

            <option>Operations</option>

            <option>Customer Service</option>

          </select>

        </div>

        {/* Sort */}

        <div>

          <label className="mb-2 block text-sm font-medium">
            Sort By
          </label>

          <select className="w-full rounded-xl border border-slate-300 p-3 outline-none focus:border-indigo-600">

            <option>Newest</option>

            <option>Oldest</option>

            <option>Priority</option>

            <option>Progress</option>

            <option>Due Date</option>

          </select>

        </div>

      </div>

      {/* Footer */}

      <div className="mt-6 flex flex-wrap items-center justify-between border-t pt-5">

        <p className="text-sm text-slate-500">
          Showing implementation projects matching your filters.
        </p>

        <div className="flex gap-3">

          <button className="flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-2.5 hover:bg-slate-100">

            <X size={18} />

            Clear Filters

          </button>

          <button className="rounded-xl bg-indigo-600 px-5 py-2.5 font-medium text-white transition hover:bg-indigo-700">

            Apply Filters

          </button>

        </div>

      </div>

    </div>
  );
}