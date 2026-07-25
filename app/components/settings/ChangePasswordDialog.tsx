"use client";

import { useState } from "react";
import { X, KeyRound, Eye, EyeOff, Loader2 } from "lucide-react";

interface ChangePasswordDialogProps {
  open: boolean;
  loading?: boolean;
  onClose: () => void;
  onSubmit: (data: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) => Promise<void> | void;
}

export default function ChangePasswordDialog({
  open,
  loading = false,
  onClose,
  onSubmit,
}: ChangePasswordDialogProps) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    await onSubmit({
      currentPassword,
      newPassword,
      confirmPassword,
    });

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    onClose();
  }

  const PasswordInput = ({
    label,
    value,
    onChange,
    show,
    setShow,
  }: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    show: boolean;
    setShow: (value: boolean) => void;
  }) => (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <div className="relative">

        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2"
        >
          {show ? (
            <EyeOff className="h-5 w-5 text-slate-500" />
          ) : (
            <Eye className="h-5 w-5 text-slate-500" />
          )}
        </button>

      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">

      <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-200 p-6">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-indigo-100 p-3">

              <KeyRound className="h-6 w-6 text-indigo-600" />

            </div>

            <div>

              <h2 className="text-xl font-bold">
                Change Password
              </h2>

              <p className="text-sm text-slate-500">
                Update your account password.
              </p>

            </div>

          </div>

          <button onClick={onClose}>
            <X className="h-6 w-6 text-slate-500" />
          </button>

        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-6"
        >

          <PasswordInput
            label="Current Password"
            value={currentPassword}
            onChange={setCurrentPassword}
            show={showCurrent}
            setShow={setShowCurrent}
          />

          <PasswordInput
            label="New Password"
            value={newPassword}
            onChange={setNewPassword}
            show={showNew}
            setShow={setShowNew}
          />

          <PasswordInput
            label="Confirm Password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            show={showConfirm}
            setShow={setShowConfirm}
          />

          <div className="flex justify-end gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-300 px-5 py-3 font-medium hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-60"
            >
              {loading && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}

              {loading ? "Updating..." : "Update Password"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}