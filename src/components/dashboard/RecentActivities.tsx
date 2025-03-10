import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MessageSquare,
  Users,
  Bell,
  Calendar,
  ArrowRight,
  Clock,
} from "lucide-react";

interface ActivityItem {
  id: string;
  type: "message" | "customer" | "notification" | "appointment";
  title: string;
  description: string;
  time: string;
  user?: {
    name: string;
    avatar?: string;
    initials: string;
  };
  status?: "new" | "pending" | "completed";
}

interface RecentActivitiesProps {
  activities?: ActivityItem[];
}

const getActivityIcon = (type: ActivityItem["type"]) => {
  switch (type) {
    case "message":
      return <MessageSquare className="h-4 w-4" />;
    case "customer":
      return <Users className="h-4 w-4" />;
    case "notification":
      return <Bell className="h-4 w-4" />;
    case "appointment":
      return <Calendar className="h-4 w-4" />;
    default:
      return <Bell className="h-4 w-4" />;
  }
};

const getStatusBadge = (status?: ActivityItem["status"]) => {
  if (!status) return null;

  switch (status) {
    case "new":
      return <Badge variant="default">New</Badge>;
    case "pending":
      return <Badge variant="secondary">Pending</Badge>;
    case "completed":
      return <Badge variant="outline">Completed</Badge>;
    default:
      return null;
  }
};

const RecentActivities = ({
  activities = defaultActivities,
}: RecentActivitiesProps) => {
  return (
    <Card className="h-full bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">Recent Activities</CardTitle>
        <Button variant="ghost" size="sm" className="text-blue-600 gap-1">
          View all <ArrowRight className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[330px] pr-4">
          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 border-b border-gray-100 pb-4"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">{activity.title}</p>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(activity.status)}
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="mr-1 h-3 w-3" />
                        {activity.time}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    {activity.description}
                  </p>
                  {activity.user && (
                    <div className="flex items-center gap-2 pt-1">
                      <Avatar className="h-6 w-6">
                        {activity.user.avatar ? (
                          <AvatarImage
                            src={activity.user.avatar}
                            alt={activity.user.name}
                          />
                        ) : (
                          <AvatarFallback>
                            {activity.user.initials}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <span className="text-xs text-gray-600">
                        {activity.user.name}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

// Default activities data for when no props are provided
const defaultActivities: ActivityItem[] = [
  {
    id: "1",
    type: "message",
    title: "New customer inquiry",
    description: "Sarah Johnson asked about your business hours and services.",
    time: "10 min ago",
    user: {
      name: "Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      initials: "SJ",
    },
    status: "new",
  },
  {
    id: "2",
    type: "customer",
    title: "New lead captured",
    description:
      "Michael Brown submitted contact information through your website.",
    time: "45 min ago",
    user: {
      name: "Michael Brown",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      initials: "MB",
    },
    status: "pending",
  },
  {
    id: "3",
    type: "appointment",
    title: "Appointment scheduled",
    description: "Product demo with Acme Corp has been confirmed for tomorrow.",
    time: "2 hours ago",
    user: {
      name: "John Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      initials: "JS",
    },
    status: "completed",
  },
  {
    id: "4",
    type: "notification",
    title: "Workflow automation triggered",
    description: "Follow-up sequence started for recent customer inquiries.",
    time: "3 hours ago",
  },
  {
    id: "5",
    type: "message",
    title: "Customer feedback received",
    description:
      "Emily Wilson left a positive review about your quick response time.",
    time: "5 hours ago",
    user: {
      name: "Emily Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      initials: "EW",
    },
  },
  {
    id: "6",
    type: "customer",
    title: "Lead status updated",
    description:
      'David Lee has been moved from "Prospect" to "Qualified Lead".',
    time: "1 day ago",
    user: {
      name: "David Lee",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
      initials: "DL",
    },
    status: "completed",
  },
];

export default RecentActivities;
