import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MoreHorizontal, Calendar, Clock, MapPin, Phone } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface Task {
  id: string;
  title: string;
  date: string;
  time: string;
  location?: string;
  customer: {
    name: string;
    avatar?: string;
    initials?: string;
  };
  type: "appointment" | "call" | "follow-up" | "payment";
  status: "upcoming" | "confirmed" | "pending";
}

interface UpcomingTasksProps {
  tasks?: Task[];
  className?: string;
}

const UpcomingTasks = ({
  tasks = defaultTasks,
  className,
}: UpcomingTasksProps) => {
  return (
    <Card className={`bg-white ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-bold">Upcoming Tasks</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          className="text-blue-600 hover:text-blue-800"
        >
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-start justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start space-x-4">
                <Avatar className="h-10 w-10 border border-gray-200">
                  {task.customer.avatar ? (
                    <AvatarImage
                      src={task.customer.avatar}
                      alt={task.customer.name}
                    />
                  ) : (
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {task.customer.initials ||
                        task.customer.name.substring(0, 2)}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <h4 className="font-medium text-gray-900">{task.title}</h4>
                  <div className="mt-1 text-sm text-gray-500">
                    {task.customer.name}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="mr-1 h-3 w-3" />
                      {task.date}
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="mr-1 h-3 w-3" />
                      {task.time}
                    </div>
                    {task.location && (
                      <div className="flex items-center text-xs text-gray-500">
                        <MapPin className="mr-1 h-3 w-3" />
                        {task.location}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-2">
                <Badge
                  variant={getBadgeVariant(task.status)}
                  className="text-xs"
                >
                  {task.status}
                </Badge>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuItem>Reschedule</DropdownMenuItem>
                    <DropdownMenuItem>Send reminder</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      Cancel
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

const getBadgeVariant = (status: Task["status"]) => {
  switch (status) {
    case "confirmed":
      return "default";
    case "pending":
      return "secondary";
    case "upcoming":
      return "outline";
    default:
      return "default";
  }
};

const defaultTasks: Task[] = [
  {
    id: "1",
    title: "Product Demo Call",
    date: "Today",
    time: "2:00 PM",
    customer: {
      name: "Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      initials: "SJ",
    },
    type: "call",
    status: "confirmed",
  },
  {
    id: "2",
    title: "Consultation Appointment",
    date: "Tomorrow",
    time: "10:30 AM",
    location: "Virtual Meeting",
    customer: {
      name: "Michael Rodriguez",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
      initials: "MR",
    },
    type: "appointment",
    status: "pending",
  },
  {
    id: "3",
    title: "Follow-up on Quote",
    date: "May 15, 2023",
    time: "3:15 PM",
    customer: {
      name: "Emma Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=emma",
      initials: "EW",
    },
    type: "follow-up",
    status: "upcoming",
  },
  {
    id: "4",
    title: "Payment Confirmation",
    date: "May 16, 2023",
    time: "11:00 AM",
    customer: {
      name: "David Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
      initials: "DC",
    },
    type: "payment",
    status: "upcoming",
  },
];

export default UpcomingTasks;
