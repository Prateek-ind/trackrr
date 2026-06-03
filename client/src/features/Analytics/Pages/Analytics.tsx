import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import AnalyticsStatsCards from "../components/StatsCards";
import SourceBreakdownChart from "../components/SourceBreakdownChart";
import MonthlyBarChart from "../components/MonthlyBarChart";

import ConsistencyLineChart from "../components/ConsistencyLineChart";
import FunnelPieChart from "@/features/Dashboard/components/FunnelPieChart";

const Analytics = () => {
  const jobs = useSelector((state: RootState) => state.jobs.jobs);
  const stats = useSelector((state: RootState) => state.jobs.stats);

  const responseRate =
    stats.total > 0
      ? Math.round(((stats.interviews + stats.offers) / stats.total) * 100)
      : 0;

  const offerRate =
    stats.total > 0 ? Math.round((stats.offers / stats.total) * 100) : 0;

  const interviewConversionRate =
    stats.total > 0 ? Math.round((stats.interviews / stats.total) * 100) : 0;

  return (
    <section className="w-full flex-1 p-8  bg-white dark:bg-dark-900 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary">Analytics</h1>
        <p className="mt-1 text-sm text-text-muted">
          Deep dive into your application performance and trends
        </p>
      </div>
      <AnalyticsStatsCards
        totalApplication={stats.total}
        responseRate={responseRate}
        offerRate={offerRate}
        interviewConversionRate={interviewConversionRate}
      />
      <div className="w-full grid grid-cols-3 gap-4 mb-4">
        <div className="col-span-2">
          <MonthlyBarChart jobs={jobs} />
        </div>
        <div className="col-span-1">
          <FunnelPieChart />
        </div>
      </div>


      <div className="w-full grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <ConsistencyLineChart jobs={jobs} />
        </div>
        <div className="col-span-1">
          <SourceBreakdownChart jobs={jobs} />
        </div>
      </div>
    </section>
  );
};

export default Analytics;
