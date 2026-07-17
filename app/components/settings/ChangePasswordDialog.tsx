"use client";

import { useState } from "react";
import { X, Lock } from "lucide-react";

interface ChangePasswordDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
  ) => void;
}

export default function ChangePasswordDialog({
  open,
  onClose,
  onSave,
}: ChangePasswordDialogProps) {
  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  if (!open) return null;

  const handleSave = () => {
    onSave(
      currentPassword,
      newPassword,
      confirmPassword
    );

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <div className="w-full max-w-md rounded-xl bg-white shadow-xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b p-5">

          <div className="flex items-center gap-3">

            <div className="rounded-lg bg-indigo-100 p-2">
              <Lock
                size={20}
                className="text-indigo-600"
              />
            </div>

            <h2 className="text-lg font-semibold">
              Change Password
            </h2>

          </div>

          <button onClick={onClose}>
            <X className="text-slate-500" />
          </button>

        </div>

        {/* Body */}

        <div className="space-y-4 p-6">

          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) =>
              setCurrentPassword(e.target.value)
            }
            className="w-full rounded-lg border p-3"
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) =>
              setNewPassword(e.target.value)
            }
            className="w-full rounded-lg border p-3"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
            className="w-full rounded-lg border p-3"
          />

        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 border-t p-5">

          <button
            onClick={onClose}
            className="rounded-lg border px-4 py-2"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          >
            Update Password
          </button>

        </div>

      </div>

    </div>
  );
}