"use client";

import { CalendarDays, Flag, FileText, DollarSign, BarChart3 } from "lucide-react";

export default function PMRecommendation() {
  return (
    <div className="space-y-6">

      <div>
        <h3 className="text-xl font-bold text-slate-800">
          Manager Recommendation
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Complete the review before approving or rejecting this idea.
        </p>
      </div>

      {/* Priority */}

      <div>
        <label className="mb-2 block font-medium">
          Priority
        </label>

        <div className="relative">

          <Flag
            size={18}
            className="absolute left-3 top-3.5 text-slate-400"
          />

          <select className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-4 outline-none focus:border-indigo-600">

            <option>High</option>

            <option>Medium</option>

            <option>Low</option>

          </select>

        </div>

      </div>

      {/* Due Date */}

      <div>

        <label className="mb-2 block font-medium">
          Target Due Date
        </label>

        <div className="relative">

          <CalendarDays
            size={18}
            className="absolute left-3 top-3.5 text-slate-400"
          />

          <input
            type="date"
            className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-4 outline-none focus:border-indigo-600"
          />

        </div>

      </div>

      {/* Estimated Cost */}

      <div>

        <label className="mb-2 block font-medium">
          Estimated Cost
        </label>

        <div className="relative">

          <DollarSign
            size={18}
            className="absolute left-3 top-3.5 text-slate-400"
          />

          <input
            type="number"
            placeholder="Estimated implementation cost"
            className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-4 outline-none focus:border-indigo-600"
          />

        </div>

      </div>

      {/* Expected Impact */}

      <div>

        <label className="mb-2 block font-medium">
          Expected Impact
        </label>

        <div className="relative">

          <BarChart3
            size={18}
            className="absolute left-3 top-3.5 text-slate-400"
          />

          <select className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-4 outline-none focus:border-indigo-600">

            <option>High</option>

            <option>Medium</option>

            <option>Low</option>

          </select>

        </div>

      </div>

      {/* Recommendation */}

      <div>

        <label className="mb-2 block font-medium">
          Recommendation
        </label>

        <textarea
          rows={4}
          placeholder="Provide your recommendation..."
          className="w-full rounded-xl border border-slate-300 p-4 outline-none focus:border-indigo-600"
        />

      </div>

      {/* Manager Notes */}

      <div>

        <label className="mb-2 block font-medium">
          Internal Notes
        </label>

        <div className="relative">

          <FileText
            size={18}
            className="absolute left-3 top-4 text-slate-400"
          />

          <textarea
            rows={4}
            placeholder="Internal notes..."
            className="w-full rounded-xl border border-slate-300 py-4 pl-10 pr-4 outline-none focus:border-indigo-600"
          />

        </div>

      </div>

      {/* Buttons */}

      <div className="flex justify-end gap-3 border-t pt-6">

        <button className="rounded-xl border border-slate-300 px-5 py-3 font-medium hover:bg-slate-100">
          Save Review
        </button>

        <button className="rounded-xl bg-red-600 px-5 py-3 font-medium text-white hover:bg-red-700">
          Reject
        </button>

        <button className="rounded-xl bg-green-600 px-5 py-3 font-medium text-white hover:bg-green-700">
          Approve
        </button>

      </div>

    </div>
  );
}