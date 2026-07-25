"use client";

import { SearchX } from "lucide-react";

interface EmptySearchProps {
  title?: string;
  description?: string;
}

export default function EmptySearch({
  title = "No Results Found",
  description = "Try changing your search keywords or filters.",
}: EmptySearchProps) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-16 text-center shadow-sm">

      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-slate-100">

        <SearchX className="h-12 w-12 text-slate-400" />

      </div>

      <h2 className="mt-6 text-3xl font-bold text-slate-800">
        {title}
      </h2>

      <p className="mx-auto mt-3 max-w-xl text-slate-500">
        {description}
      </p>

    </div>
  );
}