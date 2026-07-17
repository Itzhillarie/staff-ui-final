export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">

      <div className="space-y-4 text-center">

        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent" />

        <p className="text-slate-500">
          Loading Settings...
        </p>

      </div>

    </div>
  );
}