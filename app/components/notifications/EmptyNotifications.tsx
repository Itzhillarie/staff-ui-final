"use client";

import Link from "next/link";
import {
  BellOff,
  Bell,
  RefreshCw,
  ArrowRight,
} from "lucide-react";

interface EmptyNotificationsProps {
  title?: string;
  description?: string;
  showRefresh?: boolean;
  onRefresh?: () => void;
}

export default function EmptyNotifications({
  title = "You're all caught up!",
  description = "There are currently no notifications. New updates about ideas, projects, reviews, and tasks will appear here.",
  showRefresh = true,
  onRefresh,
}: EmptyNotificationsProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-12 shadow-sm">

      <div className="flex flex-col items-center text-center">

        {/* Icon */}

        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-indigo-100">

          <BellOff
            size={48}
            className="text-indigo-600"
          />

        </div>

        {/* Title */}

        <h2 className="mt-8 text-3xl font-bold text-slate-800">
          {title}
        </h2>

        {/* Description */}

        <p className="mt-4 max-w-xl text-lg leading-8 text-slate-500">
          {description}
        </p>

        {/* Information Cards */}

        <div className="mt-10 grid w-full max-w-4xl gap-5 md:grid-cols-3">

          <div className="rounded-2xl border border-slate-200 p-6">

            <Bell
              size={30}
              className="mx-auto text-indigo-600"
            />

            <h3 className="mt-4 font-semibold">
              Stay Updated
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              You'll receive notifications whenever
              ideas, projects, or tasks require your
              attention.
            </p>

          </div>

          <div className="rounded-2xl border border-slate-200 p-6">

            <RefreshCw
              size={30}
              className="mx-auto text-green-600"
            />

            <h3 className="mt-4 font-semibold">
              Real-Time Updates
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Notifications refresh automatically as
              activities happen across the system.
            </p>

          </div>

          <div className="rounded-2xl border border-slate-200 p-6">

            <ArrowRight
              size={30}
              className="mx-auto text-orange-600"
            />

            <h3 className="mt-4 font-semibold">
              Continue Working
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Explore ideas, manage projects, or
              complete your assigned implementation
              tasks.
            </p>

          </div>

        </div>

        {/* Actions */}

        <div className="mt-10 flex flex-wrap justify-center gap-4">

          {showRefresh && (
            <button
              onClick={onRefresh}
              className="flex items-center gap-2 rounded-xl border border-slate-300 px-6 py-3 transition hover:bg-slate-100"
            >
              <RefreshCw size={18} />
              Refresh
            </button>
          )}

          <Link
            href="/dashboard"
            className="rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700"
          >
            Back to Dashboard
          </Link>

        </div>

      </div>

    </div>
  );
}