"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

interface CreatePhaseDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: (phase: {
    name: string;
    description: string;
    startDate: string;
    dueDate: string;
    priority: "High" | "Medium" | "Low";
    owner: string;
  }) => void;
}

export default function CreatePhaseDialog({
  open,
  onClose,
  onCreate,
}: CreatePhaseDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [owner, setOwner] = useState("");
  const [priority, setPriority] = useState<
    "High" | "Medium" | "Low"
  >("Medium");

  if (!open) return null;

  function handleCreate() {
    if (
      !name ||
      !description ||
      !startDate ||
      !dueDate ||
      !owner
    ) {
      return;
    }

    onCreate({
      name,
      description,
      startDate,
      dueDate,
      priority,
      owner,
    });

    setName("");
    setDescription("");
    setStartDate("");
    setDueDate("");
    setOwner("");
    setPriority("Medium");

    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b p-6">

          <div>

            <h2 className="text-2xl font-bold text-slate-800">
              Create Implementation Phase
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Define a new phase for this implementation project.
            </p>

          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-100"
          >
            <X size={22} />
          </button>

        </div>

        {/* Body */}

        <div className="space-y-6 p-6">

          <div>

            <label className="mb-2 block font-medium">
              Phase Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Development"
              className="w-full rounded-xl border border-slate-300 p-3 focus:border-indigo-600 focus:outline-none"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Description
            </label>

            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe what will be achieved during this phase..."
              className="w-full rounded-xl border border-slate-300 p-3 focus:border-indigo-600 focus:outline-none"
            />

          </div>

          <div className="grid gap-5 md:grid-cols-2">

            <div>

              <label className="mb-2 block font-medium">
                Start Date
              </label>

              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full rounded-xl border border-slate-300 p-3 focus:border-indigo-600 focus:outline-none"
              />

            </div>

            <div>

              <label className="mb-2 block font-medium">
                Due Date
              </label>

              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full rounded-xl border border-slate-300 p-3 focus:border-indigo-600 focus:outline-none"
              />

            </div>

            <div>

              <label className="mb-2 block font-medium">
                Phase Owner
              </label>

              <input
                type="text"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                placeholder="John Doe"
                className="w-full rounded-xl border border-slate-300 p-3 focus:border-indigo-600 focus:outline-none"
              />

            </div>

            <div>

              <label className="mb-2 block font-medium">
                Priority
              </label>

              <select
                value={priority}
                onChange={(e) =>
                  setPriority(
                    e.target.value as "High" | "Medium" | "Low"
                  )
                }
                className="w-full rounded-xl border border-slate-300 p-3 focus:border-indigo-600 focus:outline-none"
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>

            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t bg-slate-50 p-6">

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-300 px-6 py-3 hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleCreate}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-white transition hover:bg-indigo-700"
          >
            <Plus size={18} />
            Create Phase
          </button>

        </div>

      </div>

    </div>
  );
}