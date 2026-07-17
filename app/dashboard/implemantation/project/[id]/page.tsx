"use client";

import { useState } from "react";

import ProjectProgress from "@/app/components/Implementation/ProjectProgress";
import PhaseCard from "@/app/components/Implementation/PhaseCard";
import TaskCard from "@/app/components/Implementation/TaskCard";
import TeamMembers from "@/app/components/Implementation/TeamMembers";
import TaskDialog from "@/app/components/Implementation/TaskDialog";
import CreateTaskDialog from "@/app/components/Implementation/CreateTaskDialog";
import CreatePhaseDialog from "@/app/components/Implementation/CreatePhaseDialog";

import {
  ArrowLeft,
  Plus,
  FolderKanban,
} from "lucide-react";

export default function ProjectDetailsPage() {

  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  const [createTaskOpen, setCreateTaskOpen] = useState(false);
  const [createPhaseOpen, setCreatePhaseOpen] = useState(false);

  const [selectedTask, setSelectedTask] = useState<any>(null);

  const phases = [
    {
      id: 1,
      name: "Requirements Gathering",
      description: "Collect all business requirements.",
      status: "Completed" as const,
      dueDate: "2026-08-01",
      progress: 100,
      completedTasks: 6,
      totalTasks: 6,
    },
    {
      id: 2,
      name: "Development",
      description: "Backend and Frontend implementation.",
      status: "In Progress" as const,
      dueDate: "2026-09-10",
      progress: 65,
      completedTasks: 8,
      totalTasks: 12,
    },
  ];

  const tasks = [
    {
      id: 1,
      title: "Design Database",
      description: "Create database schema.",
      assignedTo: "Hillary Chelimo",
      priority: "High" as const,
      status: "In Progress" as const,
      dueDate: "2026-08-15",
    },
    {
      id: 2,
      title: "Develop API",
      description: "Create REST APIs.",
      assignedTo: "John Kamau",
      priority: "Medium" as const,
      status: "Not Started" as const,
      dueDate: "2026-08-25",
    },
  ];

  const members = [
    {
      id: 1,
      name: "Hillary Chelimo",
      role: "Project Manager",
      department: "ICT",
      email: "hillary@company.com",
      phone: "+254700000000",
      assignedTasks: 8,
      completedTasks: 5,
      workload: 70,
      status: "Busy" as const,
    },
    {
      id: 2,
      name: "John Kamau",
      role: "Backend Developer",
      department: "ICT",
      email: "john@company.com",
      phone: "+254711111111",
      assignedTasks: 5,
      completedTasks: 3,
      workload: 45,
      status: "Available" as const,
    },
  ];

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-wrap items-center justify-between gap-4">

        <div>

          <button className="mb-4 flex items-center gap-2 text-slate-600 hover:text-indigo-600">
            <ArrowLeft size={18} />
            Back to Projects
          </button>

          <div className="flex items-center gap-3">

            <FolderKanban
              size={34}
              className="text-indigo-600"
            />

            <div>

              <h1 className="text-4xl font-bold text-slate-800">
                Digital Leave Management System
              </h1>

              <p className="text-slate-500">
                Created from the approved innovation idea.
              </p>

            </div>

          </div>

        </div>

        <div className="flex gap-3">

          <button
            onClick={() => setCreatePhaseOpen(true)}
            className="rounded-xl border border-slate-300 px-5 py-3 hover:bg-slate-100"
          >
            + Phase
          </button>

          <button
            onClick={() => setCreateTaskOpen(true)}
            className="rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white hover:bg-indigo-700"
          >
            <Plus className="mr-2 inline" size={18} />
            Task
          </button>

        </div>

      </div>

      {/* Progress */}

      <ProjectProgress
        progress={68}
        completedTasks={17}
        totalTasks={25}
        completedPhases={3}
        totalPhases={5}
      />

      {/* Phases */}

      <section className="space-y-6">

        <h2 className="text-2xl font-bold">
          Implementation Phases
        </h2>

        <div className="grid gap-6">
          {phases.map((phase) => (
            <PhaseCard
              key={phase.id}
              phase={phase}
            />
          ))}
        </div>

      </section>

      {/* Tasks */}

      <section className="space-y-6">

        <h2 className="text-2xl font-bold">
          Project Tasks
        </h2>

        <div className="space-y-5">

          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={() => {
                setSelectedTask(task);
                setTaskDialogOpen(true);
              }}
            />
          ))}

        </div>

      </section>

      {/* Team */}

      <TeamMembers members={members} />

      {/* Dialogs */}

      <TaskDialog
        open={taskDialogOpen}
        task={selectedTask}
        onClose={() => setTaskDialogOpen(false)}
        onSave={(task) => {
          console.log(task);
          setTaskDialogOpen(false);
        }}
      />

      <CreateTaskDialog
        open={createTaskOpen}
        onClose={() => setCreateTaskOpen(false)}
        onCreate={(task) => {
          console.log(task);
        }}
      />

      <CreatePhaseDialog
        open={createPhaseOpen}
        onClose={() => setCreatePhaseOpen(false)}
        onCreate={(phase) => {
          console.log(phase);
        }}
      />

    </div>
  );
}