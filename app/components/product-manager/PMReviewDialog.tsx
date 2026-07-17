"use client";

import {
  X,
  User,
  Building2,
  Calendar,
  ThumbsUp,
  MessageSquare,
  Paperclip,
  Tag,
} from "lucide-react";

interface Idea {
  id: number;
  title: string;
  description: string;
  employee: string;
  department: string;
  category: string;
  submitted: string;
  likes: number;
  comments: number;
  attachments: number;
  status: string;
  priority: "High" | "Medium" | "Low";
}

interface PMReviewDialogProps {
  open: boolean;
  onClose: () => void;
  idea: Idea | null;
}

function PMRecommendation() {
  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold">Product Manager Recommendation</h4>
      <p className="text-sm leading-6 text-slate-600">
        Review the idea details above and provide your recommendation for approval,
        prioritization or further refinement.
      </p>
      <div className="rounded-2xl border bg-slate-50 p-4">
        <p className="text-sm text-slate-500">No recommendation has been added yet.</p>
      </div>
    </div>
  );
}

export default function PMReviewDialog({
  open,
  onClose,
  idea,
}: PMReviewDialogProps) {
  if (!open || !idea) return null;

  const priorityColor = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Low: "bg-green-100 text-green-700",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-6">

      <div className="relative max-h-[95vh] w-full max-w-7xl overflow-y-auto rounded-3xl bg-white shadow-2xl">

        {/* Header */}

        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-8 py-6">

          <div>
            <h2 className="text-3xl font-bold text-slate-800">
              Product Manager Review
            </h2>

            <p className="mt-1 text-slate-500">
              Review, evaluate and decide whether this idea should proceed to
              implementation.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 transition hover:bg-slate-100"
          >
            <X size={24} />
          </button>

        </div>

        {/* Body */}

        <div className="grid gap-8 p-8 lg:grid-cols-2">

          {/* LEFT PANEL */}

          <div className="space-y-6">

            <div className="rounded-2xl border p-6">

              <h3 className="text-2xl font-bold text-slate-800">
                {idea.title}
              </h3>

              <p className="mt-4 leading-7 text-slate-600">
                {idea.description}
              </p>

            </div>

            <div className="rounded-2xl border p-6">

              <h4 className="mb-5 text-lg font-semibold">
                Idea Information
              </h4>

              <div className="space-y-5">

                <div className="flex items-center gap-3">
                  <User className="text-blue-600" size={20} />
                  <div>
                    <p className="text-sm text-slate-500">
                      Submitted By
                    </p>
                    <p className="font-semibold">
                      {idea.employee}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Building2
                    className="text-indigo-600"
                    size={20}
                  />
                  <div>
                    <p className="text-sm text-slate-500">
                      Department
                    </p>
                    <p className="font-semibold">
                      {idea.department}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Tag
                    className="text-purple-600"
                    size={20}
                  />
                  <div>
                    <p className="text-sm text-slate-500">
                      Category
                    </p>
                    <p className="font-semibold">
                      {idea.category}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar
                    className="text-green-600"
                    size={20}
                  />
                  <div>
                    <p className="text-sm text-slate-500">
                      Submitted
                    </p>
                    <p className="font-semibold">
                      {idea.submitted}
                    </p>
                  </div>
                </div>

              </div>

            </div>

            <div className="rounded-2xl border p-6">

              <h4 className="mb-4 text-lg font-semibold">
                Community Feedback
              </h4>

              <div className="grid grid-cols-2 gap-4">

                <div className="rounded-xl bg-blue-50 p-4">

                  <div className="flex items-center gap-2">

                    <ThumbsUp
                      size={20}
                      className="text-blue-600"
                    />

                    <span className="text-sm font-medium">
                      Likes
                    </span>

                  </div>

                  <h3 className="mt-3 text-3xl font-bold">
                    {idea.likes}
                  </h3>

                </div>

                <div className="rounded-xl bg-green-50 p-4">

                  <div className="flex items-center gap-2">

                    <MessageSquare
                      size={20}
                      className="text-green-600"
                    />

                    <span className="text-sm font-medium">
                      Comments
                    </span>

                  </div>

                  <h3 className="mt-3 text-3xl font-bold">
                    {idea.comments}
                  </h3>

                </div>

                <div className="rounded-xl bg-slate-100 p-4">

                  <div className="flex items-center gap-2">

                    <Paperclip
                      size={20}
                      className="text-slate-600"
                    />

                    <span className="text-sm font-medium">
                      Attachments
                    </span>

                  </div>

                  <h3 className="mt-3 text-3xl font-bold">
                    {idea.attachments}
                  </h3>

                </div>

                <div className="rounded-xl bg-indigo-50 p-4">

                  <span className="text-sm font-medium">
                    Current Priority
                  </span>

                  <div className="mt-4">
                    <span
                      className={`rounded-full px-4 py-2 text-sm font-semibold ${priorityColor[idea.priority]}`}
                    >
                      {idea.priority}
                    </span>
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* RIGHT PANEL */}

          <div className="rounded-2xl border p-6">

            <PMRecommendation />

          </div>

        </div>

      </div>

    </div>
  );
}