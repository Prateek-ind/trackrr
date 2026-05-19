import { useRef } from "react"
import { Paperclip, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AttachmentUploadProps {
  attachments: File[]
  setAttachments: (fn: (prev: File[]) => File[]) => void
}

const AttachmentUpload = ({ attachments, setAttachments }: AttachmentUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setAttachments(prev => [...prev, ...files])
  }

  const removeFile = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-3">

      {/* File tags */}
      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {attachments.map((file, i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded-lg border border-dark-border bg-dark-900 px-3 py-1.5 text-sm text-text-secondary"
            >
              <Paperclip size={12} className="text-text-muted" />
              <span className="max-w-[160px] truncate">{file.name}</span>
              <button
                type="button"
                onClick={() => removeFile(i)}
                className="text-text-muted hover:text-status-rejected transition-all"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Hidden input */}
      <input
        ref={inputRef}
        type="file"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Trigger */}
      <Button
        type="button"
        variant="outline"
        onClick={() => inputRef.current?.click()}
        className="border-dark-border bg-dark-900 text-text-muted hover:border-brand-purple/40 hover:text-text-primary transition-all"
      >
        <Paperclip size={14} className="mr-2" />
        Add File
      </Button>

    </div>
  )
}

export default AttachmentUpload