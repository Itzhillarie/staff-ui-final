"use client";

interface SettingToggleProps {
  label: string;
  description?: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}

export default function SettingToggle({
  label,
  description,
  checked,
  disabled = false,
  onChange,
}: SettingToggleProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4">

      <div>

        <h3 className="font-medium text-slate-800">
          {label}
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
        className={`relative h-7 w-14 rounded-full transition ${
          checked
            ? "bg-indigo-600"
            : "bg-slate-300"
        } ${
          disabled
            ? "cursor-not-allowed opacity-50"
            : ""
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
            checked
              ? "left-8"
              : "left-1"
          }`}
        />
      </button>

    </div>
  );
}