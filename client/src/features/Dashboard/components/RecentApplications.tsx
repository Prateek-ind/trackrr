import { Button } from "@/components/ui/button";
import StatusPill from "./StatusPill";
import { useNavigate } from "react-router-dom";
import { statusStyles } from "@/types/status.types";
import { useSelector } from "react-redux";
import { type Job } from "@/store/jobs.slice";
import type { RootState } from "@/store/store";

const RecentApplications = () => {
  const { jobs, loading, error } = useSelector(
    (state: RootState) => state.jobs,
  );
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="w-full col-span-2 border rounded-md shadow-md bg-white dark:bg-dark-800">
      <div className="border-b bg-dark-700 border-dark-border flex items-center justify-between p-4">
        <div className="">
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
        jobs.map((job: Job) => (
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
            <StatusPill value={job.status} variants={statusStyles} />
            <p>{job.action}</p>
          </div>
        ))
      )}
    </section>
  );
};

export default RecentApplications;
