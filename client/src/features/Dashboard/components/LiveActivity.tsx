import { LuBriefcase, LuCalendar, LuCircleX, LuClock } from "react-icons/lu";

interface Activity {
  id: string;
  message: string;
  time: string;
  type: "applied" | "interview" | "rejected" | "moved";
}

const activities: Activity[] = [
  {
    id: "1",
    message: "You applied to Figma",
    time: "10m ago",
    type: "applied",
  },
  {
    id: "2",
    message: "Interview scheduled with Google",
    time: "1h ago",
    type: "interview",
  },
  {
    id: "3",
    message: "Application rejected by Netflix",
    time: "4h ago",
    type: "rejected",
  },
  {
    id: "4",
    message: 'Stripe moved you to "Technical Interview"',
    time: "Yesterday",
    type: "moved",
  },
];

const iconMap = {
  applied: <LuBriefcase size={16} />,
  interview: <LuCalendar size={16} />,
  rejected: <LuCircleX size={16} />,
  moved: <LuClock size={16} />,
};

const colorMap = {
  applied: "text-status-applied bg-status-applied/15",
  interview: "text-status-interview bg-status-interview/15",
  rejected: "text-status-rejected bg-status-rejected/15",
  moved: "text-status-offer bg-status-offer/15",
};

const LiveActivity = () => (
  <div className="w-full border rounded-md shadow-md bg-white dark:bg-dark-800">
    <div className="w-full mb-6 border-b border-dark-border p-4 bg-dark-700">
      <h2 className="text-2xl font-bold text-text-primary">Live Activity</h2>
      <p className="text-sm font-semibold text-text-muted">
        Real-time search updates.
      </p>
    </div>
    <div className="flex flex-col gap-4 p-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-3">
          <div
            className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 ${colorMap[activity.type]}`}
          >
            {iconMap[activity.type]}
          </div>
          <div>
            <p className="text-sm font-medium text-text-primary">
              {activity.message}
            </p>
            <p className="text-xs text-text-muted mt-0.5">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
    <button className="w-full py-4 text-center text-sm text-text-muted font-medium mt-6 pt-4 border-t border-dark-border hover:text-text-primary transition-colors">
      View Full History
    </button>
  </div>
);

export default LiveActivity;
