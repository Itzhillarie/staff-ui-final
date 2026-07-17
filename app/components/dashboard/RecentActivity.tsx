"use client";

import {
  MessageCircle,
  ThumbsUp,
  Rocket,
  CheckCircle,
  Bell,
} from "lucide-react";

interface Activity {
  id: string;
  title: string;
  type: string;
  time: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

const iconMap = {
  like: {
    icon: ThumbsUp,
    color: "text-blue-500",
  },
  comment: {
    icon: MessageCircle,
    color: "text-green-500",
  },
  approval: {
    icon: CheckCircle,
    color: "text-purple-500",
  },
  implementation: {
    icon: Rocket,
    color: "text-orange-500",
  },
  notification: {
    icon: Bell,
    color: "text-red-500",
  },
};

export default function RecentActivity({
  activities,
}: RecentActivityProps) {
  return (
    <section className="rounded-2xl border bg-white p-6 shadow-sm">

      <div className="mb-6">
        <h2 className="text-xl font-bold">
          Recent Activity
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Latest activity across your innovation workspace.
        </p>
      </div>

      <div className="space-y-5">

        {activities.length === 0 ? (
          <div className="py-8 text-center text-slate-500">
            No recent activity.
          </div>
        ) : (
          activities.map((activity) => {
            const config =
              iconMap[
                activity.type as keyof typeof iconMap
              ] ?? iconMap.notification;

            const Icon = config.icon;

            return (
              <div
                key={activity.id}
                className="flex items-start gap-4 rounded-xl p-3 transition hover:bg-slate-50"
              >
                <div
                  className={`rounded-full bg-slate-100 p-3 ${config.color}`}
                >
                  <Icon size={18} />
                </div>

                <div className="flex-1">
                  <p className="font-medium text-slate-800">
                    {activity.title}
                  </p>

                  <span className="text-sm text-slate-400">
                    {activity.time}
                  </span>
                </div>
              </div>
            );
          })
        )}

      </div>

    </section>
  );
}