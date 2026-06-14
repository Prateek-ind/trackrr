import { fetchUser, updateProfile } from "@/api/user";
import type { User } from "@/types/user.types";
import React, { useEffect, useState, type ChangeEvent } from "react";
import EditProfileForm from "../components/EditProfileForm";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const EditProfile = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<User>({
    _id: "",
    username: user?.username ?? "",
    name: "",
    email: user?.email ?? "",
    location: "",
    phone: "",
    bio: "",
    currentJobDetails: "",
    linkedin: "",
    skills: [],
    avatar: "",
  });
  const navigate = useNavigate();
  const [skillInput, setSkillInput] = useState("");

  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchUser,
  });

  useEffect(() => {
    if (data?.user) {
      console.log(data)
      setFormData((prev: any)=>({...prev, ...data.user}));
    }
  }, [data]);

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      setFormData((prev: any) => ({
        ...prev,
        skills: [...(prev?.skills || []), skillInput.trim()],
      }));
      setSkillInput("");
    }
  };

  const handleRemoveSkill = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      skills: prev?.skills.filter((_: any, i: number) => index !== i),
    }));
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);

      setFormData((prev) => ({
        ...prev,
        avatar: URL.createObjectURL(selectedFile),
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      navigate("/dashboard/profile");
    } catch (error) {
      console.error("Profile update failed", error);
    }
  };

  const handleCancel = () => {
    navigate("/dashboard/applications");
  };
  return (
    <section className="w-full max-w-6xl pl-24 mt-12 bg-white dark:bg-dark-900">
      <div>
        <div className="mb-6 space-y-4">
          <h2 className="text-3xl font-extrabold text-text-primary">
            Edit Profile
          </h2>
          <p className="text-sm font-medium text-text-secondary">
            Update your profile details
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <EditProfileForm
            formData={formData}
            handleChange={handleChange}
            handleFileChange={handleFileChange}
            setFormData={setFormData}
            onCancel={handleCancel}
            skillInput={skillInput}
            setSkillInput={setSkillInput}
            handleAddSkill={handleAddSkill}
            handleRemoveSkill={handleRemoveSkill}
          />
        </form>
      </div>
    </section>
  );
};

export default EditProfile;
