import { SigninForm } from "@/app/components/forms/LoginForm";

export default function Signin() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f9fc] text-slate-950">
      <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative hidden min-h-screen overflow-hidden bg-slate-950 px-10 py-12 text-white lg:flex lg:flex-col lg:justify-between">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(20,184,166,0.28),transparent_36%),radial-gradient(circle_at_72%_28%,rgba(248,113,113,0.22),transparent_26%),linear-gradient(180deg,rgba(15,23,42,0)_0%,rgba(15,23,42,0.95)_100%)]" />
          <div className="absolute inset-x-10 top-1/2 h-px bg-white/10" />
          <div className="absolute bottom-28 left-10 right-10 grid grid-cols-3 gap-3 opacity-70">
            <div className="h-28 rounded-lg border border-white/10 bg-white/10" />
            <div className="h-28 rounded-lg border border-white/10 bg-white/5" />
            <div className="h-28 rounded-lg border border-white/10 bg-teal-400/20" />
          </div>
          

          <div className="relative z-10 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-base font-black text-slate-950">
              SI
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal-200">
                Staff Innovation
              </p>
              <p className="text-sm text-white/60">Ideas to implementation</p>
            </div>
          </div>

          <div className="relative z-10 max-w-xl pb-8">
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.18em] text-teal-200">
              Team workspace
            </p>
            <h1 className="text-5xl font-semibold leading-[1.05]">
              Turn everyday staff ideas into visible progress.
            </h1>
            <p className="mt-6 max-w-lg text-base leading-7 text-white/70">
              Review proposals, track projects, and keep teams aligned from one
              calm dashboard.
            </p>
          </div>
        </section>

        <section className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-12">
          <SigninForm />
        </section>
      </div>
    </main>
  );
}
