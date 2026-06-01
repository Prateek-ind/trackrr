import { MdOutlineCancel } from "react-icons/md";
import { LuBriefcaseBusiness, LuFileBadge, LuLoaderCircle } from "react-icons/lu";
import { SlCalender } from "react-icons/sl";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

const StatsCard = () => {
  const { stats, loading, error } = useSelector(
    (state: RootState) => state.jobs,
  );


  
  if (loading) return <p><LuLoaderCircle size={20} className="animate-spin"/> Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const statsCards = [
    {
      heading: "Total Applications",
      value: stats.total,
      icon: LuBriefcaseBusiness,
      description: "all time",
      color: "text-status-applied bg-status-applied/15",
    },
    {
      heading: "Interviews",
      value: stats.interviews,
      icon: SlCalender,
      description: "this month",
      color: "text-status-interview bg-status-interview/15",
    },
    {
      heading: "Offers",
      value: stats.offers,
      icon: LuFileBadge,
      description: "this month",
      color: "text-status-offer bg-status-offer/15",
    },
    {
      heading: "Rejections",
      value: stats.rejections,
      icon: MdOutlineCancel,
      description: "all time",
      color: "text-status-rejected bg-status-rejected/15",
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

export default StatsCard;
