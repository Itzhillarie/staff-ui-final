"use client";

import { X, Save } from "lucide-react";

interface Task {
  id: number;
  title: string;
  description: string;
  assignedTo: string;
  priority: "High" | "Medium" | "Low";
  status: "Not Started" | "In Progress" | "Completed";
  dueDate: string;
  notes?: string;
}

interface TaskDialogProps {
  open: boolean;
  task: Task | null;
  onClose: () => void;
  onSave: (task: Task) => void;
}

export default function TaskDialog({
  open,
  task,
  onClose,
  onSave,
}: TaskDialogProps) {
  if (!open || !task) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <div className="w-full max-w-3xl rounded-2xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b p-6">

          <div>

            <h2 className="text-2xl font-bold text-slate-800">
              Edit Task
            </h2>

            <p className="text-sm text-slate-500">
              Update implementation task details.
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

        <div className="grid gap-6 p-6 md:grid-cols-2">

          <div>

            <label className="mb-2 block text-sm font-medium">
              Task Title
            </label>

            <input
              defaultValue={task.title}
              className="w-full rounded-xl border p-3"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              Assigned To
            </label>

            <input
              defaultValue={task.assignedTo}
              className="w-full rounded-xl border p-3"
            />

          </div>

          <div className="md:col-span-2">

            <label className="mb-2 block text-sm font-medium">
              Description
            </label>

            <textarea
              rows={4}
              defaultValue={task.description}
              className="w-full rounded-xl border p-3"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              Priority
            </label>

            <select
              defaultValue={task.priority}
              className="w-full rounded-xl border p-3"
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              Status
            </label>

            <select
              defaultValue={task.status}
              className="w-full rounded-xl border p-3"
            >
              <option>Not Started</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              Due Date
            </label>

            <input
              type="date"
              defaultValue={task.dueDate}
              className="w-full rounded-xl border p-3"
            />

          </div>

          <div className="md:col-span-2">

            <label className="mb-2 block text-sm font-medium">
              Implementation Notes
            </label>

            <textarea
              rows={5}
              defaultValue={task.notes}
              placeholder="Enter implementation notes..."
              className="w-full rounded-xl border p-3"
            />

          </div>

        </div>

        {/* Footer */}

        <div className="flex items-center justify-end gap-3 border-t bg-slate-50 p-6">

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-300 px-6 py-3 hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => onSave(task)}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-white transition hover:bg-indigo-700"
          >
            <Save size={18} />
            Save Changes
          </button>

        </div>

      </div>

    </div>
  );
}