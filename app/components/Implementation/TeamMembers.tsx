"use client";

import {
  Mail,
  Phone,
  UserCircle2,
  Briefcase,
  CheckCircle2,
  Clock3,
} from "lucide-react";

interface Member {
  id: number;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  avatar?: string;
  assignedTasks: number;
  completedTasks: number;
  workload: number;
  status: "Available" | "Busy" | "On Leave";
}

interface TeamMembersProps {
  members: Member[];
}

export default function TeamMembers({
  members,
}: TeamMembersProps) {
  const statusColor = {
    Available: "bg-green-100 text-green-700",
    Busy: "bg-yellow-100 text-yellow-700",
    "On Leave": "bg-red-100 text-red-700",
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}

      <div className="border-b p-6">

        <h2 className="text-2xl font-bold text-slate-800">
          Project Team
        </h2>

        <p className="mt-2 text-slate-500">
          Members assigned to this implementation project.
        </p>

      </div>

      <div className="divide-y">

        {members.map((member) => (

          <div
            key={member.id}
            className="p-6 transition hover:bg-slate-50"
          >

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

              {/* Left */}

              <div className="flex items-center gap-5">

                {member.avatar ? (
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
                    <UserCircle2
                      size={42}
                      className="text-indigo-600"
                    />
                  </div>
                )}

                <div>

                  <h3 className="text-xl font-bold text-slate-800">
                    {member.name}
                  </h3>

                  <p className="mt-1 flex items-center gap-2 text-slate-500">
                    <Briefcase size={16} />
                    {member.role}
                  </p>

                  <p className="text-sm text-slate-500">
                    {member.department}
                  </p>

                </div>

              </div>

              {/* Right */}

              <span
                className={`rounded-full px-4 py-2 text-sm font-semibold ${statusColor[member.status]}`}
              >
                {member.status}
              </span>

            </div>

            {/* Contact */}

            <div className="mt-6 grid gap-6 md:grid-cols-2">

              <div className="flex items-center gap-3">

                <Mail
                  size={18}
                  className="text-blue-600"
                />

                <span className="text-slate-600">
                  {member.email}
                </span>

              </div>

              <div className="flex items-center gap-3">

                <Phone
                  size={18}
                  className="text-green-600"
                />

                <span className="text-slate-600">
                  {member.phone}
                </span>

              </div>

            </div>

            {/* Statistics */}

            <div className="mt-8 grid gap-5 md:grid-cols-3">

              <div className="rounded-xl bg-slate-50 p-4">

                <p className="text-sm text-slate-500">
                  Assigned Tasks
                </p>

                <h3 className="mt-2 text-2xl font-bold">
                  {member.assignedTasks}
                </h3>

              </div>

              <div className="rounded-xl bg-slate-50 p-4">

                <p className="text-sm text-slate-500">
                  Completed
                </p>

                <div className="mt-2 flex items-center gap-2">

                  <CheckCircle2
                    size={20}
                    className="text-green-600"
                  />

                  <span className="text-2xl font-bold">
                    {member.completedTasks}
                  </span>

                </div>

              </div>

              <div className="rounded-xl bg-slate-50 p-4">

                <div className="flex items-center gap-2">

                  <Clock3
                    size={18}
                    className="text-indigo-600"
                  />

                  <span className="text-sm text-slate-500">
                    Workload
                  </span>

                </div>

                <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200">

                  <div
                    className={`h-full rounded-full ${
                      member.workload > 80
                        ? "bg-red-500"
                        : member.workload > 50
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                    style={{
                      width: `${member.workload}%`,
                    }}
                  />

                </div>

                <p className="mt-3 text-lg font-bold">
                  {member.workload}%
                </p>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}