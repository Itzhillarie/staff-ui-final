"use client";

import { useEffect, useState } from "react";

import {
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Calendar,
  User,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "@/app/utils/toast";
import {
  getIdeas,
  likeIdea,
  dislikeIdea,
  commentIdea,
} from "@/app/lib/ideas";
import { createLocalNotification } from "@/app/lib/notification";

interface Idea {
  id: string;
  title: string;
  description: string;
  creator: string;
  status: string;
  priority: string | null;
  likes: number;
  dislikes: number;
  comments?: number;
  created_at?: string;
}

export default function PeerReviewPage() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);

  const [showComment, setShowComment] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState<string | null>(null);
  const [comment, setComment] = useState("");

  async function loadIdeas() {
    try {
      setLoading(true);

      const data = await getIdeas();

      const allIdeas = Array.isArray(data)
        ? data
        : data.results || [];

      setIdeas(
        allIdeas.filter(
          (idea: Idea) => idea.status === "Submitted"
        )
      );
    } catch (err) {
      console.error(err);
      toast.error("Unable to load ideas.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadIdeas();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  async function handleLike(id: string) {
    try {
      const idea = ideas.find((item) => item.id === id);

      await likeIdea(id);

      await createLocalNotification({
        title: "Idea liked",
        message: `"${idea?.title ?? "An idea"}" received a like.`,
        type: "peer_review",
        category: "peer_reviews",
      });
      toast.success("Idea liked successfully.");

      await loadIdeas();
    } catch (err: unknown) {
      toast.error(getErrorMessage(err, "Unable to like idea."));
    }
  }

  async function handleDislike(id: string) {
    try {
      const idea = ideas.find((item) => item.id === id);

      await dislikeIdea(id);

      await createLocalNotification({
        title: "Idea disliked",
        message: `"${idea?.title ?? "An idea"}" received a dislike.`,
        type: "peer_review",
        category: "peer_reviews",
      });
     toast.success("Idea disliked successfully.");
      await loadIdeas();
    } catch (err: unknown) {
      toast.error(getErrorMessage(err, "Unable to dislike idea."));
    }
  }

  async function submitComment() {
    if (!selectedIdea) return;

    if (!comment.trim()) {
      toast.warning("Comment cannot be empty.");
      return;
    }

    try {
      const idea = ideas.find((item) => item.id === selectedIdea);

      await commentIdea(selectedIdea, comment);

      await createLocalNotification({
        title: "Idea commented",
        message: `A comment was added to "${idea?.title ?? "an idea"}".`,
        type: "peer_review",
        category: "peer_reviews",
      });
     toast.success("Comment submitted successfully.");

      
      setComment("");
      setSelectedIdea(null);
      setShowComment(false);

      await loadIdeas();
    } catch (err: unknown) {
      toast.error(getErrorMessage(err, "Unable to add comment."));
    }
  }
  const router = useRouter();

  return (
    <div className="space-y-8 p-8">

      <div>

        <h1 className="text-4xl font-bold">
          Peer Review
        </h1>

        <p className="mt-2 text-slate-500">
          Review submitted innovation ideas from colleagues.
        </p>

      </div>

      {loading ? (

        <div className="flex justify-center py-20">

          <Loader2
            size={36}
            className="animate-spin text-cyan-600"
          />

        </div>

      ) : ideas.length === 0 ? (

        <div className="rounded-2xl border bg-white p-16 text-center text-slate-500 shadow-sm">
          No submitted ideas available.
        </div>

      ) : (

        <div className="space-y-6">

          {ideas.map((idea) => (

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

                  <div className="mt-6 flex flex-wrap gap-6 text-sm text-slate-500">

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

                  </div>

                </div>

                <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                  {idea.status}
                </span>

              </div>

              <div className="mt-8 flex items-center justify-between">

                <div className="flex gap-8">

                  <div className="flex items-center gap-2">
                    <ThumbsUp
                      size={18}
                      className="text-cyan-600"
                    />
                    {idea.likes}
                  </div>

                  <div className="flex items-center gap-2">
                    <ThumbsDown
                      size={18}
                      className="text-cyan-600"
                    />
                    {idea.dislikes}
                  </div>

                  <div className="flex items-center gap-2">
                    <MessageCircle
                      size={18}
                      className="text-cyan-600"
                    />
                    {idea.comments ?? 0}
                  </div>

                </div>

                <div className="flex gap-3">
                                    <button
                    onClick={() => handleLike(idea.id)}
                    className="flex items-center gap-2 rounded-xl bg-cyan-600 px-5 py-2 text-white transition hover:bg-cyan-700"
                  >
                    <ThumbsUp size={18} />
                    Like
                  </button>

                  <button
                    onClick={() => handleDislike(idea.id)}
                    className="flex items-center gap-2 rounded-xl bg-cyan-600 px-5 py-2 text-white transition hover:bg-cyan-700"
                  >
                    <ThumbsDown size={18} />
                    Dislike
                  </button>

                  <button
                    onClick={() => {
                      setSelectedIdea(idea.id);
                      setShowComment(true);
                    }}
                    className="flex items-center gap-2 rounded-xl bg-cyan-600 px-5 py-2 text-white transition hover:bg-cyan-700"
                  >
                    <MessageCircle size={18} />
                    Comment
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

      {/* Comment Modal */}

      {showComment && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

          <div className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-xl">

            <h2 className="mb-6 text-2xl font-bold">
              Add Comment
            </h2>

            <textarea
              rows={6}
              value={comment}
              onChange={(e) =>
                setComment(e.target.value)
              }
              placeholder="Write your review..."
              className="w-full rounded-xl border p-4 outline-none focus:border-blue-400"
            />

            <div className="mt-6 flex justify-end gap-4">

              <button
                onClick={() => {
                  setShowComment(false);
                  setComment("");
                  setSelectedIdea(null);
                }}
                className="rounded-xl border px-6 py-3 hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                onClick={submitComment}
                className="rounded-xl bg-cyan-600 px-6 py-3 text-white hover:bg-cyan-700"
              >
                Submit Comment
              </button>

            </div>

          </div>
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
