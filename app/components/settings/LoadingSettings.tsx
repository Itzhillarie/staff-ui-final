"use client";

export default function LoadingSettings() {
  return (
    <div className="space-y-6 animate-pulse">

      {/* Header */}

      <div className="rounded-3xl bg-white p-8 shadow-sm">

        <div className="h-8 w-64 rounded bg-slate-200" />

        <div className="mt-4 h-4 w-96 rounded bg-slate-100" />

      </div>

      {/* Main Layout */}

      <div className="grid gap-6 lg:grid-cols-12">

        {/* Sidebar */}

        <div className="lg:col-span-3">

          <div className="rounded-3xl bg-white p-6 shadow-sm">

            <div className="mb-6 h-6 w-32 rounded bg-slate-200" />

            <div className="space-y-3">

              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="h-12 rounded-xl bg-slate-100"
                />
              ))}

            </div>

          </div>

        </div>

        {/* Content */}

        <div className="lg:col-span-9">

          <div className="rounded-3xl bg-white shadow-sm">

            {/* Card Header */}

            <div className="border-b border-slate-100 p-6">

              <div className="h-7 w-52 rounded bg-slate-200" />

              <div className="mt-3 h-4 w-72 rounded bg-slate-100" />

            </div>

            {/* Form */}

            <div className="space-y-6 p-8">

              {[1, 2, 3, 4, 5].map((field) => (
                <div key={field}>

                  <div className="mb-2 h-4 w-32 rounded bg-slate-200" />

                  <div className="h-12 rounded-xl bg-slate-100" />

                </div>
              ))}

              <div className="h-32 rounded-xl bg-slate-100" />

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}