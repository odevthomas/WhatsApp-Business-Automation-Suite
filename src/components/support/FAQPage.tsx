import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Search, HelpCircle, Plus, Minus } from "lucide-react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  isOpen?: boolean;
}

const FAQPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [faqs, setFaqs] = useState<FAQItem[]>([
    {
      id: "1",
      question: "Como conectar minha conta do WhatsApp?",
      answer:
        "Para conectar sua conta do WhatsApp, acesse a seção WhatsApp Bot no menu lateral, clique na aba 'Chat' e depois no botão 'Conectar'. Um QR Code será exibido na aba 'Logs'. Abra o WhatsApp no seu celular, vá em Configurações > Dispositivos conectados > Conectar um dispositivo e escaneie o QR Code exibido na tela. Aguarde a confirmação de conexão.",
      category: "Configuração",
    },
    {
      id: "2",
      question: "Qual modelo de IA é melhor para meu negócio?",
      answer:
        "A escolha do modelo de IA depende das suas necessidades específicas. O Google Gemini é geralmente mais econômico e adequado para casos de uso simples a moderados. Já o OpenAI GPT pode oferecer respostas mais sofisticadas para casos complexos, especialmente quando envolve compreensão de contexto mais profunda. Recomendamos testar ambos os modelos com seus casos de uso específicos para determinar qual oferece o melhor equilíbrio entre custo e qualidade para seu negócio.",
      category: "IA",
    },
    {
      id: "3",
      question: "Como criar um fluxo de conversação personalizado?",
      answer:
        "Para criar um fluxo de conversação personalizado, acesse a seção 'Chatbot IA' no menu lateral e selecione a aba 'Flow Designer'. Clique no botão '+' para adicionar um novo nó ao fluxo. Você pode adicionar diferentes tipos de nós: gatilho (para iniciar o fluxo), mensagem (para respostas do bot), condição (para criar ramificações baseadas em respostas do usuário) e ação (para executar operações como agendamento). Conecte os nós arrastando linhas entre eles para criar o fluxo lógico. Configure cada nó com conteúdo e condições específicas. Use a aba 'Test Console' para testar o fluxo antes de publicá-lo.",
      category: "Chatbot",
    },
    {
      id: "4",
      question: "Como classificar meus leads no Mini-CRM?",
      answer:
        "Para classificar seus leads no Mini-CRM, primeiro acesse a seção 'Mini-CRM' no menu lateral. Em seguida, vá para a aba 'Lead Classifications' para criar e gerenciar categorias de leads (como 'Hot Lead', 'Warm Lead', 'Cold Lead'). Defina critérios para cada categoria e atribua cores para identificação visual. Depois, volte para a lista de clientes, selecione um cliente e atribua a classificação apropriada na seção de detalhes do cliente. Você também pode filtrar a lista de clientes por classificação para visualizar todos os leads de uma determinada categoria.",
      category: "CRM",
    },
    {
      id: "5",
      question: "Como integrar com o Google Calendar?",
      answer:
        "Para integrar com o Google Calendar, acesse a seção 'Integrações' no menu lateral e clique em 'Google Calendar' no diretório de integrações. Clique em 'Conectar' e siga as instruções para autorizar o acesso à sua conta Google. Após a autorização, você poderá configurar as opções de sincronização, como frequência de sincronização, sincronização bidirecional e notificações de mudanças. Uma vez configurado, os agendamentos criados na plataforma serão automaticamente sincronizados com seu Google Calendar e vice-versa.",
      category: "Integrações",
    },
    {
      id: "6",
      question: "O que fazer quando o QR Code expira?",
      answer:
        "Se o QR Code expirar antes de ser escaneado, siga estes passos: 1) Clique em 'Desconectar' (se disponível) na interface do WhatsApp Bot; 2) Clique em 'Conectar' novamente para gerar um novo QR Code; 3) Escaneie o novo QR Code imediatamente com seu celular. É importante escanear o QR Code rapidamente após ser gerado, pois ele tem um tempo de validade limitado. Se continuar enfrentando problemas, verifique se o WhatsApp no seu celular está atualizado e se você está seguindo corretamente o processo de conexão de dispositivos.",
      category: "Solução de Problemas",
    },
    {
      id: "7",
      question: "Como personalizar as respostas do chatbot?",
      answer:
        "Para personalizar as respostas do chatbot, você tem várias opções: 1) Ajuste o prompt inicial nas configurações do bot (para Gemini ou GPT); 2) Crie templates de resposta na aba 'Response Templates' do Chatbot Builder; 3) Configure fluxos de conversação específicos no 'Flow Designer'; 4) Adicione variáveis dinâmicas usando a sintaxe {{nome_da_variavel}} para personalizar mensagens com informações do cliente. Para resultados mais precisos, forneça instruções claras sobre o tom, conhecimento e limites do bot no prompt inicial, e teste diferentes abordagens para encontrar o estilo que melhor se adapta ao seu negócio.",
      category: "Chatbot",
    },
    {
      id: "8",
      question: "Quantos usuários posso adicionar à plataforma?",
      answer:
        "O plano básico permite adicionar até 5 usuários à plataforma. Cada usuário terá suas próprias credenciais de login e você poderá definir diferentes níveis de permissão para cada um. Para adicionar mais de 5 usuários, é necessário atualizar para um plano superior. Para gerenciar usuários, acesse a seção 'Configurações' no menu lateral e selecione a aba 'Gerenciamento de Usuários', onde você poderá adicionar, editar ou remover usuários, bem como definir suas permissões.",
      category: "Geral",
    },
    {
      id: "9",
      question: "Como exportar dados de clientes para o Google Sheets?",
      answer:
        "Para exportar dados de clientes para o Google Sheets, primeiro configure a integração com Google Sheets na seção 'Integrações'. Depois, no Mini-CRM, selecione os clientes que deseja exportar (ou todos) e clique no botão 'Exportar' no topo da lista. Selecione 'Google Sheets' como destino e escolha se deseja criar uma nova planilha ou atualizar uma existente. Configure quais campos deseja exportar e clique em 'Exportar'. Os dados serão enviados para o Google Sheets e você receberá um link para acessar a planilha quando o processo for concluído.",
      category: "Integrações",
    },
    {
      id: "10",
      question: "Como configurar notificações de novas mensagens?",
      answer:
        "Para configurar notificações de novas mensagens, acesse a seção 'Configurações' no menu lateral e selecione a aba 'Notificações'. Lá você pode ativar ou desativar diferentes tipos de notificações, como novas mensagens, leads qualificados ou erros do sistema. Para cada tipo, você pode escolher receber notificações por email, notificações no navegador ou ambos. Também é possível configurar horários específicos para receber notificações e definir quais usuários devem ser notificados para cada tipo de evento.",
      category: "Configuração",
    },
  ]);

  // Toggle FAQ item
  const toggleFAQ = (id: string) => {
    setFaqs(
      faqs.map((faq) =>
        faq.id === id ? { ...faq, isOpen: !faq.isOpen } : faq,
      ),
    );
  };

  // Get unique categories
  const categories = Array.from(new Set(faqs.map((faq) => faq.category)));

  // Filter FAQs based on search and category
  const filteredFAQs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = !activeCategory || faq.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full h-full bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Perguntas Frequentes
        </h1>
        <p className="text-gray-500 mt-1">
          Encontre respostas para as dúvidas mais comuns
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>FAQ</CardTitle>
              <CardDescription>
                Perguntas e respostas frequentes
              </CardDescription>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar perguntas..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Categories sidebar */}
            <div className="md:w-64 space-y-2">
              <h3 className="font-medium mb-2">Categorias</h3>
              <div className="space-y-1">
                <div
                  className={`px-3 py-2 rounded-md cursor-pointer ${!activeCategory ? "bg-blue-50 text-blue-700" : "hover:bg-gray-100"}`}
                  onClick={() => setActiveCategory(null)}
                >
                  Todas as categorias
                </div>
                {categories.map((category) => (
                  <div
                    key={category}
                    className={`px-3 py-2 rounded-md cursor-pointer ${activeCategory === category ? "bg-blue-50 text-blue-700" : "hover:bg-gray-100"}`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ list */}
            <div className="flex-1">
              <ScrollArea className="h-[600px] pr-4">
                {filteredFAQs.length > 0 ? (
                  <div className="space-y-4">
                    {filteredFAQs.map((faq) => (
                      <div
                        key={faq.id}
                        className="border rounded-lg overflow-hidden"
                      >
                        <div
                          className={`p-4 flex justify-between items-center cursor-pointer ${faq.isOpen ? "bg-blue-50" : "bg-white"}`}
                          onClick={() => toggleFAQ(faq.id)}
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{faq.question}</h3>
                              <Badge variant="outline">{faq.category}</Badge>
                            </div>
                          </div>
                          <div>
                            {faq.isOpen ? (
                              <Minus className="h-5 w-5 text-blue-600" />
                            ) : (
                              <Plus className="h-5 w-5" />
                            )}
                          </div>
                        </div>
                        {faq.isOpen && (
                          <div className="p-4 bg-white border-t">
                            <p className="text-gray-700">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
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
              </ScrollArea>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FAQPage;
