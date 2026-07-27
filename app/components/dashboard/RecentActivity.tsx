"use client";

import {
  MessageCircle,
  ThumbsUp,
  Rocket,
  CheckCircle,
  Bell,
  Loader2,
} from "lucide-react";


interface Activity {
  id: string;
  title: string;
  type: string;
  time: string;
}


interface Props {
  audit_logs?: {
    recent?: Array<{
      event_message: string;
      event_type__name?: string;
      created_at: string;
    }>;
  };

  loading?: boolean;
}


const iconMap = {
  like: {
    icon: ThumbsUp,
    color: "text-blue-500",
  },
  comment: {
    icon: MessageCircle,
    color: "text-blue-500",
  },
  approval: {
    icon: CheckCircle,
    color: "text-blue-500",
  },
  implementation: {
    icon: Rocket,
    color: "text-blue-500",
  },
  notification: {
    icon: Bell,
    color: "text-red-500",
  },
};


export default function RecentActivity({
  audit_logs,
  loading = false,
}: Props) {


  const activities: Activity[] =
    (audit_logs?.recent ?? [])
      .slice(0, 5)
      .map((item, index) => ({
        id: String(index),
        title: item.event_message,
        type:
          item.event_type__name
            ?.toLowerCase()
            .replace(/\s+/g, "") || "notification",
        time: new Date(
          item.created_at
        ).toLocaleString("en-US"),
      }));


  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">


      <div className="mb-6">

        <h2 className="text-xl font-bold text-slate-800">
          Recent Activity
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Latest 5 changes across the innovation platform.
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


                  <p className="mt-1 text-sm text-slate-500">
                    {activity.time}
                  </p>

                </div>


              </div>

            );

          })}


        </div>

      )}

    </section>
  );
}