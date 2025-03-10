import React from "react";
import MetricsPanel from "./MetricsPanel";
import QuickAccessGrid from "./QuickAccessGrid";
import RecentActivities from "./RecentActivities";
import UpcomingTasks from "./UpcomingTasks";

interface DashboardOverviewProps {
  metrics?: any[];
  quickAccessCards?: any[];
  activities?: any[];
  tasks?: any[];
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  metrics = [],
  quickAccessCards = [],
  activities = [],
  tasks = [],
}) => {
  return (
    <div className="w-full h-full bg-gray-50 p-6 overflow-auto">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleString()}
          </div>
        </div>

        {/* Metrics Panel */}
        <MetricsPanel metrics={metrics} />

        {/* Quick Access Grid */}
        <QuickAccessGrid cards={quickAccessCards} />

        {/* Recent Activities and Upcoming Tasks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentActivities activities={activities} />
          <UpcomingTasks tasks={tasks} />
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
