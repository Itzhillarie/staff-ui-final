"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Bell,
  Building2,
  Check,
  ClipboardList,
  KeyRound,
  LockKeyhole,
  Save,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";
import { toast } from "sonner";

const roles = [
  "Employee",
  "Peer Reviewer",
  "Product Manager",
  "Administrator",
] as const;

const permissions = [
  {
    key: "submitIdeas",
    label: "Submit ideas",
    description: "Create draft ideas and submit them for review.",
    enabledFor: ["Employee", "Peer Reviewer", "Product Manager", "Administrator"],
  },
  {
    key: "peerReview",
    label: "Peer review",
    description: "Like, dislike, and comment on submitted ideas.",
    enabledFor: ["Peer Reviewer", "Product Manager", "Administrator"],
  },
  {
    key: "pmReview",
    label: "Product manager review",
    description: "Set priority, due dates, approval status, and recommendations.",
    enabledFor: ["Product Manager", "Administrator"],
  },
  {
    key: "manageProjects",
    label: "Manage implementation",
    description: "Create phases, assign tasks, and update project progress.",
    enabledFor: ["Product Manager", "Administrator"],
  },
  {
    key: "adminSettings",
    label: "Manage settings",
    description: "Configure access, organization, and notification defaults.",
    enabledFor: ["Administrator"],
  },
];

const settingsDefaults = {
  peerReviewLikeThreshold: 5,
  requirePmReviewComment: true,
  allowSelfReview: false,
  autoCreateProjectOnApproval: true,
  autoCalculateProjectProgress: true,
  autoAwardBadges: true,
  restrictDeleteToAdmins: true,
  notifyOnStatusChange: true,
};

type ToggleKey = Exclude<
  keyof typeof settingsDefaults,
  "peerReviewLikeThreshold"
>;

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("permissions");
  const [settings, setSettings] = useState(settingsDefaults);

  const enabledCount = useMemo(
    () =>
      Object.entries(settings).filter(
        ([key, value]) =>
          key !== "peerReviewLikeThreshold" && value === true
      ).length,
    [settings]
  );

  function toggleSetting(key: ToggleKey) {
    setSettings((current) => ({
      ...current,
      [key]: !current[key],
    }));
  }

  function updateThreshold(value: string) {
    const nextValue = Number(value);

    setSettings((current) => ({
      ...current,
      peerReviewLikeThreshold: Number.isFinite(nextValue)
        ? Math.max(1, nextValue)
        : current.peerReviewLikeThreshold,
    }));
  }

  function handleSave() {
    toast.success("Settings saved locally.");
  }

  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-cyan-800 p-8 text-white shadow-xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-5">
            <div className="rounded-2xl bg-white/10 p-4">
              <Settings className="h-9 w-9 text-teal-400" />
            </div>

            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-white-600">
                Admin configuration
              </p>
              <h1 className="mt-2 text-4xl font-semibold">Settings</h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-white/70">
                Manage access, permissions, workflow thresholds, notifications,
                and organization defaults.
              </p>
            </div>
          </div>

          <button
            onClick={handleSave}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-teal-50"
          >
            <Save className="h-4 w-4" />
            Save Changes
          </button>
        </div>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          icon={ShieldCheck}
          label="Permission Groups"
          value={roles.length.toString()}
          tone="text-teal-700 bg-cyan-500"
        />
        <SummaryCard
          icon={SlidersHorizontal}
          label="Review Threshold"
          value={`${settings.peerReviewLikeThreshold} likes`}
          tone="text-indigo-700 bg-cyan-500"
        />
        <SummaryCard
          icon={KeyRound}
          label="Enabled Policies"
          value={`${enabledCount}/7`}
          tone="text-cyan-700 bg-cyan-50"
        />
        <SummaryCard
          icon={ClipboardList}
          label="Audit Route"
          value="Active"
          tone="text-cyan-700 bg-cyan-50"
        />
      </section>

      <div className="grid gap-8 xl:grid-cols-[280px_1fr]">
        <aside className="h-fit rounded-2xl border border-cyan-200 bg-white p-3 shadow-sm">
          <SettingsNavButton
            active={activeSection === "permissions"}
            icon={ShieldCheck}
            label="Permissions"
            onClick={() => setActiveSection("permissions")}
          />
          <SettingsNavButton
            active={activeSection === "workflow"}
            icon={SlidersHorizontal}
            label="Workflow Config"
            onClick={() => setActiveSection("workflow")}
          />
          <SettingsNavButton
            active={activeSection === "access"}
            icon={LockKeyhole}
            label="Access Control"
            onClick={() => setActiveSection("access")}
          />
          <SettingsNavButton
            active={activeSection === "organization"}
            icon={Building2}
            label="Organization"
            onClick={() => setActiveSection("organization")}
          />
          <SettingsNavButton
            active={activeSection === "notifications"}
            icon={Bell}
            label="Notifications"
            onClick={() => setActiveSection("notifications")}
          />
        </aside>

        <main>
          {activeSection === "permissions" && <PermissionsPanel />}
          {activeSection === "workflow" && (
            <WorkflowPanel
              settings={settings}
              onThresholdChange={updateThreshold}
              onToggle={toggleSetting}
            />
          )}
          {activeSection === "access" && <AccessPanel />}
          {activeSection === "organization" && <OrganizationPanel />}
          {activeSection === "notifications" && <NotificationsPanel />}
        </main>
      </div>
    </div>
  );
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  tone: string;
}) {
  return (
    <div className="rounded-2xl border border-cyan-200 bg-white p-5 shadow-sm">
      <div className={`mb-5 inline-flex rounded-xl p-3 ${tone}`}>
        <Icon className="h-5 w-5" />
      </div>
      <p className="text-sm text-cyan-500">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-cyan-950">{value}</p>
    </div>
  );
}

