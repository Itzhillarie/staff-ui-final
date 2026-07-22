"use client";

import { useEffect, useState } from "react";

import {
  MessageCircle,
  ThumbsUp,
  Rocket,
  CheckCircle,
  Bell,
  Loader2,
} from "lucide-react";
import { apiFetch } from "@/app/utils/apiFetch";

interface Activity {
  id: string;
  title: string;
  type: string;
  time: string;
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

export default function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchActivities() {
      try {
        const response = await apiFetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/dashboard/`,
          {
            method: "GET",
            credentials: "include",
            cache: "no-store",
            headers: {
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "1",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch activities");
        }

        const data = await response.json();

        setActivities(data);
      } catch (error) {
        console.error("Recent Activity Error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchActivities();
  }, []);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800">
          Recent Activity
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Latest activity across your innovation workspace.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      ) : activities.length === 0 ? (
        <div className="py-10 text-center text-slate-500">
          No recent activity found.
        </div>
      ) : (
        <div className="space-y-5">

          {activities.map((activity) => {

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

          })}

        </div>
      )}

    </section>
  );
}