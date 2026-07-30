import Link from "next/link";
import type { CSSProperties } from "react";
import {
  Activity,
  ArrowRight,
  Binary,
  BrainCircuit,
  ChartNoAxesCombined,
  ChevronRight,
  DatabaseZap,
  FlaskConical,
  GitBranch,
  Network,
  Radar,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const metrics = [
  {
    label: "Enterprise Clients",
    value: "300+",
    delta: "across Africa",
  },
  {
    label: "Profiles Analyzed",
    value: "21M+",
    delta: "credit signals",
  },
  {
    label: "Identities Verified",
    value: "10M+",
    delta: "trusted checks",
  },
];

const pipeline = [
  {
    label: "Verify",
    icon: DatabaseZap,
  },
  {
    label: "Score",
    icon: GitBranch,
  },
  {
    label: "Detect",
    icon: BrainCircuit,
  },
  {
    label: "Decide",
    icon: Sparkles,
  },
];

const capabilities = [
  {
    title: "Credit Intelligence",
    body: "Turn alternative data, borrower behavior, and affordability signals into faster lending decisions.",
    icon: Radar,
  },
  {
    title: "Digital Verification",
    body: "Support KYC, KYB, CRB, fraud checks, and identity workflows with reliable operational visibility.",
    icon: ChartNoAxesCombined,
  },
  {
    title: "API-First Delivery",
    body: "Coordinate product, engineering, and operations around high-performance developer-ready services.",
    icon: FlaskConical,
  },
];

const streams = [
  "credit.assessments",
  "kyc.verifications",
  "fraud.signals",
  "crb.checks",
  "api.latency",
  "model.outcomes",
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#05121d] text-white">
      <section className="relative min-h-screen">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(34,211,238,0.18),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(59,130,246,0.18),transparent_30%),linear-gradient(135deg,#05121d_0%,#082033_46%,#07111d_100%)]" />
        <div className="home-grid-scan absolute inset-0 bg-[linear-gradient(rgba(125,211,252,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.055)_1px,transparent_1px)] bg-size-[40px_52px] mask-[linear-gradient(to_bottom,black,transparent_82%)]" />
        <div className="home-orb-drift absolute left-1/2 top-0 h-[4000px] w-[400] -translate-x-1/2 rounded-full border border-cyan-300/10 bg-cyan-300/5 blur-3xl" />

        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-6 sm:px-8 lg:px-10">
          <nav className="flex items-center justify-between">
            <Link href="/" className="home-brand-mark group flex items-center gap-3">
              <div className="home-icon-tile flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-300/30 bg-cyan-300/10 text-cyan-200 shadow-xl shadow-cyan-950/30">
                <span className="text-lg font-black tracking-tight transition-transform duration-300 group-hover:scale-110">
                  S
                </span>
              </div>
              <div>
                <p className="text-sm font-black uppercase tracking-[0.18em] text-white">
                  Spinmobile
                </p>
                <p className="text-xs font-medium text-cyan-100/55">
                  Credit intelligence workspace
                </p>
              </div>
            </Link>

            <div className="flex items-center gap-3">
              <Link
                href="/auth/login"
                className="home-hover-button rounded-xl border border-white/10 bg-white/7 px-4 py-2 text-sm font-semibold text-white/80 transition hover:bg-white/12 hover:text-white"
              >
                Sign in
              </Link>
              <Link
                href="/dashboard"
                className="home-hover-button home-hover-button-solid hidden rounded-xl bg-cyan-300 px-4 py-2 text-sm font-black text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-200 sm:inline-flex"
              >
                Launch workspace
              </Link>
            </div>
          </nav>

          <div className="grid flex-1 items-center gap-12 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:py-8">
            <div className="home-rise-in max-w-3xl">
              <div className="home-chip-pulse mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-sm font-bold text-cyan-100 shadow-sm">
                <Activity className="h-4 w-4" />
                AI credit intelligence, verification, and product operations
              </div>

              <h1 className="max-w-4xl text-5xl font-black leading-[0.98] tracking-tight text-white sm:text-6xl lg:text-7xl">
                Powering sharper credit decisions across Africa.
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                A Spinmobile workspace for aligning ideas, delivery, and
                analytics around credit decisioning, digital verification,
                fraud detection, and developer-first financial infrastructure.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/auth/login"
                  className="home-hover-button home-hover-button-solid inline-flex h-13 items-center justify-center gap-2 rounded-xl bg-cyan-300 px-6 text-sm font-black text-slate-950 shadow-2xl shadow-cyan-500/20 transition hover:bg-cyan-200"
                >
                  Enter workspace
                  <ArrowRight className="h-4 w-4 transition-transform duration-300" />
                </Link>
                <Link
                  href="/dashboard"
                  className="home-hover-button inline-flex h-13 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/7 px-6 text-sm font-bold text-white transition hover:bg-white/12"
                >
                  View dashboard
                  <ChevronRight className="h-4 w-4 transition-transform duration-300" />
                </Link>
              </div>

              <div className="mt-9 grid gap-3 sm:grid-cols-3">
                {metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="home-metric-card rounded-2xl border border-white/10 bg-white/7 p-4 shadow-sm backdrop-blur"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-cyan-100/50">
                      {metric.label}
                    </p>
                    <p className="mt-3 text-2xl font-black text-white">
                      {metric.value}
                    </p>
                    <p className="mt-1 text-sm font-bold text-cyan-200">
                      {metric.delta}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="home-rise-in home-rise-delay relative perspective-distant">
              <div className="absolute -inset-8 rounded-[2rem] bg-cyan-400/10 blur-3xl" />
              <div className="home-console-float relative transform-[rotateX(8deg)_rotateY(-10deg)]">
                <div className="home-console-shell overflow-hidden rounded-[2rem] border border-cyan-200/15 bg-slate-950/70 p-4 shadow-2xl shadow-cyan-950/40 backdrop-blur-xl">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.18em] text-cyan-200">
                        Spinmobile Intelligence
                      </p>
                      <h2 className="mt-1 text-2xl font-black text-white">
                        Credit signal graph
                      </h2>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1.5 text-xs font-bold text-emerald-200">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      privacy-aware
                    </div>
                  </div>

                  <div className="grid gap-4 pt-4 lg:grid-cols-[1.08fr_0.92fr]">
                    <div className="home-graph-panel relative min-h-105 overflow-hidden rounded-2xl border border-white/10 bg-[#081525] p-5">
                      <div className="home-graph-field absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(34,211,238,0.18),transparent_34%),linear-gradient(rgba(125,211,252,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(125,211,252,0.06)_1px,transparent_1px)] " />
                      <div className="relative flex h-full min-h-95 items-center justify-center">
                        <div className="home-orbit-ring absolute h-72 w-72 rounded-full border border-cyan-200/20" />
                        <div className="home-orbit-ring home-orbit-ring-reverse absolute h-52 w-52 rounded-full border border-indigo-300/20" />
                        <div className="home-orbit-ring absolute h-32 w-32 rounded-full border border-emerald-300/20" />

                        <div className="home-core-node relative grid h-28 w-28 place-items-center rounded-3xl border border-cyan-200/30 bg-cyan-300/15 shadow-2xl shadow-cyan-500/20 transform-[rotateX(58deg)_rotateZ(45deg)]">
                          <Network className="h-10 w-10 -rotate-45 text-cyan-100" />
                        </div>

                        {pipeline.map((step, index) => {
                          const Icon = step.icon;
                          const positions = [
                            "left-4 top-8",
                            "right-8 top-20",
                            "left-12 bottom-16",
                            "right-12 bottom-8",
                          ];

                          return (
                            <div
                              key={step.label}
                              className={`home-pipeline-node absolute ${positions[index]} rounded-2xl border border-white/10 bg-white/10 p-3 shadow-lg backdrop-blur`}
                              style={{
                                animationDelay: `${index * 220}ms`,
                              }}
                            >
                              <Icon className="h-5 w-5 text-cyan-200" />
                              <p className="mt-2 text-xs font-black uppercase tracking-[0.12em] text-white">
                                {step.label}
                              </p>
                            </div>
                          );
                        })}

                        <div className="home-flow-line absolute left-1/2 top-1/2 h-px w-64 -translate-x-1/2 -translate-y-1/2 rotate-24 bg-linear-to-r from-transparent via-cyan-200/55 to-transparent" />
                        <div className="home-flow-line home-flow-line-alt absolute left-1/2 top-1/2 h-px w-60 -translate-x-1/2 -translate-y-1/2 rotate-[-34deg] bg-linear-to-r from-transparent via-indigo-200/55 to-transparent" />
                        <div className="absolute bottom-5 left-5 right-5 flex items-end gap-2">
                          {[38, 68, 52, 90, 76, 112, 84, 124, 96, 138].map(
                            (height, index) => (
                              <div
                                key={`${height}-${index}`}
                                className="home-data-bar flex-1 rounded-t-lg bg-linear-to-t from-cyan-500/20 to-cyan-200"
                                style={{
                                  "--bar-height": `${height}px`,
                                  animationDelay: `${index * 90}ms`,
                                } as CSSProperties}
                              />
                            )
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-4">
                      <div className="rounded-2xl border border-white/10 bg-white/7 p-5">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-100/55">
                            Live Stream
                          </p>
                          <Binary className="h-5 w-5 text-cyan-200" />
                        </div>
                        <div className="mt-4 space-y-2">
                          {streams.map((stream) => (
                            <div
                              key={stream}
                              className="home-stream-row flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/50 px-3 py-2"
                            >
                              <span className="text-sm font-semibold text-slate-200">
                                {stream}
                              </span>
                              <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-lg shadow-emerald-300/40" />
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="home-prediction-card rounded-2xl border border-cyan-200/15 bg-cyan-300/10 p-5">
                        <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-100/60">
                          Decision Layer
                        </p>
                        <p className="mt-3 text-4xl font-black text-white">
                          750
                        </p>
                        <p className="mt-2 text-sm leading-6 text-cyan-50/70">
                          sample credit score synthesized from affordability,
                          behavior, risk profile, and verification outcomes.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 pb-8 lg:grid-cols-3">
            {capabilities.map((capability) => {
              const Icon = capability.icon;

              return (
                <article
                  key={capability.title}
                  className="home-capability-card rounded-2xl border border-white/10 bg-white/7 p-5 backdrop-blur"
                >
                  <Icon className="h-6 w-6 text-cyan-200" />
                  <h3 className="mt-4 text-lg font-black text-white">
                    {capability.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {capability.body}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
