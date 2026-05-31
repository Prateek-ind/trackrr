import React, { useState, type ChangeEvent, type FormEvent } from "react";
import AnalysisForm from "../components/AnalysisForm";
import { useSearchParams } from "react-router-dom";
import { analyseResume, generateLatex } from "@/api/resume";
import LatexOutput from "../components/LatexOutput";
import GapAnalysis from "../components/GapAnalysis";
import StepViewer from "../components/StepViewer";
import JobDetail from "@/features/Applications/pages/JobDetail";

interface Gap {
  skill: string;
  importance: "high" | "medium" | "low";
  reason: string;
}

interface FormData {
  jobTitle: string;
  company: string;
  jobDescription: string;
}

type Step = "input" | "gaps" | "latex";
const stepNumber = { input: 1, gaps: 2, latex: 3 };

const ResumeTailor = () => {
  const [step, setStep] = useState<Step>("input");
  const [file, setFile] = useState<File | null>(null);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const [formData, setFormData] = useState<FormData>({
    jobTitle: "",
    company: "",
    jobDescription: "",
  });

  const [resumeText, setResumeText] = useState("");
  const [gaps, setGaps] = useState<Gap[]>([]);
  const [omittedSkills, setOmittedSkills] = useState<string[]>([]);
  const [latex, setLatex] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAnalyse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !file ||
      !formData.jobTitle ||
      !formData.company ||
      !formData.jobDescription
    ) {
      setError("All fields are required.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const form = new FormData();
      form.append("resume", file);
      form.append("jobTitle", formData.jobTitle);
      form.append("company", formData.company);
      form.append("jobDescription", formData.jobDescription);

      const data = await analyseResume(form);
      setResumeText(data.resumeText);
      setGaps(data.gaps);
      goToStep("gaps");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await generateLatex({
        resumeText,
        ...formData,
        omittedSkills,
      });
      setLatex(data.latex);
      goToStep("latex");
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const goToStep = (next: Step) => {
    const current = stepNumber[step];
    setCompletedSteps((prev) =>
      prev.includes(current) ? prev : [...prev, current],
    );
    setStep(next);
  };

  const handleStepClick = (num: number) => {
    const stepMap: Record<number, Step> = { 1: "input", 2: "gaps", 3: "latex" };
    setStep(stepMap[num]);
  };

  const handleResetForm = () => {
    setFormData({
      jobTitle: "",
      company: "",
      jobDescription: "",
    });
    setFile(null);
    setGaps([]);
    setOmittedSkills([]);
    setResumeText("");
    setLatex("");
    setError(null);
    goToStep("input");
  };
  return (
    <section className="w-full max-w-7xl pl-24 mt-12 bg-white dark:bg-dark-900">
      {error && (
        <div className="mb-4 rounded-lg border border-status-rejected/30 bg-status-rejected/10 px-4 py-3 text-sm text-status-rejected">
          {error}
        </div>
      )}
      1
      <div className="w-full mx-auto">
        <StepViewer
          onStepClick={handleStepClick}
          currentStep={stepNumber[step]}
          completedSteps={completedSteps}
        />
      </div>
      {step === "input" && (
        <>
          <div className="space-y-4 mb-8">
            <h2 className="text-3xl font-bold text-text-primary dark:text-white">
              Step-1 Input
            </h2>
            <p className="text-sm text-text-secondary ">
              Upload your latest resume and provide the target job details to
              begin with gap analysis
            </p>
          </div>
          <AnalysisForm
            file={file}
            setFile={setFile}
            formData={formData}
            onChange={handleChange}
            onSubmit={handleAnalyse}
            loading={loading}
            onReset={handleResetForm}
          />
        </>
      )}
      {step === "gaps" && (
        <>
          <div className="space-y-4 mb-8">
            <h2 className="text-3xl font-bold text-text-primary dark:text-white">
              Step-2 Skill Gap Analysis
            </h2>
            <p className="text-sm text-text-secondary ">
              {`We have compared your background against ${formData.jobTitle}{" "}
              role.Focus on the{" "}
              ${(
                <span className="text-red-400 bg-red-400/10 border border-red-400/20 rounded-md px-0.5">
                  High Priority
                </span>
              )}{" "}
              gaps first to maximize interview chances`}
            </p>
          </div>
          <GapAnalysis
            gaps={gaps}
            omittedSkills={omittedSkills}
            setOmittedSkills={setOmittedSkills}
            jobTitle={formData.jobTitle}
            company={formData.company}
            onBack={() => setStep("input")}
            onGenerate={handleGenerate}
            loading={loading}
          />
        </>
      )}
      {step === "latex" && (
        <>
          <div className="space-y-4 mb-8">
            <h2 className="text-3xl font-bold text-text-primary dark:text-white">
              Step-3 Resume Builder
            </h2>
            <p className="text-sm text-text-secondary ">
              Generate and export your industry standard LaTeX resume
            </p>
          </div>
          <LatexOutput latex={latex} onBack={() => setStep("gaps")} />
        </>
      )}
    </section>
  );
};

export default ResumeTailor;
