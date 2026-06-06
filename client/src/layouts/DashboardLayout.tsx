import { Outlet } from "react-router-dom";
import DashboardTopbar from "../features/Dashboard/components/DashboardTopbar";
import Sidebar from "../features/Dashboard/components/Sidebar";
import Footer from "@/features/Dashboard/components/Footer";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import { useQuery } from "@tanstack/react-query";
import { getJobs } from "@/api/job";
import { useEffect } from "react";
import { computeStats, setJobs } from "@/store/jobs.slice";
import Loading from "@/features/shared/components/Loading";
import Error from "@/features/shared/components/Error";

const DashboardLayout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    data: jobs,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      const data = await getJobs();
      return data.jobs;
    },
  });

  useEffect(() => {
    if (jobs) {
      dispatch(setJobs(jobs));
      dispatch(computeStats());
      console.log(jobs);
    }
  }, [jobs, dispatch]);

    if (isLoading) return <Loading />;
  if (error)
    return (
     <Error message={error.message ?? "Something went wrong"} />
    );


  return (
    <main className="flex w-full min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 bg-white dark:bg-dark-900">
        <DashboardTopbar />
        <Outlet />
        <Footer />
      </div>
    </main>
  );
};

export default DashboardLayout;
