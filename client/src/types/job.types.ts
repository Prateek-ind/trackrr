export type JobStatus = "applied" | "interview" | "assessment" | "offer" | "rejected"
export type JobPriority = "low" | "medium" | "high"

export interface JobFormData {
  role: string
  company: string
  location: string
  status: JobStatus
  appliedAt: string
  source: string
  priority: JobPriority
  notes: string
  attachments: File[]
}

export interface FormSectionProps {
  formData: JobFormData
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  setFormData: React.Dispatch<React.SetStateAction<JobFormData>>
}