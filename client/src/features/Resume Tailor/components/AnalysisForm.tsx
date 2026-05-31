import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import FormField from "@/features/Add Job/components/FormField";
import { Upload } from "lucide-react";
import React, { useRef } from "react";
import { LuLoaderCircle } from "react-icons/lu";
import { RiResetRightLine } from "react-icons/ri";

interface AnalysisFormProps {
  file: File | null;
  setFile: (file: File | null) => void;
  formData: {
    jobTitle: string;
    company: string;
    jobDescription: string;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onSubmit: () => void;
  loading: boolean;
  onReset: () => void;
}

const AnalysisForm = ({
  file,
  setFile,
  formData,
  onChange,
  onSubmit,
  loading,
  onReset,
}: AnalysisFormProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="w-4xl bg-dark-800 p-6 rounded-md space-y-6"
      >
        <div className="w-full h-48 border border-dark-border bg-dark-900 focus:border-brand-purple ">
          <div
            onClick={() => inputRef.current?.click()}
            className="flex flex-col items-center justify-center gap-2 w-full h-48 border border-dashed border-dark-border bg-dark-900 rounded-lg cursor-pointer hover:border-brand-purple/40 transition-colors"
          >
            <Upload size={20} className="text-text-muted" />
            <span className="text-sm text-text-muted">
              {file ? file.name : "Click to upload your resume (PDF)"}
            </span>
            <span className="text-xs text-text-muted">PDF only</span>
            <input
              ref={inputRef}
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <FormField
            label="Job Title"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={onChange}
            placeholder="Frontend Developer"
          />
          <FormField
            label="Company"
            name="company"
            value={formData.company} // ← from object
            onChange={onChange}
            placeholder="Amazon India"
          />
        </div>
        <div className="space-y-2">
          <p className="text-xs font-semibold text-text-secondary uppercase">
            Job Description
          </p>
          <Textarea
            name="jobDescription"
            className="h-32 border border-dark-border bg-dark-900 text-text-primary placeholder:text-text-muted focus:border-brand-purple resize-none"
            placeholder="Job Description"
            value={formData.jobDescription}
            onChange={onChange}
          />
        </div>
        <div className="flex items-center justify-end gap-4">
          <Button
            variant={"secondary"}
            onClick={onReset}
            className="border-dark-border text-text-secondary cursor-pointer"
          >
            <RiResetRightLine size={24} /> Reset Form
          </Button>
          <Button
            type="submit"
            className="px-6 py-2 bg-brand-purple hover:to-brand-purple-hover/50  text-white dark:text-text-primary cursor-pointer"
          >
            {loading ? (
              <>
                <LuLoaderCircle size={14} className="mr-2 animate-spin" />{" "}
                Analysing...
              </>
            ) : (
              "Analyse"
            )}
          </Button>
        </div>
      </form>
    </>
  );
};

export default AnalysisForm;
