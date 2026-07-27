"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  FolderKanban,
  Plus,
  Loader2,
  Calendar,
  CheckCircle2,
  Circle,
} from "lucide-react";

import {
  getProject,
  createPhase,
  createTask,
  completeTask,
} from "@/app/lib/project";

import { toast } from "sonner";

interface Task {
  id: string;
  title: string;
  description: string;
  assigned_to: string;
  priority: string;
  due_date: string;
  completed: boolean;
}

interface Phase {
  id: string;
  phase_name: string;
  description: string;
  progress: number;
  tasks: Task[];
}

interface Project {
  id: string;
  project_name: string;
  description: string;
  progress: number;
  start_date: string;
  end_date: string | null;
  phases: Phase[];
}

export default function ProjectDetailsPage() {
  const { id } = useParams();

  const [project, setProject] = useState<Project | null>(null);

  const [loading, setLoading] = useState(true);

  const [showPhase, setShowPhase] = useState(false);

  const [phaseForm, setPhaseForm] = useState({
    phase_name: "",
    description: "",
  });

  const [taskForms, setTaskForms] = useState<
    Record<
      string,
      {
        show: boolean;
        title: string;
        description: string;
        assigned_to: string;
        priority: string;
        due_date: string;
      }
    >
  >({});

  async function loadProject() {
    try {
      setLoading(true);

      const data = (await getProject(id as string)) as Project;

      setProject(data);
    } catch (err) {
      console.error(err);
      toast.error("Unable to load project.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProject();
  }, []);

  async function savePhase() {
    try {
      await createPhase(id as string, phaseForm);

      toast.success("Phase created.");

      setShowPhase(false);

      setPhaseForm({
        phase_name: "",
        description: "",
      });

      loadProject();
    } catch {
      toast.error("Unable to create phase.");
    }
  }

  async function saveTask(phaseId: string) {
    const form = taskForms[phaseId];

    try {
      await createTask(phaseId, {
        title: form.title,
        description: form.description,
        assigned_to: form.assigned_to,
        priority: form.priority,
        due_date: form.due_date,
      });

      toast.success("Task created.");

      loadProject();
    } catch {
      toast.error("Unable to create task.");
    }
  }

  async function markComplete(taskId: string) {
    try {
      await completeTask(taskId);

      toast.success("Task completed.");

      loadProject();
    } catch {
      toast.error("Unable to update task.");
    }
  }

  if (loading)
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="animate-spin text-blue-600" />
      </div>
    );

  if (!project)
    return (
      <div className="text-center py-20">
        Project not found.
      </div>
    );

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="rounded-2xl bg-white border p-8 shadow-sm">

        <div className="flex items-center justify-between">

          <div>

            <h1 className="flex items-center gap-3 text-3xl font-bold">

              <FolderKanban className="text-blue-600" />

              {project.project_name}

            </h1>

            <p className="mt-3 text-slate-500">

              {project.description}

            </p>

          </div>

          <button
            onClick={() => setShowPhase(true)}
            className="rounded-xl bg-blue-600 px-5 py-3 text-white flex items-center gap-2"
          >
            <Plus size={18} />

            Add Phase

          </button>

        </div>

        <div className="mt-8">

          <div className="h-3 rounded-full bg-slate-200">

            <div
              className="h-3 rounded-full bg-blue-600"
              style={{
                width: `${project.progress}%`,
              }}
            />

          </div>

          <p className="mt-2 font-semibold">

            Overall Progress {project.progress}%

          </p>

        </div>

      </div>

      {/* Create Phase */}

      {showPhase && (

        <div className="rounded-2xl border bg-white p-6 shadow">

          <h2 className="text-xl font-semibold mb-5">

            New Phase

          </h2>

          <input
            className="w-full rounded-xl border p-3 mb-4"
            placeholder="Phase Name"
            value={phaseForm.phase_name}
            onChange={(e) =>
              setPhaseForm({
                ...phaseForm,
                phase_name: e.target.value,
              })
            }
          />

          <textarea
            rows={4}
            className="w-full rounded-xl border p-3"
            placeholder="Description"
            value={phaseForm.description}
            onChange={(e) =>
              setPhaseForm({
                ...phaseForm,
                description: e.target.value,
              })
            }
          />

          <div className="mt-5 flex gap-3">

            <button
              onClick={savePhase}
              className="rounded-xl bg-blue-600 px-5 py-3 text-white"
            >
              Save Phase
            </button>

            <button
              onClick={() => setShowPhase(false)}
              className="rounded-xl border px-5 py-3"
            >
              Cancel
            </button>

          </div>

        </div>

      )}

      {/* Phases */}

      {project.phases.map((phase) => (

        <div
          key={phase.id}
          className="rounded-2xl border bg-white shadow-sm"
        >

          <div className="border-b p-6 flex justify-between">

            <div>

              <h2 className="text-2xl font-bold">

                {phase.phase_name}

              </h2>

              <p className="text-slate-500">

                {phase.description}

              </p>

            </div>

            <button
              onClick={() =>
                setTaskForms({
                  ...taskForms,
                  [phase.id]: {
                    show: true,
                    title: "",
                    description: "",
                    assigned_to: "",
                    priority: "Medium",
                    due_date: "",
                  },
                })
              }
              className="rounded-lg bg-blue-600 px-4 py-2 text-white"
            >
              Add Task
            </button>

          </div>

          <div className="p-6">

            {taskForms[phase.id]?.show && (

              <div className="mb-8 rounded-xl border p-5">

                <input
                  className="w-full border rounded-xl p-3 mb-3"
                  placeholder="Task title"
                  onChange={(e) =>
                    setTaskForms({
                      ...taskForms,
                      [phase.id]: {
                        ...taskForms[phase.id],
                        title: e.target.value,
                      },
                    })
                  }
                />

                <textarea
                  rows={3}
                  className="w-full border rounded-xl p-3 mb-3"
                  placeholder="Description"
                  onChange={(e) =>
                    setTaskForms({
                      ...taskForms,
                      [phase.id]: {
                        ...taskForms[phase.id],
                        description: e.target.value,
                      },
                    })
                  }
                />

                <input
                  className="w-full border rounded-xl p-3 mb-3"
                  placeholder="Assigned User ID"
                  onChange={(e) =>
                    setTaskForms({
                      ...taskForms,
                      [phase.id]: {
                        ...taskForms[phase.id],
                        assigned_to: e.target.value,
                      },
                    })
                  }
                />

                <input
                  type="date"
                  className="w-full border rounded-xl p-3 mb-3"
                  onChange={(e) =>
                    setTaskForms({
                      ...taskForms,
                      [phase.id]: {
                        ...taskForms[phase.id],
                        due_date: e.target.value,
                      },
                    })
                  }
                />

                <select
                  className="w-full border rounded-xl p-3 mb-4"
                  onChange={(e) =>
                    setTaskForms({
                      ...taskForms,
                      [phase.id]: {
                        ...taskForms[phase.id],
                        priority: e.target.value,
                      },
                    })
                  }
                >
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>

                <button
                  onClick={() => saveTask(phase.id)}
                  className="rounded-xl bg-blue-600 px-5 py-3 text-white"
                >
                  Save Task
                </button>

              </div>

            )}

            <div className="space-y-4">

              {phase.tasks.map((task) => (

                <div
                  key={task.id}
                  className="rounded-xl border p-5 flex justify-between items-center"
                >

                  <div>

                    <h3 className="font-semibold">

                      {task.title}

                    </h3>

                    <p className="text-sm text-slate-500">

                      {task.description}

                    </p>

                    <div className="flex gap-5 mt-3 text-sm">

                      <span>

                        {task.priority}

                      </span>

                      <span className="flex gap-2">

                        <Calendar size={16} />

                        {task.due_date}

                      </span>

                    </div>

                  </div>

                  <button
                    onClick={() =>
                      markComplete(task.id)
                    }
                  >
                    {task.completed ? (
                      <CheckCircle2 className="text-green-600" />
                    ) : (
                      <Circle className="text-slate-400" />
                    )}
                  </button>

                </div>

              ))}

            </div>

          </div>

        </div>

      ))}

    </div>
  );
}