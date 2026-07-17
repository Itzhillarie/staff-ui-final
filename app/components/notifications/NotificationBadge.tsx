"use client";

interface NotificationBadgeProps {
  count: number;
  maxCount?: number;
  color?: "red" | "blue" | "green" | "yellow" | "gray";
  size?: "sm" | "md" | "lg";
  showZero?: boolean;
}

export default function NotificationBadge({
  count,
  maxCount = 99,
  color = "red",
  size = "md",
  showZero = false,
}: NotificationBadgeProps) {
  if (!showZero && count === 0) return null;

  const colors = {
    red: "bg-red-600 text-white",
    blue: "bg-blue-600 text-white",
    green: "bg-green-600 text-white",
    yellow: "bg-yellow-500 text-white",
    gray: "bg-slate-600 text-white",
  };

  const sizes = {
    sm: "min-w-[18px] h-[18px] text-[10px] px-1",
    md: "min-w-[22px] h-[22px] text-xs px-1.5",
    lg: "min-w-[28px] h-[28px] text-sm px-2",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        justify-center
        rounded-full
        font-semibold
        leading-none
        ${colors[color]}
        ${sizes[size]}
      `}
    >
      {count > maxCount ? `${maxCount}+` : count}
    </span>
  );
}