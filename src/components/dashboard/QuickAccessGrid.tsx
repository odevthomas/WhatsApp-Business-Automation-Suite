import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Workflow, Users, Link2 } from "lucide-react";

interface QuickAccessCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  actionText: string;
  onClick?: () => void;
}

const QuickAccessCard = ({
  title = "Feature",
  description = "Description of this feature",
  icon = <MessageSquare className="h-8 w-8 text-primary" />,
  actionText = "Access Feature",
  onClick = () => console.log("Card clicked"),
}: QuickAccessCardProps) => {
  return (
    <Card className="flex flex-col h-full bg-white hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center gap-3">
          {icon}
          <CardTitle className="text-xl">{title}</CardTitle>
        </div>
        <CardDescription className="mt-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {/* Content can be expanded with additional information if needed */}
      </CardContent>
      <CardFooter>
        <Button onClick={onClick} className="w-full">
          {actionText}
        </Button>
      </CardFooter>
    </Card>
  );
};

interface QuickAccessGridProps {
  cards?: QuickAccessCardProps[];
}

const QuickAccessGrid = ({ cards }: QuickAccessGridProps) => {
  const defaultCards: QuickAccessCardProps[] = [
    {
      title: "AI Chatbot Configuration",
      description:
        "Create and manage AI-powered response flows for automated customer interactions",
      icon: <MessageSquare className="h-8 w-8 text-blue-600" />,
      actionText: "Configure Chatbot",
      onClick: () => console.log("Navigate to chatbot configuration"),
    },
    {
      title: "Automation Workflows",
      description:
        "Design custom automation workflows to streamline your business processes",
      icon: <Workflow className="h-8 w-8 text-green-600" />,
      actionText: "Manage Workflows",
      onClick: () => console.log("Navigate to automation workflows"),
    },
    {
      title: "Customer Management",
      description:
        "View and manage your customer database, conversations, and lead classifications",
      icon: <Users className="h-8 w-8 text-purple-600" />,
      actionText: "Manage Customers",
      onClick: () => console.log("Navigate to customer management"),
    },
    {
      title: "Integrations",
      description:
        "Connect your WhatsApp business account with other tools and services",
      icon: <Link2 className="h-8 w-8 text-orange-600" />,
      actionText: "Setup Integrations",
      onClick: () => console.log("Navigate to integrations"),
    },
  ];

  const displayCards = cards || defaultCards;

  return (
    <div className="w-full bg-gray-50 p-6 rounded-xl">
      <h2 className="text-2xl font-bold mb-6">Quick Access</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayCards.map((card, index) => (
          <QuickAccessCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default QuickAccessGrid;
