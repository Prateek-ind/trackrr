import { Outlet } from "react-router-dom";
import DashboardTopbar from "../features/Dashboard/components/DashboardTopbar";
import Sidebar from "../features/Dashboard/components/Sidebar";
import Footer from "@/features/Dashboard/components/Footer";

const DashboardLayout = () => {
  return (
    <main className="flex w-full min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 bg-white dark:bg-dark-900">
        <DashboardTopbar />
        <Outlet />
        <Footer/>
      </div>
    </main>
  );
};

export default DashboardLayout;
