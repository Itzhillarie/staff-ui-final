"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Loader2,
  Trash2,
  X,
} from "lucide-react";

interface DeleteAccountDialogProps {
  open: boolean;
  loading?: boolean;

  onClose: () => void;
  onDelete: (password: string) => Promise<void> | void;
}

export default function DeleteAccountDialog({
  open,
  loading = false,
  onClose,
  onDelete,
}: DeleteAccountDialogProps) {
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");

  if (!open) return null;

  const canDelete =
    confirmation === "DELETE ACCOUNT" &&
    password.trim() !== "";

  async function handleDelete() {
    if (!canDelete) return;

    await onDelete(password);

    setPassword("");
    setConfirmation("");

    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6">

      <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-200 p-6">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-red-100 p-3">

              <AlertTriangle className="h-7 w-7 text-red-600" />

            </div>

            <div>

              <h2 className="text-xl font-bold text-slate-900">
                Delete Account
              </h2>

              <p className="text-sm text-slate-500">
                This action cannot be undone.
              </p>

            </div>

          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>

        </div>

        {/* Body */}

        <div className="space-y-6 p-6">

          <div className="rounded-2xl border border-red-200 bg-red-50 p-5">

            <div className="flex gap-3">

              <AlertTriangle className="mt-1 h-6 w-6 text-red-600" />

              <div>

                <h3 className="font-semibold text-red-700">
                  Warning
                </h3>

                <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-red-600">

                  <li>Your account will be permanently deleted.</li>

                  <li>
                    All ideas, reviews, comments and achievements
                    may be permanently removed.
                  </li>

                  <li>
                    You will immediately lose access to the system.
                  </li>

                  <li>
                    This action cannot be reversed.
                  </li>

                </ul>

              </div>

            </div>

          </div>

          {/* Password */}

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
              Confirm your password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
            />

          </div>

          {/* Confirmation */}

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">

              Type

              <span className="mx-1 rounded bg-slate-100 px-2 py-1 font-bold">
                DELETE ACCOUNT
              </span>

              to continue

            </label>

            <input
              value={confirmation}
              onChange={(e) =>
                setConfirmation(e.target.value)
              }
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
            />

          </div>

        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t border-slate-200 p-6">

          <button
            onClick={onClose}
            className="rounded-xl border border-slate-300 px-5 py-3 font-medium hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            disabled={!canDelete || loading}
            onClick={handleDelete}
            className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <Trash2 className="h-5 w-5" />
            )}

            Delete Account
          </button>

        </div>

      </div>

    </div>
  );
}