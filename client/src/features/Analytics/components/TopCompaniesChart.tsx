import type { RootState } from "@/store/store";
import type { Job } from "@/types/job.types";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface Props {
  jobs: Job[];
}

const TopCompaniesChart = ({ jobs }: Props) => {
  const companyMap: Record<string, number> = {};

  jobs.forEach((job) => {
    const company = job.company;
    companyMap[company] = (companyMap[company] || 0) + 1;
  });

  const data = Object.entries(companyMap)
    .map(([company, count]) => ({ company, count }))
    .sort((a, b) => b.count - a.count);

  const max = data[0]?.count || 1;

  return (
    <div className="w-full border rounded-md shadow-md bg-white dark:bg-dark-800">
      <div className="mb-6 border-b border-dark-border p-4 bg-dark-700">
        <h2 className="text-2xl font-bold text-text-primary">Top Companies</h2>
        <p className="text-sm font-semibold text-text-muted">
          Companies you have applied to the most.
        </p>
      </div>
      <div className="p-6 space-y-4">
        {data.length === 0 ? (
          <p className="text-sm text-text-muted">No data yet.</p>
        ) : (
          data.map(({ company, count }) => (
            <div key={company} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-text-primary">{company}</span>
                <span className="text-text-muted">
                  {count} {count === 1 ? "application" : "applications"}
                </span>
              </div>
              <div className="w-full h-2 bg-dark-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-purple rounded-full transition-all duration-500"
                  style={{ width: `${(count / max) * 100}%` }}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TopCompaniesChart;
