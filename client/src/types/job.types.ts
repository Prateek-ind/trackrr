export type JobStatus = "applied" | "interview" | "assessment" | "offer" | "rejected"
export type JobPriority = "low" | "medium" | "high"

interface Attachment {
  name: string;
  url: string;
  publicId: string;
}

export interface JobFormData {
  role: string
  company: string
  location: string
  status: JobStatus
  appliedAt: string
  source: string
  priority: JobPriority
  notes: string
  attachments: Attachment[]
}

export interface FormSectionProps {
  formData: JobFormData
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  setFormData: React.Dispatch<React.SetStateAction<JobFormData>>
  onCancel: ()=> void
}