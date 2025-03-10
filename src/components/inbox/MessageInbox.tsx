import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import {
  Search,
  Filter,
  Send,
  Paperclip,
  Smile,
  Clock,
  CheckCheck,
  User,
  Phone,
  Mail,
  Calendar,
  Tag,
  MessageSquare,
  Plus,
} from "lucide-react";

interface Conversation {
  id: string;
  contact: {
    id: string;
    name: string;
    phone: string;
    avatar?: string;
    status: "online" | "offline" | "away";
    lastSeen?: string;
  };
  lastMessage: {
    text: string;
    time: string;
    isRead: boolean;
    sender: "user" | "contact";
  };
  unreadCount: number;
  tags: string[];
  isStarred: boolean;
  status: "new" | "active" | "closed";
}

interface Message {
  id: string;
  text: string;
  time: string;
  sender: "user" | "contact";
  status: "sent" | "delivered" | "read";
  attachments?: {
    type: "image" | "document" | "audio";
    url: string;
    name: string;
  }[];
}

interface QuickReply {
  id: string;
  text: string;
}

const MessageInbox: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: "1",
      contact: {
        id: "c1",
        name: "Maria Silva",
        phone: "+55 11 98765-4321",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
        status: "online",
        lastSeen: "now",
      },
      lastMessage: {
        text: "Olá, gostaria de saber mais sobre os serviços de vocês",
        time: "10:30 AM",
        isRead: false,
        sender: "contact",
      },
      unreadCount: 3,
      tags: ["novo-lead"],
      isStarred: true,
      status: "new",
    },
    {
      id: "2",
      contact: {
        id: "c2",
        name: "João Pereira",
        phone: "+55 11 91234-5678",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Joao",
        status: "offline",
        lastSeen: "2 hours ago",
      },
      lastMessage: {
        text: "Obrigado pelas informações. Vou analisar e retorno em breve.",
        time: "Yesterday",
        isRead: true,
        sender: "contact",
      },
      unreadCount: 0,
      tags: ["em-andamento"],
      isStarred: false,
      status: "active",
    },
    {
      id: "3",
      contact: {
        id: "c3",
        name: "Ana Beatriz",
        phone: "+55 11 99876-5432",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
        status: "away",
        lastSeen: "5 minutes ago",
      },
      lastMessage: {
        text: "Quando vocês têm disponibilidade para uma reunião?",
        time: "Yesterday",
        isRead: true,
        sender: "contact",
      },
      unreadCount: 0,
      tags: ["agendamento"],
      isStarred: true,
      status: "active",
    },
  ]);

  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >("1");

  const [messages, setMessages] = useState<Record<string, Message[]>>({
    "1": [
      {
        id: "m1",
        text: "Olá, gostaria de saber mais sobre os serviços de vocês",
        time: "10:30 AM",
        sender: "contact",
        status: "read",
      },
      {
        id: "m2",
        text: "Vocês trabalham com desenvolvimento de sites?",
        time: "10:31 AM",
        sender: "contact",
        status: "read",
      },
      {
        id: "m3",
        text: "Olá Maria, tudo bem? Sim, trabalhamos com desenvolvimento de sites, apps e sistemas web.",
        time: "10:35 AM",
        sender: "user",
        status: "delivered",
      },
      {
        id: "m4",
        text: "Qual tipo de site você está precisando?",
        time: "10:35 AM",
        sender: "user",
        status: "delivered",
      },
      {
        id: "m5",
        text: "Preciso de um site para minha loja de roupas. Vocês fazem e-commerce?",
        time: "10:40 AM",
        sender: "contact",
        status: "read",
      },
    ],
    "2": [
      {
        id: "m1",
        text: "Bom dia, gostaria de um orçamento para um sistema de gestão",
        time: "Yesterday, 9:15 AM",
        sender: "contact",
        status: "read",
      },
      {
        id: "m2",
        text: "Bom dia João! Claro, podemos preparar um orçamento. Pode me dar mais detalhes sobre o que você precisa?",
        time: "Yesterday, 9:20 AM",
        sender: "user",
        status: "read",
      },
      {
        id: "m3",
        text: "Preciso de um sistema para controle de estoque e vendas",
        time: "Yesterday, 9:25 AM",
        sender: "contact",
        status: "read",
      },
      {
        id: "m4",
        text: "Entendi. Vou preparar uma proposta com as funcionalidades que conversamos e envio ainda hoje.",
        time: "Yesterday, 9:30 AM",
        sender: "user",
        status: "read",
      },
      {
        id: "m5",
        text: "Obrigado pelas informações. Vou analisar e retorno em breve.",
        time: "Yesterday, 2:45 PM",
        sender: "contact",
        status: "read",
      },
    ],
    "3": [
      {
        id: "m1",
        text: "Oi, gostei muito da proposta de vocês!",
        time: "Monday, 3:20 PM",
        sender: "contact",
        status: "read",
      },
      {
        id: "m2",
        text: "Olá Ana, que ótimo! Estamos à disposição para esclarecer qualquer dúvida.",
        time: "Monday, 3:25 PM",
        sender: "user",
        status: "read",
      },
      {
        id: "m3",
        text: "Quando vocês têm disponibilidade para uma reunião?",
        time: "Yesterday, 10:15 AM",
        sender: "contact",
        status: "read",
      },
    ],
  });

  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const quickReplies: QuickReply[] = [
    { id: "qr1", text: "Olá! Como posso ajudar?" },
    { id: "qr2", text: "Obrigado pelo contato. Em que posso ser útil?" },
    { id: "qr3", text: "Qual seu nome completo?" },
    { id: "qr4", text: "Poderia me informar seu email?" },
    { id: "qr5", text: "Posso te ajudar em algo mais?" },
    {
      id: "qr6",
      text: "Temos disponibilidade para reunião amanhã às 10h ou 15h. Qual horário prefere?",
    },
  ];

  const filteredConversations = conversations.filter((conversation) => {
    // Apply search filter
    const matchesSearch = conversation.contact.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    // Apply status filter
    let matchesFilter = true;
    if (activeFilter === "new") {
      matchesFilter = conversation.status === "new";
    } else if (activeFilter === "active") {
      matchesFilter = conversation.status === "active";
    } else if (activeFilter === "closed") {
      matchesFilter = conversation.status === "closed";
    } else if (activeFilter === "unread") {
      matchesFilter = conversation.unreadCount > 0;
    } else if (activeFilter === "starred") {
      matchesFilter = conversation.isStarred;
    }

    return matchesSearch && matchesFilter;
  });

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const newMsg: Message = {
      id: `m${Date.now()}`,
      text: newMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sender: "user",
      status: "sent",
    };

    // Update messages
    setMessages((prev) => ({
      ...prev,
      [selectedConversation]: [...(prev[selectedConversation] || []), newMsg],
    }));

    // Update conversation last message
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === selectedConversation
          ? {
              ...conv,
              lastMessage: {
                text: newMessage,
                time: new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
                isRead: true,
                sender: "user",
              },
            }
          : conv,
      ),
    );

    setNewMessage("");
  };

  const handleQuickReply = (text: string) => {
    setNewMessage(text);
  };

  const getSelectedConversation = () => {
    return (
      conversations.find((conv) => conv.id === selectedConversation) || null
    );
  };

  const currentConversation = getSelectedConversation();
  const currentMessages = selectedConversation
    ? messages[selectedConversation] || []
    : [];

  return (
    <div className="flex h-full bg-gray-50">
      {/* Conversations List */}
      <div className="w-1/3 border-r border-gray-200 bg-white flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold mb-4">Mensagens</h2>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar conversas..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Tabs
              defaultValue="all"
              value={activeFilter}
              onValueChange={setActiveFilter}
              className="w-full"
            >
              <TabsList className="grid grid-cols-5 w-full">
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="new">Novos</TabsTrigger>
                <TabsTrigger value="active">Ativos</TabsTrigger>
                <TabsTrigger value="unread">Não lidos</TabsTrigger>
                <TabsTrigger value="starred">Favoritos</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="divide-y">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-4 hover:bg-gray-50 cursor-pointer ${conversation.id === selectedConversation ? "bg-blue-50" : ""}`}
                onClick={() => setSelectedConversation(conversation.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <Avatar>
                      {conversation.contact.avatar ? (
                        <AvatarImage
                          src={conversation.contact.avatar}
                          alt={conversation.contact.name}
                        />
                      ) : (
                        <AvatarFallback>
                          {conversation.contact.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <span
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${conversation.contact.status === "online" ? "bg-green-500" : conversation.contact.status === "away" ? "bg-yellow-500" : "bg-gray-400"}`}
                    ></span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium truncate">
                        {conversation.contact.name}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {conversation.lastMessage.time}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      {conversation.lastMessage.sender === "user" && "Você: "}
                      {conversation.lastMessage.text}
                    </p>
                    <div className="flex items-center mt-1 gap-2">
                      {conversation.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-xs py-0 px-1.5"
                        >
                          {tag}
                        </Badge>
                      ))}
                      {conversation.unreadCount > 0 && (
                        <Badge className="ml-auto bg-blue-500 text-white">
                          {conversation.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      {selectedConversation ? (
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b bg-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                {currentConversation?.contact.avatar ? (
                  <AvatarImage
                    src={currentConversation.contact.avatar}
                    alt={currentConversation.contact.name}
                  />
                ) : (
                  <AvatarFallback>
                    {currentConversation?.contact.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                )}
              </Avatar>
              <div>
                <h3 className="font-medium">
                  {currentConversation?.contact.name}
                </h3>
                <div className="flex items-center text-xs text-gray-500">
                  {currentConversation?.contact.status === "online" ? (
                    <span className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                      Online
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      Visto por último: {currentConversation?.contact.lastSeen}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Phone className="h-4 w-4 mr-2" />
                Ligar
              </Button>
              <Button variant="outline" size="sm">
                <Calendar className="h-4 w-4 mr-2" />
                Agendar
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 flex overflow-hidden">
            <div className="flex-1 p-4 overflow-y-auto bg-gray-100">
              <div className="space-y-4">
                {currentMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${message.sender === "user" ? "bg-blue-600 text-white" : "bg-white"}`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <div
                        className={`flex items-center justify-end mt-1 text-xs ${message.sender === "user" ? "text-blue-200" : "text-gray-500"}`}
                      >
                        <span>{message.time}</span>
                        {message.sender === "user" && (
                          <CheckCheck
                            className={`h-3 w-3 ml-1 ${message.status === "read" ? "text-blue-300" : "text-blue-200"}`}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Info Sidebar */}
            <div className="w-80 border-l border-gray-200 bg-white p-4 overflow-y-auto">
              <h3 className="font-medium text-lg mb-4">
                Informações do Cliente
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-16 w-16">
                    {currentConversation?.contact.avatar ? (
                      <AvatarImage
                        src={currentConversation.contact.avatar}
                        alt={currentConversation.contact.name}
                      />
                    ) : (
                      <AvatarFallback>
                        {currentConversation?.contact.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <h4 className="font-medium">
                      {currentConversation?.contact.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      Cliente desde: Junho 2023
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <User className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Nome completo</p>
                      <p className="text-sm">
                        {currentConversation?.contact.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Telefone</p>
                      <p className="text-sm">
                        {currentConversation?.contact.phone}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="text-sm">
                        {currentConversation?.contact.name
                          .toLowerCase()
                          .replace(" ", ".") + "@gmail.com"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Tag className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Tags</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {currentConversation?.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-5 w-5 rounded-full"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Histórico de Interações</h4>
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-2 rounded-md">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="h-4 w-4 text-blue-500" />
                          <span className="text-sm font-medium">
                            Conversa iniciada
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">
                          10 Jun 2023
                        </span>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-2 rounded-md">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-green-500" />
                          <span className="text-sm font-medium">
                            Reunião agendada
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">
                          15 Jun 2023
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Notas</h4>
                  <Textarea
                    placeholder="Adicionar notas sobre este cliente..."
                    className="min-h-[100px] text-sm"
                  />
                  <Button className="w-full mt-2" size="sm">
                    Salvar Notas
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Message Input */}
          <div className="p-4 border-t bg-white">
            <div className="mb-2">
              <h4 className="text-sm font-medium mb-1">Respostas Rápidas</h4>
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply) => (
                  <Button
                    key={reply.id}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickReply(reply.text)}
                  >
                    {reply.text}
                  </Button>
                ))}
              </div>
            </div>
            <div className="flex items-end gap-2">
              <Textarea
                placeholder="Digite sua mensagem..."
                className="min-h-[80px] flex-1"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <div className="flex flex-col gap-2">
                <Button variant="outline" size="icon">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Smile className="h-4 w-4" />
                </Button>
                <Button onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center p-6">
            <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Selecione uma conversa
            </h3>
            <p className="text-gray-500">
              Escolha uma conversa da lista para começar a interagir
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageInbox;
