"use client";

import { useState } from "react";
import {
  ShieldCheck,
  Smartphone,
  Loader2,
  X,
  Copy,
  Check,
} from "lucide-react";

interface TwoFactorDialogProps {
  open: boolean;
  enabled: boolean;
  loading?: boolean;
  qrCode?: string;
  secret?: string;

  onClose: () => void;
  onEnable: (code: string) => Promise<void> | void;
  onDisable: () => Promise<void> | void;
}

export default function TwoFactorDialog({
  open,
  enabled,
  loading = false,
  qrCode,
  secret,
  onClose,
  onEnable,
  onDisable,
}: TwoFactorDialogProps) {
  const [verificationCode, setVerificationCode] = useState("");
  const [copied, setCopied] = useState(false);

  if (!open) return null;

  async function handleEnable() {
    await onEnable(verificationCode);
    setVerificationCode("");
  }

  function copySecret() {
    if (!secret) return;

    navigator.clipboard.writeText(secret);

    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">

      <div className="w-full max-w-xl rounded-3xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-200 p-6">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-green-100 p-3">

              <ShieldCheck className="h-6 w-6 text-green-600" />

            </div>

            <div>

              <h2 className="text-xl font-bold">
                Two-Factor Authentication
              </h2>

              <p className="text-sm text-slate-500">
                Protect your account with an authenticator app.
              </p>

            </div>

          </div>

          <button onClick={onClose}>
            <X className="h-6 w-6 text-slate-500" />
          </button>

        </div>

        {/* Enabled */}

        {enabled ? (
          <div className="space-y-6 p-8">

            <div className="rounded-2xl bg-green-50 p-6">

              <div className="flex items-center gap-3">

                <ShieldCheck className="h-6 w-6 text-green-600" />

                <div>

                  <h3 className="font-semibold text-green-700">
                    Two-Factor Authentication is Enabled
                  </h3>

                  <p className="text-sm text-green-600">
                    Your account is protected.
                  </p>

                </div>

              </div>

            </div>

            <button
              onClick={onDisable}
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 font-semibold text-white hover:bg-red-700 disabled:opacity-60"
            >
              {loading && (
                <Loader2 className="h-5 w-5 animate-spin" />
              )}

              Disable Two-Factor Authentication
            </button>

          </div>
        ) : (
          <div className="space-y-8 p-8">

            <div className="rounded-2xl bg-slate-50 p-6">

              <div className="flex items-center gap-3">

                <Smartphone className="h-6 w-6 text-indigo-600" />

                <div>

                  <h3 className="font-semibold">
                    Step 1
                  </h3>

                  <p className="text-sm text-slate-500">
                    Scan this QR code using Google Authenticator,
                    Microsoft Authenticator, or Authy.
                  </p>

                </div>

              </div>

            </div>

            {qrCode && (
              <div className="flex justify-center">

                <img
                  src={qrCode}
                  alt="QR Code"
                  className="rounded-2xl border"
                />

              </div>
            )}

            {secret && (
              <div>

                <label className="mb-2 block text-sm font-medium">
                  Manual Setup Key
                </label>

                <div className="flex gap-2">

                  <input
                    readOnly
                    value={secret}
                    className="flex-1 rounded-xl border border-slate-300 bg-slate-50 px-4 py-3"
                  />

                  <button
                    onClick={copySecret}
                    className="rounded-xl border border-slate-300 px-4 hover:bg-slate-100"
                  >
                    {copied ? (
                      <Check className="h-5 w-5 text-green-600" />
                    ) : (
                      <Copy className="h-5 w-5" />
                    )}
                  </button>

                </div>

              </div>
            )}

            <div>

              <label className="mb-2 block text-sm font-medium">
                Verification Code
              </label>

              <input
                value={verificationCode}
                onChange={(e) =>
                  setVerificationCode(e.target.value)
                }
                placeholder="123456"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-center text-xl tracking-[0.5em] outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />

            </div>

            <button
              onClick={handleEnable}
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700 disabled:opacity-60"
            >
              {loading && (
                <Loader2 className="h-5 w-5 animate-spin" />
              )}

              Enable Two-Factor Authentication
            </button>

          </div>
        )}

      </div>

    </div>
  );
}