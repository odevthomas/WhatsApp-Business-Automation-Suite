import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Save,
  Play,
  Settings,
  MessageSquare,
  ArrowRight,
  Clock,
  AlertCircle,
  Trash2,
  Move,
  ChevronDown,
  ChevronRight,
  Edit,
} from "lucide-react";

interface Node {
  id: string;
  type: "trigger" | "message" | "condition" | "action";
  title: string;
  content?: string;
  position: { x: number; y: number };
  options?: { text: string; nextNodeId?: string }[];
  condition?: string;
  nextNodeId?: string;
}

interface Connection {
  id: string;
  from: string;
  to: string;
  label?: string;
}

const ChatbotFlowEditor: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>([
    {
      id: "1",
      type: "trigger",
      title: "Início da Conversa",
      content: "Quando um cliente inicia uma conversa",
      position: { x: 100, y: 100 },
      nextNodeId: "2",
    },
    {
      id: "2",
      type: "message",
      title: "Mensagem de Boas-vindas",
      content: "Olá! Bem-vindo à nossa empresa. Como posso ajudar você hoje?",
      position: { x: 100, y: 250 },
      options: [
        { text: "Informações sobre produtos", nextNodeId: "3" },
        { text: "Suporte técnico", nextNodeId: "4" },
        { text: "Falar com atendente", nextNodeId: "5" },
      ],
    },
    {
      id: "3",
      type: "message",
      title: "Informações de Produtos",
      content: "Temos diversos produtos disponíveis. Qual categoria você tem interesse?",
      position: { x: 400, y: 100 },
      options: [
        { text: "Categoria A" },
        { text: "Categoria B" },
        { text: "Voltar ao menu principal", nextNodeId: "2" },
      ],
    },
    {
      id: "4",
      type: "message",
      title: "Suporte Técnico",
      content: "Para suporte técnico, por favor descreva o problema que está enfrentando.",
      position: { x: 400, y: 250 },
      nextNodeId: "6",
    },
    {
      id: "5",
      type: "action",
      title: "Transferir para Atendente",
      content: "Transferindo conversa para um atendente humano...",
      position: { x: 400, y: 400 },
    },
    {
      id: "6",
      type: "condition",
      title: "Verificar Horário Comercial",
      condition: "É horário comercial?",
      position: { x: 700, y: 250 },
      options: [
        { text: "Sim", nextNodeId: "5" },
        { text: "Não", nextNodeId: "7" },
      ],
    },
    {
      id: "7",
      type: "message",
      title: "Fora do Horário",
      content: "Estamos fora do horário comercial. Um atendente responderá sua mensagem em breve.",
      position: { x: 700, y: 400 },
    },
  ]);

  const [connections, setConnections] = useState<Connection[]>(
    generateConnectionsFromNodes(nodes)
  );

  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [nodeBeingEdited, setNodeBeingEdited] = useState<Node | null>(null);

  function generateConnectionsFromNodes(nodes: Node[]): Connection[] {
    const connections: Connection[] = [];
    let connectionId = 1;

    nodes.forEach((node) => {
      if (node.nextNodeId) {
        connections.push({
          id: `c${connectionId++}`,
          from: node.id,
          to: node.nextNodeId,
        });
      }

      if (node.options) {
        node.options.forEach((option) => {
          if (option.nextNodeId) {
            connections.push({
              id: `c${connectionId++}`,
              from: node.id,
              to: option.nextNodeId,
              label: option.text,
            });
          }
        });
      }
    });

    return connections;
  }

  const handleNodeClick = (nodeId: string) => {
    setSelectedNode(nodeId);
    setEditMode(false);
  };

  const handleEditNode = () => {
    if (selectedNode) {
      const node = nodes.find((n) => n.id === selectedNode);
      if (node) {
        setNodeBeingEdited({ ...node });
        setEditMode(true);
      }
    }
  };

  const handleSaveNode = () => {
    if (nodeBeingEdited) {
      setNodes((prev) =>
        prev.map((node) =>
          node.id === nodeBeingEdited.id ? nodeBeingEdited : node
        )
      );
      setEditMode(false);
      setNodeBeingEdited(null);
      // Regenerate connections
      setConnections(generateConnectionsFromNodes(nodes));
    }
  };

  const handleAddNode = (type: Node["type"]) => {
    const newId = `${nodes.length + 1}`;
    const newNode: Node = {
      id: newId,
      type,
      title: `Novo ${type === "trigger" ? "Gatilho" : type === "message" ? "Mensagem" : type === "condition" ? "Condição" : "Ação"}`,
      content: "",
      position: { x: 100, y: 100 + nodes.length * 50 },
    };

    if (type === "message") {
      newNode.options = [];
    } else if (type === "condition") {
      newNode.condition = "";
      newNode.options = [
        { text: "Sim" },
        { text: "Não" },
      ];
    }

    setNodes([...nodes, newNode]);
    setSelectedNode(newId);
  };

  const handleDeleteNode = () => {
    if (selectedNode) {
      setNodes(nodes.filter((node) => node.id !== selectedNode));
      setConnections(connections.filter(
        (conn) => conn.from !== selectedNode && conn.to !== selectedNode
      ));
      setSelectedNode(null);
    }
  };

  const handleAddOption = () => {
    if (nodeBeingEdited && (nodeBeingEdited.type === "message" || nodeBeingEdited.type === "condition")) {
      setNodeBeingEdited({
        ...nodeBeingEdited,
        options: [
          ...(nodeBeingEdited.options || []),
          { text: "Nova opção" },
        ],
      });
    }
  };

  const handleUpdateOption = (index: number, text: string, nextNodeId?: string) => {
    if (nodeBeingEdited && nodeBeingEdited.options) {
      const updatedOptions = [...nodeBeingEdited.options];
      updatedOptions[index] = { text, nextNodeId };
      setNodeBeingEdited({
        ...nodeBeingEdited,
        options: updatedOptions,
      });
    }
  };

  const handleDeleteOption = (index: number) => {
    if (nodeBeingEdited && nodeBeingEdited.options) {
      setNodeBeingEdited({
        ...nodeBeingEdited,
        options: nodeBeingEdited.options.filter((_, i) => i !== index),
      });
    }
  };

  const getNodeIcon = (type: Node["type"]) => {
    switch (type) {
      case "trigger":
        return <Clock className="h-5 w-5 text-amber-500" />;
      case "message":
        return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case "condition":
        return <AlertCircle className="h-5 w-5 text-purple-500" />;
      case "action":
        return <Settings className="h-5 w-5 text-green-500" />;
      default:
        return <MessageSquare className="h-5 w-5" />;
    }
  };

  const getNodeColor = (type: Node["type"]) => {
    switch (type) {
      case "trigger":
        return "border-amber-200 bg-amber-50";
      case "message":
        return "border-blue-200 bg-blue-50";
      case "condition":
        return "border-purple-200 bg-purple-50";
      case "action":
        return "border-green-200 bg-green-50";
      default:
        return "border-gray-200";
    }
  };

  const getNodeTypeName = (type: Node["type"]) => {
    switch (type) {
      case "trigger":
        return "Gatilho";
      case "message":
        return "Mensagem";
      case "condition":
        return "Condição";
      case "action":
        return "Ação";
      default:
        return type;
    }
  };

  return (
    <div className="flex h-full bg-gray-50">
      {/* Left Sidebar - Node Types */}
      <div className="w-64 bg-white border-r border-gray-200 p-4">
        <h2 className="text-lg font-bold mb-4">Elementos</h2>
        <div className="space-y-2">
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => handleAddNode("trigger")}
          >
            <Clock className="h-4 w-4 mr-2 text-amber-500" />
            Gatilho
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => handleAddNode("message")}
          >
            <MessageSquare className="h-4 w-4 mr-2 text-blue-500" />
            Mensagem
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => handleAddNode("condition")}
          >
            <AlertCircle className="h-4 w-4 mr-2 text-purple-500" />
            Condição
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => handleAddNode("action")}
          >
            <Settings className="h-4 w-4 mr-2 text-green-500" />
            Ação
          </Button>
        </div>

        <div className="mt-8">
          <h3 className="text-sm font-medium mb-2">Fluxos Salvos</h3>
          <div className="space-y-2">
            <div className="p-2 border rounded-md hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Atendimento Básico</span>
                <ChevronRight className="h-4 w-4" />
              </div>
              <p className="text-xs text-gray-500">Fluxo padrão de atendimento</p>
            </div>
            <div className="p-2 border rounded-md hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">FAQ Produtos</span>
                <ChevronRight className="h-4 w-4" />
              </div>
              <p className="text-xs text-gray-500">Perguntas frequentes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Flow Editor */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-bold mr-4">Editor de Fluxo</h1>
            <Input
              placeholder="Nome do fluxo"
              className="w-64"
              defaultValue="Fluxo de Atendimento Principal"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Save className="h-4 w-4 mr-2" />
              Salvar
            </Button>
            <Button>
              <Play className="h-4 w-4 mr-2" />
              Testar Fluxo
            </Button>
          </div>
        </div>

        {/* Flow Editor Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* Canvas */}
          <div className="flex-1 relative overflow-auto p-4">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "radial-gradient(#e2e8f0 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }}
            >
              {/* Render connections */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="10"
                    markerHeight="7"
                    refX="9"
                    refY="3.5"
                    orient="auto"
                  >
                    <polygon points="0 0, 10 3.5, 0 7" fill="#94a3b8" />
                  </marker>
                </defs>
                {connections.map((conn) => {
                  const fromNode = nodes.find((n) => n.id === conn.from);
                  const toNode = nodes.find((n) => n.id === conn.to);
                  if (!fromNode || !toNode) return null;

                  const fromX = fromNode.position.x + 150;
                  const fromY = fromNode.position.y + 50;
                  const toX = toNode.position.x;
                  const toY = toNode.position.y + 50;

                  const path = `M${fromX},${fromY} C${fromX + 100},${fromY} ${toX - 100},${toY} ${toX},${toY}`;

                  return (
                    <g key={conn.id}>
                      <path
                        d={path}
                        stroke="#94a3b8"
                        strokeWidth="2"
                        fill="none"
                        markerEnd="url(#arrowhead)"
                      />
                      {conn.label && (
                        <text
                          x={(fromX + toX) / 2}
                          y={(fromY + toY) / 2 - 10}
                          textAnchor="middle"
                          fill="#64748b"
                          fontSize="12"
                          className="bg-white px-1"
                        >
                          {conn.label}
                        </text>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Render nodes */}
              {nodes.map((node) => (
                <div
                  key={node.id}
                  className={`absolute w-[300px] rounded-md border-2 ${getNodeColor(node.type)} ${selectedNode === node.id ? "ring-2 ring-blue-500" : ""}`}
                  style={{
                    left: node.position.x,
                    top: node.position.y,
                  }}
                  onClick={() => handleNodeClick(node.id)}
                >
                  <div className="p-3 border-b border-gray-200 flex items-center justify-between">
                    <div className="flex items-center">
                      {getNodeIcon(node.type)}
                      <span className="ml-2 font-medium">{node.title}</span>
                    </div>
                    <Badge variant="outline">{getNodeTypeName(node.type)}</Badge>
                  </div>
                  <div className="p-3">
                    {node.type === "message" && (
                      <p className="text-sm">{node.content}</p>
                    )}
                    {node.type === "condition" && (
                      <div>
                        <p className="text-sm font-medium mb-2">{node.condition}</p>
                        <div className="space-y-1">
                          {node.options?.map((option, index) => (
                            <div key={index} className="flex items-center text-sm">
                              <ArrowRight className="h-3 w-3 mr-1" />
                              <span>{option.text}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {node.type === "trigger" && (
                      <p className="text-sm">{node.content}</p>
                    )}
                    {node.type === "action" && (
                      <p className="text-sm">{node.content}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Properties Panel */}
          <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
            {selectedNode && !editMode ? (
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold">Propriedades</h2>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleEditNode}>
                      <Edit className="h-4 w-4 mr-1" /> Editar
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDeleteNode}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {nodes
                  .filter((node) => node.id === selectedNode)
                  .map((node) => (
                    <div key={node.id} className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium mb-1">Tipo</h3>
                        <div className="flex items-center">
                          {getNodeIcon(node.type)}
                          <span className="ml-2">{getNodeTypeName(node.type)}</span>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium mb-1">Título</h3>
                        <p className="text-sm">{node.title}</p>
                      </div>

                      {node.content && (
                        <div>
                          <h3 className="text-sm font-medium mb-1">Conteúdo</h3>