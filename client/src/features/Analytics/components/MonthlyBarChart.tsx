import type { Job } from "@/types/job.types";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Props {
  jobs: Job[];
}

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// #endregion
const MonthlyBarChart = ({ jobs }: Props) => {
  const monthlyMap: Record<string, any> = {};
  MONTHS.forEach((month) => {
    monthlyMap[month] = {
      month,
      applied: 0,
      interview: 0,
      assessment: 0,
      offer: 0,
      rejected: 0,
    };
  });

 
  jobs.forEach((job) => {
    const month = new Date(job.appliedAt).toLocaleString("default", {
      month: "short",
    });
    if (monthlyMap[month]) {
      monthlyMap[month][job.status] += 1;
    }
  });

  const data = MONTHS.map((month) => monthlyMap[month]);
  console.log(data);

  return (
    <div className="w-full col-span-2 pb-2 border rounded-md shadow-md bg-white dark:bg-dark-800">
      <div className="mb-6 border-b border-dark-border p-4 bg-dark-700">
        <h2 className="text-2xl font-bold text-text-primary">
          Monthly Application Trend
        </h2>
        <p className="text-sm font-semibold text-text-muted">
          Volume of submissions over the last months.
        </p>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" axisLine={false} tickLine={false} />
          <YAxis axisLine={false} tickLine={false} allowDecimals={false} />
          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.1)" }}
            contentStyle={{
              backgroundColor: "white",
              border: "0.5px solid #333",
              borderRadius: "8px",
            }}
          />
          <Legend />
          <Bar dataKey="applied" stackId="a" fill="#6c63ff" />
          <Bar dataKey="interview" stackId="a" fill="#4fc3f7" />
          <Bar dataKey="assessment" stackId="a" fill="#f59e0b" />
          <Bar dataKey="offer" stackId="a" fill="#22c55e" />
          <Bar dataKey="rejected" stackId="a" fill="#ef4444" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyBarChart;
