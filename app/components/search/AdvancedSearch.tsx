"use client";

import { Filter } from "lucide-react";

export interface AdvancedFilters {
  department: string;
  category: string;
  status: string;
  priority: string;
}

interface AdvancedSearchProps {
  filters: AdvancedFilters;
  onChange: (filters: AdvancedFilters) => void;
  onApply: () => void;
  onReset: () => void;
}

export default function AdvancedSearch({
  filters,
  onChange,
  onApply,
  onReset,
}: AdvancedSearchProps) {
  const updateFilter = (
    key: keyof AdvancedFilters,
    value: string
  ) => {
    onChange({
      ...filters,
      [key]: value,
    });
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">

      {/* Header */}

      <div className="mb-6 flex items-center gap-2">
        <Filter
          size={20}
          className="text-indigo-600"
        />
        <h2 className="text-lg font-semibold">
          Advanced Search
        </h2>
      </div>

      {/* Filters */}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

        <select
          value={filters.department}
          onChange={(e) =>
            updateFilter("department", e.target.value)
          }
          className="rounded-lg border px-4 py-2"
        >
          <option value="">All Departments</option>
          <option value="ICT">ICT</option>
          <option value="Finance">Finance</option>
          <option value="HR">HR</option>
          <option value="Operations">Operations</option>
        </select>

        <select
          value={filters.category}
          onChange={(e) =>
            updateFilter("category", e.target.value)
          }
          className="rounded-lg border px-4 py-2"
        >
          <option value="">All Categories</option>
          <option value="Idea">Idea</option>
          <option value="Project">Project</option>
          <option value="Task">Task</option>
          <option value="Employee">Employee</option>
        </select>

        <select
          value={filters.status}
          onChange={(e) =>
            updateFilter("status", e.target.value)
          }
          className="rounded-lg border px-4 py-2"
        >
          <option value="">All Status</option>
          <option value="Draft">Draft</option>
          <option value="Submitted">Submitted</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
          <option value="Completed">Completed</option>
        </select>

        <select
          value={filters.priority}
          onChange={(e) =>
            updateFilter("priority", e.target.value)
          }
          className="rounded-lg border px-4 py-2"
        >
          <option value="">All Priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

      </div>

      {/* Actions */}

      <div className="mt-6 flex justify-end gap-3">

        <button
          onClick={onReset}
          className="rounded-lg border px-5 py-2 hover:bg-slate-100"
        >
          Reset
        </button>

        <button
          onClick={onApply}
          className="rounded-lg bg-indigo-600 px-5 py-2 text-white hover:bg-indigo-700"
        >
          Apply Filters
        </button>

      </div>

    </div>
  );
}