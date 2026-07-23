"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Calendar,
  Loader2,
} from "lucide-react";

import {
  getIdeas,
  deleteIdea,
} from "@/app/lib/ideas";

interface Idea {
  id: string;
  title: string;
  description: string;
  creator: string;
  status: string;
  priority: string | null;
  likes: number;
  dislikes: number;
  created_at: string;
}

const statusColor = (status: string) => {
  switch (status) {
    case "Submitted":
      return "bg-blue-100 text-blue-700";

    case "Peer Review":
      return "bg-purple-100 text-purple-700";

    case "Product Manager Review":
      return "bg-orange-100 text-orange-700";

    case "Approved":
      return "bg-green-100 text-green-700";

    case "Rejected":
      return "bg-red-100 text-red-700";

    case "Implementation":
      return "bg-cyan-100 text-cyan-700";

    case "Impact Evaluation":
      return "bg-pink-100 text-pink-700";

    case "Archived":
      return "bg-gray-100 text-gray-700";

    default:
      return "bg-slate-100 text-slate-700";
  }
};

export default function IdeaBoardPage() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("Submitted");

  async function loadIdeas() {
    try {
      setLoading(true);

      const data = await getIdeas();

      setIdeas(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadIdeas();
  }, []);

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Delete this idea permanently?"
    );

    if (!confirmed) return;

    try {
      await deleteIdea(id);

      setIdeas((prev) =>
        prev.filter((idea) => idea.id !== id)
      );
    } catch (error) {
      console.error(error);

      alert("Unable to delete idea.");
    }
  }

  const filteredIdeas = useMemo(() => {
    return ideas.filter((idea) => {
      const matchesSearch =
        idea.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        idea.description
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All"
          ? true
          : idea.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [ideas, search, statusFilter]);

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="text-4xl font-bold">
            Idea Board
          </h1>

          <p className="mt-2 text-slate-500">
            Browse submitted innovation ideas.
          </p>

        </div>

        <Link
          href="/dashboard/submit-idea"
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
        >
          <Plus size={20} />

          Submit Idea

        </Link>

      </div>

      {/* Filters */}

      <div className="rounded-2xl border bg-white p-5 shadow-sm">

        <div className="grid gap-4 lg:grid-cols-2">

          <div className="relative">

            <Search
              size={18}
              className="absolute left-3 top-3 text-slate-400"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search ideas..."
              className="w-full rounded-xl border p-3 pl-10"
            />

          </div>

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="rounded-xl border p-3"
          >
            <option>Submitted</option>
            <option>Peer Review</option>
            <option>Product Manager Review</option>
            <option>Approved</option>
            <option>Rejected</option>
            <option>Implementation</option>
            <option>Impact Evaluation</option>
            <option>Archived</option>
            <option>All</option>
          </select>

        </div>

      </div>
            {/* Ideas */}

      {loading ? (

        <div className="flex justify-center py-20">

          <Loader2
            className="h-10 w-10 animate-spin text-blue-600"
          />

        </div>

      ) : filteredIdeas.length === 0 ? (

        <div className="rounded-2xl border bg-white py-20 text-center shadow-sm">

          <h3 className="text-xl font-semibold text-slate-700">
            No ideas found
          </h3>

          <p className="mt-2 text-slate-500">
            There are no ideas matching your search.
          </p>

        </div>

      ) : (

        <div className="grid gap-6">

          {filteredIdeas.map((idea) => (

            <div
              key={idea.id}
              className="rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-lg"
            >

              <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">

                <div className="flex-1">

                  <div className="flex flex-wrap items-center gap-3">

                    <h2 className="text-2xl font-bold">

                      {idea.title}

                    </h2>

                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${statusColor(
                        idea.status
                      )}`}
                    >
                      {idea.status}
                    </span>

                    {idea.priority && (

                      <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">

                        {idea.priority}

                      </span>

                    )}

                  </div>

                  <p className="mt-4 text-slate-600">

                    {idea.description}

                  </p>

                  <div className="mt-6 flex flex-wrap gap-6 text-sm text-slate-500">

                    <span>

                      <strong>Creator:</strong>{" "}
                      {idea.creator}

                    </span>

                    <span>

                      👍 {idea.likes}

                    </span>

                    <span>

                      👎 {idea.dislikes}

                    </span>

                    <span className="flex items-center gap-2">

                      <Calendar size={16} />

                      {new Date(
                        idea.created_at
                      ).toLocaleDateString()}

                    </span>

                  </div>

                </div>

                {/* Actions */}

                <div className="flex items-end">

                  <div className="flex gap-3">

                    <Link
                      href={`/dashboard/submit-idea?id=${idea.id}`}
                      className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700"
                    >

                      <Pencil size={18} />

                      Edit

                    </Link>

                    <button
                      onClick={() =>
                        handleDelete(idea.id)
                      }
                      className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-white transition hover:bg-red-700"
                    >

                      <Trash2 size={18} />

                      Delete

                    </button>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );
}