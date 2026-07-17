"use client";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({
  error,
  reset,
}: ErrorProps) {
  return (
    <div className="flex h-screen items-center justify-center">

      <div className="rounded-xl bg-white p-8 shadow">

        <h1 className="text-2xl font-bold text-red-600">
          Something went wrong
        </h1>

        <p className="mt-3 text-slate-600">
          {error.message}
        </p>

        <button
          onClick={reset}
          className="mt-6 rounded-lg bg-indigo-600 px-5 py-2 text-white"
        >
          Try Again
        </button>

      </div>

    </div>
  );
}