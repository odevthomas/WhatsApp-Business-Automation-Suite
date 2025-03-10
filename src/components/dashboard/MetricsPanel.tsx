import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  Clock,
  MessageCircle,
  PercentIcon,
  TrendingUp,
  Users,
} from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  trend: "up" | "down" | "neutral";
  trendValue: string;
  icon: React.ReactNode;
  chartData?: number[];
  color?: string;
}

const MetricCard = ({
  title = "Metric",
  value = "0",
  trend = "neutral",
  trendValue = "0%",
  icon = <TrendingUp size={20} />,
  chartData = [4, 7, 5, 8, 6, 9, 7, 8, 5, 9, 8],
  color = "bg-blue-500",
}: MetricCardProps) => {
  return (
    <Card className="bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">
          {title}
        </CardTitle>
        <div className={`p-2 rounded-full ${color} bg-opacity-10`}>{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-1">
          <span className="text-2xl font-bold">{value}</span>
          <div className="flex items-center space-x-1">
            {trend === "up" && (
              <ArrowUpIcon className="text-green-500" size={16} />
            )}
            {trend === "down" && (
              <ArrowDownIcon className="text-red-500" size={16} />
            )}
            <span
              className={`text-xs font-medium ${trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : "text-gray-500"}`}
            >
              {trendValue}
            </span>
          </div>
        </div>
        <div className="mt-4 h-10">
          <div className="flex items-end justify-between h-full w-full">
            {chartData.map((value, index) => (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div
                      className={`w-1 rounded-t-sm ${color}`}
                      style={{ height: `${(value / 10) * 100}%` }}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{value}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface MetricsPanelProps {
  metrics?: MetricCardProps[];
}

const MetricsPanel = ({ metrics }: MetricsPanelProps) => {
  const defaultMetrics: MetricCardProps[] = [
    {
      title: "Response Time",
      value: "1.2m",
      trend: "down",
      trendValue: "12% vs last week",
      icon: <Clock size={20} className="text-blue-500" />,
      chartData: [5, 3, 7, 4, 2, 3, 5, 4, 3, 2, 1],
      color: "bg-blue-500",
    },
    {
      title: "Conversion Rate",
      value: "24.8%",
      trend: "up",
      trendValue: "8% vs last week",
      icon: <PercentIcon size={20} className="text-green-500" />,
      chartData: [4, 5, 6, 5, 7, 6, 8, 7, 8, 9, 8],
      color: "bg-green-500",
    },
    {
      title: "Active Conversations",
      value: "342",
      trend: "up",
      trendValue: "18% vs last week",
      icon: <MessageCircle size={20} className="text-purple-500" />,
      chartData: [3, 4, 5, 6, 5, 7, 8, 7, 6, 8, 9],
      color: "bg-purple-500",
    },
    {
      title: "Customer Satisfaction",
      value: "4.8/5",
      trend: "up",
      trendValue: "3% vs last week",
      icon: <Users size={20} className="text-amber-500" />,
      chartData: [7, 8, 7, 8, 7, 8, 9, 8, 9, 8, 9],
      color: "bg-amber-500",
    },
  ];

  const displayMetrics = metrics || defaultMetrics;

  return (
    <div className="w-full bg-gray-50 p-6 rounded-xl">
      <h2 className="text-xl font-semibold mb-4">Business Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {displayMetrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>
    </div>
  );
};

export default MetricsPanel;
