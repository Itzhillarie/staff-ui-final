"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "@/app/utils/apiFetch";

type Idea = {
  id?: string;
  title: string;
  category: string;
  department: string;
  problem?: string;
  solution?: string;
  benefits?: string;
  created_at?: string;
};

export default function SubmitIdeaPage() {
  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/ideas";
  const [form, setForm] = useState<Idea>({
    title: "",
    category: "Technology",
    department: "ICT",
    problem: "",
    solution: "",
    benefits: "",
  });

  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch list of ideas
  useEffect(() => {
    async function fetchIdeas() {
      setLoading(true);
      setError(null);
      try {
        const data = await apiFetch(`${API_BASE}/list/`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        setIdeas(Array.isArray(data) ? data : []);
      } catch (err: any) {
        console.error("Fetch ideas failed:", err);
        setError(err.body || err.message || "Failed to load ideas");
      } finally {
        setLoading(false);
      }
    }
    fetchIdeas();
  }, [API_BASE]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  // Submit new idea
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
      const created = await apiFetch(`${API_BASE}/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(form),
      });

      // If backend returns created object, add it; otherwise refetch list
      if (created && (created.id || created.title)) {
        setIdeas((prev) => [created, ...prev]);
      } else {
        const list = await apiFetch(`${API_BASE}/list/`, { method: "GET", headers: { "Content-Type": "application/json" } });
        setIdeas(Array.isArray(list) ? list : []);
      }

      setForm({ title: "", category: "Technology", department: "ICT", problem: "", solution: "", benefits: "" });
      alert("Idea submitted successfully");
    } catch (err: any) {
      console.error("Submit failed:", err);
      setError(err.body || err.message || "Failed to submit idea");
      alert("Submit failed: " + (err.body || err.message || "See console"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold">Submit New Idea</h1>
        <p className="mt-2 text-slate-600">Share innovative ideas that improve processes or reduce costs.</p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-8 xl:grid-cols-3">
        <div className="xl:col-span-2 space-y-6">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Basic Information</h2>

            <div className="space-y-4">
              <div>
                <label className="block font-medium">Idea Title</label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full rounded-xl border p-3"
                  placeholder="Enter idea title"
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block">Category</label>
                  <select name="category" value={form.category} onChange={handleChange} className="mt-2 w-full rounded-xl border p-3">
                    <option>Technology</option>
                    <option>Operations</option>
                    <option>Finance</option>
                    <option>Customer Service</option>
                  </select>
                </div>

                <div>
                  <label className="block">Department</label>
                  <select name="department" value={form.department} onChange={handleChange} className="mt-2 w-full rounded-xl border p-3">
                    <option>ICT</option>
                    <option>Finance</option>
                    <option>HR</option>
                    <option>Administration</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Idea Details</h2>

            <textarea name="problem" value={form.problem} onChange={handleChange} rows={4} placeholder="Problem Statement" className="w-full rounded-xl border p-3 mb-4" />

            <textarea name="solution" value={form.solution} onChange={handleChange} rows={5} placeholder="Proposed Solution" className="w-full rounded-xl border p-3 mb-4" />

            <textarea name="benefits" value={form.benefits} onChange={handleChange} rows={3} placeholder="Expected Benefits" className="w-full rounded-xl border p-3" />
          </div>

          <div className="flex justify-end gap-4">
            <button type="button" className="rounded-xl border px-6 py-3" disabled={submitting}>Save Draft</button>
            <button type="submit" className="rounded-xl bg-blue-600 px-6 py-3 text-white" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Idea"}
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-3">Submission Guide</h3>
            <ul className="text-sm text-slate-600 space-y-2">
              <li>💡 Give your idea a clear title.</li>
              <li>📝 Describe the problem in detail.</li>
              <li>🚀 Explain your proposed solution.</li>
              <li>📈 State the expected benefits.</li>
              <li>📎 Attach supporting documents if needed.</li>
            </ul>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-3">Existing Ideas</h3>

            {loading ? (
              <p>Loading ideas...</p>
            ) : error ? (
              <p className="text-red-600">{error}</p>
            ) : ideas.length === 0 ? (
              <p className="text-slate-600">No ideas yet</p>
            ) : (
              <ul className="space-y-3 text-sm text-slate-700">
                {ideas.map((idea) => (
                  <li key={idea.id || idea.title} className="border-b pb-2">
                    <div className="font-medium">{idea.title}</div>
                    <div className="text-xs text-slate-500">
                      {idea.category} — {idea.department} • {new Date(idea.created_at || Date.now()).toLocaleDateString()}
                    </div>
                    <div className="text-sm mt-1">{(idea.problem || "").slice(0, 120)}{idea.problem && idea.problem.length > 120 ? "…" : ""}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
