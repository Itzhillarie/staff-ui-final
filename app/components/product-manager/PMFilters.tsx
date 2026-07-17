"use client";

import {
  Search,
  Filter,
  RefreshCw,
  SlidersHorizontal,
} from "lucide-react";

export default function PMFilters() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">

        <div>
          <h2 className="text-xl font-bold text-slate-800">
            Filter Ideas
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Search and filter ideas awaiting product manager review.
          </p>
        </div>

        <button
          className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium transition hover:bg-slate-100"
        >
          <RefreshCw size={18} />
          Refresh
        </button>

      </div>

      {/* Filters */}
      <div className="grid gap-4 lg:grid-cols-6">

        {/* Search */}
        <div className="relative lg:col-span-2">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search by title or employee..."
            className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-blue-600"
          />

        </div>

        {/* Status */}
        <select className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600">
          <option>All Status</option>
          <option>Submitted</option>
          <option>Peer Review</option>
          <option>PM Review</option>
          <option>Approved</option>
          <option>Rejected</option>
        </select>

        {/* Priority */}
        <select className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600">
          <option>All Priority</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        {/* Department */}
        <select className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600">
          <option>All Departments</option>
          <option>ICT</option>
          <option>Finance</option>
          <option>HR</option>
          <option>Procurement</option>
          <option>Operations</option>
        </select>

        {/* Sort */}
        <select className="rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-600">
          <option>Newest First</option>
          <option>Oldest First</option>
          <option>Most Likes</option>
          <option>Highest Priority</option>
          <option>Most Comments</option>
        </select>

      </div>

      {/* Bottom Actions */}
      <div className="mt-6 flex flex-wrap items-center justify-between border-t border-slate-200 pt-4">

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Filter size={16} />
          Showing ideas that match the selected filters.
        </div>

        <button
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-white transition hover:bg-blue-700"
        >
          <SlidersHorizontal size={18} />
          Advanced Filters
        </button>

      </div>

    </div>
  );
}