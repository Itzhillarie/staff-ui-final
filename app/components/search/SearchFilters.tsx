"use client";

interface SearchFiltersProps {
  category: string;
  status: string;
  onCategoryChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export default function SearchFilters({
  category,
  status,
  onCategoryChange,
  onStatusChange,
}: SearchFiltersProps) {
  return (
    <div className="flex flex-wrap gap-4 rounded-xl bg-white p-4 shadow-sm">

      {/* Category */}

      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="rounded-lg border px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none"
      >
        <option value="All">All Categories</option>
        <option value="Ideas">Ideas</option>
        <option value="Projects">Projects</option>
        <option value="Tasks">Tasks</option>
        <option value="Employees">Employees</option>
        <option value="Notifications">Notifications</option>
      </select>

      {/* Status */}

      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="rounded-lg border px-4 py-2 text-sm focus:border-indigo-500 focus:outline-none"
      >
        <option value="All">All Status</option>
        <option value="Draft">Draft</option>
        <option value="Submitted">Submitted</option>
        <option value="Approved">Approved</option>
        <option value="Rejected">Rejected</option>
        <option value="Completed">Completed</option>
      </select>

    </div>
  );
}