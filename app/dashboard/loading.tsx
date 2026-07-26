import SpinmobileLoader from "@/app/components/common/SpinmobileLoader";

export default function Loading() {
  return (
    <div className="grid min-h-[calc(100vh-5rem)] place-items-center">
      <SpinmobileLoader label="Loading dashboard" />
    </div>
  );
}
