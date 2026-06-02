import { Link } from "react-router-dom";
import HeroDashboardDummy from "./HeroDashboardDummy";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-dark-900">
      {/* Top glow */}
      <div className="absolute left-1/2 top-0 h-125 w-125 -translate-x-1/2 rounded-full bg-brand-purple/20 blur-3xl" />

      <div className="relative mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-16 px-6 py-20 lg:grid-cols-2">
        {/* Left */}
        <div className="space-y-8">
          {/* Pill badge */}
          <div className="inline-flex items-center rounded-full border border-brand-purple/20 bg-brand-purple/10 px-4 py-1 text-sm text-brand-purple">
            AI Resume Builder & Job Tracker
          </div>

          {/* Heading */}
          <div className="space-y-6">
            <h1 className="max-w-2xl text-5xl font-bold leading-tight tracking-tight text-text-primary lg:text-7xl">
             Track Jobs, Tailor Resumes, and{" "}
              <span className="text-brand-purple">Get Hired Faster</span>
            </h1>

            <p className="max-w-xl text-lg leading-relaxed text-text-secondary">
              Manage your job search end-to-end. Track applications, generate
              tailored resumes, uncover missing skills, and receive personalized
              roadmaps to improve your chances of landing interviews.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4">
            <Link
              to="/register"
              className="rounded-xl bg-brand-purple px-6 py-3 font-semibold text-white transition-all hover:bg-brand-purple-hover"
            >
              Get Started
            </Link>

            <Link
              to="#features"
              className="rounded-xl border border-dark-border bg-dark-800 px-6 py-3 font-medium text-text-primary transition-all hover:bg-dark-700"
            >
              Learn More
            </Link>
          </div>

          {/* Feature pills */}
          <div className="flex items-center gap-6 pt-4">
            <div className="flex items-center gap-2 text-sm text-text-muted">
              <div className="h-1.5 w-1.5 rounded-full bg-status-offer" />
              Track Applications 
            </div>
            <div className="flex items-center gap-2 text-sm text-text-muted">
              <div className="h-1.5 w-1.5 rounded-full bg-status-applied" />
              AI Resume Builder
            </div>
            <div className="flex items-center gap-2 text-sm text-text-muted">
              <div className="h-1.5 w-1.5 rounded-full bg-brand-purple" />
              Gap Analysis
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="relative flex items-center justify-center">
          {/* Background glow behind dashboard */}
          <div className="absolute h-72 w-72 rounded-full bg-brand-purple/20 blur-3xl" />

          <HeroDashboardDummy />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
