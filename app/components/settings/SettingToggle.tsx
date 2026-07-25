"use client";

interface SettingToggleProps {
  title: string;
  description?: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}

export default function SettingToggle({
  title,
  description,
  checked,
  disabled = false,
  onChange,
}: SettingToggleProps) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-slate-300">

      <div className="pr-6">

        <h3 className="font-semibold text-slate-900">
          {title}
        </h3>

        {description && (
          <p className="mt-1 text-sm text-slate-500">
            {description}
          </p>
        )}

      </div>

      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-7 w-12 items-center rounded-full transition ${
          checked
            ? "bg-indigo-600"
            : "bg-slate-300"
        } ${
          disabled
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer"
        }`}
      >
        <span
          className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
            checked
              ? "translate-x-6"
              : "translate-x-1"
          }`}
        />
      </button>

    </div>
  );
}