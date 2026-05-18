import { MdOutlineCancel } from "react-icons/md";
import { LuBriefcaseBusiness, LuFileBadge } from "react-icons/lu";
import { SlCalender } from "react-icons/sl";

const statsCards = [
  { heading: "Total Applications", value: 10, icon: LuBriefcaseBusiness, description: "from last month" },
  { heading: "Interviews", value: 2, icon: SlCalender, description: "this month"},
  { heading: "Offers", value: 0, icon: LuFileBadge, description: "this month"},
  { heading: "Rejections", value: 4, icon: MdOutlineCancel, description: "from last month"},
];

const StatsCard = () => {
  return (
    <div className=" flex items-center gap-4 mb-12">
      {statsCards.map(({ heading, value, icon: Icon, description }) => (
        <div
          key={heading}
          className="w-full max-w-64 border border-slate-400 p-6 rounded-md shadow-md"
        >
          <div  className={`w-10 h-10 mb-4 flex items-center justify-center ${Icon === LuBriefcaseBusiness ? "bg-blue-200" : Icon === SlCalender ? "bg-teal-200" : Icon === LuFileBadge ? "bg-gren-200" : "bg-red-200"} text-text-primary dark:bg-brand-purple/10 dark:text-brand-purple p-1 rounded-md`}>
            <Icon
            size={24}
           
          />
          </div>
          <h2 className="font-semibold text-md text-text-secondary mb-2">{heading}</h2>
          <p className="text-text-primary font-extrabold text-3xl mb-2">{value}</p>
          <p className="text-text-muted text-xs font-medium">{description}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCard;