function SettingsNavButton({
  active,
  icon: Icon,
  label,
  onClick,
}: {
  active: boolean;
  icon: React.ElementType;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
        active
          ? "bg-cyan-950 text-white"
          : "text-slate-600 hover:bg-cyan-100 hover:text-slate-500"
      }`}
    >
      <Icon className="h-5 w-5" />
      {label}
    </button>
  );
}

function PermissionsPanel() {
  return (
    <section className="rounded-2xl border border-cyan-200 bg-white shadow-sm">
      <PanelHeader
        title="Permissions"
        description="Control which roles can access each capability."
      />

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-cyan-50">
            <tr>
              <th className="w-[320px] px-6 py-4 text-left text-sm font-semibold text-cyan-600">
                Capability
              </th>
              {roles.map((role) => (
                <th
                  key={role}
                  className="px-6 py-4 text-center text-sm font-semibold text-cyan-600"
                >
                  {role}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {permissions.map((permission) => (
              <tr key={permission.key} className="border-t border-slate-100">
                <td className="px-6 py-5">
                  <p className="font-semibold text-cyan-900">
                    {permission.label}
                  </p>
                  <p className="mt-1 text-sm text-cyan-500">
                    {permission.description}
                  </p>
                </td>
                {roles.map((role) => {
                  const enabled = permission.enabledFor.includes(role);

                  return (
                    <td key={role} className="px-6 py-5 text-center">
                      <span
                        className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${
                          enabled
                            ? "bg-cyan-100 text-teal-700"
                            : "bg-cyan-100 text-slate-300"
                        }`}
                      >
                        {enabled && <Check className="h-4 w-4" />}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function WorkflowPanel({
  settings,
  onThresholdChange,
  onToggle,
}: {
  settings: typeof settingsDefaults;
  onThresholdChange: (value: string) => void;
  onToggle: (key: ToggleKey) => void;
}) {
  const items: Array<{
    key: ToggleKey;
    title: string;
    description: string;
  }> = [
    {
      key: "requirePmReviewComment",
      title: "Require PM review comment",
      description: "Product managers must add review comments before decisions.",
    },
    {
      key: "allowSelfReview",
      title: "Allow self review",
      description: "Idea creators can participate in review of their own ideas.",
    },
    {
      key: "autoCreateProjectOnApproval",
      title: "Auto-create project on approval",
      description: "Approved ideas automatically create linked implementation projects.",
    },
    {
      key: "autoCalculateProjectProgress",
      title: "Auto-calculate project progress",
      description: "Use phase and task completion to calculate progress.",
    },
    {
      key: "autoAwardBadges",
      title: "Auto-award badges",
      description: "Award badges automatically as point thresholds are crossed.",
    },
    {
      key: "restrictDeleteToAdmins",
      title: "Restrict deletes to admins",
      description: "Only administrators can permanently delete records.",
    },
    {
      key: "notifyOnStatusChange",
      title: "Notify on status change",
      description: "Send notifications when ideas or projects move stages.",
    },
  ];

  return (
    <section className="rounded-2xl border border-cyan-200 bg-white shadow-sm">
      <PanelHeader
        title="Workflow Config"
        description="Set system thresholds and automation behavior."
      />

      <div className="border-b border-cyan-100 p-6">
        <label
          htmlFor="peerReviewLikeThreshold"
          className="text-sm font-semibold text-cyan-900"
        >
          Peer review promotion threshold
        </label>
        <p className="mt-1 text-sm text-slate-500">
          Number of likes required to move an idea to Product Manager Review.
        </p>
        <div className="mt-4 flex max-w-xs items-center gap-3">
          <input
            id="peerReviewLikeThreshold"
            type="number"
            min={1}
            value={settings.peerReviewLikeThreshold}
            onChange={(event) => onThresholdChange(event.target.value)}
            className="h-11 w-24 rounded-xl border border-slate-300 px-3 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-cyan-500/10"
          />
          <span className="text-sm text-slate-500">likes</span>
        </div>
      </div>

      <div className="divide-y divide-cyan-100">
        {items.map((item) => (
          <PolicyRow
            key={item.key}
            title={item.title}
            description={item.description}
            enabled={settings[item.key]}
            onToggle={() => onToggle(item.key)}
          />
        ))}
      </div>
    </section>
  );
}

