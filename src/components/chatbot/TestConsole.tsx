import React, { useState } from "react";
import { Send, RefreshCw, Bug, Info, X } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface DebugInfo {
  triggeredFlow: string;
  matchedConditions: string[];
  processingTime: string;
  variables: Record<string, string>;
}

interface TestConsoleProps {
  chatbotId?: string;
  chatbotName?: string;
  onSendMessage?: (message: string) => void;
  onReset?: () => void;
}

const TestConsole: React.FC<TestConsoleProps> = ({
  chatbotId = "test-bot-1",
  chatbotName = "Sales Assistant Bot",
  onSendMessage = () => {},
  onReset = () => {},
}) => {
  const [inputMessage, setInputMessage] = useState("");
  const [activeTab, setActiveTab] = useState("conversation");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm your WhatsApp business assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(Date.now() - 60000),
    },
  ]);

  // Mock debug information
  const [debugInfo, setDebugInfo] = useState<DebugInfo>({
    triggeredFlow: "Welcome Flow",
    matchedConditions: ["First-time visitor", "Business hours"],
    processingTime: "230ms",
    variables: {
      customerName: "",
      intentDetected: "information_request",
      sentimentScore: "0.8",
      previousInteractions: "0",
    },
  });

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    onSendMessage(inputMessage);
    setInputMessage("");

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "Thank you for your message! I'm analyzing your request and will get back to you shortly.",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);

      // Update debug info
      setDebugInfo({
        triggeredFlow: "General Inquiry Flow",
        matchedConditions: ["Intent: Information", "Positive sentiment"],
        processingTime: "180ms",
        variables: {
          customerName: inputMessage.includes("name")
            ? "Extracted from message"
            : "",
          intentDetected: "information_request",
          sentimentScore: "0.7",
          previousInteractions: "1",
        },
      });
    }, 1000);
  };

  const handleReset = () => {
    setMessages([
      {
        id: "1",
        content:
          "Hello! I'm your WhatsApp business assistant. How can I help you today?",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
    setDebugInfo({
      triggeredFlow: "Welcome Flow",
      matchedConditions: ["First-time visitor", "Business hours"],
      processingTime: "230ms",
      variables: {
        customerName: "",
        intentDetected: "information_request",
        sentimentScore: "0.8",
        previousInteractions: "0",
      },
    });
    onReset();
  };

  return (
    <Card className="w-full h-full bg-white border-blue-100 shadow-md">
      <CardHeader className="border-b pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg text-blue-700">
              Test Console
            </CardTitle>
            <CardDescription>
              Test your chatbot configuration with simulated customer
              interactions
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-blue-50 text-blue-700">
              {chatbotName}
            </Badge>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={handleReset}>
                    <RefreshCw size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Reset conversation</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-[400px] grid-cols-2 mx-4 mt-2 mb-4">
            <TabsTrigger value="conversation">Conversation</TabsTrigger>
            <TabsTrigger value="debug">Debug Info</TabsTrigger>
          </TabsList>

          <TabsContent value="conversation" className="m-0">
            <div className="flex flex-col h-[350px]">
              <ScrollArea className="flex-1 p-4 bg-slate-50">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${message.sender === "user" ? "bg-blue-600 text-white" : "bg-white border border-gray-200 text-gray-800"}`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className="text-xs mt-1 opacity-70">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>

          <TabsContent value="debug" className="m-0">
            <div className="h-[350px] overflow-auto p-4 bg-slate-50">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium flex items-center gap-2">
                    <Bug size={16} className="text-orange-500" />
                    Triggered Flow
                  </h3>
                  <p className="text-sm mt-1 bg-white p-2 rounded border">
                    {debugInfo.triggeredFlow}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium flex items-center gap-2">
                    <Info size={16} className="text-blue-500" />
                    Matched Conditions
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {debugInfo.matchedConditions.map((condition, index) => (
                      <Badge key={index} variant="outline" className="bg-white">
                        {condition}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium">Processing Time</h3>
                  <p className="text-sm mt-1 bg-white p-2 rounded border">
                    {debugInfo.processingTime}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium">Variables</h3>
                  <div className="mt-2 bg-white rounded border overflow-hidden">
                    {Object.entries(debugInfo.variables).map(
                      ([key, value], index) => (
                        <React.Fragment key={key}>
                          {index > 0 && <Separator />}
                          <div className="p-2 flex justify-between">
                            <span className="text-sm font-medium">{key}</span>
                            <span className="text-sm">{value || "-"}</span>
                          </div>
                        </React.Fragment>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="border-t p-4">
        <div className="flex w-full gap-2">
          <Input
            placeholder="Type a test message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1"
          />
          <Button onClick={handleSendMessage}>
            <Send size={16} className="mr-2" />
            Send
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TestConsole;
