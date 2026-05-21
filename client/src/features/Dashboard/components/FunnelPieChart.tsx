import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const funnelData = [
  { name: "Applied", value: 65 },
  { name: "Interviews", value: 25 },
  { name: "Offers", value: 10 },
];

const COLORS = ["#6c63ff", "#4fc3f7", "#1a1a24"];

const FunnelPieChart = () => (
  <div className="w-full border rounded-md shadow-md p-4">
    <div className="mb-6 border-b border-dark-border py-4">
      <h2 className="text-2xl font-bold text-text-primary">
        Funnel Distribution
      </h2>
      <p className="text-sm font-semibold text-text-muted">
        Breakdown of application success stages.
      </p>
    </div>
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={funnelData}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={90}
          dataKey="value"
          paddingAngle={3}
        >
          {funnelData.map((_, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${value}%`} />
        <Legend className="pt-4" />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

export default FunnelPieChart;
