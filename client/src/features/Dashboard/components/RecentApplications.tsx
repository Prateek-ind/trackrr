import { Button } from "@/components/ui/button";
import StatusPill from "./StatusPill";
import { useNavigate } from "react-router-dom";
import { statusStyles } from "@/types/status.types";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import type { Job, JobStatus } from "@/types/job.types";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import Loading from "@/features/shared/components/Loading";
import Error from "@/features/shared/components/Error";
import { getJobs, updateJob } from "@/api/job";
import { computeStats, setJobs } from "@/store/jobs.slice";
import StatusChange from "./StatusChange";
import { LuLoaderCircle } from "react-icons/lu";
import { useState } from "react";

const RecentApplications = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { jobs, loading, error } = useSelector(
    (state: RootState) => state.jobs,
  );
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [pendingStatusId, setPendingStatusId] = useState<string | null>(null);

  const statusMutation = useMutation({
    mutationFn: ({ id, newStatus }: { id: string; newStatus: JobStatus }) => {
      setPendingStatusId(id);
      return updateJob(id, {
        ...jobs.find((j) => j._id === id)!,
        status: newStatus,
      });
    },

    onMutate: async ({
      id,
      newStatus,
    }: {
      id: string;
      newStatus: JobStatus;
    }) => {
      await queryClient.invalidateQueries({ queryKey: ["jobs"] });
      await queryClient.invalidateQueries({ queryKey: ["activity"] });

      const previous = queryClient.getQueryData(["jobs"]);

      dispatch(
        setJobs(
          jobs.map((j) =>
            j._id === id ? { ...j, status: newStatus as JobStatus } : j,
          ),
        ),
      );
      dispatch(computeStats());

      return { previous };
    },

    onError: ({ error, __, context }) => {
      if (context?.previous) {
        queryClient.setQueryData(["jobs"], context.previous);
        dispatch(setJobs(context?.previous ?? []));
        dispatch(computeStats());
      }
      if (error instanceof Error)
        console.error("Failed to create job: ", error);
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["jobs"] });
      await queryClient.invalidateQueries({ queryKey: ["activity"] });
      const data = await getJobs();
      dispatch(setJobs(data.jobs));
      dispatch(computeStats());
      setPendingStatusId(null);
    },
  });

  const handleStatusChange = ({
    id,
    newStatus,
  }: {
    id: string;
    newStatus: JobStatus;
  }) => {
    statusMutation.mutate({ id, newStatus });
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

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

      <div className="max-h-72 overflow-y-auto scrollbar-thumb-current">
        {jobs.length === 0 ? (
          <p className="p-4 text-text-secondary">No applications yet.</p>
        ) : (
          jobs.map((job: Job) => (
            <div
              key={job._id}
              className="py-4 border-b border-dark-border grid grid-cols-6 gap-4 text-center text-sm"
            >
              <div className="col-span-2">
                <p className="font-semibold">{job.role}</p>
                <p className="font-medium text-text-secondary">{job.company}</p>
              </div>
              <p className="font-medium text-text-secondary">
                {new Date(job.appliedAt).toDateString()}
              </p>
              <div className="mx-auto w-full flex items-center justify-center">
                {pendingStatusId === job._id ? (
                  <div className=" w-full h-6">
                    <LuLoaderCircle
                      size={16}
                      className="animate-spin text-brand-purple"
                    />
                  </div>
                ) : (
                  <StatusPill value={job.status} variants={statusStyles} />
                )}
              </div>
              <div
                className="col-span-2 flex items-center gap-2"
                onClick={(e) => e.stopPropagation()}
              >
                <StatusChange
                  loading={statusMutation.isPending}
                  value={job.status}
                  onChange={(newStatus: JobStatus) =>
                    handleStatusChange({ id: job._id, newStatus })
                  }
                />
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default RecentApplications;
