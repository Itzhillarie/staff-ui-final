"use client";

import { AlertTriangle, RefreshCw, ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface ErrorProps {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}

export default function Error({
  error,
  reset,
}: ErrorProps) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[75vh] items-center justify-center px-6">

      <div className="w-full max-w-xl rounded-3xl border border-red-200 bg-white p-10 text-center shadow-xl">

        {/* Icon */}

        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-100">

          <AlertTriangle className="h-12 w-12 text-red-600" />

        </div>

        {/* Title */}

        <h1 className="mt-8 text-3xl font-bold text-slate-900">
          Something went wrong
        </h1>

        <p className="mt-3 text-slate-500">
          We couldn't load your settings. This may be a temporary
          problem with the server or your network connection.
        </p>

        {/* Development Error */}

        {process.env.NODE_ENV === "development" && (

          <div className="mt-8 rounded-2xl bg-slate-900 p-5 text-left">

            <p className="mb-2 text-sm font-semibold text-white">
              Development Error
            </p>

            <pre className="overflow-auto text-xs text-red-300">
              {error.message}
            </pre>

          </div>

        )}

        {/* Actions */}

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">

          <button
            onClick={() => reset()}
            className="flex items-center justify-center gap-2 rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            <RefreshCw className="h-5 w-5" />

            Try Again
          </button>

          <button
            onClick={() => router.back()}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            <ArrowLeft className="h-5 w-5" />

            Go Back
          </button>

        </div>

        {/* Error Digest */}

        {error.digest && (

          <p className="mt-8 text-xs text-slate-400">
            Error ID: {error.digest}
          </p>

        )}

      </div>

    </div>
  );
}