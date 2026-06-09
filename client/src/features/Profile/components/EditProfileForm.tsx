import { Button } from "@/components/ui/button";
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
import { LuLinkedin } from "react-icons/lu";
import { Link } from "react-router-dom";

interface Props {
  formData: User;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  setFormData: React.Dispatch<React.SetStateAction<User>>;
  onCancel: () => void;
}

const EditProfileForm = ({
  formData,
  handleChange,
  setFormData,
  onCancel,
}: Props) => {
  return (
    <div className="max-w-4xl rounded-2xl border border-dark-border bg-dark-800 shadow-lg p-6 space-y-10">
      <section className="space-y-5">
        <SectionHeader title="Basic Information" />
        <div className="space-y-2">
          <p className="text-xs font-semibold text-text-secondary uppercase">
            Avatar
          </p>
          <input
            type="file"
            accept="image/*"
            className="hidden"

            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setFormData((prev) => ({ ...prev, avatar: file }));
            }}
          />
          <label htmlFor="avatar-upload">
            <Button
              type="button"
              variant="outline"
              className="border-dark-border text-text-primary hover:bg-dark-700 cursor-pointer"
              asChild
            >
              <span>Upload Avatar</span>
            </Button>
          </label>
        </div>
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
            placeholder="Key requirements, interview points, or follow-up reminders..."
          />
        </div>
      </section>

      <div className="border-t border-dark-border pt-6 flex items-center justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          className="border-dark-border text-text-primary hover:bg-dark-700"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-brand-purple hover:bg-brand-purple-hover text-white shadow shadow-brand-purple/30"
        >
          Update Profile
        </Button>
      </div>
    </div>
  );
};

export default EditProfileForm;
