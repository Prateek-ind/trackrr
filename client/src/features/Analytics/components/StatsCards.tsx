import { IoMdTrendingUp } from "react-icons/io";
import { HiBadgeCheck } from "react-icons/hi";
import { FaUserCheck } from "react-icons/fa";
import { LuBriefcaseBusiness } from "react-icons/lu";

interface AnalyticsStatsCardProps {
  responseRate: number;
  totalApplication: number;
  offerRate: number;
  interviewConversionRate: number;
}

const AnalyticsStatsCards = ({
  responseRate,
  offerRate,
  totalApplication,
  interviewConversionRate,
}: AnalyticsStatsCardProps) => {
  const statsCards = [
    {
      heading: "Total Applications",
      value: totalApplication,
      icon: LuBriefcaseBusiness,
      description: "all time",
      color: "text-status-applied bg-status-applied/15",
    },
    {
      heading: "Response rate",
      value: `${responseRate}%`,
      icon: IoMdTrendingUp,
      description: "all time",
      color: "text-status-applied bg-status-applied/15",
    },
    {
      heading: "Offer rate",
      value: `${offerRate}%`,
      icon: HiBadgeCheck,
      description: "this month",
      color: "text-status-interview bg-status-interview/15",
    },
    {
      heading: "Interview Conversion Rate",
      value: `${interviewConversionRate}%`,
      icon: FaUserCheck,
      description: "this month",
      color: "text-status-offer bg-status-offer/15",
    },
  ];
  return (
    <div className="flex items-center gap-4 mb-12">
      {statsCards.map(({ heading, value, icon: Icon, description, color }) => (
        <div
          key={heading}
          className="w-full max-w-64 border border-dark-border p-6 rounded-md shadow-md bg-white dark:bg-dark-800"
        >
          <div
            className={`w-10 h-10 mb-4 flex items-center justify-center rounded-md p-1 ${color}`}
          >
            <Icon size={24} />
          </div>
          <h2 className="font-semibold text-md text-text-secondary mb-2">
            {heading}
          </h2>
          <p className="text-text-primary font-extrabold text-3xl mb-2">
            {value}
          </p>
          <p className="text-text-muted text-xs font-medium">{description}</p>
        </div>
      ))}
    </div>
  );
};

export default AnalyticsStatsCards;
