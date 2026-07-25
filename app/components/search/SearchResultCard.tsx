"use client";

import Link from "next/link";
import {
  FileText,
  Rocket,
  CheckSquare,
  User,
  Bell,
  ClipboardCheck,
  Users,
  ArrowRight,
} from "lucide-react";

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
  status?: string;
  created_at?: string;
  href: string;
}

interface SearchResultCardProps {
  result: SearchResult;
}

export default function SearchResultCard({
  result,
}: SearchResultCardProps) {
  function getCategoryStyle(category: string) {
    switch (category.toLowerCase()) {
      case "idea":
      case "ideas":
        return {
          icon: FileText,
          bg: "bg-blue-100",
          color: "text-blue-600",
        };

      case "project":
      case "projects":
        return {
          icon: Rocket,
          bg: "bg-green-100",
          color: "text-green-600",
        };

      case "task":
      case "tasks":
        return {
          icon: CheckSquare,
          bg: "bg-orange-100",
          color: "text-orange-600",
        };

      case "user":
      case "users":
        return {
          icon: User,
          bg: "bg-purple-100",
          color: "text-purple-600",
        };

      case "notification":
      case "notifications":
        return {
          icon: Bell,
          bg: "bg-yellow-100",
          color: "text-yellow-600",
        };

      case "peer_review":
        return {
          icon: Users,
          bg: "bg-pink-100",
          color: "text-pink-600",
        };

      case "pm_review":
        return {
          icon: ClipboardCheck,
          bg: "bg-indigo-100",
          color: "text-indigo-600",
        };

      default:
        return {
          icon: FileText,
          bg: "bg-slate-100",
          color: "text-slate-600",
        };
    }
  }

  const style = getCategoryStyle(result.category);
  const Icon = style.icon;

  return (
    <Link
      href={result.href}
      className="block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-indigo-300 hover:shadow-lg"
    >
      <div className="flex items-start justify-between">

        <div className="flex gap-4">

          <div className={`rounded-2xl p-3 ${style.bg}`}>
            <Icon className={`h-7 w-7 ${style.color}`} />
          </div>

          <div>

            <div className="flex flex-wrap items-center gap-3">

              <h2 className="text-xl font-bold text-slate-800">
                {result.title}
              </h2>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase text-slate-600">
                {result.category.replace("_", " ")}
              </span>

            </div>

            <p className="mt-3 line-clamp-2 text-slate-500">
              {result.description}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-6 text-sm">

              {result.status && (
                <span className="rounded-full bg-indigo-100 px-3 py-1 font-medium text-indigo-700">
                  {result.status}
                </span>
              )}

              {result.created_at && (
                <span className="text-slate-400">
                  {new Date(
                    result.created_at
                  ).toLocaleDateString()}
                </span>
              )}

            </div>

          </div>

        </div>

        <ArrowRight className="h-6 w-6 text-slate-400 transition group-hover:text-indigo-600" />

      </div>
    </Link>
  );
}