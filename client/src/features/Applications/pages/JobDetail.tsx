import { getJobById } from "@/api/job";
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
      <p className="text-sm font-medium text-text-primary mt-0.5">{value || "—"}</p>
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
        setJob(data.job);
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

  return (
    <section className="w-full flex-1 p-8 bg-white dark:bg-dark-900 min-h-screen">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="text-text-muted hover:text-text-primary transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-text-primary">{job.role}</h1>
            <p className="mt-1 text-sm text-text-muted">{job.company}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <StatusPill status={job.status} />
          <Button
            variant="outline"
            className="border-dark-border text-text-primary hover:bg-dark-700"
            onClick={() => navigate(`/dashboard/applications/${id}/edit`)}
          >
            Edit
          </Button>
        </div>
      </div>

      {/* Container */}
      <div className="max-w-4xl rounded-2xl border border-dark-border bg-dark-800 shadow-lg p-6 space-y-10">

        {/* Basic Information */}
        <section className="space-y-5">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-widest">
            Basic Information
          </p>
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
          <p className="text-xs font-semibold text-text-muted uppercase tracking-widest">
            Status & Tracking
          </p>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-md flex items-center justify-center bg-brand-purple/10 text-brand-purple shrink-0">
                <FileText size={16} />
              </div>
              <div>
                <p className="text-xs font-semibold text-text-muted uppercase">Status</p>
                <div className="mt-1">
                  <StatusPill status={job.status} />
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
                <p className="text-xs font-semibold text-text-muted uppercase">Priority</p>
                <span className={`mt-1 inline-block text-xs font-semibold px-3 py-1 rounded-full ${priorityStyles[job.priority]}`}>
                  {job.priority}
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="border-t border-dark-border" />

        {/* Notes */}
        <section className="space-y-3">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-widest">
            Personal Notes
          </p>
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
          <p className="text-xs font-semibold text-text-muted uppercase tracking-widest">
            Attachments
          </p>
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