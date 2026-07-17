import Sidebar from "../components/layout/Sidebar";
import TopNavbar from "../components/layout/TopNavbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex bg-gray-100">

      <Sidebar />

      <div className="flex-1 flex flex-col">

        <TopNavbar />

        <main className="p-8">
          {children}
        </main>

      </div>

    </div>
  );
}