import { LuArrowLeft, LuLoaderCircle } from "react-icons/lu";
import GapItem from "./GapItem";
import { Button } from "@/components/ui/button";
import { FaBackward } from "react-icons/fa";

interface GapAnalysisProps {
  gaps: Gap[];
  omittedSkills: string[];
  setOmittedSkills: (fn: (prev: string[]) => string[]) => void;
  jobTitle: string;
  company: string;
  onBack: () => void;
  onGenerate: () => void;
  loading: boolean;
}

interface Gap {
  skill: string;
  importance: "high" | "medium" | "low";
  reason: string;
}

const GapAnalysis = ({
  gaps,
  omittedSkills,
  setOmittedSkills,
  jobTitle,
  company,
  onBack,
  onGenerate,
  loading,
}: GapAnalysisProps) => {
  const toggleOmit = (skill: string) => {
    setOmittedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill],
    );
  };

  return (
    <>
      <div className="mb-6 space-y-6 pr-6">
        {gaps.map((gap: Gap) => (
          <GapItem
            key={gap.skill}
            gap={gap}
            omittedSkills={omittedSkills}
            jobTitle={jobTitle}
            company={company}
            toggleOmit={toggleOmit}
          />
        ))}
        <div className="flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="ghost"
            onClick={onBack}
            className="border-dark-border bg-dark-900 text-text-muted"
          >
            <LuArrowLeft/> Back to Input
          </Button>
          <Button
            type="button"
            onClick={onGenerate}
            disabled={loading}
            className="bg-brand-purple text-white"
          >
            {loading ? (
              <>
                <LuLoaderCircle size={14} className="mr-2 animate-spin" />{" "}
                Generating...
              </>
            ) : (
              "Generate Tailored CV"
            )}
          </Button>
        </div>
      </div>
    </>
  );
};

export default GapAnalysis;
