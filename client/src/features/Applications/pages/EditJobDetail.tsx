import React, { useEffect, useState, type ChangeEvent } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { getJobs, updateJob } from "@/api/job";
import type { JobFormData } from "@/types/job.types";
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
  console.log(jobs);

  const [formData, setFormData] = useState<JobFormData>({
    _id: job?._id || "",
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
    mutationFn: (formData: JobFormData) => {
      if (!job) throw new Error("Job not found");
      return updateJob(job._id, formData);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["jobs"] });
      const data = await getJobs();
      dispatch(setJobs(data.jobs));
      dispatch(computeStats());

      navigate("/dashboard/applications");
    },
    onError: (error) => {
      if (error instanceof Error)
        console.error("Failed to create job:", error.message);
    },
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
