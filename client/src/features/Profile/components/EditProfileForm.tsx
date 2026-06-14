import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import FormField from "@/features/Add Job/components/FormField";
import SectionHeader from "@/features/Add Job/components/SectionHeader";

import type { User } from "@/types/user.types";
import {
  User as UserIcon,
  AtSign,
  Mail,
  MapPin,
  Phone,
  Link2,
} from "lucide-react";
import { IoClose } from "react-icons/io5";

interface Props {
  formData: User;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  setFormData: React.Dispatch<React.SetStateAction<User>>;
  onCancel: () => void;
  handleAddSkill: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveSkill: (index: number) => void;
  skillInput: string;
  setSkillInput: (val: string) => void;
}

const EditProfileForm = ({
  formData,
  handleChange,
  setFormData,
  onCancel,
  handleAddSkill,
  handleRemoveSkill,
  handleFileChange,
  skillInput,
  setSkillInput,
}: Props) => {
  return (
    <div className="max-w-4xl rounded-2xl border border-dark-border bg-dark-800 shadow-lg p-6 space-y-10">
      <section className="space-y-5">
        <SectionHeader title="Basic Information" />

        <FormField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          icon={UserIcon}
        />
        <FormField
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          icon={AtSign}
        />
        <FormField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          icon={Mail}
        />
        <FormField
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="e.g. Bangalore (Remote)"
          icon={MapPin}
        />
        <FormField
          label="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          icon={Phone}
        />
        <FormField
          label="LinkedIn"
          name="linkedin"
          value={formData.linkedin}
          onChange={handleChange}
          placeholder="LinkedIn"
          icon={Link2}
        />
      </section>

      <section className="space-y-5">
        <SectionHeader title="Additional Details" />

        <div className="space-y-2">
          <p className="text-xs font-semibold text-text-secondary uppercase">
            Your Bio
          </p>
          <Textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="h-32 border border-dark-border bg-dark-900 text-text-primary placeholder:text-text-muted focus:border-brand-purple resize-none"
            placeholder="Enter your bio/professional summary"
          />
        </div>
        <div className="space-y-2">
          <p className="text-xs font-semibold text-text-secondary uppercase">
            Current Job details
          </p>
          <Textarea
            name="currentJobDetails"
            value={formData.currentJobDetails}
            onChange={handleChange}
            className="h-32 border border-dark-border bg-dark-900 text-text-primary placeholder:text-text-muted focus:border-brand-purple resize-none"
            placeholder="Enter your current job details"
          />
        </div>
        <div className="space-y-2">
          <p className="text-xs font-semibold text-text-secondary uppercase">
            Skills
          </p>
          <Input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleAddSkill}
            placeholder="Type a skill and press Enter"
            className="w-full rounded-lg border border-dark-border bg-dark-700 px-3 py-6 text-xs text-text-primary placeholder:text-text-muted focus:border-brand-purple focus:outline-none"
          />

          {formData?.skills?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData?.skills.map((skill, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 rounded-full border border-dark-border bg-dark-900 px-3 py-1 text-sm text-text-secondary"
                >
                  <span>{skill}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(i)}
                    className="text-text-muted hover:text-status-rejected transition-colors"
                  >
                    <IoClose size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="border-t border-dark-border pt-6 flex items-center justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          className="border-dark-border text-text-primary hover:bg-dark-700 cursor-pointer"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-brand-purple hover:bg-brand-purple-hover text-white cursor-pointer"
        >
          Update Profile
        </Button>
      </div>
    </div>
  );
};

export default EditProfileForm;
