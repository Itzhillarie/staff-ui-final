"use client";

import ProjectStats from "@/app/components/Implementation/ProjectStats";
import ProjectFilters from "@/app/components/Implementation/ProjectFilters";
import ProjectCard from "@/app/components/Implementation/ProjectCard";

const projects = [
  {
    id: 1,
    title: "Digital Leave Management System",
    idea: "Paperless Leave Approval",
    manager: "Hillary Chelimo",
    department: "ICT",
    priority: "High" as const,
    status: "In Progress" as const,
    dueDate: "2026-09-15",
    teamMembers: 8,
    progress: 72,
    completedTasks: 18,
    totalTasks: 25,
    completedPhases: 3,
    totalPhases: 5,
  },

  {
    id: 2,
    title: "Smart Inventory Management",
    idea: "Inventory Automation",
    manager: "John Kamau",
    department: "Supply Chain",
    priority: "Medium" as const,
    status: "Planning" as const,
    dueDate: "2026-10-01",
    teamMembers: 5,
    progress: 20,
    completedTasks: 3,
    totalTasks: 15,
    completedPhases: 1,
    totalPhases: 5,
  },

  {
    id: 3,
    title: "Customer Feedback Portal",
    idea: "Customer Experience Improvement",
    manager: "Mary Wanjiru",
    department: "Customer Service",
    priority: "High" as const,
    status: "Completed" as const,
    dueDate: "2026-08-10",
    teamMembers: 6,
    progress: 100,
    completedTasks: 20,
    totalTasks: 20,
    completedPhases: 5,
    totalPhases: 5,
  },
];

export default function ImplementationDashboard() {
  return (
    <div className="space-y-8">

      {/* Page Header */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-bold text-slate-800">
            Implementation Projects
          </h1>

          <p className="mt-2 text-slate-500">
            Track implementation projects created from approved ideas.
          </p>

        </div>

        <button className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700">
          + New Project
        </button>

      </div>

      {/* Statistics */}

      <ProjectStats />

      {/* Filters */}

      <ProjectFilters />

      {/* Projects */}

      <div className="space-y-8">

        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
          />
        ))}

      </div>

    </div>
  );
}