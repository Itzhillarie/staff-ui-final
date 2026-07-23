import Sidebar from "../components/layout/Sidebar";
import TopNavbar from "../components/layout/TopNavbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-72 flex min-h-screen flex-col">

        {/* Top Navigation */}
        <TopNavbar />

        {/* Page Content */}
        <main className="flex-1 p-8 overflow-auto">
          {children}
        </main>

      </div>

    </div>
  );
}