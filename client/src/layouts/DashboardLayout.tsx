import { Outlet } from "react-router-dom";
import DashboardTopbar from "../features/Dashboard/components/DashboardTopbar";
import Sidebar from "../features/Dashboard/components/Sidebar";

const DashboardLayout = () => {
  return (
    <main className="flex w-full min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 bg-dark-900">
        <DashboardTopbar />
        <Outlet />
      </div>
    </main>
  );
};

export default DashboardLayout;
