import React, { useState, type ChangeEvent } from "react";
import FormSection from "../components/FormSection";
import { useNavigate } from "react-router-dom";
import { createJob, getJobs } from "@/api/job";
import type { Job, JobFormData } from "@/types/job.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { computeStats, setJobs } from "@/store/jobs.slice";

const AddJob = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dispatch = useDispatch<AppDispatch>();
  const { jobs } = useSelector((state: RootState) => state.jobs);

  const [formData, setFormData] = useState<JobFormData>({
    role: "",
    company: "",
    location: "",
    status: "applied",
    appliedAt: new Date().toISOString().split("T")[0],
    source: "",
    priority: "medium",
    notes: "",
    attachments: [],
  });

  const mutation = useMutation({
    mutationFn: (formData: JobFormData) => createJob(formData),

    onMutate: async (newJobData: JobFormData) => {
      await queryClient.cancelQueries({ queryKey: ["jobs"] });

      const previousJobs = queryClient.getQueryData(["jobs"]);

      const tempJob = { ...newJobData, _id: "temp-" + Date.now() };

      queryClient.setQueryData(["jobs"], (old: Job[]) => [...old, tempJob]);

      dispatch(setJobs([...jobs, tempJob]));
      dispatch(computeStats());

      return { previousJobs };
    },

    onError: (error, _, context: any) => {
      queryClient.setQueryData(["jobs"], context.previosJobs);
      dispatch(setJobs(context.previousJobs ?? []));
      dispatch(computeStats());

      console.error("Failed to create job: ", error.message);
    },

    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["jobs"] });
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    mutation.mutate(formData);
  };

  const onCancel = () => {
    navigate("/dashboard/applications");
  };

  return (
    <section className="w-full max-w-6xl pl-24 mt-12 bg-white dark:bg-dark-900">
      <div>
        <div className="mb-6">
          <h2 className="text-3xl font-extrabold text-text-primary">
            Add New Application
          </h2>
          <p className="text-sm font-medium text-text-secondary">
            Track yor journey by adding the details of your latest job prospect
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          {mutation.isError && <p>{mutation.error.message}</p>}
          <FormSection
            formData={formData}
            handleChange={handleChange}
            setFormData={setFormData}
            onCancel={onCancel}
          />
        </form>
      </div>
    </section>
  );
};

export default AddJob;
