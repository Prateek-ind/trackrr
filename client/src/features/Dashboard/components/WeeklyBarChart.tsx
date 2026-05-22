import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const weeklyData = [
  { day: "Mon", count: 4 },
  { day: "Tue", count: 6 },
  { day: "Wed", count: 5 },
  { day: "Thu", count: 9 },
  { day: "Fri", count: 3 },
  { day: "Sat", count: 2 },
  { day: "Sun", count: 3 },
];

const WeeklyBarChart = () => (
  <div className="w-full border rounded-md shadow-md bg-white dark:bg-dark-800">
    <div className="mb-6 border-b border-dark-border p-4 bg-dark-700">
      <h2 className="text-2xl font-bold text-text-primary">Weekly Application Trend</h2>
      <p className="text-sm font-semibold text-text-muted">
        Volume of submissions over the last 7 days.
      </p>
    </div>
    <ResponsiveContainer width="100%" height={250} className="p-6">
      <BarChart data={weeklyData} className="pr-6 ">
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="day" axisLine={false} tickLine={false} />
        <YAxis axisLine={false} tickLine={false} />
        <Tooltip />
        <Bar dataKey="count" fill="#6c63ff" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default WeeklyBarChart;
