import { getRoadmap } from "@/api/resume";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FaChevronCircleDown, FaChevronCircleUp } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { LuLoader } from "react-icons/lu";

interface Gap {
  skill: string;
  importance: "high" | "medium" | "low";
  reason: string;
}

interface RoadmapStep {
  day: string;
  task: string;
  resource: string;
}

interface Roadmap {
  skill: string;
  timeToLearn: string;
  steps: RoadmapStep[];
}

interface GapItemProps {
  gap: Gap;
  omittedSkills: string[];
  toggleOmit: (skill: string) => void;
  jobTitle: string;
  company: string;
}

const importanceBadge = {
  high: "text-red-400 bg-red-400/10 border border-red-400/20",
  medium: "text-yellow-400 bg-yellow-400/10 border border-yellow-400/20",
  low: "text-green-400 bg-green-400/10 border border-green-400/20",
};

const GapItem = ({
  gap,
  omittedSkills,
  jobTitle,
  company,
  toggleOmit,
}: GapItemProps) => {
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [roadmapLoading, setRoadmapLoading] = useState(false);

  const handleRoadmap = async () => {
    if (roadmap) {
      setExpanded((prev) => !prev);
      return;
    }

    setRoadmapLoading(true);
    try {
      const data = await getRoadmap({ skill: gap.skill, jobTitle, company });
      setRoadmap(data.roadmap);
      setExpanded(true);
    } catch (error) {
      console.error(error);
    } finally {
      setRoadmapLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-4xl rounded-md shadow-md bg-dark-900 border border-dark-border ">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm text-text-primary font-medium">
            {gap.skill}
          </span>
          <span
            className={`text-xs px-2 py-0.5 rounded-md ${importanceBadge[gap.importance]}`}
          >
            {gap.importance}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={"outline"}
            onClick={handleRoadmap}
            disabled={roadmapLoading}
            className="flex items-center gap-1 rounded-md border border-dark-border text-text-muted hover:border-brand-purple/40 hover:text-text-primary transition-all"
          >
            {roadmapLoading ? (
              <LuLoader className="animate-spin" size={10} />
            ) : expanded ? (
              <FaChevronCircleUp size={10} />
            ) : (
              <FaChevronCircleDown size={10} />
            )}
            Roadmap
          </Button>
          <button
            type="button"
            onClick={() => toggleOmit(gap.skill)}
            className={`text-xs px-3 py-1 flex items-center gap-1 rounded-full border transition-all ${
              omittedSkills.includes(gap.skill)
                ? "border-status-rejected/40 bg-status-rejected/10 text-status-rejected"
                : "border-dark-border text-text-muted hover:border-brand-purple/40 hover:text-text-primary"
            }`}
          >
            <RxCross2 />{" "}
            {omittedSkills.includes(gap.skill) ? "Omitted" : "Omit"}
          </button>
        </div>
      </div>

      <p className="text-xs text-text-muted mt-1">{gap.reason}</p>

      {expanded && roadmap && (
        <div className="mt-4 pt-4 border-t border-dark-border">
          <p className="text-xs font-medium text-text-secondary mb-4">
            ⏱ Time to learn{" "}
            <span className="text-brand-purple">{roadmap.timeToLearn}</span>
          </p>
          <div className="relative">
            {roadmap.steps.map((step, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex items-center flex-col">
                  <div className="w-2 h-2 rounded-md bg-brand-purple shrink-0 mt-1" />
                  {i < roadmap.steps.length - 1 && (
                    <div className="w-0.5 flex-1 bg-dark-border my-1" />
                  )}
                </div>
                <div className="pb-4">
                  <span className="text-xs font-semibold text-brand-purple">
                    {step.day}
                  </span>
                  <p className="text-xs text-text-primary mt-0.5">
                    {step.task}
                  </p>
                  <p className="text-xs text-text-muted mt-0.5">
                    {step.resource}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GapItem;
