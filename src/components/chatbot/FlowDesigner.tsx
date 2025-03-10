import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Minus,
  Save,
  Play,
  Settings,
  Trash2,
  ArrowRight,
  MessageSquare,
  BellRing,
  ArrowDown,
  ArrowUp,
  Move,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

interface Node {
  id: string;
  type: "trigger" | "response" | "condition" | "action";
  title: string;
  position: { x: number; y: number };
  content?: string;
}

interface Connection {
  id: string;
  from: string;
  to: string;
}

interface FlowDesignerProps {
  nodes?: Node[];
  connections?: Connection[];
  onSave?: (nodes: Node[], connections: Connection[]) => void;
}

const FlowDesigner: React.FC<FlowDesignerProps> = ({
  nodes = [
    {
      id: "1",
      type: "trigger",
      title: "New Message",
      position: { x: 100, y: 100 },
    },
    {
      id: "2",
      type: "response",
      title: "Welcome Message",
      position: { x: 400, y: 100 },
      content: "Hello! How can I help you today?",
    },
    {
      id: "3",
      type: "condition",
      title: "Check Intent",
      position: { x: 400, y: 300 },
    },
    {
      id: "4",
      type: "action",
      title: "Schedule Appointment",
      position: { x: 700, y: 300 },
    },
  ],
  connections = [
    { id: "c1", from: "1", to: "2" },
    { id: "c2", from: "2", to: "3" },
    { id: "c3", from: "3", to: "4" },
  ],
  onSave = () => {},
}) => {
  const [flowNodes, setFlowNodes] = useState<Node[]>(nodes);
  const [flowConnections, setFlowConnections] =
    useState<Connection[]>(connections);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [draggingNode, setDraggingNode] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Node type to icon mapping
  const nodeIcons = {
    trigger: <BellRing className="h-5 w-5 text-yellow-500" />,
    response: <MessageSquare className="h-5 w-5 text-blue-500" />,
    condition: <ArrowRight className="h-5 w-5 text-purple-500" />,
    action: <Settings className="h-5 w-5 text-green-500" />,
  };

  // Handle node selection
  const handleNodeClick = (nodeId: string) => {
    setSelectedNode(nodeId === selectedNode ? null : nodeId);
  };

  // Start dragging a node
  const handleNodeDragStart = (e: React.MouseEvent, nodeId: string) => {
    e.stopPropagation();
    setDraggingNode(nodeId);
    const node = flowNodes.find((n) => n.id === nodeId);
    if (node) {
      const rect = (e.target as HTMLElement).getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  // Handle node dragging
  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggingNode) {
      setFlowNodes((prev) =>
        prev.map((node) => {
          if (node.id === draggingNode) {
            return {
              ...node,
              position: {
                x: e.clientX - dragOffset.x,
                y: e.clientY - dragOffset.y,
              },
            };
          }
          return node;
        }),
      );
    }
  };

  // End dragging
  const handleMouseUp = () => {
    setDraggingNode(null);
  };

  // Add a new node
  const addNode = (type: Node["type"]) => {
    const newId = `node-${Date.now()}`;
    const newNode: Node = {
      id: newId,
      type,
      title: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
      position: { x: 200, y: 200 },
    };
    setFlowNodes([...flowNodes, newNode]);
    setSelectedNode(newId);
  };

  // Delete a node
  const deleteNode = (nodeId: string) => {
    setFlowNodes(flowNodes.filter((node) => node.id !== nodeId));
    setFlowConnections(
      flowConnections.filter(
        (conn) => conn.from !== nodeId && conn.to !== nodeId,
      ),
    );
    if (selectedNode === nodeId) {
      setSelectedNode(null);
    }
  };

  // Render connections between nodes
  const renderConnections = () => {
    return flowConnections.map((conn) => {
      const fromNode = flowNodes.find((n) => n.id === conn.from);
      const toNode = flowNodes.find((n) => n.id === conn.to);

      if (!fromNode || !toNode) return null;

      const fromX = fromNode.position.x + 150; // Assuming node width is 300px
      const fromY = fromNode.position.y + 50; // Assuming node height is 100px
      const toX = toNode.position.x;
      const toY = toNode.position.y + 50;

      return (
        <svg
          key={conn.id}
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
        >
          <path
            d={`M${fromX},${fromY} C${fromX + 100},${fromY} ${toX - 100},${toY} ${toX},${toY}`}
            stroke="#94a3b8"
            strokeWidth="2"
            fill="none"
            markerEnd="url(#arrowhead)"
          />
        </svg>
      );
    });
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden bg-slate-50 flex flex-col"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 border-b bg-white">
        <div className="flex items-center space-x-2">
          <h2 className="text-xl font-semibold">Flow Designer</h2>
        </div>
        <div className="flex items-center space-x-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setScale((prev) => Math.max(0.5, prev - 0.1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Zoom Out</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <span className="text-sm">{Math.round(scale * 100)}%</span>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setScale((prev) => Math.min(2, prev + 0.1))}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Zoom In</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onSave(flowNodes, flowConnections)}
                >
                  <Save className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Save Flow</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm">
                  <Play className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Test Flow</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Node Type Palette */}
      <div className="absolute left-4 top-24 bg-white rounded-lg shadow-md p-2 z-10">
        <div className="flex flex-col space-y-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start"
                  onClick={() => addNode("trigger")}
                >
                  {nodeIcons.trigger}
                  <span className="ml-2">Trigger</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Add Trigger Node</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start"
                  onClick={() => addNode("response")}
                >
                  {nodeIcons.response}
                  <span className="ml-2">Response</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Add Response Node</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start"
                  onClick={() => addNode("condition")}
                >
                  {nodeIcons.condition}
                  <span className="ml-2">Condition</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Add Condition Node</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start"
                  onClick={() => addNode("action")}
                >
                  {nodeIcons.action}
                  <span className="ml-2">Action</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>Add Action Node</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Canvas */}
      <div
        className="flex-1 relative overflow-auto"
        style={{
          backgroundImage: "radial-gradient(#e2e8f0 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      >
        <div
          className="absolute min-w-full min-h-full"
          style={{
            transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
            transformOrigin: "0 0",
          }}
        >
          {/* SVG Definitions for arrows */}
          <svg width="0" height="0">
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="10"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
              </marker>
            </defs>
          </svg>

          {/* Render connections */}
          {renderConnections()}

          {/* Render nodes */}
          {flowNodes.map((node) => (
            <motion.div
              key={node.id}
              className={`absolute cursor-move w-[300px] ${selectedNode === node.id ? "ring-2 ring-blue-500" : ""}`}
              style={{
                left: node.position.x,
                top: node.position.y,
                zIndex: selectedNode === node.id ? 10 : 1,
              }}
              onClick={() => handleNodeClick(node.id)}
              onMouseDown={(e) => handleNodeDragStart(e, node.id)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="h-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 py-3">
                  <div className="flex items-center">
                    {nodeIcons[node.type]}
                    <CardTitle className="ml-2 text-sm font-medium">
                      {node.title}
                    </CardTitle>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <Move className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Settings className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => deleteNode(node.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  {node.type === "response" && (
                    <div className="text-sm bg-gray-50 p-2 rounded border">
                      {node.content || "Add response message here..."}
                    </div>
                  )}
                  {node.type === "condition" && (
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center text-sm">
                        <ArrowDown className="h-4 w-4 mr-2 text-green-500" />
                        <span>If true</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <ArrowUp className="h-4 w-4 mr-2 text-red-500" />
                        <span>If false</span>
                      </div>
                    </div>
                  )}
                  {node.type === "action" && (
                    <div className="text-sm">Configure action parameters</div>
                  )}
                  {node.type === "trigger" && (
                    <div className="text-sm">This node starts the flow</div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlowDesigner;
