// src/app/ui/idea-card.tsx

"use client";
import { useState } from "react";

interface Task {
  id: number;
  documentId: string;
  title: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
  dueDate: string;
  assignee?: { name: string };
}

interface Comment {
  id: number;
  documentId: string;
  content: string;
  author?: { username: string };
  createdAt: string;
}

interface Idea {
  id: number;
  documentId: string;
  title: string;
  description: string;
  status: string;
  likesCount: number;
  priority?: string;
  dueDate?: string;
  pmComment?: string;
  publishedAt: string;
  author?: { username: string };
  comments?: Comment[];
}

// ── Status Styles ─────────────────────────────────────────────
const STATUS_STYLES: Record<string, string> = {
  draft:             "bg-gray-100 text-gray-600 border-gray-200",
  submitted:         "bg-blue-100 text-blue-600 border-blue-200",
  peer_review:       "bg-yellow-100 text-yellow-700 border-yellow-200",
  pm_review:         "bg-purple-100 text-purple-700 border-purple-200",
  approved:          "bg-green-100 text-green-700 border-green-200",
  implementation:    "bg-orange-100 text-orange-700 border-orange-200",
  impact_evaluation: "bg-pink-100 text-pink-700 border-pink-200",
  archived:          "bg-red-100 text-red-600 border-red-200",
};

const STATUS_ICONS: Record<string, string> = {
  draft:             "📝",
  submitted:         "📤",
  peer_review:       "👥",
  pm_review:         "🔍",
  approved:          "✅",
  implementation:    "🚀",
  impact_evaluation: "📊",
  archived:          "🗄️",
};

const PRIORITY_STYLES: Record<string, string> = {
  high:   "bg-red-100 text-red-600",
  medium: "bg-yellow-100 text-yellow-600",
  low:    "bg-green-100 text-green-600",
};

const PRIORITY_ICONS: Record<string, string> = {
  high:   "🔴",
  medium: "🟡",
  low:    "🟢",
};

