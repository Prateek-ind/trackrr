import { Outlet } from "react-router-dom";
import DashboardNavbar from "../features/shared/components/DashboardNavbar";


const DashboardLayout = () => {
  return (
    <main className="w-full max-h-screen bg-slate-50">
      <DashboardNavbar/>
      <Outlet />
    </main>
  );
};

export default DashboardLayout;
