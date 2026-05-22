import { deleteJobById, getJobById } from "@/api/job";
import StatusPill from "@/features/Dashboard/components/StatusPill";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Building2,
  MapPin,
  Link2,
  Calendar,
  StickyNote,
  Paperclip,
  ArrowLeft,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SectionHeader from "@/features/Add Job/components/SectionHeader";
import BackButton from "@/features/shared/components/BackButton";
import { statusStyles } from "@/types/status.types";

interface Job {
  _id: string;
  role: string;
  company: string;
  location: string;
  status: string;
  appliedAt: Date;
  source: string;
  priority: "low" | "medium" | "high";
  notes: string;
  attachments: string[];
}

const priorityStyles = {
  low: "text-status-applied bg-status-applied/15",
  medium: "text-status-interview bg-status-interview/15",
  high: "text-status-rejected bg-status-rejected/15",
};

const DetailRow = ({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) => (
  <div className="flex items-start gap-3">
    <div className="w-8 h-8 rounded-md flex items-center justify-center bg-brand-purple/10 text-brand-purple shrink-0">
      <Icon size={16} />
    </div>
    <div>
      <p className="text-xs font-semibold text-text-muted uppercase">{label}</p>
      <p className="text-sm font-medium text-text-primary mt-0.5">
        {value || "—"}
      </p>
    </div>
  </div>
);

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const data = await getJobById(id!);
        setJob(data);
      } catch (err: any) {
        setError(err.message || "Failed to load job");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!job) return <p>Job not found.</p>;

  const handleDelete = async () => {
    try {
      if (!id) return;
      await deleteJobById(id!);
      navigate("/dashboard/applications");
    } catch (error: any) {
      throw new Error(error.message, {cause: error});
    }
  };

  return (
    <section className="w-full flex-1 p-8 pl-24 bg-white dark:bg-dark-900 min-h-screen">
      <BackButton />
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div>
            <h1 className="text-3xl font-bold text-text-primary">{job.role}</h1>
            <div className="flex items-center gap-4 mt-2">
              <p className="mt-1 text-sm text-text-secondary font-semibold">
                {job.company}
              </p>
              <StatusPill value={job.status} variants={statusStyles} />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            className="px-6 py-2 border-dark-border bg-brand-purple text-white dark:text-text-primary hover:bg-brand-purple-hover cursor-pointer"
            onClick={() => navigate(`/dashboard/applications/${id}/edit`)}
          >
            Edit
          </Button>
          <Button
            variant="outline"
            className="px-6 py-2 border-dark-border text-text-primary hover:bg-dark-700 cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </div>

      {/* Container */}
      <div className="max-w-4xl rounded-2xl border border-dark-border bg-dark-800 shadow-lg p-6 space-y-10">
        {/* Basic Information */}
        <section className="space-y-5">
          <SectionHeader title="Basic Information" />
          <div className="grid grid-cols-2 gap-6">
            <DetailRow icon={FileText} label="Role" value={job.role} />
            <DetailRow icon={Building2} label="Company" value={job.company} />
            <DetailRow icon={MapPin} label="Location" value={job.location} />
            <DetailRow icon={Link2} label="Source" value={job.source} />
          </div>
        </section>

        <div className="border-t border-dark-border" />

        {/* Status & Tracking */}
        <section className="space-y-5">
          <SectionHeader title="Status & Tracking" />
          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-md flex items-center justify-center bg-brand-purple/10 text-brand-purple shrink-0">
                <FileText size={16} />
              </div>
              <div>
                <p className="text-xs font-semibold text-text-muted uppercase">
                  Status
                </p>
                <div className="mt-1">
                  <StatusPill value={job.status} variants={statusStyles} />
                </div>
              </div>
            </div>
            <DetailRow
              icon={Calendar}
              label="Applied Date"
              value={new Date(job.appliedAt).toDateString()}
            />
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-md flex items-center justify-center bg-brand-purple/10 text-brand-purple shrink-0">
                <FileText size={16} />
              </div>
              <div>
                <p className="text-xs font-semibold text-text-muted uppercase">
                  Priority
                </p>
                <StatusPill value={job.priority} variants={priorityStyles} />
              </div>
            </div>
          </div>
        </section>

        <div className="border-t border-dark-border" />

        {/* Notes */}
        <section className="space-y-3">
          <SectionHeader title="Personal notes" />
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-md flex items-center justify-center bg-brand-purple/10 text-brand-purple shrink-0">
              <StickyNote size={16} />
            </div>
            <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap">
              {job.notes || "No notes added."}
            </p>
          </div>
        </section>

        <div className="border-t border-dark-border" />

        {/* Attachments */}
        <section className="space-y-3">
          <SectionHeader title="Attachments" />
          {job.attachments.length === 0 ? (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-md flex items-center justify-center bg-brand-purple/10 text-brand-purple shrink-0">
                <Paperclip size={16} />
              </div>
              <p className="text-sm text-text-muted">No attachments.</p>
            </div>
          ) : (
            job.attachments.map((file, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md flex items-center justify-center bg-brand-purple/10 text-brand-purple shrink-0">
                  <Paperclip size={16} />
                </div>
                <p className="text-sm text-text-primary">{file}</p>
              </div>
            ))
          )}
        </section>
      </div>
    </section>
  );
};

export default JobDetail;
