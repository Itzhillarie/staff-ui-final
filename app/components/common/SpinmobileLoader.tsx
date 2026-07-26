interface SpinmobileLoaderProps {
  label?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: {
    shell: "h-12 w-12",
    ring: "h-12 w-12",
    core: "h-6 w-6 text-xs",
  },
  md: {
    shell: "h-16 w-16",
    ring: "h-16 w-16",
    core: "h-8 w-8 text-sm",
  },
  lg: {
    shell: "h-20 w-20",
    ring: "h-20 w-20",
    core: "h-10 w-10 text-base",
  },
};

export default function SpinmobileLoader({
  label = "Loading",
  size = "lg",
}: SpinmobileLoaderProps) {
  const classes = sizes[size];

  return (
    <div
      aria-label={label}
      role="status"
      className={`spinmobile-loader relative grid place-items-center ${classes.shell}`}
    >
      <span className={`spinmobile-loader-ring absolute ${classes.ring}`} />
      <span className={`spinmobile-loader-ring spinmobile-loader-ring-alt absolute ${classes.ring}`} />
      <span
        className={`grid place-items-center rounded-full bg-slate-950 font-black text-white shadow-xl shadow-cyan-500/20 dark:bg-cyan-300 dark:text-slate-950 ${classes.core}`}
      >
        S
      </span>
      <span className="sr-only">{label}</span>
    </div>
  );
}
