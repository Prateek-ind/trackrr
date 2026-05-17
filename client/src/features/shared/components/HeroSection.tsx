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
            Smart Job Tracking Platform
          </div>

          {/* Heading */}
          <div className="space-y-6">
            <h1 className="max-w-2xl text-5xl font-bold leading-tight tracking-tight text-text-primary lg:text-7xl">
              Track Your Job Applications{" "}
              <span className="text-brand-purple">Smarter</span>
            </h1>

            <p className="max-w-xl text-lg leading-relaxed text-text-secondary">
              Organize applications, monitor interview progress, analyze hiring
              trends, and manage every opportunity from one modern dashboard.
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
              Monitor Interviews
            </div>
            <div className="flex items-center gap-2 text-sm text-text-muted">
              <div className="h-1.5 w-1.5 rounded-full bg-brand-purple" />
              Analyze Progress
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
