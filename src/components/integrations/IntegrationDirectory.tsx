import React from "react";
import {
  Search,
  Calendar,
  CreditCard,
  BarChart3,
  Link,
  Plus,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface IntegrationCardProps {
  name: string;
  description: string;
  logo: string;
  category: string;
  isConnected: boolean;
}

const IntegrationCard = ({
  name = "Integration Name",
  description = "This is a description of what this integration does and how it can help your business.",
  logo = "https://api.dicebear.com/7.x/avataaars/svg?seed=integration",
  category = "general",
  isConnected = false,
}: IntegrationCardProps) => {
  return (
    <Card className="w-full h-full bg-white overflow-hidden flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
              <img src={logo} alt={name} className="w-10 h-10 object-contain" />
            </div>
            <div>
              <CardTitle className="text-lg">{name}</CardTitle>
              <Badge
                variant={isConnected ? "default" : "outline"}
                className="mt-1"
              >
                {isConnected ? "Connected" : "Not Connected"}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="line-clamp-3">
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter className="pt-2 border-t">
        <Button
          variant={isConnected ? "outline" : "default"}
          size="sm"
          className="w-full"
        >
          {isConnected ? "Configure" : "Connect"}
        </Button>
      </CardFooter>
    </Card>
  );
};

const IntegrationDirectory = () => {
  // Default integration data
  const integrations = [
    {
      name: "Google Calendar",
      description:
        "Sync appointments and schedule meetings directly from your dashboard.",
      logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=gcal",
      category: "calendar",
      isConnected: true,
    },
    {
      name: "Stripe",
      description: "Process payments and manage subscriptions with ease.",
      logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=stripe",
      category: "payment",
      isConnected: false,
    },
    {
      name: "Mailchimp",
      description:
        "Automate email marketing campaigns based on customer interactions.",
      logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=mailchimp",
      category: "marketing",
      isConnected: false,
    },
    {
      name: "Salesforce",
      description: "Sync customer data and interactions with your CRM system.",
      logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=salesforce",
      category: "crm",
      isConnected: true,
    },
    {
      name: "Shopify",
      description:
        "Connect your online store to automate product inquiries and order updates.",
      logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=shopify",
      category: "ecommerce",
      isConnected: false,
    },
    {
      name: "Zoom",
      description:
        "Schedule and manage video meetings directly from customer conversations.",
      logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=zoom",
      category: "communication",
      isConnected: false,
    },
    {
      name: "QuickBooks",
      description:
        "Streamline invoicing and payment tracking for your business.",
      logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=quickbooks",
      category: "finance",
      isConnected: false,
    },
    {
      name: "HubSpot",
      description:
        "Sync contacts and marketing automation with your WhatsApp interactions.",
      logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=hubspot",
      category: "marketing",
      isConnected: true,
    },
  ];

  // Category icons mapping
  const categoryIcons = {
    calendar: <Calendar className="h-5 w-5" />,
    payment: <CreditCard className="h-5 w-5" />,
    marketing: <BarChart3 className="h-5 w-5" />,
    crm: <BarChart3 className="h-5 w-5" />,
    ecommerce: <CreditCard className="h-5 w-5" />,
    communication: <Link className="h-5 w-5" />,
    finance: <CreditCard className="h-5 w-5" />,
    general: <Link className="h-5 w-5" />,
  };

  return (
    <div className="w-full bg-gray-50 p-6 rounded-lg">
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Integration Directory</h2>
          <div className="flex items-center space-x-2">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search integrations..."
                className="pl-8"
              />
            </div>
            <Button variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Request Integration
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
            <TabsTrigger value="marketing">Marketing</TabsTrigger>
            <TabsTrigger value="crm">CRM</TabsTrigger>
            <TabsTrigger value="connected">Connected</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {integrations.map((integration, index) => (
                <IntegrationCard key={index} {...integration} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="calendar" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {integrations
                .filter((integration) => integration.category === "calendar")
                .map((integration, index) => (
                  <IntegrationCard key={index} {...integration} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="payment" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {integrations
                .filter((integration) => integration.category === "payment")
                .map((integration, index) => (
                  <IntegrationCard key={index} {...integration} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="marketing" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {integrations
                .filter((integration) => integration.category === "marketing")
                .map((integration, index) => (
                  <IntegrationCard key={index} {...integration} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="crm" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {integrations
                .filter((integration) => integration.category === "crm")
                .map((integration, index) => (
                  <IntegrationCard key={index} {...integration} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="connected" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {integrations
                .filter((integration) => integration.isConnected)
                .map((integration, index) => (
                  <IntegrationCard key={index} {...integration} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default IntegrationDirectory;
