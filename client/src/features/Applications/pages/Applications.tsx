import { getJobs } from "@/api/job";
import { Button } from "@/components/ui/button";
import StatusPill from "@/features/Dashboard/components/StatusPill";
import Search from "@/features/shared/components/Search";
import { MapPin } from "lucide-react";
import { useEffect, useState, type ChangeEvent } from "react";
import { LuCirclePlus } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";

interface Job {
  _id: string;
  role: string;
  company: string;
  location: string;
  status: string;
  appliedAt: Date;
}

const Applications = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate()

  useEffect(() => {
    const getJobsData = async () => {
      try {
        const data = await getJobs();
        setJobs(data.jobs);
      } catch (err: any) {
        setError(err.message || "Failed to load jobs");
      } finally {
        setLoading(false);
      }
    };

    getJobsData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const onSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  return (
    <section className="w-full flex-1 p-8 bg-white dark:bg-dark-900 min-h-screen">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Applications</h1>
          <p className="mt-1 text-sm text-text-muted">
            Manage and track your 42 active applications.
          </p>
        </div>
        <Link to={"/dashboard/add-job"}>
          <Button className="bg-brand-purple text-white dark:text-text-primary">
            <LuCirclePlus /> Add New Job
          </Button>
        </Link>
      </div>

      <div className="p-4 border border-dark-border rounded-md shadow-md mb-6">
        <Search searchInput={searchInput} onSearchInput={onSearchInput} />
        <div></div>
      </div>

      <div className=" border border-dark-border  rounded-md shadow-md mb-6">
        <div className="grid grid-cols-5 gap-4 p-4 border-b text-text-primary border-dark-border text-sm font-semibold">
          <p className="col-span-2 text-left">Company & Role</p>
          <p className="text-left">Location</p>
          <p className="text-left">Status</p>
          <p className="text-left">Applied Date</p>
        </div>

        {jobs.length === 0 ? (
          <p className="p-4 text-text-secondary">No applications yet.</p>
        ) : (
          jobs.map((job) => (
            <div
              key={job._id}
              onClick={()=>navigate(`/dashboard/applications/${job._id}`)}
              className="grid grid-cols-5 gap-4 px-4 py-6 border-b border-dark-border text-sm items-center"
            >
              <div className="col-span-2">
                <p className="font-semibold text-text-primary">{job.role}</p>
                <p className="font-medium text-text-secondary">{job.company}</p>
              </div>
              <div className="flex items-center gap-1">
                <MapPin size={20} className="text-text-secondary" />
                <p className="text-text-secondary">{job.location}</p>
              </div>
              <StatusPill status={job.status} />
              <p className="text-text-secondary">
                {new Date(job.appliedAt).toDateString()}
              </p>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Applications;
