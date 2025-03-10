import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MessageSquare,
  Settings,
  Play,
  Pause,
  RefreshCw,
  Save,
  QrCode,
  Clock,
  CheckCheck,
  Smartphone,
  Bot,
  Code,
  Zap
} from "lucide-react";

const WhatsAppBot: React.FC = () => {
  const [activeTab, setActiveTab] = useState("chat");
  const [botStatus, setBotStatus] = useState<"connected" | "disconnected" | "connecting">("disconnected");
  const [selectedAI, setSelectedAI] = useState<"GEMINI" | "GPT">("GEMINI");
  const [geminiKey, setGeminiKey] = useState("");
  const [geminiPrompt, setGeminiPrompt] = useState("");
  const [openaiKey, setOpenaiKey] = useState("");
  const [openaiAssistant, setOpenaiAssistant] = useState("");
  const [responseDelay, setResponseDelay] = useState(15);
  const [autoReply, setAutoReply] = useState(true);

  // Dados de exemplo para a interface
  const conversations = [
    {
      id: "1",
      contact: "Maria Silva",
      phone: "+5511987654321",
      lastMessage: "Olá, gostaria de saber mais sobre os serviços de vocês",
      time: "10:30",
      unread: 3,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria"
    },
    {
      id: "2",
      contact: "João Pereira",
      phone: "+5511912345678",
      lastMessage: "Obrigado pelas informações!",
      time: "09:15",
      unread: 0,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Joao"
    },
    {
      id: "3",
      contact: "Ana Beatriz",
      phone: "+5511998765432",
      lastMessage: "Quando vocês têm disponibilidade para uma reunião?",
      time: "Ontem",
      unread: 1,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana"
    }
  ];

  const messages = [
    {
      id: "m1",
      text: "Olá, gostaria de saber mais sobre os serviços de vocês",
      time: "10:30",
      sender: "customer"
    },
    {
      id: "m2",
      text: "Olá! Sou o Eduardo, assistente virtual da empresa. Como posso ajudar você hoje?",
      time: "10:31",
      sender: "bot"
    },
    {
      id: "m3",
      text: "Vocês trabalham com desenvolvimento de sites?",
      time: "10:32",
      sender: "customer"
    },
    {
      id: "m4",
      text: "Sim! Trabalhamos com desenvolvimento de sites, aplicativos web e sistemas personalizados. Nosso foco principal é em aplicações web. Você tem algum projeto específico em mente?",
      time: "10:33",
      sender: "bot"
    }
  ];

  const handleConnect = () => {
    setBotStatus("connecting");
    // Simulando conexão
    setTimeout(() => {
      setBotStatus("connected");
    }, 3000);
  };

  const handleDisconnect = () => {
    setBotStatus("disconnected");
  };

  const handleSaveConfig = () => {
    // Aqui seria implementada a lógica para salvar as configurações
    alert("Configurações salvas com sucesso!");
  };

  return (
    <div className="w-full h-full bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Eduardo-zap-gpt</h1>
        <div className="flex items-center mt-2">
          <p className="text-gray-500 mr-3">Assistente virtual para WhatsApp</p>
          <Badge 
            variant={botStatus === "connected" ? "default" : botStatus === "connecting" ? "outline" : "secondary"}
            className={botStatus === "connected" ? "bg-green-500" : ""}
          >
            {botStatus === "connected" ? "Conectado" : botStatus === "connecting" ? "Conectando..." : "Desconectado"}
          </Badge>
          <div className="ml-auto">
            <p className="text-sm text-gray-500">Autor: Thomas Eduardo</p>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="chat">
            <MessageSquare className="h-4 w-4 mr-2" />
            Chat
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Settings className="h-4 w-4 mr-2" />
            Configurações
          </TabsTrigger>
          <TabsTrigger value="logs">
            <Code className="h-4 w-4 mr-2" />
            Logs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Painel de Status */}
            <Card className="md:col-span-3">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${botStatus === "connected" ? "bg-green-500" : botStatus === "connecting" ? "bg-yellow-500" : "bg-red-500"}`}></div>
                    <span className="font-medium">Status: {botStatus === "connected" ? "Conectado" : botStatus === "connecting" ? "Conectando..." : "Desconectado"}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Switch 
                        id="auto-reply" 
                        checked={autoReply} 
                        onCheckedChange={setAutoReply} 
                        disabled={botStatus !== "connected"}
                      />
                      <Label htmlFor="auto-reply">Resposta Automática</Label>
                    </div>
                    {botStatus === "connected" ? (
                      <Button variant="destructive" onClick={handleDisconnect}>
                        <Pause className="h-4 w-4 mr-2" />
                        Desconectar
                      </Button>
                    ) : (
                      <Button onClick={handleConnect} disabled={botStatus === "connecting"}>
                        {botStatus === "connecting" ? (
                          <>
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            Conectando...
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Conectar
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lista de Conversas */}
            <Card className="h-[600px]">
              <CardHeader>
                <CardTitle>Conversas</CardTitle>
                <CardDescription>Conversas ativas no WhatsApp</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px] pr-4">
                  <div className="space-y-2">
                    {conversations.map((conversation) => (
                      <div 
                        key={conversation.id} 
                        className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={conversation.avatar} alt={conversation.contact} />
                            <AvatarFallback>{conversation.contact.substring(0, 2)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <h3 className="font-medium truncate">{conversation.contact}</h3>
                              <span className="text-xs text-gray-500">{conversation.time}</span>
                            </div>
                            <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
                            <p className="text-xs text-gray-400">{conversation.phone}</p>
                          </div>
                          {conversation.unread > 0 && (
                            <Badge className="ml-auto bg-blue-500">{conversation.unread}</Badge>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Área de Chat */}
            <Card className="md:col-span-2 h-[600px] flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Maria" alt="Maria Silva" />
                    <AvatarFallback>MS</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>Maria Silva</CardTitle>
                    <CardDescription>+5511987654321</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 overflow-hidden">
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div 
                        key={message.id} 
                        className={`flex ${message.sender === "bot" ? "justify-end" : "justify-start"}`}
                      >
                        <div 
                          className={`max-w-[70%] rounded-lg p-3 ${message.sender === "bot" ? "bg-blue-600 text-white" : "bg-gray-100"}`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <div className={`flex items-center justify-end mt-1 text-xs ${message.sender === "bot" ? "text-blue-200" : "text-gray-500"}`}>
                            <span>{message.time}</span>
                            {message.sender === "bot" && (
                              <CheckCheck className="h-3 w-3 ml-1" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
              <div className="p-4 border-t">
                <div className="flex items-end gap-2">
                  <Textarea 
                    placeholder="Digite uma mensagem para testar o bot..."
                    className="min-h-[80px] flex-1"
                    disabled={botStatus !== "connected"}
                  />
                  <Button disabled={botStatus !== "connected"}>
                    <Zap className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configurações do Bot</CardTitle>
              <CardDescription>Configure as integrações e comportamento do bot</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Integração com IA</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div 
                    className={`p-4 border rounded-lg cursor-pointer ${selectedAI === "GEMINI" ? "border-blue-500 bg-blue-50" : ""}`}
                    onClick={() => setSelectedAI("GEMINI")}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Google Gemini</h4>
                      {selectedAI === "GEMINI" && (
                        <Badge className="bg-blue-500">Selecionado</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">Utilize o modelo Gemini Pro da Google para respostas.</p>
                  </div>
                  <div 
                    className={`p-4 border rounded-lg cursor-pointer ${selectedAI === "GPT" ? "border-blue-500 bg-blue-50" : ""}`}
                    onClick={() => setSelectedAI("GPT")}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">OpenAI GPT</h4>
                      {selectedAI === "GPT" && (
                        <Badge className="bg-blue-500">Selecionado</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">Utilize o modelo GPT da OpenAI para respostas.</p>
                  </div>
                </div>

                {selectedAI === "GEMINI" ? (
                  <div className="space-y-4 border p-4 rounded-lg">
                    <div>
                      <Label htmlFor="gemini-key">Chave da API Gemini</Label>
                      <Input 
                        id="gemini-key" 
                        placeholder="Insira sua chave da API Gemini" 
                        value={geminiKey}
                        onChange={(e) => setGeminiKey(e.target.value)}
                      />
                      <p className="text-xs text-gray-500 mt-1">Obtenha sua chave em: https://aistudio.google.com/app/apikey</p>
                    </div>
                    <div>
                      <Label htmlFor="gemini-prompt">Prompt Inicial</Label>
                      <Textarea 
                        id="gemini-prompt" 
                        placeholder="Insira o prompt inicial para o Gemini" 
                        value={geminiPrompt}
                        onChange={(e) => setGeminiPrompt(e.target.value)}
                        className="min-h-[100px]"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 border p-4 rounded-lg">
                    <div>
                      <Label htmlFor="openai-key">Chave da API OpenAI</Label>
                      <Input 
                        id="openai-key" 
                        placeholder="Insira sua chave da API OpenAI" 
                        value={openaiKey}
                        onChange={(e) => setOpenaiKey(e.target.value)}
                      />
                      <p className="text-xs text-gray-500 mt-1">Obtenha sua chave em: https://platform.openai.com/api-keys</p>
                    </div>
                    <div>
                      <Label htmlFor="openai-assistant">ID do Assistente</Label>
                      <Input 
                        id="openai-assistant" 
                        placeholder="Insira o ID do seu assistente OpenAI" 
                        value={openaiAssistant}
                        onChange={(e) => setOpenaiAssistant(e.target.value)}
                      />
                      <p className="text-xs text-gray-500 mt-1">Crie seu assistente em: https://platform.openai.com/assistants</p>
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Configurações de Resposta</h3>
                  <div className="border p-4 rounded-lg space-y-4">
                    <div>
                      <Label htmlFor="response-delay">Tempo de Espera para Resposta (segundos)</Label>
                      <div className="flex items-center gap-2">
                        <Input 
                          id="response-delay" 
                          type="number" 
                          min="5" 
                          max="60" 
                          value={responseDelay}
                          onChange={(e) => setResponseDelay(parseInt(e.target.value))}
                        />
                        <span className="text-sm text-gray-500">segundos</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Tempo que o bot aguarda antes de responder (para simular digitação)</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch id="auto-reply-setting" checked={autoReply} onCheckedChange={setAutoReply} />
                      <Label htmlFor="auto-reply-setting">Resposta Automática Ativada</Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <div className="p-6 border-t flex justify-end">
              <Button onClick={handleSaveConfig}>
                <Save className="h-4 w-4 mr-2" />
                Salvar Configurações
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Logs do Sistema</CardTitle>
              <CardDescription>Registros de atividade do bot</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px] w-full border rounded-md p-4 bg-black text-green-400 font-mono text-sm">
                <div className="space-y-2">
                  <p>[2023-06-15 10:30:15] Iniciando serviço...</p>
                  <p>[2023-06-15 10:30:18] Aguardando conexão com WhatsApp...</p>
                  <p>[2023-06-15 10:31:05] QR Code gerado para autenticação</p>
                  <p>[2023-06-15 10:32:30] Conexão estabelecida com sucesso!</p>
                  <p>[2023-06-15 10:35:12] Mensagem recebida de +5511987654321: "Olá, gostaria de saber mais sobre os serviços de vocês"</p>
                  <p>[2023-06-15 10:35:15] Processando mensagem...</p>
                  <p>[2023-06-15 10:35:20] Enviando resposta para +5511987654321</p>
                  <p>[2023-06-15 10:35:22] Resposta enviada com sucesso</p>
                  <p>[2023-06-15 10:37:05] Mensagem recebida de +5511987654321: "Vocês trabalham com desenvolvimento de sites?"</p>
                  <p>[2023-06-15 10:37:08] Processando mensagem...</p>
                  <p>[2023-06-15 10:37:15] Enviando resposta para +5511987654321</p>
                  <p>[2023-06-15 10:37:18] Resposta enviada com sucesso</p>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {botStatus === "disconnected" && (
            <Card>
              <CardHeader>
                <CardTitle>Conectar ao WhatsApp</CardTitle>
                <CardDescription>Escaneie o QR Code para conectar</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center">
                <div className="border p-8 rounded-lg mb-4">
                  <QrCode className="h-48 w-48" />
                </div>
                <p className="text-sm text-gray-500">Abra o WhatsApp no seu celular, vá em Configurações > Dispositivos conectados > Conectar um dispositivo</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WhatsAppBot;