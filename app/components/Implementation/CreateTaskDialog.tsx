"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

interface CreateTaskDialogProps {
  open: boolean;
  onClose: () => void;
  onCreate: (task: {
    title: string;
    description: string;
    assignedTo: string;
    priority: "High" | "Medium" | "Low";
    dueDate: string;
    phase: string;
  }) => void;
}

export default function CreateTaskDialog({
  open,
  onClose,
  onCreate,
}: CreateTaskDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [priority, setPriority] = useState<
    "High" | "Medium" | "Low"
  >("Medium");
  const [dueDate, setDueDate] = useState("");
  const [phase, setPhase] = useState("");

  if (!open) return null;

  const handleSubmit = () => {
    if (!title || !assignedTo || !dueDate || !phase) return;

    onCreate({
      title,
      description,
      assignedTo,
      priority,
      dueDate,
      phase,
    });

    setTitle("");
    setDescription("");
    setAssignedTo("");
    setPriority("Medium");
    setDueDate("");
    setPhase("");

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b p-6">

          <div>

            <h2 className="text-2xl font-bold text-slate-800">
              Create New Task
            </h2>

            <p className="text-sm text-slate-500">
              Add a new implementation task.
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
              Task Title
            </label>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border p-3"
              placeholder="Enter task title"
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
              className="w-full rounded-xl border p-3"
              placeholder="Describe the task"
            />

          </div>

          <div className="grid gap-5 md:grid-cols-2">

            <div>

              <label className="mb-2 block font-medium">
                Assigned To
              </label>

              <input
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                className="w-full rounded-xl border p-3"
                placeholder="Employee name"
              />

            </div>

            <div>

              <label className="mb-2 block font-medium">
                Phase
              </label>

              <select
                value={phase}
                onChange={(e) => setPhase(e.target.value)}
                className="w-full rounded-xl border p-3"
              >
                <option value="">Select Phase</option>
                <option>Requirements Gathering</option>
                <option>Budget Approval</option>
                <option>Development</option>
                <option>Testing</option>
                <option>Deployment</option>
              </select>

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
                className="w-full rounded-xl border p-3"
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>

            </div>

            <div>

              <label className="mb-2 block font-medium">
                Due Date
              </label>

              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full rounded-xl border p-3"
              />

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
            onClick={handleSubmit}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-white transition hover:bg-indigo-700"
          >
            <Plus size={18} />
            Create Task
          </button>

        </div>

      </div>

    </div>
  );
}