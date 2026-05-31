import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FaCheck, FaCopy } from "react-icons/fa";
import { LuExternalLink } from "react-icons/lu";

interface LatexOutputProps {
  latex: string;
  onBack: () => void;
}

const LatexOutput = ({ latex, onBack }: LatexOutputProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(latex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOverleaf = () => {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://www.overleaf.com/docs";
    form.target = "_blank";

    const input = document.createElement("input");
    input.type = "hidden";
    input.name = "snip";
    input.value = latex;

    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  };

  const handlePrism = async () => {
    await navigator.clipboard.writeText(latex);
    window.open("https://prism.openai.com", "_blank");
  };

  return (
    <>
      <div className="mb-4 border border-dark-border bg-dark-900 overflow-hidden rounded-md">
        <div className="px-4 py-2 flex items-center justify-between gap-4 border-b border-dark-border">
          <span className="text-xs text-text-muted">LaTeX Code</span>
          <Button onClick={handleCopy} className="">
            {copied ? <FaCheck size={12} /> : <FaCopy size={12} />}
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
        <pre className="p-4 text-xs text-text-secondary overflow-auto max-h-125 whitespace-pre-wrap wrap-break-words">
          {latex}
        </pre>
      </div>

      <div className="flex gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="border-dark-border bg-dark-900 text-text-muted"
        >
          Back
        </Button>
        <Button type="button" onClick={handleOverleaf} className="flex-1">
          <LuExternalLink  size={14} className="mr-2" />
          Open in Overleaf
        </Button>
        <Button
          type="button"
          onClick={handlePrism}
          variant="outline"
          className="flex-1 border-dark-border bg-dark-900 text-text-muted hover:border-brand-purple/40 hover:text-text-primary"
        >
          <LuExternalLink size={14} className="mr-2" />
          Open in Prism
        </Button>
      </div>

      <p className="text-xs text-text-muted text-center mt-3">
        Overleaf: auto-fills the editor → click Compile → download PDF
        <br />
        Prism: code copied to clipboard → paste into editor → compile
      </p>
    </>
  );
};

export default LatexOutput;
