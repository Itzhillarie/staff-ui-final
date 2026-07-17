"use client";

import { AlertTriangle, X } from "lucide-react";
import { useState } from "react";

interface DeleteAccountDialogProps {
  open: boolean;
  onClose: () => void;
  onDelete: (password: string) => void;
}

export default function DeleteAccountDialog({
  open,
  onClose,
  onDelete,
}: DeleteAccountDialogProps) {
  const [password, setPassword] = useState("");

  if (!open) return null;

  const handleDelete = () => {
    onDelete(password);
    setPassword("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <div className="w-full max-w-md rounded-xl bg-white shadow-xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b p-5">

          <div className="flex items-center gap-3">

            <div className="rounded-lg bg-red-100 p-2">
              <AlertTriangle
                size={22}
                className="text-red-600"
              />
            </div>

            <h2 className="text-lg font-semibold text-slate-800">
              Delete Account
            </h2>

          </div>

          <button onClick={onClose}>
            <X className="text-slate-500 hover:text-slate-700" />
          </button>

        </div>

        {/* Body */}

        <div className="space-y-4 p-6">

          <div className="rounded-lg border border-red-200 bg-red-50 p-4">

            <p className="text-sm text-red-700">
              <strong>Warning:</strong> This action is permanent.
              Your account and all associated data may be deleted and
              cannot be recovered.
            </p>

          </div>

          <p className="text-sm text-slate-600">
            Enter your password to confirm account deletion.
          </p>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border p-3 focus:border-red-500 focus:outline-none"
          />

        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t p-5">

          <button
            onClick={onClose}
            className="rounded-lg border px-4 py-2 hover:bg-slate-50"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            disabled={!password}
            className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Delete Account
          </button>

        </div>

      </div>

    </div>
  );
}