// ── Idea Card Component ───────────────────────────────────────
export default function IdeaCard({
  idea,
  onLike,
  onComment,
  onRefresh,
}: {
  idea: Idea;
  onLike?: (documentId: string, currentLikes: number) => void;
  onComment?: (documentId: string, comment: string) => void;
  onRefresh?: () => void;
}) {
  const [showComments, setShowComments]   = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment]             = useState("");
  const [submitting, setSubmitting]       = useState(false);
  const [liking, setLiking]               = useState(false);

  // ── Format Date ───────────────────────────────────────────
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year:  "numeric",
      month: "short",
      day:   "numeric",
    });
  };

  // ── Handle Like ───────────────────────────────────────────
  const handleLike = async () => {
    if (liking) return;
    setLiking(true);

    const token = localStorage.getItem("token");
    await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/ideas/${idea.documentId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: { likesCount: (idea.likesCount ?? 0) + 1 },
        }),
      }
    );

    setLiking(false);
    if (onLike) onLike(idea.documentId, idea.likesCount ?? 0);
    if (onRefresh) onRefresh();
  };

  // ── Handle Comment Submit ─────────────────────────────────
  const handleCommentSubmit = async () => {
    if (!comment.trim() || submitting) return;
    setSubmitting(true);

    const token = localStorage.getItem("token");
    await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/idea-comments`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            content: comment,
            idea:    idea.documentId,
          },
        }),
      }
    );

    setComment("");
    setSubmitting(false);
    setShowCommentBox(false);
    setShowComments(true);
    if (onComment) onComment(idea.documentId, comment);
    if (onRefresh) onRefresh();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">

      {/* ── Card Header ── */}
      <div className="p-5">

        {/* Top Row: Status + Priority */}
        <div className="flex items-center justify-between gap-2 mb-3">
          {/* Status Badge */}
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
              STATUS_STYLES[idea.status] ?? "bg-gray-100 text-gray-600"
            }`}
          >
            {STATUS_ICONS[idea.status]} {idea.status?.replace(/_/g, " ")}
          </span>

          {/* Priority Badge */}
          {idea.priority && (
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                PRIORITY_STYLES[idea.priority] ?? "bg-gray-100 text-gray-600"
              }`}
            >
              {PRIORITY_ICONS[idea.priority]} {idea.priority}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-gray-800 mb-2 leading-snug">
          {idea.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-500 line-clamp-3 mb-3">
          {idea.description}
        </p>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
          {/* Author */}
          {idea.author?.username && (
            <span className="flex items-center gap-1">
              👤 {idea.author.username}
            </span>
          )}

          {/* Published Date */}
          {idea.publishedAt && (
            <span className="flex items-center gap-1">
              📅 {formatDate(idea.publishedAt)}
            </span>
          )}

          {/* Due Date */}
          {idea.dueDate && (
            <span className="flex items-center gap-1 text-orange-500 font-medium">
              ⏰ Due: {formatDate(idea.dueDate)}
            </span>
          )}
        </div>

        {/* PM Comment */}
        {idea.pmComment && (
          <div className="mt-3 bg-purple-50 border border-purple-100 rounded-lg px-3 py-2">
            <p className="text-xs font-semibold text-purple-700 mb-0.5">
              🔍 PM Review Comment:
            </p>
            <p className="text-xs text-purple-600">{idea.pmComment}</p>
          </div>
        )}

        {/* Likes Progress Bar (toward 5 likes for peer review) */}
        {idea.status === "peer_review" && (
          <div className="mt-3">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Likes toward PM Review</span>
              <span>{Math.min(idea.likesCount ?? 0, 5)}/5</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className="bg-blue-500 h-1.5 rounded-full transition-all"
                style={{
                  width: `${Math.min(((idea.likesCount ?? 0) / 5) * 100, 100)}%`,
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* ── Card Footer: Actions ── */}
      <div className="border-t border-gray-100 px-5 py-3 flex items-center gap-4 bg-gray-50">

        {/* Like Button */}
        <button
          onClick={handleLike}
          disabled={liking}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-600 transition disabled:opacity-50"
        >
          <span className="text-base">👍</span>
          <span className="font-medium">{idea.likesCount ?? 0}</span>
        </button>

        {/* Comment Toggle */}
        <button
          onClick={() => {
            setShowComments(!showComments);
            setShowCommentBox(false);
          }}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-600 transition"
        >
          <span className="text-base">💬</span>
          <span className="font-medium">
            {idea.comments?.length ?? 0} Comments
          </span>
        </button>

        {/* Add Comment Button */}
        <button
          onClick={() => {
            setShowCommentBox(!showCommentBox);
            setShowComments(true);
          }}
          className="ml-auto text-xs text-blue-600 hover:underline font-medium"
        >
          + Add Comment
        </button>
      </div>

      {/* ── Comments Section ── */}
      {showComments && (
        <div className="border-t border-gray-100 px-5 py-4 space-y-3">

          {/* Comment Input Box */}
          {showCommentBox && (
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleCommentSubmit()}
                placeholder="Write a comment..."
                className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <button
                onClick={handleCommentSubmit}
                disabled={submitting || !comment.trim()}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition disabled:opacity-50"
              >
                {submitting ? "..." : "Send"}
              </button>
            </div>
          )}

          {/* Comments List */}
          {idea.comments && idea.comments.length > 0 ? (
            idea.comments.map((c) => (
              <div
                key={c.id}
                className="flex items-start gap-3 bg-gray-50 rounded-lg px-3 py-2"
              >
                {/* Avatar */}
                <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {c.author?.username?.charAt(0).toUpperCase() ?? "?"}
                </div>

                {/* Comment Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-semibold text-gray-700">
                      {c.author?.username ?? "Anonymous"}
                    </span>
                    <span className="text-xs text-gray-400">
                      {formatDate(c.createdAt)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{c.content}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-400 text-center py-2">
              No comments yet. Be the first to comment!
            </p>
          )}
        </div>
      )}
    </div>
  );
}