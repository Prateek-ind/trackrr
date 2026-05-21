import React from "react";

const LiveActivity = () => {
  return (
    <div className="w-full border rounded-md shadow-md">
      <div className="border-b border-dark-border flex items-center justify-between p-4">
        <div className="">
          <h2 className="text-2xl font-bold text-text-primary">
            Live Activity
          </h2>
          <p className="text-sm font-semibold text-text-muted">
            Real-time search updates.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LiveActivity;
