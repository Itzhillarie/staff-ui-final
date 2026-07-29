"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  CheckCircle,
  XCircle,
  Search,
  Loader2,
  Calendar,
  User,
  ThumbsUp,
  MessageCircle,
} from "lucide-react";

import {
  getPMReviewIdeas,
  approveIdea,
  rejectIdea,
} from "@/app/lib/pm-review";
import { createLocalNotification } from "@/app/lib/notification";
import { canAccessPMReview, useAuthHydrated } from "@/app/lib/access";
import { useAuthStore } from "@/app/store/authstore";

interface Idea {
  id: string;
  title: string;
  description: string;
  creator: string;
  status: string;
  likes: number;
  dislikes: number;
  comments?: number;
  created_at?: string;
}

type Priority = "High" | "Medium" | "Low";

type ReviewData = {
  priority: Priority;
  due_date: string;
  review_comment: string;
};

export default function ProductManagerReviewPage() {
  const router = useRouter();
  const role = useAuthStore((state) => state.user?.role);
  const authHydrated = useAuthHydrated();
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [search, setSearch] = useState("");

  const [reviewData, setReviewData] = useState<
    Record<string, ReviewData>
  >({});

  async function loadIdeas() {
    try {
      setLoading(true);

      const data = (await getPMReviewIdeas()) as
        | Idea[]
        | { results?: Idea[] };

      const allIdeas = Array.isArray(data)
        ? data
        : data.results || [];

      const pmIdeas = allIdeas.filter(
        (idea: Idea) =>
          idea.status === "Product Manager Review"
      );

      setIdeas(pmIdeas);

      const reviewState: Record<string, ReviewData> = {};

      pmIdeas.forEach((idea: Idea) => {
        reviewState[idea.id] = {
          priority: "Medium",
          due_date: "",
          review_comment: "",
        };
      });

      setReviewData(reviewState);
    } catch (err) {
      console.error(err);
      alert("Unable to load Product Manager ideas.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (authHydrated && !canAccessPMReview(role)) {
      router.replace("/dashboard/implementation");
      return;
    }

    const timeoutId = window.setTimeout(() => {
      void loadIdeas();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [authHydrated, role, router]);

  const filteredIdeas = useMemo(() => {
    if (!search.trim()) {
      return ideas;
    }

    const keyword = search.toLowerCase();

    return ideas.filter(
      (idea) =>
        idea.title.toLowerCase().includes(keyword) ||
        idea.description
          .toLowerCase()
          .includes(keyword) ||
        idea.creator.toLowerCase().includes(keyword)
    );
  }, [search, ideas]);

  if (!authHydrated || !canAccessPMReview(role)) {
    return null;
  }

  function updateField(
    id: string,
    field: keyof ReviewData,
    value: string
  ) {
    setReviewData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: field === "priority" ? (value as Priority) : value,
      },
    }));
  }

  async function handleApprove(id: string) {
    try {
      setSaving(true);

      const idea = ideas.find((item) => item.id === id);

      await approveIdea(id, reviewData[id]);

      await createLocalNotification({
        title: "Idea approved",
        message: `"${idea?.title ?? "An idea"}" was approved for implementation.`,
        type: "pm_review",
        category: "pm_reviews",
      });

      await loadIdeas();

      alert("Idea approved successfully.");
    } catch (err: unknown) {
      alert(getErrorMessage(err, "Approval failed."));
    } finally {
      setSaving(false);
    }
  }

  async function handleReject(id: string) {
    try {
      setSaving(true);

      const idea = ideas.find((item) => item.id === id);

      await rejectIdea(
        id,
        reviewData[id].review_comment
      );

      await createLocalNotification({
        title: "Idea rejected",
        message: `"${idea?.title ?? "An idea"}" was rejected by Product Manager review.`,
        type: "pm_review",
        category: "pm_reviews",
      });

      await loadIdeas();

      alert("Idea rejected successfully.");
    } catch (err: unknown) {
      alert(getErrorMessage(err, "Rejection failed."));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-8 p-8">

      <div>

        <h1 className="text-4xl font-bold">
          Product Manager Review
        </h1>

        <p className="mt-2 text-slate-500">
          Review ideas that qualified for Product Manager approval.
        </p>

      </div>

      <div className="rounded-2xl border bg-white p-5 shadow-sm">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-4 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search ideas..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full rounded-xl border p-3 pl-11"
          />

        </div>

      </div>

      {loading ? (

        <div className="flex justify-center py-20">

          <Loader2
            className="animate-spin text-blue-600"
            size={36}
          />

        </div>

      ) : filteredIdeas.length === 0 ? (

        <div className="rounded-2xl border bg-white p-16 text-center text-slate-500 shadow-sm">
          No ideas awaiting Product Manager review.
        </div>

      ) : (

        <div className="space-y-6">
                    {filteredIdeas.map((idea) => (

            <div
              key={idea.id}
              className="rounded-2xl border bg-white p-8 shadow-sm transition hover:shadow-lg"
            >

              <div className="flex items-start justify-between">

                <div className="flex-1">

                  <h2 className="text-2xl font-bold">
                    {idea.title}
                  </h2>

                  <p className="mt-4 text-slate-600">
                    {idea.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-6 text-sm text-slate-500">

                    <div className="flex items-center gap-2">
                      <User size={16} />
                      {idea.creator}
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      {idea.created_at
                        ? new Date(
                            idea.created_at
                          ).toLocaleDateString()
                        : "-"}
                    </div>

                    <div className="flex items-center gap-2">
                      <ThumbsUp
                        size={16}
                        className="text-green-600"
                      />
                      {idea.likes}
                    </div>

                    <div className="flex items-center gap-2">
                      <MessageCircle
                        size={16}
                        className="text-blue-600"
                      />
                      {idea.comments ?? 0}
                    </div>

                  </div>

                </div>

                <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">
                  Product Manager Review
                </span>

              </div>

              <div className="mt-8 grid gap-6 lg:grid-cols-3">

                <div>

                  <label className="mb-2 block font-medium">
                    Priority
                  </label>

                  <select
                    value={reviewData[idea.id]?.priority}
                    onChange={(e) =>
                      updateField(
                        idea.id,
                        "priority",
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border p-3"
                  >
                    <option value="High">
                      High
                    </option>

                    <option value="Medium">
                      Medium
                    </option>

                    <option value="Low">
                      Low
                    </option>

                  </select>

                </div>

                <div>

                  <label className="mb-2 block font-medium">
                    Due Date
                  </label>

                  <input
                    type="date"
                    value={reviewData[idea.id]?.due_date}
                    onChange={(e) =>
                      updateField(
                        idea.id,
                        "due_date",
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border p-3"
                  />

                </div>

                <div>

                  <label className="mb-2 block font-medium">
                    Review Comment
                  </label>

                  <textarea
                    rows={4}
                    value={
                      reviewData[idea.id]?.review_comment
                    }
                    onChange={(e) =>
                      updateField(
                        idea.id,
                        "review_comment",
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border p-3"
                    placeholder="Write your review..."
                  />

                </div>

              </div>

              <div className="mt-8 flex justify-end gap-4">

                <button
                  disabled={saving}
                  onClick={() =>
                    handleReject(idea.id)
                  }
                  className="flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-white transition hover:bg-red-700 disabled:opacity-50"
                >
                  <XCircle size={18} />
                  Reject
                </button>

                <button
                  disabled={saving}
                  onClick={() =>
                    handleApprove(idea.id)
                  }
                  className="flex items-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-white transition hover:bg-green-700 disabled:opacity-50"
                >
                  <CheckCircle size={18} />
                  Approve
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error && error.message
    ? error.message
    : fallback;
}
