import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#6c63ff", "#4fc3f7", "#3A3A52"];

const FunnelPieChart = () => {
  const { stats } = useSelector((state: RootState) => state.jobs);

  const funnelData = [
    { name: "Applied", value: stats.total },
    { name: "Interviews", value: stats.interviews },
    { name: "Assessments", value: stats.assessments },
    { name: "Offers", value: stats.offers },
    { name: "Rejections", value: stats.rejections },
  ].filter((d) => d.value > 0);
  return (
    <div className="w-full border rounded-md shadow-md pb-4 bg-white dark:bg-dark-800">
      <div className="mb-6 border-b border-dark-border p-4 bg-dark-700">
        <h2 className="text-2xl font-bold text-text-primary">
          Funnel Distribution
        </h2>
        <p className="text-sm font-semibold text-text-muted">
          Breakdown of application success stages.
        </p>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart className="p-2">
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
          <Legend className="pt-4 text-sm" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FunnelPieChart;
