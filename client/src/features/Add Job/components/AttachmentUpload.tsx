import { useRef, useState } from "react";
import { FaPaperclip } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { uploadResume } from "@/api/job";
import PDFViewer from "./PDFViewer";

interface Attachment {
  name: string;
  url: string;
  publicId: string;
}

interface AttachmentUploadProps {
  attachments: Attachment[];
  setAttachments: (fn: (prev: Attachment[]) => Attachment[]) => void;
}



const AttachmentUpload = ({
  attachments,
  setAttachments,
}: AttachmentUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<{
    url: string;
    name: string;
    publicId: string;
  } | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setUploading(true);
    try {
      const uploaded = await Promise.all(
        files.map(async (file) => {
          const data = await uploadResume(file);
          return { name: file.name, url: data.url, publicId: data.publicId };
        }),
      );
      setAttachments((prev) => [...prev, ...uploaded]);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <>
      {preview && (
        <PDFViewer
          key={preview.url}
          url={preview.url}
          name={preview.name}
          publicId={preview.publicId}
          onClose={() => setPreview(null)}
        />
      )}

      <div className="space-y-4">
        {attachments.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {attachments.map((file, i) => (
              <div
                key={i}
                className="flex items-center gap-2 rounded-lg border border-dark-border bg-dark-900 px-3 py-1.5 text-sm text-text-secondary"
              >
                <FaPaperclip className="text-text-muted text-xs shrink-0" />

                <button
                  type="button"
                  onClick={() =>
                    setPreview({
                      url: file.url,
                      name: file.name,
                      publicId: file.publicId, // ← pass publicId here
                    })
                  }
                  className="max-w-40 truncate hover:text-brand-purple transition-colors"
                  title={file.name}
                >
                  {file.name}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setAttachments((prev) => prev.filter((_, j) => j !== i));
                    setPreview(null);
                  }}
                  className="text-text-muted hover:text-status-rejected transition-colors shrink-0"
                >
                  <IoClose />
                </button>
              </div>
            ))}
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept=".pdf"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />

        <Button
          type="button"
          variant="outline"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="border-dark-border bg-dark-900 text-text-muted hover:border-brand-purple/40 hover:text-text-primary"
        >
          <FaPaperclip className="mr-2" />
          {uploading ? "Uploading..." : "Add Resume"}
        </Button>
      </div>
    </>
  );
};

export default AttachmentUpload;
