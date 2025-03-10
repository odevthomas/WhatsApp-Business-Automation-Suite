import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  HelpCircle,
  FileText,
  MessageSquare,
  Mail,
  Phone,
  ExternalLink,
  Download,
  Upload,
  Save,
} from "lucide-react";
import ArticleViewer from "./ArticleViewer";

const SupportPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("help");
  const [searchQuery, setSearchQuery] = useState("");
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketDescription, setTicketDescription] = useState("");
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [viewingArticleId, setViewingArticleId] = useState<string | null>(null);

  const helpArticles = [
    {
      id: "1",
      title: "Como conectar o WhatsApp",
      category: "Configuração",
      content:
        "Para conectar sua conta do WhatsApp, acesse a seção WhatsApp Bot, clique em 'Conectar' e escaneie o QR Code com seu celular...",
    },
    {
      id: "2",
      title: "Configurando o Chatbot com IA",
      category: "Chatbot",
      content:
        "Para configurar seu chatbot com IA, você precisa primeiro obter uma chave de API do Google Gemini ou OpenAI...",
    },
    {
      id: "3",
      title: "Gerenciando leads no Mini-CRM",
      category: "CRM",
      content:
        "O Mini-CRM permite organizar seus leads em diferentes categorias. Para criar uma nova classificação de lead...",
    },
    {
      id: "4",
      title: "Integrando com Google Calendar",
      category: "Integrações",
      content:
        "Para integrar com o Google Calendar, acesse a seção Integrações, clique em Google Calendar e siga as instruções...",
    },
    {
      id: "5",
      title: "Problemas comuns de conexão",
      category: "Solução de Problemas",
      content:
        "Se você está enfrentando problemas de conexão com o WhatsApp, verifique se o QR Code está atualizado...",
    },
  ];

  const filteredArticles = helpArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui seria implementada a lógica para enviar o ticket
    console.log("Ticket enviado:", { ticketSubject, ticketDescription });
    setTicketSubmitted(true);
    setTimeout(() => {
      setTicketSubject("");
      setTicketDescription("");
      setTicketSubmitted(false);
    }, 3000);
  };

  // Função para simular exportação de dados
  const handleExportData = () => {
    alert("Dados exportados com sucesso! O arquivo foi baixado.");
  };

  // Função para simular upload de arquivo
  const handleFileUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        alert(`Arquivo "${file.name}" enviado com sucesso!`);
      }
    };
    input.click();
  };

  // Função para simular salvamento de dados
  const handleSaveData = () => {
    alert("Dados salvados com sucesso!");
  };

  if (viewingArticleId) {
    return (
      <ArticleViewer
        articleId={viewingArticleId}
        onBack={() => setViewingArticleId(null)}
      />
    );
  }

  return (
    <div className="w-full h-full bg-gray-50 p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Suporte</h1>
          <p className="text-gray-500 mt-1">
            Encontre ajuda e recursos para usar a plataforma
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleExportData}>
            <Download className="h-4 w-4 mr-2" /> Exportar
          </Button>
          <Button variant="outline" onClick={handleFileUpload}>
            <Upload className="h-4 w-4 mr-2" /> Upload
          </Button>
          <Button onClick={handleSaveData}>
            <Save className="h-4 w-4 mr-2" /> Salvar
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="help">
            <HelpCircle className="h-4 w-4 mr-2" />
            Central de Ajuda
          </TabsTrigger>
          <TabsTrigger value="docs">
            <FileText className="h-4 w-4 mr-2" />
            Documentação
          </TabsTrigger>
          <TabsTrigger value="ticket">
            <MessageSquare className="h-4 w-4 mr-2" />
            Abrir Ticket
          </TabsTrigger>
          <TabsTrigger value="contact">
            <Mail className="h-4 w-4 mr-2" />
            Contato
          </TabsTrigger>
        </TabsList>

        <TabsContent value="help" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Central de Ajuda</CardTitle>
              <CardDescription>
                Encontre respostas para perguntas frequentes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <Input
                  placeholder="Buscar artigos de ajuda..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="max-w-md"
                />
              </div>

              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-4">
                  {filteredArticles.length > 0 ? (
                    filteredArticles.map((article) => (
                      <Card key={article.id}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium">{article.title}</h3>
                            <Badge variant="outline">{article.category}</Badge>
                          </div>
                          <p className="text-sm text-gray-600">
                            {article.content}
                          </p>
                          <Button
                            variant="link"
                            className="p-0 h-auto mt-2"
                            onClick={() => setViewingArticleId(article.id)}
                          >
                            Ler artigo completo
                          </Button>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <HelpCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-700 mb-2">
                        Nenhum resultado encontrado
                      </h3>
                      <p className="text-gray-500">
                        Tente buscar com outros termos ou navegue por todas as
                        categorias
                      </p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="docs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Documentação</CardTitle>
              <CardDescription>
                Guias detalhados e referências técnicas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <FileText className="h-8 w-8 text-blue-500" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">
                      Guia de Início Rápido
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Aprenda os conceitos básicos e comece a usar a plataforma
                      em minutos.
                    </p>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setViewingArticleId("1")}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" /> Acessar Guia
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <FileText className="h-8 w-8 text-green-500" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">
                      Documentação Completa
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Documentação detalhada sobre todas as funcionalidades da
                      plataforma.
                    </p>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setViewingArticleId("2")}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" /> Acessar
                      Documentação
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <FileText className="h-8 w-8 text-purple-500" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">
                      Guia do Desenvolvedor
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Informações técnicas para desenvolvedores que desejam
                      estender a plataforma.
                    </p>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setViewingArticleId("3")}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" /> Acessar Guia
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ticket" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Abrir Ticket de Suporte</CardTitle>
              <CardDescription>
                Envie uma solicitação para nossa equipe de suporte
              </CardDescription>
            </CardHeader>
            <CardContent>
              {ticketSubmitted ? (
                <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-md">
                  <h3 className="font-medium mb-2">
                    Ticket enviado com sucesso!
                  </h3>
                  <p>Nossa equipe de suporte entrará em contato em breve.</p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmitTicket}
                  className="space-y-4 max-w-2xl"
                >
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium mb-1"
                    >
                      Assunto
                    </label>
                    <Input
                      id="subject"
                      value={ticketSubject}
                      onChange={(e) => setTicketSubject(e.target.value)}
                      placeholder="Ex: Problema de conexão com WhatsApp"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium mb-1"
                    >
                      Descrição
                    </label>
                    <Textarea
                      id="description"
                      value={ticketDescription}
                      onChange={(e) => setTicketDescription(e.target.value)}
                      placeholder="Descreva seu problema em detalhes..."
                      className="min-h-[200px]"
                      required
                    />
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Enviar Ticket
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações de Contato</CardTitle>
              <CardDescription>
                Entre em contato com nossa equipe de suporte
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-100 rounded-full">
                        <Mail className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Email</h3>
                        <p className="text-sm text-gray-500 mb-2">
                          Para dúvidas gerais e suporte
                        </p>
                        <a
                          href="mailto:suporte@whatsapp-automation.com"
                          className="text-blue-600 hover:underline"
                        >
                          suporte@whatsapp-automation.com
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-green-100 rounded-full">
                        <Phone className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Telefone</h3>
                        <p className="text-sm text-gray-500 mb-2">
                          Disponível em dias úteis, 9h às 18h
                        </p>
                        <a
                          href="tel:+551199999999"
                          className="text-green-600 hover:underline"
                        >
                          +55 11 9999-9999
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-purple-100 rounded-full">
                        <MessageSquare className="h-6 w-6 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium mb-1">Chat ao Vivo</h3>
                        <p className="text-sm text-gray-500 mb-4">
                          Converse com um especialista em tempo real
                        </p>
                        <Button>
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Iniciar Chat
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupportPage;
