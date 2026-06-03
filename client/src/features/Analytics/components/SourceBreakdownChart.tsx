import type { Job } from "@/types/job.types";

interface Props {
  jobs: Job[];
}

const COLORS = [
  "#6c63ff",
  "#4fc3f7",
  "#4fc8g7",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#3A3A52",
];

const SOURCES = [
  "LinkedIn",
  "Indeed",
  "Naukri",
  "Glassdoor",
  "Referral",
  "Direct",
  "Others",
];

const SourceBreakdownChart = ({ jobs }: Props) => {
  const sourceMap: Record<string, number> = {};
  SOURCES.forEach((source) => {
    sourceMap[source] = 0;
  });

  jobs.forEach((job) => {
    const source = job.source || "Others";
    if (source in sourceMap) {
      sourceMap[source] += 1;
    } else {
      sourceMap["Others"] += 1;
    }
  });

  const data = SOURCES.map((source) => ({ source, count: sourceMap[source] }));

  const max = Math.max(...data.map((d) => d.count), 1);

  return (
    <div className="w-full border rounded-md shadow-md pb-4 bg-white dark:bg-dark-800">
      <div className="mb-6 border-b border-dark-border p-4 bg-dark-700">
        <h2 className="text-2xl font-bold text-text-primary">
          Application Sources Breakdown
        </h2>
        <p className="text-sm font-semibold text-text-muted">
          Which platforms are driving your applications.
        </p>
      </div>
      <div className="p-6 space-y-4">
        {data.length === 0 ? (
          <p className="text-sm text-text-muted">No data yet.</p>
        ) : (
          data.map(({ source, count }, index) => (
            <div key={source} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-text-primary">{source}</span>
                <span className="text-text-muted">
                  {count} {count === 1 ? "application" : "applications"}
                </span>
              </div>
              <div className="w-full h-2 bg-dark-700 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${(count / max) * 100}%`,
                    backgroundColor:
                      count > 0 ? COLORS[index % COLORS.length] : "transparent", // ← no color for 0
                  }}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SourceBreakdownChart;
