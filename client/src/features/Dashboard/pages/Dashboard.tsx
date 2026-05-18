import { Button } from "@/components/ui/button";
import RecentApplications from "../components/RecentApplications";
import StatsCard from "../components/StatsCard";
import { LuCirclePlus } from "react-icons/lu";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <main className="flex-1 p-8 bg-dark-900 min-h-screen">

     
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
        <Button className="bg-brand-purple text-white dark:text-text-primary"><LuCirclePlus /> Add New Job</Button>
        </Link>
      </div>

      <StatsCard />

    <div className="grid grid-cols-3 gap-4">
      <RecentApplications/>
    </div>
    </main>
  );  
};

export default Dashboard;