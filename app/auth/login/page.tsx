import { SigninForm } from "@/app/components/forms/LoginForm";
import Image from "next/image";

export default function Signin() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f9fc] text-cyan-950">
      <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative hidden min-h-screen overflow-hidden bg-cyan-950 px-10 py-12 text-white lg:flex lg:flex-col lg:justify-between">
          <Image
  src="/images/login-image.jpg"
  alt="Innovation Team"
  fill
  priority
   sizes="(max-width: 1024px) 100vw, 50vw"
  className="object-cover"
/>

{/* Dark overlay */}
<div className="absolute inset-0 bg-black/45" />

{/* Optional cyan gradient */}
<div className="absolute inset-0 bg-linear-to-br from-cyan-500/20 via-transparent to-slate-950/60" />
          

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
              Turn everyday ideas into visible progress.
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
