"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Lightbulb,
  Plus,
  Pencil,
  Trash2,
  Send,
  Loader2,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  getIdeas,
  createIdea,
  updateIdea,
  deleteIdea,
  submitIdea,
} from "@/app/lib/ideas";
import { createLocalNotification } from "@/app/lib/notification";

import { toast } from "@/app/utils/toast";

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

  const [showModal, setShowModal] = useState(false);

  const [page, setPage] = useState(1);
const [pageSize] = useState(20);

const [pagination, setPagination] = useState({
  current_page: 1,
  total_pages: 1,
  has_next: false,
  has_previous: false,
});
  const [form, setForm] = useState({
    title: "",
    description: "",
  });
  const router = useRouter();
   


  /* ------------------------------------------
     LOAD IDEAS
  ------------------------------------------ */

  const loadIdeas = useCallback(async () => {
    try {
      setLoading(true);

      const response = await getIdeas(page, pageSize);

      console.log("Ideas Response:", response);

      const drafts = (response.results ?? []).filter(
        (idea) => idea.status === "Draft"
      );
      setPagination({
      current_page: response.current_page,
      total_pages: response.total_pages,
      has_next: response.has_next,
      has_previous: response.has_previous,
    });

      setIdeas(drafts);
    } catch (error: unknown) {
      console.error("Failed loading ideas:", error);

      toast.error(
        getErrorMessage(error, "Failed to load ideas.")
      );

      setIdeas([]);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      void loadIdeas();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [loadIdeas]);

  /* ------------------------------------------
     RESET FORM
  ------------------------------------------ */

  function resetForm() {
    setEditingId(null);

    setForm({
      title: "",
      description: "",
    });

    setShowModal(false);
  }

  /* ------------------------------------------
     CREATE / UPDATE
  ------------------------------------------ */

  async function handleSave() {
    if (!form.title.trim()) {
      toast.error("Idea title is required.");
      return;
    }

    if (!form.description.trim()) {
      toast.error("Idea description is required.");
      return;
    }

    try {
      setSaving(true);

      if (editingId) {
        await updateIdea(editingId, form);

        toast.success(
          "Draft updated successfully."
        );
      } else {
        await createIdea(form);

        await createLocalNotification({
          title: "Idea created",
          message: `"${form.title}" was created as a draft idea.`,
          type: "idea",
          category: "idea_updates",
        });

        toast.success(
          "Draft created successfully."
        );
      }

      resetForm();

      await loadIdeas();
          } catch (error: unknown) {
      console.error(error);

      toast.error(
        getErrorMessage(error, "Unable to save idea.")
      );
    } finally {
      setSaving(false);
    }
  }

  /* ------------------------------------------
     DELETE IDEA
  ------------------------------------------ */

  async function handleDelete(id: string) {
    const confirmed = confirm(
      "Delete this draft idea?"
    );

    if (!confirmed) return;

    try {
      await deleteIdea(id);

      toast.success("Draft deleted.");

      await loadIdeas();
    } catch (error: unknown) {
      console.error(error);

      toast.error(
        getErrorMessage(error, "Unable to delete draft.")
      );
    }
  }

  /* ------------------------------------------
     SUBMIT IDEA
  ------------------------------------------ */

  async function handleSubmit(id: string) {
    const confirmed = confirm(
      "Submit this idea for Peer Review?"
    );

    if (!confirmed) return;

    try {
      const idea = ideas.find((item) => item.id === id);

      await submitIdea(id);

      await createLocalNotification({
        title: "Idea submitted",
        message: `"${idea?.title ?? "An idea"}" was submitted for peer review.`,
        type: "idea",
        category: "idea_updates",
      });

      toast.success(
        "Idea submitted successfully."
      );

      await loadIdeas();
    } catch (error: unknown) {
      console.error(error);

      toast.error(
        getErrorMessage(error, "Unable to submit idea.")
      );
    }
  }
  

  return (
    <div className="space-y-8">

      {/* Header */}

<div className="rounded-3xl bg-linear-to-r from-cyan-500 via--650 to-cyan-500 p-10 text-slate shadow-xl">

        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <h1 className="flex items-center gap-3 text-4xl font-bold">

              <Lightbulb className="h-10 w-10" />

              Submit Innovation Idea

            </h1>

            <p className="mt-4 max-w-2xl text-lg text-gray-100">

              Create and manage your draft ideas before
              submitting them into the innovation pipeline.

            </p>

          </div>

          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="flex items-center gap-2 rounded-2xl bg-white px-6 py-4 font-semibold text-blue-700 transition hover:scale-105"
          >
            <Plus size={22} />
            Create Idea
          </button>

        </div>

      </div>

      {/* Modal */}

      {showModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5">

          <div className="w-full max-w-3xl rounded-3xl bg-white shadow-2xl">

            <div className="flex items-center justify-between border-b p-8">

              <h2 className="text-2xl font-bold">

                {editingId
                  ? "Edit Draft Idea"
                  : "Create Draft Idea"}

              </h2>

              <button
                onClick={resetForm}
                className="rounded-xl border p-2 hover:bg-green-100"
              >
                <X />
              </button>

            </div>

            <div className="space-y-6 p-8">

              <div>

                <label className="mb-2 block font-semibold">
                  Idea Title
                </label>

                <input
                  value={form.title}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      title: e.target.value,
                    })
                  }
                  placeholder="Enter idea title..."
                  className="w-full rounded-xl border p-4"
                />

              </div>

              <div>

                <label className="mb-2 block font-semibold">
                  Description
                </label>

                <textarea
                  rows={8}
                  value={form.description}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      description: e.target.value,
                    })
                  }
                  placeholder="Describe your innovation..."
                  className="w-full rounded-xl border p-4"
                />

              </div>

              <div className="flex gap-4">

                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="rounded-xl bg-cyan-600 px-8 py-3 font-semibold text-white hover:bg-green-100 disabled:opacity-60"
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
                    "Update Draft"
                  ) : (
                    "Create Draft"
                  )}
                </button>

                <button
                  onClick={resetForm}
                  className="rounded-xl border px-8 py-3"
                >
                  Cancel
                </button>

              </div>

            </div>

          </div>

        </div>

      )}
            {/* Draft Ideas */}

      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">

        <div className="flex items-center justify-between border-b p-6">

          <div>

            <h2 className="text-2xl font-bold text-slate-800">
              My Draft Ideas
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Draft ideas can be edited, deleted or submitted for review.
            </p>

          </div>

          <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-cyan-700">

            {ideas.length} Draft{ideas.length !== 1 ? "s" : ""}

          </span>

        </div>

        {loading ? (

          <div className="flex justify-center py-20">

            <Loader2 className="h-10 w-10 animate-spin text-cyan-600" />

          </div>

        ) : ideas.length === 0 ? (

          <div className="py-20 text-center">

            <Lightbulb
              size={60}
              className="mx-auto text-slate-300"
            />

            <h3 className="mt-6 text-xl font-semibold text-slate-700">
              No Draft Ideas
            </h3>

            <p className="mt-2 text-slate-500">
              Click <strong>Create Idea</strong> to start your first
              innovation.
            </p>

          </div>

        ) : (

          <div className="grid gap-6 p-6 lg:grid-cols-2">

            {ideas.map((idea) => (

              <div
                key={idea.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >

                <div className="flex items-start justify-between">

                  <div>

                    <h3 className="text-xl font-bold text-slate-800">
                      {idea.title}
                    </h3>

                    <span className="mt-2 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      {idea.status}
                    </span>

                  </div>

                </div>

                <p className="mt-5 line-clamp-4 text-slate-600">
                  {idea.description}
                </p>

                <div className="mt-6 grid grid-cols-2 gap-4 text-sm">

                  <div>

                    <span className="font-semibold text-slate-500">
                      Priority
                    </span>

                    <p className="mt-1 font-medium">
                      {idea.priority ?? "-"}
                    </p>

                  </div>

                  <div>

                    <span className="font-semibold text-slate-500">
                      Creator
                    </span>

                    <p className="mt-1 font-medium">
                      {idea.creator}
                    </p>

                  </div>

                </div>

                <div className="mt-8 flex flex-wrap gap-3">

                  <button
                    onClick={() => {
                      setEditingId(idea.id);

                      setForm({
                        title: idea.title,
                        description: idea.description,
                      });

                      setShowModal(true);
                    }}
                    className="flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-3 text-white transition hover:bg-blue-400"
                  >
                    <Pencil size={18} />
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(idea.id)}
                    className="flex items-center gap-2 rounded-xl bg-cyan-600 px-4 py-3 text-white transition hover:bg-red-400"
                  >
                    <Trash2 size={18} />
                    Delete
                  </button>

                  <button
                    onClick={() => handleSubmit(idea.id)}
                    className="flex items-center gap-2 rounded-xl bg-cyan-600 px-4 py-3 text-white transition hover:bg-green-400"
                  >
                    <Send size={18} />
                    Submit
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}
    
      </div>

    </div>

  );
  
}

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error && error.message
    ? error.message
    : fallback;
}
