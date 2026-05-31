import { FaCheck } from "react-icons/fa";

interface Step {
  number: number;
  label: string;
}

interface StepViewerProps {
  currentStep: number; // 1, 2, or 3
  onStepClick: (step: number) => void;
  completedSteps: number[];
}

const steps: Step[] = [
  { number: 1, label: "Input" },
  { number: 2, label: "Gap Analysis" },
  { number: 3, label: "LaTeX Output" },
];

const StepViewer = ({
  currentStep,
  onStepClick,
  completedSteps,
}: StepViewerProps) => {
  return (
    <div className="flex items-center w-full mb-8">
      {steps.map((step, i) => {
        const isCompleted = completedSteps.includes(step.number);
        const isCurrent = currentStep === step.number;
        const isClickable = isCompleted && !isCurrent;
        return (
          <div key={step.number} className="flex items-center flex-1">
            <div className="flex flex-col items-center gap-2">
              <button
                type="button"
                disabled={!isClickable}
                onClick={() => isClickable && onStepClick(step.number)}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold border transition-all
                  ${
                    isCurrent
                      ? "bg-brand-purple border-brand-purple text-white"
                      : isCompleted
                        ? "bg-brand-purple/20 border-brand-purple text-brand-purple cursor-pointer hover:bg-brand-purple/30"
                        : "bg-dark-800 border-dark-border text-text-muted cursor-not-allowed"
                  }`}
              >
                {isCompleted && !isCurrent ? (
                  <FaCheck size={16} />
                ) : (
                  step.number
                )}{" "}
              </button>
              <span
                className={`text-xs font-medium whitespace-nowrap ${
                  isCurrent
                    ? "text-text-primary"
                    : isCompleted
                      ? "text-text-secondary"
                      : "text-text-muted"
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-3 mb-5 transition-all ${
                  completedSteps.includes(step.number)
                    ? "bg-brand-purple"
                    : "bg-dark-border"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepViewer;
