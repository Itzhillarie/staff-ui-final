"use client";

import Link from "next/link";
import {
  Lightbulb,
  ClipboardList,
  Users,
  Rocket,
  Trophy,
  Bell,
} from "lucide-react";

interface QuickActionsProps {
  stats?: {
    submittedIdeas: number;
    peerReview: number;
    projects: number;
    notifications?: number;
  };
}

const actions = [
  {
    title: "Submit Idea",
    description: "Share a new innovation",
    href: "/submit-idea",
    icon: Lightbulb,
    color: "bg-blue-500",
    badge: null,
  },
  {
    title: "Idea Board",
    description: "Browse all ideas",
    href: "/idea-board",
    icon: ClipboardList,
    color: "bg-purple-500",
    badge: "submittedIdeas",
  },
  {
    title: "Peer Reviews",
    description: "Review colleague ideas",
    href: "/peer-review",
    icon: Users,
    color: "bg-green-500",
    badge: "peerReview",
  },
  {
    title: "Projects",
    description: "Implementation projects",
    href: "/implementation",
    icon: Rocket,
    color: "bg-cyan-600",
    badge: "projects",
  },
  {
    title: "Leaderboard",
    description: "Innovation rankings",
    href: "/leaderboard",
    icon: Trophy,
    color: "bg-yellow-500",
    badge: null,
  },
  {
    title: "Notifications",
    description: "Recent updates",
    href: "/notifications",
    icon: Bell,
    color: "bg-red-500",
    badge: "notifications",
  },
];

export default function QuickActions({
  stats,
}: QuickActionsProps) {
  return (
    <section>
      <h2 className="mb-5 text-2xl font-bold text-slate-800">
        Quick Actions
      </h2>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {actions.map((action) => {
          const Icon = action.icon;

          const badge =
            action.badge && stats
              ? stats[action.badge as keyof typeof stats]
              : null;

          return (
            <Link
              key={action.title}
              href={action.href}
              className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {badge !== null &&
                badge !== undefined &&
                Number(badge) > 0 && (
                  <span className="absolute right-4 top-4 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                    {badge}
                  </span>
                )}

              <div
                className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl ${action.color} text-white`}
              >
                <Icon size={28} />
              </div>

              <h3 className="text-lg font-semibold text-slate-800">
                {action.title}
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                {action.description}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}