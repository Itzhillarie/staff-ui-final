"use client";

import { useEffect, useState } from "react";

import {
  FileEdit,
  Send,
  Users,
  ClipboardCheck,
  CheckCircle2,
  Rocket,
  BarChart3,
  Archive,
} from "lucide-react";

interface PipelineStage {
  stage: string;
  count: number;
}

const stageConfig = {
  Draft: {
    color: "bg-slate-500",
    icon: FileEdit,
  },
  Submitted: {
    color: "bg-blue-500",
    icon: Send,
  },
  "Peer Review": {
    color: "bg-purple-500",
    icon: Users,
  },
  "Product Manager Review": {
    color: "bg-orange-500",
    icon: ClipboardCheck,
  },
  Approved: {
    color: "bg-green-500",
    icon: CheckCircle2,
  },
  Implementation: {
    color: "bg-cyan-500",
    icon: Rocket,
  },
  "Impact Evaluation": {
    color: "bg-pink-500",
    icon: BarChart3,
  },
  Archived: {
    color: "bg-gray-700",
    icon: Archive,
  },
} as const;

export default function IdeaPipeline() {
  const [pipeline, setPipeline] = useState<PipelineStage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPipeline() {
      try {
        const response = await fetch(
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
          throw new Error("Failed to load pipeline");
        }

        const data = await response.json();

        setPipeline(data.pipeline ?? []);
      } catch (error) {
        console.error("Pipeline Error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadPipeline();
  }, []);

  const maxCount = Math.max(
    ...pipeline.map((item) => item.count),
    1
  );

  const totalIdeas = pipeline.reduce(
    (sum, item) => sum + item.count,
    0
  );

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-slate-800">
            Idea Pipeline
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Track ideas through the innovation lifecycle.
          </p>

        </div>

        <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">

          {loading ? "Loading..." : `${totalIdeas} Total Ideas`}

        </span>

      </div>

      {loading ? (

        <div className="py-12 text-center text-slate-500">

          Loading pipeline...

        </div>

      ) : pipeline.length === 0 ? (

        <div className="py-12 text-center text-slate-500">

          No pipeline data available.

        </div>

      ) : (

        <div className="space-y-6">

          {pipeline.map((stage) => {

            const config =
              stageConfig[
                stage.stage as keyof typeof stageConfig
              ];

            if (!config) return null;

            const Icon = config.icon;

            const percentage =
              (stage.count / maxCount) * 100;

            return (

              <div key={stage.stage}>

                <div className="mb-2 flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg ${config.color} text-white`}
                    >
                      <Icon size={18} />
                    </div>

                    <span className="font-medium text-slate-700">
                      {stage.stage}
                    </span>

                  </div>

                  <span className="font-bold text-slate-800">
                    {stage.count}
                  </span>

                </div>

                <div className="h-3 overflow-hidden rounded-full bg-slate-200">

                  <div
                    className={`h-full rounded-full ${config.color} transition-all duration-700`}
                    style={{
                      width: `${percentage}%`,
                    }}
                  />

                </div>

              </div>

            );
          })}

        </div>

      )}

    </section>
  );
}