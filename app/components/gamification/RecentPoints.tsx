"use client";

import { Clock, Plus, Heart, MessageSquare, Trophy } from "lucide-react";

export interface PointHistory {
  id: string;
  action: string;
  points: number;
  created_at: string;
}

interface RecentPointsProps {
  history: PointHistory[];
}

function getIcon(action: string) {
  const value = action.toLowerCase();

  if (value.includes("submit")) {
    return <Plus className="h-5 w-5 text-blue-600" />;
  }

  if (value.includes("like")) {
    return <Heart className="h-5 w-5 text-red-500" />;
  }

  if (value.includes("comment")) {
    return <MessageSquare className="h-5 w-5 text-green-600" />;
  }

  return <Trophy className="h-5 w-5 text-yellow-500" />;
}

export default function RecentPoints({
  history,
}: RecentPointsProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="border-b border-slate-200 p-6">

        <h2 className="text-2xl font-bold text-slate-800">
          Recent Points
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Your latest point earning activities.
        </p>

      </div>

      {history.length === 0 ? (
        <div className="py-14 text-center text-slate-500">
          No point history available.
        </div>
      ) : (
        <div className="divide-y divide-slate-100">

          {history.map((item) => (

            <div
              key={item.id}
              className="flex items-center justify-between p-5 transition hover:bg-slate-50"
            >

              <div className="flex items-center gap-4">

                <div className="rounded-xl bg-slate-100 p-3">
                  {getIcon(item.action)}
                </div>

                <div>

                  <h3 className="font-semibold text-slate-800">
                    {item.action}
                  </h3>

                  <div className="mt-1 flex items-center gap-2 text-sm text-slate-500">

                    <Clock className="h-4 w-4" />

                    {new Date(item.created_at).toLocaleString()}

                  </div>

                </div>

              </div>

              <div className="rounded-full bg-green-100 px-4 py-2 font-bold text-green-700">

                +{item.points} pts

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}