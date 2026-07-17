"use client";

import Link from "next/link";
import {
  FolderKanban,
  Calendar,
  Users,
  Flag,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import ProjectProgress from "./ProjectProgress";

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    idea: string;
    manager: string;
    department: string;
    priority: "High" | "Medium" | "Low";
    status: "Planning" | "In Progress" | "On Hold" | "Completed";
    dueDate: string;
    teamMembers: number;
    progress: number;
    completedTasks: number;
    totalTasks: number;
    completedPhases: number;
    totalPhases: number;
  };
}

export default function ProjectCard({
  project,
}: ProjectCardProps) {
  const priorityColor = {
    High: "bg-red-100 text-red-700",
    Medium: "bg-yellow-100 text-yellow-700",
    Low: "bg-green-100 text-green-700",
  };

  const statusColor = {
    Planning: "bg-slate-100 text-slate-700",
    "In Progress": "bg-blue-100 text-blue-700",
    "On Hold": "bg-orange-100 text-orange-700",
    Completed: "bg-green-100 text-green-700",
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-xl">

      {/* Header */}

      <div className="flex items-start justify-between border-b p-6">

        <div>

          <div className="flex items-center gap-3">

            <FolderKanban
              className="text-indigo-600"
              size={24}
            />

            <h2 className="text-2xl font-bold text-slate-800">
              {project.title}
            </h2>

          </div>

          <p className="mt-3 text-slate-500">
            Originated from:
            <span className="ml-2 font-semibold text-slate-700">
              {project.idea}
            </span>
          </p>

        </div>

        <div className="flex gap-2">

          <span
            className={`rounded-full px-3 py-1 text-sm font-semibold ${priorityColor[project.priority]}`}
          >
            {project.priority}
          </span>

          <span
            className={`rounded-full px-3 py-1 text-sm font-semibold ${statusColor[project.status]}`}
          >
            {project.status}
          </span>

        </div>

      </div>

      {/* Information */}

      <div className="grid gap-6 p-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="flex items-center gap-3">

          <CheckCircle2
            size={20}
            className="text-green-600"
          />

          <div>

            <p className="text-xs uppercase text-slate-500">
              Manager
            </p>

            <p className="font-semibold">
              {project.manager}
            </p>

          </div>

        </div>

        <div className="flex items-center gap-3">

          <Users
            size={20}
            className="text-blue-600"
          />

          <div>

            <p className="text-xs uppercase text-slate-500">
              Team
            </p>

            <p className="font-semibold">
              {project.teamMembers} Members
            </p>

          </div>

        </div>

        <div className="flex items-center gap-3">

          <Flag
            size={20}
            className="text-red-600"
          />

          <div>

            <p className="text-xs uppercase text-slate-500">
              Department
            </p>

            <p className="font-semibold">
              {project.department}
            </p>

          </div>

        </div>

        <div className="flex items-center gap-3">

          <Calendar
            size={20}
            className="text-purple-600"
          />

          <div>

            <p className="text-xs uppercase text-slate-500">
              Due Date
            </p>

            <p className="font-semibold">
              {project.dueDate}
            </p>

          </div>

        </div>

      </div>

      {/* Progress */}

      <div className="px-6 pb-6">

        <ProjectProgress
          progress={project.progress}
          completedTasks={project.completedTasks}
          totalTasks={project.totalTasks}
          completedPhases={project.completedPhases}
          totalPhases={project.totalPhases}
        />

      </div>

      {/* Footer */}

      <div className="flex items-center justify-between border-t bg-slate-50 px-6 py-5">

        <div>

          <p className="text-sm text-slate-500">
            Linked implementation project
          </p>

          <p className="font-semibold text-slate-700">
            #{project.id}
          </p>

        </div>

        <Link
          href={`/dashboard/implementation/project/${project.id}`}
          className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700"
        >
          View Project

          <ArrowRight size={18} />

        </Link>

      </div>

    </div>
  );
}