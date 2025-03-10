import React, { useState } from "react";
import {
  Search,
  Plus,
  MoreVertical,
  Check,
  Clock,
  AlertTriangle,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Chatbot {
  id: string;
  name: string;
  status: "active" | "draft" | "paused";
  lastModified: string;
  description?: string;
}

interface ChatbotListProps {
  chatbots?: Chatbot[];
  onSelectChatbot?: (chatbot: Chatbot) => void;
  onCreateChatbot?: () => void;
  onEditChatbot?: (chatbot: Chatbot) => void;
  onDeleteChatbot?: (chatbot: Chatbot) => void;
  onDuplicateChatbot?: (chatbot: Chatbot) => void;
  selectedChatbotId?: string;
}

const ChatbotList: React.FC<ChatbotListProps> = ({
  chatbots = [
    {
      id: "1",
      name: "Customer Support Bot",
      status: "active",
      lastModified: "2023-06-15T10:30:00Z",
      description: "Handles common customer inquiries and support requests",
    },
    {
      id: "2",
      name: "Appointment Scheduler",
      status: "active",
      lastModified: "2023-06-10T14:45:00Z",
      description: "Books appointments and sends reminders",
    },
    {
      id: "3",
      name: "Product Catalog Bot",
      status: "draft",
      lastModified: "2023-06-05T09:15:00Z",
      description: "Showcases products and answers product-related questions",
    },
    {
      id: "4",
      name: "Lead Generation Bot",
      status: "paused",
      lastModified: "2023-05-28T16:20:00Z",
      description: "Qualifies leads and collects contact information",
    },
    {
      id: "5",
      name: "Order Status Tracker",
      status: "active",
      lastModified: "2023-05-20T11:10:00Z",
      description: "Provides updates on order status and delivery information",
    },
  ],
  onSelectChatbot = () => {},
  onCreateChatbot = () => {},
  onEditChatbot = () => {},
  onDeleteChatbot = () => {},
  onDuplicateChatbot = () => {},
  selectedChatbotId = "1",
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChatbots = chatbots.filter(
    (chatbot) =>
      chatbot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chatbot.description?.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Check className="h-4 w-4 text-green-500" />;
      case "draft":
        return <Clock className="h-4 w-4 text-amber-500" />;
      case "paused":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="default" className="bg-green-500">
            Active
          </Badge>
        );
      case "draft":
        return (
          <Badge variant="outline" className="text-amber-500 border-amber-500">
            Draft
          </Badge>
        );
      case "paused":
        return (
          <Badge variant="outline" className="text-red-500 border-red-500">
            Paused
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="h-full w-full bg-white border-r border-gray-200">
      <CardHeader className="px-4 py-3 space-y-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Chatbots</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onCreateChatbot}
                  className="h-8 w-8"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Create new chatbot</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search chatbots..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-180px)]">
          <div className="space-y-1 p-2">
            {filteredChatbots.length > 0 ? (
              filteredChatbots.map((chatbot) => (
                <div
                  key={chatbot.id}
                  className={`flex items-center justify-between p-3 rounded-md cursor-pointer transition-colors ${selectedChatbotId === chatbot.id ? "bg-blue-50" : "hover:bg-gray-50"}`}
                  onClick={() => onSelectChatbot(chatbot)}
                >
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(chatbot.status)}
                      <span className="font-medium">{chatbot.name}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span>
                        Last modified: {formatDate(chatbot.lastModified)}
                      </span>
                      {getStatusBadge(chatbot.status)}
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEditChatbot(chatbot)}>
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDuplicateChatbot(chatbot)}
                      >
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDeleteChatbot(chatbot)}
                        className="text-red-500 focus:text-red-500"
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <p className="text-muted-foreground mb-4">No chatbots found</p>
                <Button variant="outline" size="sm" onClick={onCreateChatbot}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create your first chatbot
                </Button>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default ChatbotList;
