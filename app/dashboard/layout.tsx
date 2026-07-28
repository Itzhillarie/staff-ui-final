import Sidebar from "../components/layout/Sidebar";
import TopNavbar from "../components/layout/TopNavbar";
import { ensureActiveServerSession } from "../lib/session";
import { DashboardThemeProvider } from "../providers/DashboardThemeProvider";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await ensureActiveServerSession();

  return (
    <DashboardThemeProvider>
<div className="dashboard-themed min-h-screen bg-slate-100 text-slate-950 transition-colors dark:bg-slate-950 dark:text-slate-100">
        {/* Fixed Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="ml-72 flex min-h-screen flex-col">

          {/* Top Navigation */}
          <TopNavbar />

          {/* Page Content */}
          <main className="flex-1 overflow-auto p-8 transition-colors duration-300">
            {children}
          </main>

        </div>

      </div>
    </DashboardThemeProvider>
  );
}
