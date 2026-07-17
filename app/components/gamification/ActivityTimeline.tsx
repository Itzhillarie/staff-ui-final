"use client";

import {
  Lightbulb,
  MessageSquare,
  CheckCircle2,
  Trophy,
  Award,
  Gift,
  Clock,
} from "lucide-react";

export interface Activity {
  id: number;
  type:
    | "Idea"
    | "Review"
    | "Implementation"
    | "Achievement"
    | "Badge"
    | "Reward";
  title: string;
  description: string;
  points?: number;
  timestamp: string;
}

interface ActivityTimelineProps {
  activities: Activity[];
}

export default function ActivityTimeline({
  activities,
}: ActivityTimelineProps) {
  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "Idea":
        return (
          <Lightbulb
            className="text-yellow-600"
            size={20}
          />
        );

      case "Review":
        return (
          <MessageSquare
            className="text-blue-600"
            size={20}
          />
        );

      case "Implementation":
        return (
          <CheckCircle2
            className="text-green-600"
            size={20}
          />
        );

      case "Achievement":
        return (
          <Trophy
            className="text-purple-600"
            size={20}
          />
        );

      case "Badge":
        return (
          <Award
            className="text-orange-600"
            size={20}
          />
        );

      case "Reward":
        return (
          <Gift
            className="text-pink-600"
            size={20}
          />
        );
    }
  };

  const getIconBackground = (type: Activity["type"]) => {
    switch (type) {
      case "Idea":
        return "bg-yellow-100";

      case "Review":
        return "bg-blue-100";

      case "Implementation":
        return "bg-green-100";

      case "Achievement":
        return "bg-purple-100";

      case "Badge":
        return "bg-orange-100";

      case "Reward":
        return "bg-pink-100";
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}

      <div className="border-b border-slate-200 p-6">

        <h2 className="text-2xl font-bold text-slate-800">
          Activity Timeline
        </h2>

        <p className="mt-2 text-slate-500">
          Your latest innovation activities across the platform.
        </p>

      </div>

      {/* Timeline */}

      {activities.length === 0 ? (
        <div className="flex flex-col items-center py-16">

          <Clock
            size={60}
            className="text-slate-300"
          />

          <h3 className="mt-5 text-xl font-semibold text-slate-700">
            No Activity Yet
          </h3>

          <p className="mt-2 text-slate-500">
            Your innovation journey will appear here.
          </p>

        </div>
      ) : (
        <div className="relative p-8">

          {/* Vertical Line */}

          <div className="absolute left-12 top-8 bottom-8 w-0.5 bg-slate-200" />

          <div className="space-y-8">

            {activities.map((activity) => (
              <div
                key={activity.id}
                className="relative flex gap-6"
              >
                {/* Timeline Icon */}

                <div
                  className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${getIconBackground(
                    activity.type
                  )}`}
                >
                  {getActivityIcon(activity.type)}
                </div>

                {/* Content */}

                <div className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:bg-white hover:shadow-md">

                  <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

                    <div>

                      <h3 className="text-lg font-semibold text-slate-800">
                        {activity.title}
                      </h3>

                      <p className="mt-2 leading-7 text-slate-600">
                        {activity.description}
                      </p>

                    </div>

                    {activity.points !== undefined && (
                      <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700">
                        +{activity.points} pts
                      </span>
                    )}

                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-4">

                    <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                      {activity.type}
                    </span>

                    <div className="flex items-center gap-2 text-sm text-slate-500">

                      <Clock size={15} />

                      {activity.timestamp}

                    </div>

                  </div>

                </div>

              </div>
            ))}

          </div>

        </div>
      )}

    </div>
  );
}