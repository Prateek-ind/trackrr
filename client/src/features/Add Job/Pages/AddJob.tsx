import React, { useState, type ChangeEvent } from "react";
import FormSection from "../components/FormSection";
import { useNavigate } from "react-router-dom";
import { createJob } from "@/api/job";
import type { JobFormData } from "@/types/job.types";

const AddJob = () => {
  const navigate = useNavigate();

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

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createJob(formData);
      navigate("/dashboard/applications");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="w-full max-w-6xl pl-24 mt-12 bg-white dark:bg-dark-900">
      <div >
        <div className="mb-6">
          <h2 className="text-3xl font-extrabold text-text-primary">
            Add New Application
          </h2>
          <p className="text-sm font-medium text-text-secondary">
            Track yor journey by adding the details of your latest job prospect
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <FormSection
            formData={formData}
            handleChange={handleChange}
            setFormData={setFormData}
          />
        </form>
      </div>
    </section>
  );
};

export default AddJob;
