"use client";

import { ShieldCheck, X } from "lucide-react";

interface TwoFactorDialogProps {
  open: boolean;
  enabled: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function TwoFactorDialog({
  open,
  enabled,
  onClose,
  onConfirm,
}: TwoFactorDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <div className="w-full max-w-md rounded-xl bg-white shadow-xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b p-5">

          <div className="flex items-center gap-3">

            <div className="rounded-lg bg-green-100 p-2">
              <ShieldCheck
                size={22}
                className="text-green-600"
              />
            </div>

            <h2 className="text-lg font-semibold">
              Two-Factor Authentication
            </h2>

          </div>

          <button onClick={onClose}>
            <X className="text-slate-500" />
          </button>

        </div>

        {/* Body */}

        <div className="p-6">

          <p className="text-slate-600">
            {enabled
              ? "Are you sure you want to disable Two-Factor Authentication? This will reduce your account security."
              : "Enable Two-Factor Authentication to add an extra layer of security to your account."}
          </p>

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
            onClick={onConfirm}
            className={`rounded-lg px-4 py-2 text-white ${
              enabled
                ? "bg-red-600 hover:bg-red-700"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {enabled ? "Disable" : "Enable"}
          </button>

        </div>

      </div>

    </div>
  );
}