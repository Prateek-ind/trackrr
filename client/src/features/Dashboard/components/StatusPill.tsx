import React from "react";

const StatusPill = ({ status }: { status: string }) => {
  return (
    <div
      className={`rounded-full px-6 py-1 text-sm font-medium w-fit h-8  ${
        status === "applied"
          ? "bg-status-applied/15 text-status-applied"
          : status === "interview"
            ? "bg-status-interview/15 text-status-interview"
            : status === "offer"
              ? "bg-status-offer/15 text-status-offer"
              : "bg-status-rejected/15 text-status-rejected"
      }`}
    >
      {status}
    </div>
  );
};

export default StatusPill;
