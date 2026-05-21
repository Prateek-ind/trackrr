import { getJobs } from "@/api/job";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import StatusPill from "./StatusPill";
import { useNavigate } from "react-router-dom";

interface Job {
  _id: string;
  role: string;
  company: string;
  status: string;
  appliedAt: Date;
  action: string;
}

const RecentApplications = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getJobsData = async () => {
      try {
        const data = await getJobs();
        setJobs(data.jobs);
      } catch (err: any) {
        setError( err.message || "Failed to load jobs");
      } finally {
        setLoading(false);
      }
    };

    getJobsData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="w-full col-span-2 border rounded-md shadow-md">
      <div className="border-b border-dark-border flex items-center justify-between p-4">
        <div>
          <h2 className="text-2xl font-bold text-text-primary">
            Recent Applications
          </h2>
          <p className="text-sm font-semibold text-text-muted">
            Keep track of your latest submissions.
          </p>
        </div>
        <Button
          variant={"outline"}
          onClick={() => navigate("/dashboard/applications")}
        >
          View All
        </Button>
      </div>

      <div className="grid grid-cols-6 gap-4 items-center text-center text-sm font-semibold text-text-secondary border-b bg-slate-50 dark:bg-dark-800 py-4">
        <p className="col-span-2">Company & Role</p>
        <p>Applied at</p>
        <p>Status</p>
        <p className="col-span-2">Actions</p>
      </div>

      {jobs.length === 0 ? (
        <p className="p-4 text-text-secondary">No applications yet.</p>
      ) : (
        jobs.map((job) => (
          <div
            key={job._id}
            className="p-4 border-b border-dark-border grid grid-cols-6 gap-4 text-center text-sm"
          >
            <div className="col-span-2">
              <p className="font-semibold">{job.role}</p>
              <p className="font-medium text-text-secondary">{job.company}</p>
            </div>
            <p className="font-medium text-text-secondary">
              {new Date(job.appliedAt).toDateString()}
            </p>
            <StatusPill status={job.status} />
            <p>{job.action}</p>
          </div>
        ))
      )}
    </section>
  );
};

export default RecentApplications;
