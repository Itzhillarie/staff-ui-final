"use client";

interface NotificationBadgeProps {
  count: number;
}

export default function NotificationBadge({
  count,
}: NotificationBadgeProps) {
  if (count <= 0) return null;

  return (
    <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
      {count > 99 ? "99+" : count}
    </span>
  );
}