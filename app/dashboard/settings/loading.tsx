import LoadingSettings from "@/app/components/settings/LoadingSettings";

export default function Loading() {
  return (
    <div className="space-y-8">

      {/* Page Header */}

      <div className="rounded-3xl bg-white p-8 shadow-sm">

        <div className="mb-4 h-9 w-72 animate-pulse rounded-xl bg-slate-200" />

        <div className="h-5 w-96 animate-pulse rounded-xl bg-slate-100" />

      </div>

      {/* Settings Skeleton */}

      <LoadingSettings />

    </div>
  );
}