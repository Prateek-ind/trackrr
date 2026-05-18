import React, { useState, type ChangeEvent } from "react";
import FormSection from "../components/FormSection";

const AddJob = () => {
  const [formData, setFormData] = useState({
    role: "",
    company: "",
    location: "",
    status: "applied",
    appliedAt: "",
    source: "",
    priority: "medium",
    notes: "",
    attachments: [],
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="w-full max-w-6xl pl-24 mt-12">
      <div>
        <div>
          <h2 className="text-3xl font-extrabold text-text-primary">
            Add New Application
          </h2>
          <p className="text-sm font-medium text-text-secondary">
            Track yor journey by adding the details of your latest job prospect
          </p>
        </div>
        <FormSection />
      </div>
    </section>
  );
};

export default AddJob;
