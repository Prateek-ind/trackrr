import { FileText, Building2, MapPin, Link2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { FormSectionProps, JobStatus } from "@/types/job.types";
import SectionHeader from "@/features/Add Job/components/SectionHeader";
import FormField from "@/features/Add Job/components/FormField";
import StatusSelect from "@/features/Add Job/components/StatusSelect";
import { DatePicker } from "@/features/Add Job/components/DatePicker";
import { TogglePriority } from "@/features/Add Job/components/TogglePriority";
import AttachmentUpload from "@/features/Add Job/components/AttachmentUpload";

const EditFormSection = ({
  formData,
  handleChange,
  setFormData,
  onCancel
}: FormSectionProps) => {
  return (
    <div className="max-w-4xl rounded-2xl border border-dark-border bg-dark-800 shadow-lg p-6 space-y-10">
      <section className="space-y-5">
        <SectionHeader title="Basic Information" />
        <FormField
          label="Job Role / Position"
          name="role"
          value={formData.role}
          onChange={handleChange}
          placeholder="e.g. Senior Frontend Developer"
          icon={FileText}
        />
        <FormField
          label="Company Name"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="e.g. Amazon India"
          icon={Building2}
        />
        <FormField
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="e.g. Bangalore (Remote)"
          icon={MapPin}
        />
      </section>

      <section className="space-y-5">
        <SectionHeader title="Status & Tracking" />
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <p className="text-xs font-semibold text-text-secondary uppercase">
              Current Status
            </p>
            <StatusSelect
              value={formData.status}
              onChange={(val: JobStatus) =>
                setFormData((prev) => ({ ...prev, status: val }))
              }
            />
          </div>

          <div className="space-y-2">
            <p className="text-xs font-semibold text-text-secondary uppercase">
              Applied Date
            </p>
            <DatePicker
              value={formData.appliedAt}
              onChange={(date) =>
                setFormData((prev) => ({ ...prev, appliedAt: date }))
              }
            />
          </div>

          <FormField
            label="Application Source"
            name="source"
            value={formData.source}
            onChange={handleChange}
            placeholder="e.g. LinkedIn, Referral"
            icon={Link2}
          />

          <div className="space-y-2">
            <p className="text-xs font-semibold text-text-secondary uppercase">
              Priority
            </p>
            <TogglePriority
              value={formData.priority}
              onChange={(val) =>
                val && setFormData((prev) => ({ ...prev, priority: val }))
              }
            />
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <SectionHeader title="Additional Context" />

        <div className="space-y-2">
          <p className="text-xs font-semibold text-text-secondary uppercase">
            Personal Notes
          </p>
          <Textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="h-32 border border-dark-border bg-dark-900 text-text-primary placeholder:text-text-muted focus:border-brand-purple resize-none"
            placeholder="Key requirements, interview points, or follow-up reminders..."
          />
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold text-text-secondary uppercase">
            Attachments
          </p>
          <AttachmentUpload
            attachments={formData.attachments}
            setAttachments={(fn) =>
              setFormData((prev) => ({
                ...prev,
                attachments: fn(prev.attachments),
              }))
            }
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
          Update Job Application
        </Button>
      </div>
    </div>
  );
};

export default EditFormSection;
