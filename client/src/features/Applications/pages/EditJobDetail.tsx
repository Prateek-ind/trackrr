import React, { useState, type ChangeEvent } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { getJobs, updateJob } from "@/api/job";
import type { Job, JobFormData } from "@/types/job.types";
import EditFormSection from "../components/EditFormSection";
import BackButton from "@/features/shared/components/BackButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { computeStats, setJobs } from "@/store/jobs.slice";

const EditJobDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const queryClient = useQueryClient();
  const { jobs } = useSelector((state: RootState) => state.jobs);
  const { id } = useParams();

  const job = jobs.find((j) => j?._id === id);

  const [formData, setFormData] = useState<JobFormData>({
    role: job?.role || "",
    company: job?.company || "",
    location: job?.location || "",
    status: job?.status || "applied",
    appliedAt: job?.appliedAt || "",
    source: job?.source || "",
    priority: job?.priority || "medium",
    notes: job?.notes || "",
    attachments: job?.attachments || [],
  });

  const mutation = useMutation({
    mutationFn: (data: JobFormData) => {
      if (!job) throw new Error("Job not found");
      return updateJob(job._id, data);
    },
    onMutate: async (updatedFormData: JobFormData) => {
      await queryClient.cancelQueries({ queryKey: ["jobs"] });
      await queryClient.cancelQueries({ queryKey: ["job", id] });

      const previousJobs = queryClient.getQueryData(["jobs"]);
      const previousJob = queryClient.getQueryData(["job", id]);

      queryClient.setQueryData(["jobs"], (old: Job[]) =>
        old.map((j: Job) => (j._id === id ? { ...j, ...updatedFormData } : j)),
      );

      queryClient.setQueryData(["job", id], (old: Job) => ({
        ...old,
        ...updatedFormData,
      }));

      dispatch(
        setJobs(
          jobs.map((j: Job) =>
            j._id === id ? { ...j, ...updatedFormData } : j,
          ),
        ),
      );
      dispatch(computeStats());

      return { previousJobs, previousJob };
    },

    onError: (error, _, context) => {
      queryClient.setQueryData(["jobs"], context?.previousJobs);
      queryClient.setQueryData(["job"], context?.previousJob);
      console.error("Update failed", error.message);
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["jobs"] });
      await queryClient.invalidateQueries({ queryKey: ["job", id] });
      const data = await getJobs();
      dispatch(setJobs(data.jobs));
      dispatch(computeStats());

      navigate("/dashboard/applications");
    },
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const handleCancel = () => {
    navigate("/dashboard/applications");
  };

  return (
    <section className="w-full max-w-6xl pl-24 mt-12 bg-white dark:bg-dark-900">
      <div>
        <BackButton />
        <div className="mb-6 space-y-4">
          <h2 className="text-3xl font-extrabold text-text-primary">
            Edit Application
          </h2>
          <p className="text-sm font-medium text-text-secondary">
            Update your job application details
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          {mutation.isError && (
            <p className="text-xs text-red-500">{mutation.error.message}</p>
          )}
          <EditFormSection
            formData={formData}
            handleChange={handleChange}
            setFormData={setFormData}
            onCancel={handleCancel}
          />
        </form>
      </div>
    </section>
  );
};

export default EditJobDetail;
