"use client";

import { useEffect, useState } from "react";
import {
  Lightbulb,
  Send,
  Pencil,
  Trash2,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Loader2,
  Plus,
  X,
} from "lucide-react";

import {
  getIdeas,
  createIdea,
  updateIdea,
  deleteIdea,
  submitIdea,
  likeIdea,
  dislikeIdea,
  commentIdea,
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
}

export default function SubmitIdeaPage() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [showCreateIdea, setShowCreateIdea] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const loadIdeas = async () => {
    try {
      setLoading(true);

      const data = await getIdeas();

      setIdeas(data);

    } catch (err) {
      console.error(err);
      alert("Failed to load ideas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIdeas();
  }, []);

  function resetForm() {
    setEditingId(null);

    setForm({
      title: "",
      description: "",
    });

    setShowCreateIdea(false);
  }

  async function handleSave() {
    if (!form.title.trim()) {
      alert("Idea title is required.");
      return;
    }

    if (!form.description.trim()) {
      alert("Idea description is required.");
      return;
    }

    try {
      setSaving(true);

      if (editingId) {
        await updateIdea(editingId, {
          title: form.title,
          description: form.description,
        });
      } else {
        await createIdea({
          title: form.title,
          description: form.description,
        });
      }

      resetForm();

      await loadIdeas();

    } catch (err: any) {
      console.error(err);
      alert(err?.body?.error || "Failed to save idea.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this idea?")) return;

    try {
      await deleteIdea(id);
      await loadIdeas();
    } catch (err: any) {
      alert(err?.body?.error || "Delete failed.");
    }
  }

  async function handleSubmitIdea(id: string) {
    try {
      await submitIdea(id);
      await loadIdeas();
    } catch (err: any) {
      alert(err?.body?.error || "Submit failed.");
    }
  }

  async function handleLike(id: string) {
    try {
      await likeIdea(id);
      await loadIdeas();
    } catch (err: any) {
      alert(err?.body?.error || "Unable to like.");
    }
  }

  async function handleDislike(id: string) {
    try {
      await dislikeIdea(id);
      await loadIdeas();
    } catch (err: any) {
      alert(err?.body?.error || "Unable to dislike.");
    }
  }

  async function handleComment(id: string) {
    const comment = prompt("Enter comment");

    if (!comment) return;

    try {
      await commentIdea(id, comment);
      await loadIdeas();
    } catch (err: any) {
      alert(err?.body?.error || "Comment failed.");
    }
  }

  return (
    <div className="space-y-8 p-8">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="flex items-center gap-3 text-3xl font-bold">
            <Lightbulb className="text-blue-600" />
            Submit Innovation Idea
          </h1>

          <p className="mt-2 text-slate-500">
            Submit, manage and track your innovation ideas.
          </p>

        </div>

        <button
          onClick={() => {
            resetForm();
            setShowCreateIdea(true);
          }}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white shadow hover:bg-blue-700"
        >
          <Plus size={20} />
          Create Idea
        </button>

      </div>

      {showCreateIdea && (

        <div className="rounded-2xl border bg-white p-8 shadow-sm">

          <div className="mb-6 flex items-center justify-between">

            <h2 className="text-xl font-semibold">
              {editingId ? "Edit Idea" : "Create New Idea"}
            </h2>

            <button
              onClick={resetForm}
              className="rounded-lg p-2 hover:bg-slate-100"
            >
              <X size={22} />
            </button>

          </div>

          <div className="space-y-5">

            <div>

              <label className="mb-2 block font-medium">
                Title
              </label>

              <input
                className="w-full rounded-xl border p-3"
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value,
                  })
                }
              />

            </div>

            <div>

              <label className="mb-2 block font-medium">
                Description
              </label>

              <textarea
                rows={6}
                className="w-full rounded-xl border p-3"
                value={form.description}
                onChange={(e) =>
                  setForm({
                    ...form,
                    description: e.target.value,
                  })
                }
              />

            </div>

            <div className="flex gap-4">

              <button
                onClick={handleSave}
                disabled={saving}
                className="rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
              >
                {saving ? (
                  <span className="flex items-center gap-2">
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                    Saving...
                  </span>
                ) : editingId ? (
                  "Update Idea"
                ) : (
                  "Create Idea"
                )}
              </button>

              <button
                type="button"
                onClick={resetForm}
                className="rounded-xl border px-6 py-3"
              >
                Clear
              </button>

            </div>

          </div>

        </div>

      )}
      {showCreateIdea && (
  <div className="rounded-2xl border bg-white p-8 shadow-sm">

    <div className="mb-6 flex items-center justify-between">

      <h2 className="text-xl font-semibold">
        {editingId ? "Edit Idea" : "Create New Idea"}
      </h2>

      <button
        onClick={resetForm}
        className="rounded-lg border px-4 py-2 hover:bg-gray-100"
      >
        ✕
      </button>

    </div>

    <div className="space-y-5">

      <div>

        <label className="mb-2 block font-medium">
          Title
        </label>

        <input
          className="w-full rounded-xl border p-3"
          value={form.title}
          onChange={(e) =>
            setForm({
              ...form,
              title: e.target.value,
            })
          }
        />

      </div>

      <div>

        <label className="mb-2 block font-medium">
          Description
        </label>

        <textarea
          rows={6}
          className="w-full rounded-xl border p-3"
          value={form.description}
          onChange={(e) =>
            setForm({
              ...form,
              description: e.target.value,
            })
          }
        />

      </div>

      <div className="flex gap-4">

        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          {saving ? (
            <span className="flex items-center gap-2">
              <Loader2
                size={18}
                className="animate-spin"
              />
              Saving...
            </span>
          ) : editingId ? (
            "Update Idea"
          ) : (
            "Create Idea"
          )}
        </button>

        <button
          type="button"
          onClick={resetForm}
          className="rounded-xl border px-6 py-3"
        >
          Clear
        </button>

      </div>

    </div>

  </div>
)}

