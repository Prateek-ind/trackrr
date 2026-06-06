import { getActivities } from "@/api/activities";
import type { JobStatus } from "@/types/job.types";
import { useQuery } from "@tanstack/react-query";
import { type JSX } from "react";
import { FaClock } from "react-icons/fa";
import { LuBriefcase, LuCalendar, LuCircleX, LuClock } from "react-icons/lu";

const iconMap: Record<ExtendedJobStatus, JSX.Element> = {
  applied: <LuBriefcase size={16} />,
  interview: <LuCalendar size={16} />,
  assessment: <LuCalendar size={16} />,
  offer: <LuBriefcase size={16} />,
  rejected: <LuCircleX size={16} />,
  updated: <LuClock size={16} />,
  deleted: <LuCircleX size={16} />,
};

const colorMap: Record<ExtendedJobStatus, string> = {
  applied: "text-status-applied bg-status-applied/15",
  interview: "text-status-interview bg-status-interview/15",
  assessment: "text-status-interview bg-status-interview/15",
  offer: "text-status-offer bg-status-offer/15",
  rejected: "text-status-rejected bg-status-rejected/15",
  updated: "text-blue-500 bg-blue-500/15",
  deleted: "text-red-500 bg-red-500/15",
};

type ExtendedJobStatus = JobStatus | "updated" | "deleted";

interface Activity {
  createdAt: string;
  jobId: string;
  message: string;
  type: ExtendedJobStatus;
  updatedAt: string;
  user: string;
}

const LiveActivity = () => {
  const { data } = useQuery({
    queryKey: ["activity"],
    queryFn: getActivities,
    refetchInterval: 30000, // auto refetch every 30 seconds
  });

  const activities = data?.activities ?? [];

  console.log(activities);

  return (
    <div className="w-full h-full border rounded-md shadow-md bg-white dark:bg-dark-800">
      <div className="w-full mb-6 border-b border-dark-border p-4 bg-dark-700">
        <h2 className="text-2xl font-bold text-text-primary">Live Activity</h2>
        <p className="text-sm font-semibold text-text-muted">
          Real-time updates.
        </p>
      </div>
      <div className="flex flex-col gap-4 p-4 h-56 overflow-y-auto scrollbar-thumb-current">
        {activities.length === 0 ? (
          <p>No Activites</p>
        ) : (
          activities.map((activity: Activity) => (
            <div key={activity.jobId} className="flex items-start gap-3">
              <div
                className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 ${colorMap[activity.type]}`}
              >
                {iconMap[activity.type]}
              </div>
              <div>
                <p className="text-sm font-medium text-text-primary">
                  {activity.message}
                </p>
                <div className="flex items-center gap-2 text-text-muted mt-2">
                  <FaClock />
                  <p className="text-xs text-text-muted mt-0.5">
                    {new Date(activity.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <button className="w-full py-4 text-center text-sm text-text-muted font-medium mt-6 pt-4 border-t border-dark-border hover:text-text-primary transition-colors">
        View Full History
      </button>
    </div>
  );
};

export default LiveActivity;
