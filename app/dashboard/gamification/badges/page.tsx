"use client";

import { useEffect, useState } from "react";
import { Award, Loader2, Lock, CheckCircle2 } from "lucide-react";
import { Badge, getBadges } from "@/app/lib/gamification";

export default function BadgesPage() {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBadges() {
      try {
        const data = await getBadges();
        setBadges(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Badges Error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadBadges();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[70vh] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-cyan-600" />
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="rounded-3xl bg-linear-to-r from-cyan-500 via-cyan-500 to-cyan-500 p-8 text-white shadow-xl">

        <div className="flex items-center gap-4">

          <Award className="h-12 w-12" />

          <div>

            <h1 className="text-4xl font-bold">
              My Badges
            </h1>

            <p className="mt-2 text-cyan-400">
              Earn badges by participating in innovation activities.
            </p>

          </div>

        </div>

      </div>

      {/* Summary */}

      <div className="grid gap-6 md:grid-cols-3">

        <div className="rounded-2xl bg-cyan p-6 shadow">

          <p className="text-sm text-slate-500">
            Total Badges
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            {badges.length}
          </h2>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow">

          <p className="text-sm text-slate-500">
            Earned
          </p>

          <h2 className="mt-2 text-4xl font-bold text-green-600">
            {badges.filter((b) => b.earned).length}
          </h2>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow">

          <p className="text-sm text-slate-500">
            Locked
          </p>

          <h2 className="mt-2 text-4xl font-bold text-red-500">
            {badges.filter((b) => !b.earned).length}
          </h2>

        </div>

      </div>

      {/* Badge Grid */}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

        {badges.map((badge) => (

          <div
            key={badge.id}
            className={`rounded-2xl border p-6 shadow transition hover:shadow-lg ${
              badge.earned
                ? "bg-cyan"
                : "bg-slate-100 opacity-70"
            }`}
          >

            <div className="mb-5 flex justify-center">

              {badge.earned ? (
                <Award className="h-16 w-16 text-cyan-500" />
              ) : (
                <Lock className="h-16 w-16 text-slate-400" />
              )}

            </div>

            <h2 className="text-center text-xl font-bold">
              {badge.name}
            </h2>

            <p className="mt-3 text-center text-sm text-slate-500">
              {badge.description}
            </p>

            {badge.earned ? (
              <div className="mt-6 flex items-center justify-center gap-2 rounded-full bg-cyan-100 py-2 text-green-700">

                <CheckCircle2 size={18} />

                Earned

              </div>
            ) : (
              <div className="mt-6 flex items-center justify-center gap-2 rounded-full bg-cyan-200 py-2 text-slate-600">

                <Lock size={18} />

                Locked

              </div>
            )}

            {badge.earned && badge.earned_at && (
              <p className="mt-4 text-center text-xs text-slate-400">
                Earned on{" "}
                {new Date(badge.earned_at).toLocaleDateString()}
              </p>
            )}

          </div>

        ))}

      </div>

      {badges.length === 0 && (
        <div className="rounded-2xl bg-white p-12 text-center shadow">
          <Award className="mx-auto mb-4 h-14 w-14 text-slate-300" />
          <h2 className="text-2xl font-bold">
            No Badges Yet
          </h2>
          <p className="mt-2 text-slate-500">
            Participate in the innovation platform to unlock badges.
          </p>
        </div>
      )}

    </div>
  );
}