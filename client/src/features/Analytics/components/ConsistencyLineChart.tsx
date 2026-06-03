import type { Job } from "@/types/job.types";
import {
  LineChart,
  Line,
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

export default function ConsistencyLineChart({ jobs }: Props) {
  const monthlyMap: Record<string, { total: number; converted: number }> = {};

  MONTHS.forEach((month) => {
    monthlyMap[month] = { total: 0, converted: 0 };
  });

  jobs.map((job) => {
    const month = new Date(job.appliedAt).toLocaleString("default", {
      month: "short",
    });
    if (month in monthlyMap) {
      monthlyMap[month].total += 1;
      if (["interview", "offer", "assessment"].includes(job.status)) {
        monthlyMap[month].converted += 1;
      }
    }
  });

  const data = MONTHS.map((month) => ({
    month,
    rate:
      monthlyMap[month].total > 0
        ? Math.round(
            (monthlyMap[month].converted / monthlyMap[month].total) * 100,
          )
        : 0,
  }));

  return (
    <div className="w-full col-span-2 pb-2 border rounded-md shadow-md bg-white dark:bg-dark-800">
      <div className="mb-6 border-b border-dark-border p-4 bg-dark-700">
        <h2 className="text-2xl font-bold text-text-primary">
          Conversion Efficiency
        </h2>
        <p className="text-sm font-semibold text-text-muted">
          Monthly growth in application-to-interview success rate.
        </p>
      </div>
          <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" axisLine={false} tickLine={false} />
        <YAxis axisLine={false} tickLine={false} unit="%" />
        <Tooltip formatter={(value) => `${value}%`} />
        <Line
          type="monotone"
          dataKey="rate"
          stroke="#6c63ff"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
</div>
  );
}
