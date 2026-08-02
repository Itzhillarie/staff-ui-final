"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "@/app/utils/toast";
import { useRouter } from "next/navigation";
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  Calendar,
} from "lucide-react";

import {
  getIdeas,
  updateIdea,
  deleteIdea,
} from "@/app/lib/ideas";

interface Idea {
  id: string;
  title: string;
  description: string;
  creator: string;
  status: string;
  priority: string | null;
  created_at?: string;
}

const statusColors: Record<string, string> = {
  Draft: "bg-cyan-100 text-gray-700",
  Submitted: "bg-cyan-100 text-blue-700",
  "Peer Review": "bg-cyan-100 text-purple-700",
  "Product Manager Review": "bg-orange-100 text-orange-700",
  Approved: "bg-cyan-100 text-green-700",
  Rejected: "bg-cyan-100 text-red-700",
  Implementation: "bg-cyan-100 text-cyan-700",
  "Impact Evaluation": "bg-cyan-100 text-pink-700",
  Archived: "bg-slate-100 text-slate-700",
};

export default function IdeaBoardPage() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);

  const loadIdeas = useCallback(async () => {
    try {
      setLoading(true);

      const data = await getIdeas();

      const list = Array.isArray(data)
        ? data
        : Array.isArray(data.results)
        ? data.results
        : [];

      setIdeas(
        list.filter(
          (idea: Idea) => idea.status === "Submitted"
        )
      );
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to load ideas."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadIdeas();
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [loadIdeas]);

  async function handleDelete(id: string) {
    if (!confirm("Delete this idea?")) return;

    try {
      await deleteIdea(id);
      void loadIdeas();
      toast.success("Idea deleted successfully.");
    } catch (err: unknown) {
      toast.error(getErrorMessage(err, "Delete failed"));
    }
  }

  async function handleEdit(idea: Idea) {
    const title = prompt("Idea title", idea.title);

    if (!title) return;

    const description = prompt(
      "Idea description",
      idea.description
    );

    if (!description) return;

    try {
      await updateIdea(idea.id, {
        title,
        description,
      });
      toast.success("Idea updated successfully.");

      void loadIdeas();
    } catch (err: unknown) {
      toast.error(getErrorMessage(err, "Update failed"));
    }
  }
  const router = useRouter();

  return (
    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold">
            Idea Board
          </h1>

          <p className="mt-2 text-slate-500">
            Submitted ideas awaiting review.
          </p>

        </div>

        <Link
          href="/dashboard/submit-idea"
          className="flex items-center gap-2 rounded-xl bg-cyan-600 px-6 py-3 text-white hover:bg-cyan-700"
        >
          <Plus size={20} />
          Create Idea
        </Link>

      </div>

      <div className="rounded-2xl border bg-white shadow-sm">

        <div className="flex items-center justify-between border-b p-6">

          <div>

            <h2 className="text-2xl font-bold">
              Submitted Ideas
            </h2>

            <p className="text-sm text-slate-500">
              Ideas ready for review.
            </p>

          </div>

          <span className="rounded-full bg-cyan-100 px-4 py-2 text-sm font-semibold text-blue-400">
            {ideas.length} Ideas
          </span>

        </div>

        {loading ? (

          <div className="flex justify-center py-12">

            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />

          </div>

        ) : ideas.length === 0 ? (

          <div className="py-16 text-center text-slate-500">
            No submitted ideas found.
          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-slate-50">

                <tr>

                  <th className="px-6 py-4 text-left">
                    Title
                  </th>

                  <th className="px-6 py-4 text-left">
                    Description
                  </th>

                  <th className="px-6 py-4 text-center">
                    Creator
                  </th>

                  <th className="px-6 py-4 text-center">
                    Status
                  </th>

                  <th className="px-6 py-4 text-center">
                    Priority
                  </th>

                  <th className="px-6 py-4 text-center">
                    Date
                  </th>

                  <th className="px-6 py-4 text-center">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {ideas.map((idea) => (

                  <tr
                    key={idea.id}
                    className="border-t hover:bg-slate-50"
                  >

                    <td className="px-6 py-5 font-medium">
                      {idea.title}
                    </td>

                    <td className="px-6 py-5 max-w-lg">
                      <div className="line-clamp-2">
                        {idea.description}
                      </div>
                    </td>

                    <td className="px-6 py-5 text-center">
                      {idea.creator}
                    </td>

                    <td className="px-6 py-5 text-center">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          statusColors[idea.status] ??
                          "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {idea.status}
                      </span>

                    </td>

                    <td className="px-6 py-5 text-center">
                      {idea.priority ?? "-"}
                    </td>

                    <td className="px-6 py-5 text-center">

                      <div className="flex items-center justify-center gap-2">

                        <Calendar size={16} />

                        {idea.created_at
                          ? new Date(
                              idea.created_at
                            ).toLocaleDateString()
                          : "-"}

                      </div>

                    </td>

                    <td className="px-6 py-5">

                      <div className="flex justify-center gap-3">

                        <button
                          onClick={() => handleEdit(idea)}
                          className="rounded-lg bg-cyan-500 p-2 text-white hover:bg-cyan-600"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(idea.id)
                          }
                          className="rounded-lg bg-cyan-600 p-2 text-white hover:bg-cyan-700"
                        >
                          <Trash2 size={18} />
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>
      

    </div>
    
  );
}

function getErrorMessage(
  error: unknown,
  fallback: string
) {
  return error instanceof Error && error.message
    ? error.message
    : fallback;
}
