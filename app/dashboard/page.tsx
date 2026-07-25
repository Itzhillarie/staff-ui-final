import { getDashboardData } from "@/app/lib/dashboard";

import DashboardClient from "@/app/components/dashboard/DashboardClient";


export default async function Dashboard() {

  const dashboard = await getDashboardData();


  return (
    <DashboardClient
      dashboard={dashboard}
    />
  );
}