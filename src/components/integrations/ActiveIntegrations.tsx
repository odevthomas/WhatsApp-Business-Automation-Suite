import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Settings,
  RefreshCw,
  AlertCircle,
  MoreVertical,
  Calendar,
  CreditCard,
  MessageSquare,
} from "lucide-react";

interface Integration {
  id: string;
  name: string;
  type: "calendar" | "payment" | "messaging" | "other";
  status: "connected" | "error" | "syncing";
  lastSync: string;
  isActive: boolean;
  icon: React.ReactNode;
}

interface ActiveIntegrationsProps {
  integrations?: Integration[];
  onConfigureIntegration?: (id: string) => void;
  onDisconnectIntegration?: (id: string) => void;
  onToggleIntegration?: (id: string, active: boolean) => void;
  onRefreshIntegration?: (id: string) => void;
}

const ActiveIntegrations: React.FC<ActiveIntegrationsProps> = ({
  integrations = [
    {
      id: "1",
      name: "Google Calendar",
      type: "calendar",
      status: "connected",
      lastSync: "10 minutes ago",
      isActive: true,
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      id: "2",
      name: "Stripe",
      type: "payment",
      status: "connected",
      lastSync: "1 hour ago",
      isActive: true,
      icon: <CreditCard className="h-5 w-5" />,
    },
    {
      id: "3",
      name: "Twilio",
      type: "messaging",
      status: "error",
      lastSync: "3 hours ago",
      isActive: false,
      icon: <MessageSquare className="h-5 w-5" />,
    },
  ],
  onConfigureIntegration = () => {},
  onDisconnectIntegration = () => {},
  onToggleIntegration = () => {},
  onRefreshIntegration = () => {},
}) => {
  const getStatusBadge = (status: Integration["status"]) => {
    switch (status) {
      case "connected":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Connected
          </Badge>
        );
      case "error":
        return <Badge variant="destructive">Error</Badge>;
      case "syncing":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            Syncing
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">Active Integrations</h2>
          <p className="text-muted-foreground">
            Manage your connected services and applications
          </p>
        </div>
        <Button variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh All
        </Button>
      </div>

      <div className="grid gap-4">
        {integrations.map((integration) => (
          <Card key={integration.id} className="overflow-hidden">
            <CardHeader className="p-4 pb-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-slate-100">
                    {integration.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg">
                      {integration.name}
                    </CardTitle>
                    <CardDescription>
                      Last synced: {integration.lastSync}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {getStatusBadge(integration.status)}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={integration.isActive}
                            onCheckedChange={(checked) =>
                              onToggleIntegration(integration.id, checked)
                            }
                          />
                          <span className="text-sm">
                            {integration.isActive ? "Active" : "Inactive"}
                          </span>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          {integration.isActive ? "Disable" : "Enable"}{" "}
                          integration
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  {integration.status === "error" && (
                    <div className="flex items-center text-destructive text-sm">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      Connection error. Please reconfigure.
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRefreshIntegration(integration.id)}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Sync Now
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onConfigureIntegration(integration.id)}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Configure
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => onConfigureIntegration(integration.id)}
                      >
                        Edit Settings
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDisconnectIntegration(integration.id)}
                        className="text-destructive"
                      >
                        Disconnect
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ActiveIntegrations;
