import React from "react";

const jobs = [
  { role: "Frontend Developer", company: "Google", status: "Applied", statusClass: "bg-status-applied/10 text-status-applied" },
  { role: "React Engineer", company: "Spotify", status: "Interview", statusClass: "bg-status-interview/10 text-status-interview" },
  { role: "UI Engineer", company: "Razorpay", status: "Offer", statusClass: "bg-status-offer/10 text-status-offer" },
];

const HeroDashboardDummy = () => {
  return (
    <div className="relative w-full max-w-2xl rounded-3xl border border-dark-border bg-dark-800 p-6 shadow-2xl">

      {/* Topbar */}
      <div className="mb-6 flex items-center justify-between border-b border-dark-border pb-4">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-status-offer" />
          <h3 className="text-lg font-semibold text-text-primary">
            Trackrr
          </h3>
        </div>
        <div className="rounded-lg bg-brand-purple px-3 py-1 text-sm font-medium text-white cursor-pointer hover:bg-brand-purple-hover transition-all">
          + Add Job
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="rounded-2xl border border-dark-border bg-dark-900 p-4">
          <p className="text-xs text-text-muted">Total</p>
          <h2 className="mt-1 text-3xl font-bold text-text-primary">48</h2>
          <p className="text-xs text-text-muted mt-1">Applications</p>
        </div>

        <div className="rounded-2xl border border-dark-border bg-dark-900 p-4">
          <p className="text-xs text-text-muted">Active</p>
          <h2 className="mt-1 text-3xl font-bold text-status-applied">12</h2>
          <p className="text-xs text-text-muted mt-1">Interviews</p>
        </div>

        <div className="rounded-2xl border border-dark-border bg-dark-900 p-4">
          <p className="text-xs text-text-muted">Received</p>
          <h2 className="mt-1 text-3xl font-bold text-status-offer">3</h2>
          <p className="text-xs text-text-muted mt-1">Offers</p>
        </div>
      </div>

      {/* Section label */}
      <p className="text-xs text-text-muted mb-3 uppercase tracking-widest">
        Recent Applications
      </p>

      {/* Job list */}
      <div className="space-y-3">
        {jobs.map((job) => (
          <div
            key={job.role}
            className="flex items-center justify-between rounded-xl border border-dark-border bg-dark-900 px-4 py-3 transition-all hover:border-brand-purple/40"
          >
            <div className="flex items-center gap-3">
              {/* Company avatar */}
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-dark-600 text-xs font-bold text-text-secondary">
                {job.company[0]}
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">{job.role}</p>
                <p className="text-xs text-text-muted">{job.company}</p>
              </div>
            </div>

            <span className={`rounded-full px-3 py-1 text-xs font-medium ${job.statusClass}`}>
              {job.status}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="mt-6 flex items-center justify-between border-t border-dark-border pt-4">
        <p className="text-xs text-text-muted">Response rate</p>
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-24 rounded-full bg-dark-600">
            <div className="h-1.5 w-14 rounded-full bg-brand-purple" />
          </div>
          <p className="text-xs font-medium text-text-primary">38%</p>
        </div>
      </div>

    </div>
  );
};

export default HeroDashboardDummy;