"use client";

import Link from "next/link";
import {
  Search,
  Plus,
  Filter,
  Eye,
  Pencil,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Calendar,
} from "lucide-react";

const ideas = [
  {
    id: 1,
    title: "Smart Inventory Management",
    description:
      "Reduce inventory losses using QR code technology.",
    department: "ICT",
    status: "Peer Review",
    priority: "High",
    likes: 12,
    dislikes: 2,
    comments: 8,
    date: "12 Jul 2026",
  },
  {
    id: 2,
    title: "Digital Leave Request",
    description:
      "Employees apply leave online with automated approvals.",
    department: "Human Resource",
    status: "Approved",
    priority: "Medium",
    likes: 25,
    dislikes: 1,
    comments: 17,
    date: "10 Jul 2026",
  },
  {
    id: 3,
    title: "AI Customer Support",
    description:
      "Use AI chatbot for customer support services.",
    department: "Customer Care",
    status: "Implementation",
    priority: "High",
    likes: 35,
    dislikes: 3,
    comments: 24,
    date: "8 Jul 2026",
  },
];

const statusColor = (status: string) => {
  switch (status) {
    case "Peer Review":
      return "bg-purple-100 text-purple-700";
    case "Approved":
      return "bg-green-100 text-green-700";
    case "Implementation":
      return "bg-blue-100 text-blue-700";
    default:
      return "bg-slate-100 text-slate-700";
  }
};

export default function IdeaBoardPage() {
  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold">
            Idea Board
          </h1>

          <p className="text-slate-500 mt-2">
            Browse and collaborate on innovation ideas.
          </p>

        </div>

        <Link
          href="/dashboard/submit-idea"
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          <Plus size={20} />

          Submit Idea
        </Link>

      </div>

      {/* Filters */}

      <div className="rounded-2xl border bg-white p-5 shadow-sm">

        <div className="grid gap-4 lg:grid-cols-4">

          <div className="relative">

            <Search
              className="absolute left-3 top-3 text-slate-400"
              size={18}
            />

            <input
              placeholder="Search ideas..."
              className="w-full rounded-xl border p-3 pl-10"
            />

          </div>

          <select className="rounded-xl border p-3">

            <option>All Status</option>
            <option>Draft</option>
            <option>Submitted</option>
            <option>Peer Review</option>
            <option>PM Review</option>
            <option>Approved</option>

          </select>

          <select className="rounded-xl border p-3">

            <option>All Departments</option>

          </select>

          <button className="flex items-center justify-center gap-2 rounded-xl border">

            <Filter size={18} />

            More Filters

          </button>

        </div>

      </div>

      {/* Cards */}

      <div className="grid gap-6">

        {ideas.map((idea) => (

          <div
            key={idea.id}
            className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-lg"
          >

            <div className="flex justify-between">

              <div>

                <h2 className="text-2xl font-semibold">

                  {idea.title}

                </h2>

                <p className="mt-3 text-slate-600">

                  {idea.description}

                </p>

                <div className="mt-5 flex flex-wrap gap-3">

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm">

                    {idea.department}

                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-sm ${statusColor(
                      idea.status
                    )}`}
                  >

                    {idea.status}

                  </span>

                  <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">

                    {idea.priority}

                  </span>

                </div>

              </div>

              <div className="text-right">

                <div className="flex items-center gap-2">

                  <Calendar size={16} />

                  {idea.date}

                </div>

              </div>

            </div>

            <div className="mt-8 flex items-center justify-between">

              <div className="flex gap-6">

                <div className="flex items-center gap-2">

                  <ThumbsUp size={18} />

                  {idea.likes}

                </div>

                <div className="flex items-center gap-2">

                  <ThumbsDown size={18} />

                  {idea.dislikes}

                </div>

                <div className="flex items-center gap-2">

                  <MessageCircle size={18} />

                  {idea.comments}

                </div>

              </div>

              <div className="flex gap-3">

                <button className="flex items-center gap-2 rounded-xl border px-4 py-2 hover:bg-slate-100">

                  <Eye size={18} />

                  View

                </button>

                <button className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">

                  <Pencil size={18} />

                  Edit

                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}