<div className="rounded-2xl border bg-white shadow-sm">

  <div className="border-b p-6 flex items-center justify-between">

    <div>

      <h2 className="text-2xl font-bold">
        Ideas Table
      </h2>

      <p className="text-sm text-slate-500">
        Ideas fetched directly from Django.
      </p>

    </div>

    <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
      {ideas.length} Ideas
    </span>

  </div>

  <div className="overflow-x-auto">

    {loading ? (

      <div className="flex items-center justify-center p-12">

        <Loader2
          className="animate-spin text-blue-600"
          size={30}
        />

      </div>

    ) : ideas.length === 0 ? (

      <div className="p-12 text-center text-slate-500">
        No ideas found.
      </div>

    ) : (

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
              Likes
            </th>

            <th className="px-6 py-4 text-center">
              Dislikes
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

      <td className="px-6 py-5 max-w-md">
        <div className="line-clamp-2">
          {idea.description}
        </div>
      </td>

      <td className="px-6 py-5 text-center">
        {idea.creator}
      </td>

      <td className="px-6 py-5 text-center">

        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold

          ${
            idea.status === "Draft"
              ? "bg-slate-100 text-slate-700"
              : idea.status === "Submitted"
              ? "bg-blue-100 text-blue-700"
              : idea.status === "Peer Review"
              ? "bg-purple-100 text-purple-700"
              : idea.status === "Product Manager Review"
              ? "bg-orange-100 text-orange-700"
              : idea.status === "Approved"
              ? "bg-green-100 text-green-700"
              : idea.status === "Rejected"
              ? "bg-red-100 text-red-700"
              : idea.status === "Implementation"
              ? "bg-cyan-100 text-cyan-700"
              : "bg-slate-100 text-slate-700"
          }

          `}
        >
          {idea.status}
        </span>

      </td>

      <td className="px-6 py-5 text-center">
        {idea.priority || "-"}
      </td>

      <td className="px-6 py-5 text-center">
        👍 {idea.likes}
      </td>

      <td className="px-6 py-5 text-center">
        👎 {idea.dislikes}
      </td>

      <td className="px-6 py-5">

        <div className="flex flex-wrap justify-center gap-2">

          <button
            onClick={() => {
              setEditingId(idea.id);

              setShowCreateIdea(true);

              setForm({
                title: idea.title,
                description: idea.description,
              });

              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
            className="rounded-lg bg-yellow-500 p-2 text-white hover:bg-yellow-600"
          >
            <Pencil size={16} />
          </button>

          <button
            onClick={() => handleDelete(idea.id)}
            className="rounded-lg bg-red-600 p-2 text-white hover:bg-red-700"
          >
            <Trash2 size={16} />
          </button>

          <button
            onClick={() => handleSubmitIdea(idea.id)}
            disabled={idea.status !== "Draft"}
            className="rounded-lg bg-blue-600 p-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            <Send size={16} />
          </button>

          <button
            onClick={() => handleLike(idea.id)}
            className="rounded-lg bg-green-600 p-2 text-white hover:bg-green-700"
          >
            <ThumbsUp size={16} />
          </button>

          <button
            onClick={() => handleDislike(idea.id)}
            className="rounded-lg bg-orange-600 p-2 text-white hover:bg-orange-700"
          >
            <ThumbsDown size={16} />
          </button>

          <button
            onClick={() => handleComment(idea.id)}
            className="rounded-lg bg-purple-600 p-2 text-white hover:bg-purple-700"
          >
            <MessageCircle size={16} />
          </button>

        </div>

      </td>

    </tr>

  ))}

</tbody>

</table>

)}

</div>

</div>

</div>

);
}