import { getActivities } from "@/api/activities";
import Error from "@/features/shared/components/Error";
import Loading from "@/features/shared/components/Loading";
import type { JobStatus } from "@/types/job.types";
import { useQuery } from "@tanstack/react-query";
import type { JSX } from "react";
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
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["activity"],
    queryFn: getActivities,
    refetchInterval: 30000, // auto refetch every 30 seconds
  });

  const activities = data?.activities ?? [];
  return (
    <section className="w-full flex-1 p-8  bg-white dark:bg-dark-900 min-h-screen">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Live History</h1>
          <p className="mt-1 text-sm text-text-muted">
            Real-time updates of all applications.
          </p>
        </div>
      </div>

      <div className="max-h-125 border border-dark-border bg-dark-800 rounded-md shadow-md mb-6 p-6 overflow-y-auto scrollbar-thumb-current">
        {isPending ? (
          <Loading />
        ) : activities.length === 0 ? (
          <p>No Activities</p>
        ) : (
          activities.map((activity: Activity) => (
            <div key={activity.jobId} className="flex items-start gap-3 mb-6">
              <div
                className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 ${
                  colorMap[activity.type]
                }`}
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

        {isError && <Error message={error.message} />}
      </div>
    </section>
  );
};

export default LiveActivity;
