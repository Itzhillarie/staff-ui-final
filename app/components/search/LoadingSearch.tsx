"use client";

import { Loader2 } from "lucide-react";

interface LoadingSearchProps {
  message?: string;
}

export default function LoadingSearch({
  message = "Searching across the system...",
}: LoadingSearchProps) {
  return (
    <div className="flex min-h-100 items-center justify-center">

      <div className="rounded-2xl bg-white p-10 text-center shadow-lg">

        <Loader2 className="mx-auto h-14 w-14 animate-spin text-indigo-600" />

        <h2 className="mt-6 text-2xl font-bold text-slate-800">
          Searching...
        </h2>

        <p className="mt-2 text-slate-500">
          {message}
        </p>

      </div>

    </div>
  );
}