import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Save, Play, Settings } from "lucide-react";
import ChatbotList from "./ChatbotList";
import FlowDesigner from "./FlowDesigner";
import ResponseTemplates from "./ResponseTemplates";
import TestConsole from "./TestConsole";

interface ChatbotBuilderProps {
  selectedChatbotId?: string;
  onSaveChatbot?: () => void;
  onTestChatbot?: () => void;
}

const ChatbotBuilder: React.FC<ChatbotBuilderProps> = ({
  selectedChatbotId = "1",
  onSaveChatbot = () => {},
  onTestChatbot = () => {},
}) => {
  const [activeTab, setActiveTab] = useState("flow");
  const [selectedChatbot, setSelectedChatbot] = useState({
    id: "1",
    name: "Customer Support Bot",
    status: "active" as const,
    lastModified: "2023-06-15T10:30:00Z",
    description: "Handles common customer inquiries and support requests",
  });

  const handleSelectChatbot = (chatbot: any) => {
    setSelectedChatbot(chatbot);
  };

  const handleCreateChatbot = () => {
    console.log("Create new chatbot");
  };

  const handleEditChatbot = (chatbot: any) => {
    console.log("Edit chatbot", chatbot);
  };

  const handleDeleteChatbot = (chatbot: any) => {
    console.log("Delete chatbot", chatbot);
  };

  const handleDuplicateChatbot = (chatbot: any) => {
    console.log("Duplicate chatbot", chatbot);
  };

  return (
    <div className="flex h-full w-full bg-white">
      {/* Left sidebar with chatbot list */}
      <div className="w-80 border-r border-gray-200">
        <ChatbotList
          selectedChatbotId={selectedChatbot.id}
          onSelectChatbot={handleSelectChatbot}
          onCreateChatbot={handleCreateChatbot}
          onEditChatbot={handleEditChatbot}
          onDeleteChatbot={handleDeleteChatbot}
          onDuplicateChatbot={handleDuplicateChatbot}
        />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header with chatbot info and actions */}
        <div className="border-b border-gray-200 p-4 flex justify-between items-center bg-gray-50">
          <div>
            <h1 className="text-xl font-bold">{selectedChatbot.name}</h1>
            <p className="text-sm text-gray-500">
              {selectedChatbot.description}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onSaveChatbot}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" size="sm" onClick={onTestChatbot}>
              <Play className="h-4 w-4 mr-2" />
              Test
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>

        {/* Tabs for different sections */}
        <div className="p-4 border-b border-gray-200">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="flow">Flow Designer</TabsTrigger>
              <TabsTrigger value="templates">Response Templates</TabsTrigger>
              <TabsTrigger value="test">Test Console</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-auto">
          {activeTab === "flow" && <FlowDesigner />}
          {activeTab === "templates" && <ResponseTemplates />}
          {activeTab === "test" && (
            <TestConsole chatbotName={selectedChatbot.name} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatbotBuilder;
