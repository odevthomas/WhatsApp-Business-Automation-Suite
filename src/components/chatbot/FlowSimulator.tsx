import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Play, RefreshCw, Bug, Info, ArrowRight } from "lucide-react";
import WhatsAppPreview from "./WhatsAppPreview";
import { t } from "@/lib/i18n";

interface FlowNode {
  id: string;
  type: "trigger" | "message" | "condition" | "action";
  title: string;
  content?: string;
  options?: { text: string; nextNodeId?: string }[];
  condition?: string;
  nextNodeId?: string;
}

interface FlowSimulatorProps {
  flowNodes: FlowNode[];
  startNodeId?: string;
  onReset?: () => void;
}

interface Message {
  id: string;
  content: string | React.ReactNode;
  sender: "user" | "bot";
  timestamp: Date;
  status?: "sent" | "delivered" | "read";
}

const FlowSimulator: React.FC<FlowSimulatorProps> = ({
  flowNodes = [],
  startNodeId = "",
  onReset = () => {},
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentNodeId, setCurrentNodeId] = useState<string | null>(null);
  const [userOptions, setUserOptions] = useState<
    { text: string; nextNodeId?: string }[]
  >([]);
  const [activeTab, setActiveTab] = useState("preview");
  const [executionPath, setExecutionPath] = useState<string[]>([]);
  const [variables, setVariables] = useState<Record<string, string>>({});

  // Initialize the flow
  useEffect(() => {
    if (flowNodes.length > 0) {
      resetFlow();
    }
  }, [flowNodes, startNodeId]);

  const resetFlow = () => {
    setMessages([]);
    setExecutionPath([]);
    setVariables({});

    // Find the start node
    const initialNodeId = startNodeId || findStartNode();
    if (initialNodeId) {
      processNode(initialNodeId);
    }

    onReset();
  };

  const findStartNode = (): string => {
    // Find the first trigger node
    const triggerNode = flowNodes.find((node) => node.type === "trigger");
    return triggerNode?.id || flowNodes[0]?.id || "";
  };

  const processNode = (nodeId: string) => {
    const node = flowNodes.find((n) => n.id === nodeId);
    if (!node) return;

    setCurrentNodeId(nodeId);
    setExecutionPath((prev) => [...prev, nodeId]);

    switch (node.type) {
      case "message":
        // Add bot message
        const botMessage: Message = {
          id: Date.now().toString(),
          content: replaceVariables(node.content || ""),
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);

        // Set user options if available
        if (node.options && node.options.length > 0) {
          setUserOptions(node.options);
        } else if (node.nextNodeId) {
          // Automatically proceed to next node after a delay
          setTimeout(() => {
            processNode(node.nextNodeId!);
          }, 1000);
        }
        break;

      case "condition":
        // For simulation, we'll just show the condition and options
        const conditionMessage: Message = {
          id: Date.now().toString(),
          content: (
            <div>
              <div className="font-medium">{node.title}</div>
              <div className="text-gray-500">{node.condition}</div>
            </div>
          ),
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, conditionMessage]);

        // Set condition options
        if (node.options && node.options.length > 0) {
          setUserOptions(node.options);
        }
        break;

      case "action":
        // Simulate an action
        const actionMessage: Message = {
          id: Date.now().toString(),
          content: (
            <div>
              <Badge className="mb-1 bg-green-500">
                {t("action_executed")}
              </Badge>
              <div>{node.content || node.title}</div>
            </div>
          ),
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, actionMessage]);

        // Proceed to next node if available
        if (node.nextNodeId) {
          setTimeout(() => {
            processNode(node.nextNodeId!);
          }, 1000);
        }
        break;

      case "trigger":
        // Just show the trigger message
        const triggerMessage: Message = {
          id: Date.now().toString(),
          content: (
            <div>
              <Badge className="mb-1 bg-blue-500">{t("flow_started")}</Badge>
              <div>{node.content || node.title}</div>
            </div>
          ),
          sender: "bot",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, triggerMessage]);

        // Proceed to next node if available
        if (node.nextNodeId) {
          setTimeout(() => {
            processNode(node.nextNodeId!);
          }, 1000);
        }
        break;
    }
  };

  const handleUserResponse = (optionIndex: number) => {
    const selectedOption = userOptions[optionIndex];

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: selectedOption.text,
      sender: "user",
      timestamp: new Date(),
      status: "read",
    };
    setMessages((prev) => [...prev, userMessage]);

    // Clear options
    setUserOptions([]);

    // Process next node if available
    if (selectedOption.nextNodeId) {
      setTimeout(() => {
        processNode(selectedOption.nextNodeId!);
      }, 500);
    }
  };

  const handleCustomMessage = (message: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: "user",
      timestamp: new Date(),
      status: "read",
    };
    setMessages((prev) => [...prev, userMessage]);

    // For custom messages, we'll simulate a default response
    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now().toString(),
        content: t("custom_message_response"),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  // Replace variables in text with their values
  const replaceVariables = (text: string): string => {
    return text.replace(/\{\{(\w+)\}\}/g, (match, variable) => {
      return variables[variable] || `[${variable}]`;
    });
  };

  // Get node details for debug view
  const getNodeDetails = (nodeId: string) => {
    return flowNodes.find((node) => node.id === nodeId);
  };

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>{t("flow_simulator")}</CardTitle>
            <CardDescription>{t("test_your_chatbot_flow")}</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={resetFlow}>
              <RefreshCw className="h-4 w-4 mr-2" />
              {t("reset")}
            </Button>
            <Button variant="default" size="sm">
              <Play className="h-4 w-4 mr-2" />
              {t("start_test")}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="preview">{t("whatsapp_preview")}</TabsTrigger>
            <TabsTrigger value="debug">{t("debug_info")}</TabsTrigger>
          </TabsList>

          <TabsContent value="preview">
            <div className="flex flex-col items-center">
              <WhatsAppPreview
                messages={messages}
                onSendMessage={handleCustomMessage}
              />

              {userOptions.length > 0 && (
                <div className="mt-4 space-y-2 w-full max-w-md">
                  <p className="text-sm font-medium">
                    {t("available_responses")}:
                  </p>
                  <div className="space-y-2">
                    {userOptions.map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => handleUserResponse(index)}
                      >
                        <ArrowRight className="h-4 w-4 mr-2" />
                        {option.text}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="debug">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">
                    {t("execution_path")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-2">
                      {executionPath.map((nodeId, index) => {
                        const node = getNodeDetails(nodeId);
                        return (
                          <div key={index} className="p-2 border rounded-md">
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{index + 1}</Badge>
                              <div>
                                <p className="font-medium">
                                  {node?.title || nodeId}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {t("node_type")}: {node?.type}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">
                    {t("current_node_details")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {currentNodeId ? (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium flex items-center gap-2">
                          <Info className="h-4 w-4 text-blue-500" />
                          {t("node_id")}
                        </h3>
                        <p className="text-sm mt-1 bg-gray-50 p-2 rounded border">
                          {currentNodeId}
                        </p>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium flex items-center gap-2">
                          <Bug className="h-4 w-4 text-orange-500" />
                          {t("node_properties")}
                        </h3>
                        <div className="mt-2 bg-gray-50 rounded border overflow-hidden">
                          {Object.entries(
                            getNodeDetails(currentNodeId) || {},
                          ).map(([key, value], index) => {
                            if (key === "options" && Array.isArray(value)) {
                              return (
                                <div key={key} className="p-2 border-b">
                                  <span className="text-sm font-medium">
                                    {key}:{" "}
                                  </span>
                                  <div className="pl-4">
                                    {value.map((opt, i) => (
                                      <div key={i} className="text-sm">
                                        - {opt.text}{" "}
                                        {opt.nextNodeId
                                          ? `→ ${opt.nextNodeId}`
                                          : ""}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              );
                            }

                            return (
                              <div
                                key={key}
                                className="p-2 border-b last:border-0"
                              >
                                <span className="text-sm font-medium">
                                  {key}:{" "}
                                </span>
                                <span className="text-sm">
                                  {typeof value === "object"
                                    ? JSON.stringify(value)
                                    : String(value)}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium">
                          {t("variables")}
                        </h3>
                        <div className="mt-2 bg-gray-50 rounded border overflow-hidden">
                          {Object.keys(variables).length > 0 ? (
                            Object.entries(variables).map(
                              ([key, value], index) => (
                                <div
                                  key={key}
                                  className="p-2 border-b last:border-0"
                                >
                                  <span className="text-sm font-medium">
                                    {key}:{" "}
                                  </span>
                                  <span className="text-sm">{value}</span>
                                </div>
                              ),
                            )
                          ) : (
                            <div className="p-2 text-sm text-gray-500">
                              {t("no_variables_set")}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      {t("no_node_selected")}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>

      <CardFooter className="flex justify-between border-t pt-4">
        <p className="text-sm text-gray-500">{t("simulation_disclaimer")}</p>
      </CardFooter>
    </Card>
  );
};

export default FlowSimulator;
