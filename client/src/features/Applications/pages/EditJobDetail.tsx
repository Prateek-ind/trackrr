import React, { useEffect, useState, type ChangeEvent } from "react";

import { useNavigate, useParams } from "react-router-dom";
import {  getJobById, updateJob } from "@/api/job";
import type { JobFormData } from "@/types/job.types";
import EditFormSection from "../components/EditFormSection";
import BackButton from "@/features/shared/components/BackButton";

const EditJobDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

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

  useEffect(() => {
    if (!id) return;
    const getJobDetails = async () => {
      try {
        const data = await getJobById(id);
        
        setFormData({
          role: data.role || "",
          company: data.company || "",
          location: data.location || "",
          status: data.status || "applied",
          appliedAt: data.appliedAt || "",
          source: data.source || "",
          priority: data.priority || "medium",
          notes: data.notes || "",
          attachments: data.attachments || [],
        });
      } catch (error: any) {
        console.error(error.message);
      }
    };
    if (id) getJobDetails();
  }, [id]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!id) return;
      await updateJob(id, formData);
      navigate("/dashboard/applications");
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    navigate("/dashboard/applications");
  };

  return (
    <section className="w-full max-w-6xl pl-24 mt-12 bg-white dark:bg-dark-900">
      <div>
        <BackButton/>
        <div className="mb-6">
          <h2 className="text-3xl font-extrabold text-text-primary">
            Edit Application
          </h2>
          <p className="text-sm font-medium text-text-secondary">
            Update your job application details
          </p>
        </div>
        <form onSubmit={handleSubmit}>
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
