import { IoClose } from "react-icons/io5";

const PDFViewer = ({
  url,
  name,
  publicId,
  onClose,
}: {
  url: string;
  name: string;
  publicId: string;
  onClose: () => void;
}) => {
  const proxyUrl = `/api/jobs/resume/proxy?url=${encodeURIComponent(url)}&publicId=${encodeURIComponent(publicId)}`;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/90">
      <div className="flex items-center justify-between border-b border-dark-border bg-dark-900 px-4 py-3 shrink-0">
        <span className="text-sm text-text-secondary truncate max-w-xs">
          {name}
        </span>
        <div className="flex items-center gap-3">
          <a
            href={proxyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-text-muted hover:text-text-primary transition-colors"
          >
            Open in new tab ↗
          </a>
          <button
            onClick={onClose}
            className="p-1 rounded text-text-muted hover:bg-dark-800 hover:text-text-primary transition-all"
          >
            <IoClose size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <iframe
          src={proxyUrl}
          className="h-full w-full border-0"
          title={name}
        />
      </div>
    </div>
  );
};

export default PDFViewer