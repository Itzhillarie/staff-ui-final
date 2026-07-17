"use client";

import {
  Building2,
  Calendar,
  ClipboardCheck,
  Eye,
  MessageSquare,
  Paperclip,
  Tag,
  ThumbsUp,
  User,
} from "lucide-react";

interface PMIdeaCardProps {
  idea: {
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
  };
  onReview: () => void;
}

export default function PMIdeaCard({
  idea,
  onReview,
}: PMIdeaCardProps) {
  const priorityColor = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Low: "bg-green-100 text-green-700",
  };

  const statusColor = {
    Draft: "bg-gray-100 text-gray-700",
    Submitted: "bg-blue-100 text-blue-700",
    "Peer Review": "bg-purple-100 text-purple-700",
    "PM Review": "bg-orange-100 text-orange-700",
    Approved: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
  } as const;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Header */}

      <div className="flex items-start justify-between border-b border-slate-100 p-6">

        <div className="flex-1">

          <div className="flex items-center gap-3">

            <h2 className="text-2xl font-bold text-slate-800">
              {idea.title}
            </h2>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                priorityColor[idea.priority]
              }`}
            >
              {idea.priority}
            </span>

          </div>

          <p className="mt-4 leading-7 text-slate-600">
            {idea.description}
          </p>

        </div>

        <span
          className={`rounded-full px-4 py-2 text-sm font-semibold ${
            statusColor[
              idea.status as keyof typeof statusColor
            ] ?? "bg-slate-100 text-slate-700"
          }`}
        >
          {idea.status}
        </span>

      </div>

      {/* Information */}

      <div className="grid gap-6 p-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="flex items-center gap-3">

          <User
            size={20}
            className="text-blue-600"
          />

          <div>

            <p className="text-xs uppercase tracking-wide text-slate-500">
              Employee
            </p>

            <p className="font-semibold text-slate-700">
              {idea.employee}
            </p>

          </div>

        </div>

        <div className="flex items-center gap-3">

          <Building2
            size={20}
            className="text-indigo-600"
          />

          <div>

            <p className="text-xs uppercase tracking-wide text-slate-500">
              Department
            </p>

            <p className="font-semibold text-slate-700">
              {idea.department}
            </p>

          </div>

        </div>

        <div className="flex items-center gap-3">

          <Tag
            size={20}
            className="text-purple-600"
          />

          <div>

            <p className="text-xs uppercase tracking-wide text-slate-500">
              Category
            </p>

            <p className="font-semibold text-slate-700">
              {idea.category}
            </p>

          </div>

        </div>

        <div className="flex items-center gap-3">

          <Calendar
            size={20}
            className="text-green-600"
          />

          <div>

            <p className="text-xs uppercase tracking-wide text-slate-500">
              Submitted
            </p>

            <p className="font-semibold text-slate-700">
              {idea.submitted}
            </p>

          </div>

        </div>

      </div>

      {/* Community Statistics */}

      <div className="grid grid-cols-3 border-y border-slate-100 bg-slate-50">

        <div className="flex items-center justify-center gap-2 p-5">

          <ThumbsUp
            size={20}
            className="text-blue-600"
          />

          <div>

            <p className="text-xl font-bold">
              {idea.likes}
            </p>

            <p className="text-xs text-slate-500">
              Likes
            </p>

          </div>

        </div>

        <div className="flex items-center justify-center gap-2 border-x border-slate-200 p-5">

          <MessageSquare
            size={20}
            className="text-green-600"
          />

          <div>

            <p className="text-xl font-bold">
              {idea.comments}
            </p>

            <p className="text-xs text-slate-500">
              Comments
            </p>

          </div>

        </div>

        <div className="flex items-center justify-center gap-2 p-5">

          <Paperclip
            size={20}
            className="text-slate-600"
          />

          <div>

            <p className="text-xl font-bold">
              {idea.attachments}
            </p>

            <p className="text-xs text-slate-500">
              Attachments
            </p>

          </div>

        </div>

      </div>

      {/* Footer */}

      <div className="flex flex-wrap items-center justify-end gap-3 p-6">

        <button className="flex items-center gap-2 rounded-xl border border-slate-300 px-5 py-3 font-medium transition hover:bg-slate-100">
          <Eye size={18} />
          View Details
        </button>

        <button
          onClick={onReview}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700"
        >
          <ClipboardCheck size={18} />
          Review Idea
        </button>

      </div>
    </div>
  );
}