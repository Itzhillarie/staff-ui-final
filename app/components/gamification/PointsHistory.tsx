"use client";

import {
  ArrowUpCircle,
  ArrowDownCircle,
  Calendar,
  Coins,
  Lightbulb,
  CheckCircle2,
  MessageSquare,
  Trophy,
} from "lucide-react";

export interface PointHistory {
  id: number;
  activity: string;
  description: string;
  points: number;
  type: "Earned" | "Redeemed";
  category:
    | "Idea"
    | "Review"
    | "Implementation"
    | "Achievement"
    | "Reward";
  date: string;
}

interface PointsHistoryProps {
  history: PointHistory[];
}

export default function PointsHistory({
  history,
}: PointsHistoryProps) {
  const getCategoryIcon = (
    category: PointHistory["category"]
  ) => {
    switch (category) {
      case "Idea":
        return (
          <Lightbulb
            size={20}
            className="text-yellow-600"
          />
        );

      case "Review":
        return (
          <MessageSquare
            size={20}
            className="text-blue-600"
          />
        );

      case "Implementation":
        return (
          <CheckCircle2
            size={20}
            className="text-green-600"
          />
        );

      case "Achievement":
        return (
          <Trophy
            size={20}
            className="text-purple-600"
          />
        );

      default:
        return (
          <Coins
            size={20}
            className="text-orange-600"
          />
        );
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}

      <div className="border-b border-slate-200 p-6">

        <h2 className="text-2xl font-bold text-slate-800">
          Points History
        </h2>

        <p className="mt-2 text-slate-500">
          Track all earned and redeemed innovation points.
        </p>

      </div>

      {/* Content */}

      <div className="divide-y divide-slate-100">

        {history.length === 0 ? (

          <div className="py-16 text-center">

            <Coins
              size={60}
              className="mx-auto text-slate-300"
            />

            <h3 className="mt-5 text-xl font-semibold text-slate-700">
              No Point Activity
            </h3>

            <p className="mt-2 text-slate-500">
              Your points history will appear here.
            </p>

          </div>

        ) : (

          history.map((item) => (

            <div
              key={item.id}
              className="flex flex-col gap-6 p-6 transition hover:bg-slate-50 lg:flex-row lg:items-center lg:justify-between"
            >

              {/* Left */}

              <div className="flex items-center gap-5">

                <div className="rounded-2xl bg-slate-100 p-4">
                  {getCategoryIcon(item.category)}
                </div>

                <div>

                  <h3 className="text-lg font-semibold text-slate-800">
                    {item.activity}
                  </h3>

                  <p className="mt-1 text-slate-500">
                    {item.description}
                  </p>

                  <div className="mt-3 flex items-center gap-2 text-sm text-slate-400">

                    <Calendar size={15} />

                    {item.date}

                  </div>

                </div>

              </div>

              {/* Right */}

              <div className="flex items-center gap-5">

                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
                  {item.category}
                </span>

                {item.type === "Earned" ? (

                  <div className="flex items-center gap-2 rounded-xl bg-green-100 px-4 py-3">

                    <ArrowUpCircle
                      size={20}
                      className="text-green-600"
                    />

                    <span className="font-bold text-green-700">
                      +{item.points}
                    </span>

                  </div>

                ) : (

                  <div className="flex items-center gap-2 rounded-xl bg-red-100 px-4 py-3">

                    <ArrowDownCircle
                      size={20}
                      className="text-red-600"
                    />

                    <span className="font-bold text-red-700">
                      -{item.points}
                    </span>

                  </div>

                )}

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}