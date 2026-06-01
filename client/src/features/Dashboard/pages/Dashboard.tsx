import { Button } from "@/components/ui/button";
import RecentApplications from "../components/RecentApplications";
import StatsCard from "../components/StatsCard";
import { LuCirclePlus } from "react-icons/lu";
import { Link } from "react-router-dom";
import LiveActivity from "../components/LiveActivity";
import WeeklyBarChart from "../components/WeeklyBarChart";
import FunnelPieChart from "../components/FunnelPieChart";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { getJobs } from "@/api/job";
import { useEffect } from "react";
import { computeStats, setJobs } from "@/store/jobs.slice";
import Loading from "@/features/shared/components/Loading";
import type { AppDispatch } from "@/store/store";
import Error from "@/features/shared/components/Error";

const Dashboard = () => {
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
    <main className="flex-1 p-8 bg-white dark:bg-dark-900 min-h-screen">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">
            Welcome back, Prateek 👋
          </h1>
          <p className="mt-1 text-sm text-text-muted">
            Here's what's happening with your job search today.
          </p>
        </div>
        <Link to={"add-job"}>
          <Button className="bg-brand-purple text-white dark:text-text-primary">
            <LuCirclePlus /> Add New Job
          </Button>
        </Link>
      </div>

      <StatsCard />

      <div className="grid grid-cols-3 gap-4">
        <RecentApplications />
        <LiveActivity />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-6">
        <WeeklyBarChart />
        <FunnelPieChart />
      </div>
    </main>
  );
};

export default Dashboard;