function AccessPanel() {
  return (
    <ConfigPanel
      icon={LockKeyhole}
      title="Access Control"
      description="Session, password, and administrator guardrails."
      rows={[
        ["Session timeout", "60 minutes"],
        ["Password policy", "Minimum 8 characters"],
        ["Role changes", "Administrator approval required"],
        ["Audit logging", "Enabled"],
      ]}
    />
  );
}

function OrganizationPanel() {
  return (
    <ConfigPanel
      icon={Building2}
      title="Organization"
      description="Workspace defaults used across modules."
      rows={[
        ["Default department", "General"],
        ["Timezone", "Africa/Nairobi"],
        ["Review SLA", "7 days"],
        ["Implementation SLA", "14 days"],
      ]}
    />
  );
}

function NotificationsPanel() {
  return (
    <ConfigPanel
      icon={Bell}
      title="Notifications"
      description="Defaults for in-app and email updates."
      rows={[
        ["Idea status updates", "Enabled"],
        ["Review reminders", "Weekly"],
        ["Project task alerts", "Enabled"],
        ["Digest email", "Friday morning"],
      ]}
    />
  );
}

function ConfigPanel({
  icon: Icon,
  title,
  description,
  rows,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  rows: Array<[string, string]>;
}) {
  return (
    <section className="rounded-2xl border border-cyan-200 bg-white shadow-sm">
      <PanelHeader title={title} description={description} icon={Icon} />
      <div className="grid gap-4 p-6 md:grid-cols-2">
        {rows.map(([label, value]) => (
          <div
            key={label}
            className="rounded-xl border border-cyan-200 bg-slate-50 p-5"
          >
            <p className="text-sm text-slate-500">{label}</p>
            <p className="mt-2 font-semibold text-slate-950">{value}</p>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-100 p-6">
        <Link
          href="/dashboard/settings/audit-logs"
          className="inline-flex items-center gap-2 rounded-xl border border-cyan-500 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          <ClipboardList className="h-4 w-4" />
          View audit logs
        </Link>
      </div>
    </section>
  );
}

function PolicyRow({
  title,
  description,
  enabled,
  onToggle,
}: {
  title: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h3 className="font-semibold text-slate-900">{title}</h3>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>
      <button
        onClick={onToggle}
        className={`relative h-7 w-12 rounded-full transition ${
          enabled ? "bg-cyan-600" : "bg-cyan-300"
        }`}
        aria-label={title}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
            enabled ? "left-6" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

function PanelHeader({
  title,
  description,
  icon: Icon,
}: {
  title: string;
  description: string;
  icon?: React.ElementType;
}) {
  return (
    <div className="border-b border-slate-200 p-6">
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="rounded-xl bg-cyan-100 p-3 text-slate-700">
            <Icon className="h-5 w-5" />
          </div>
        )}
        <div>
          <h2 className="text-2xl font-semibold text-slate-950">{title}</h2>
          <p className="mt-1 text-sm text-slate-500">{description}</p>
        </div>
      </div>
    </div>
  );
}
