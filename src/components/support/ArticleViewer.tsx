import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Save, Share2 } from "lucide-react";

interface ArticleViewerProps {
  articleId: string;
  onBack: () => void;
}

const ArticleViewer: React.FC<ArticleViewerProps> = ({ articleId, onBack }) => {
  // Dados de exemplo - em uma aplicação real, estes viriam de uma API
  const articles = {
    "1": {
      title: "Como conectar o WhatsApp",
      category: "Configuração",
      content: `
        <h1>Como conectar sua conta do WhatsApp</h1>
        
        <p>Para conectar sua conta do WhatsApp à plataforma, siga os passos abaixo:</p>
        
        <h2>Passo 1: Acesse a seção WhatsApp Bot</h2>
        <p>No menu lateral, clique em "WhatsApp Bot" para acessar a interface de configuração do bot.</p>
        
        <h2>Passo 2: Inicie a conexão</h2>
        <p>Na aba "Chat", clique no botão "Conectar". O sistema começará a preparar a conexão.</p>
        
        <h2>Passo 3: Escaneie o QR Code</h2>
        <p>Um QR Code será exibido na aba "Logs". Abra o WhatsApp no seu celular e siga estes passos:</p>
        <ul>
          <li>Vá em Configurações (os três pontos no canto superior direito)</li>
          <li>Selecione "Dispositivos conectados"</li>
          <li>Toque em "Conectar um dispositivo"</li>
          <li>Aponte a câmera do seu celular para o QR Code exibido na tela</li>
        </ul>
        
        <h2>Passo 4: Aguarde a confirmação</h2>
        <p>Após escanear o QR Code, aguarde alguns segundos até que a conexão seja estabelecida. O status mudará para "Conectado" quando o processo for concluído com sucesso.</p>
        
        <h2>Dicas importantes:</h2>
        <ul>
          <li>O QR Code expira após alguns minutos. Se isso acontecer, clique em "Conectar" novamente para gerar um novo código.</li>
          <li>Certifique-se de que seu celular está conectado à internet durante o processo.</li>
          <li>Para melhor desempenho, mantenha o celular conectado à energia e ao Wi-Fi.</li>
          <li>Evite usar o WhatsApp Web em outros dispositivos simultaneamente.</li>
        </ul>
        
        <p>Após a conexão ser estabelecida, o bot estará pronto para receber e responder mensagens automaticamente.</p>
      `,
      author: "Equipe de Suporte",
      datePublished: "2023-10-15",
      lastUpdated: "2024-05-20",
    },
    "2": {
      title: "Configurando o Chatbot com IA",
      category: "Chatbot",
      content: `
        <h1>Configurando seu Chatbot com Inteligência Artificial</h1>
        
        <p>Este guia explica como configurar seu chatbot para utilizar modelos de IA para respostas automáticas.</p>
        
        <h2>Escolhendo seu modelo de IA</h2>
        <p>Nossa plataforma suporta dois modelos principais de IA:</p>
        <ul>
          <li><strong>Google Gemini</strong>: Geralmente mais econômico e adequado para casos de uso simples a moderados.</li>
          <li><strong>OpenAI GPT</strong>: Oferece respostas mais sofisticadas para casos complexos, especialmente quando envolve compreensão de contexto mais profunda.</li>
        </ul>
        
        <h2>Configurando o Google Gemini</h2>
        <ol>
          <li>Acesse a seção "WhatsApp Bot" no menu lateral</li>
          <li>Clique na aba "Configurações"</li>
          <li>Selecione "GEMINI" como a IA a ser utilizada</li>
          <li>Obtenha uma chave de API do Google Gemini em <a href="https://aistudio.google.com/app/apikey" target="_blank">Google AI Studio</a></li>
          <li>Cole a chave no campo "Chave da API Gemini"</li>
          <li>No campo "Prompt Inicial", insira as instruções para o comportamento do bot</li>
          <li>Clique em "Salvar Configurações"</li>
        </ol>
        
        <h2>Configurando o OpenAI GPT</h2>
        <ol>
          <li>Acesse a seção "WhatsApp Bot" no menu lateral</li>
          <li>Clique na aba "Configurações"</li>
          <li>Selecione "GPT" como a IA a ser utilizada</li>
          <li>Obtenha uma chave de API da OpenAI em <a href="https://platform.openai.com/api-keys" target="_blank">OpenAI API Keys</a></li>
          <li>Cole a chave no campo "Chave da API OpenAI"</li>
          <li>Crie um assistente na OpenAI em <a href="https://platform.openai.com/assistants" target="_blank">OpenAI Assistants</a></li>
          <li>Copie o ID do assistente e cole no campo "ID do Assistente"</li>
          <li>Clique em "Salvar Configurações"</li>
        </ol>
        
        <h2>Criando um prompt eficaz</h2>
        <p>Um bom prompt inicial é crucial para o desempenho do seu chatbot. Aqui está um exemplo:</p>
        <pre>
        Você é Eduardo, um assistente virtual amigável para uma empresa de desenvolvimento web. 
        Seja sempre cordial e informal. Você tem conhecimento em desenvolvimento web e mobile, 
        mas seu foco é em aplicações web. Não aceite projetos relacionados a transporte, 
        mas sugira recursos ou especialistas para esses casos. Mesmo para perguntas 
        fora do contexto, seja educado e ofereça sugestões úteis.
        </pre>
        
        <h2>Testando seu chatbot</h2>
        <p>Após configurar a IA, use a aba "Test Console" no Chatbot Builder para testar diferentes cenários de conversa antes de colocar o bot em produção.</p>
      `,
      author: "Equipe de Desenvolvimento",
      datePublished: "2023-11-05",
      lastUpdated: "2024-06-10",
    },
    "3": {
      title: "Gerenciando leads no Mini-CRM",
      category: "CRM",
      content: `
        <h1>Gerenciando Leads no Mini-CRM</h1>
        
        <p>O Mini-CRM permite organizar seus leads em diferentes categorias e acompanhar todo o histórico de interações.</p>
        
        <h2>Criando classificações de leads</h2>
        <ol>
          <li>Acesse a seção "Mini-CRM" no menu lateral</li>
          <li>Vá para a aba "Lead Classifications"</li>
          <li>Clique em "Add Classification" para criar uma nova categoria</li>
          <li>Preencha os campos:
            <ul>
              <li>Nome (ex: "Hot Lead", "Warm Lead", "Cold Lead")</li>
              <li>Descrição</li>
              <li>Cor (para identificação visual)</li>
              <li>Critérios (características que definem esta categoria)</li>
            </ul>
          </li>
          <li>Clique em "Save Classification"</li>
        </ol>
        
        <h2>Adicionando um novo lead</h2>
        <ol>
          <li>Na lista de clientes, clique em "Add Customer"</li>
          <li>Preencha as informações básicas do lead (nome, email, telefone)</li>
          <li>Selecione uma classificação inicial</li>
          <li>Adicione tags relevantes para facilitar a busca</li>
          <li>Clique em "Save"</li>
        </ol>
        
        <h2>Gerenciando informações do lead</h2>
        <p>Ao clicar em um lead na lista, você terá acesso a várias abas:</p>
        <ul>
          <li><strong>Overview</strong>: Informações gerais e dados de contato</li>
          <li><strong>Conversations</strong>: Histórico de conversas via WhatsApp</li>
          <li><strong>Appointments</strong>: Agendamentos e reuniões</li>
          <li><strong>Notes</strong>: Anotações sobre o lead</li>
        </ul>
        
        <h2>Exportando dados de leads</h2>
        <p>Para exportar seus leads:</p>
        <ol>
          <li>Na lista de clientes, use os filtros para selecionar os leads desejados</li>
          <li>Clique no botão "Export" no canto superior direito</li>
          <li>Selecione o formato de exportação (CSV, Excel, Google Sheets)</li>
          <li>Configure quais campos deseja incluir na exportação</li>
          <li>Clique em "Export" para baixar o arquivo ou enviar para o destino selecionado</li>
        </ol>
        
        <h2>Importando leads</h2>
        <p>Para importar leads de outras fontes:</p>
        <ol>
          <li>Na lista de clientes, clique no botão "Import"</li>
          <li>Selecione o arquivo de origem (CSV, Excel)</li>
          <li>Mapeie as colunas do arquivo com os campos do sistema</li>
          <li>Defina uma classificação padrão para os novos leads</li>
          <li>Clique em "Import" para iniciar o processo</li>
        </ol>
        
        <p>Após a importação, você receberá um relatório com o número de leads importados com sucesso e possíveis erros.</p>
      `,
      author: "Equipe de CRM",
      datePublished: "2023-12-10",
      lastUpdated: "2024-05-15",
    },
    "4": {
      title: "Integrando com Google Calendar",
      category: "Integrações",
      content: `
        <h1>Integrando com Google Calendar</h1>
        
        <p>A integração com o Google Calendar permite sincronizar agendamentos entre a plataforma e seu calendário Google.</p>
        
        <h2>Configurando a integração</h2>
        <ol>
          <li>Acesse a seção "Integrações" no menu lateral</li>
          <li>Localize "Google Calendar" no diretório de integrações</li>
          <li>Clique em "Conectar"</li>
          <li>Você será redirecionado para fazer login na sua conta Google</li>
          <li>Autorize o acesso ao Google Calendar</li>
          <li>Após a autorização, você retornará à plataforma</li>
        </ol>
        
        <h2>Configurando opções de sincronização</h2>
        <p>Após conectar sua conta, você pode configurar as seguintes opções:</p>
        <ul>
          <li><strong>Frequência de sincronização</strong>: Em tempo real, a cada hora, diariamente ou manual</li>
          <li><strong>Sincronização bidirecional</strong>: Permite que alterações feitas em qualquer plataforma sejam refletidas na outra</li>
          <li><strong>Incluir informações do cliente</strong>: Adiciona detalhes do cliente nos eventos do calendário</li>
          <li><strong>Notificações de mudanças</strong>: Receba alertas quando eventos forem alterados</li>
        </ul>
        
        <h2>Criando agendamentos</h2>
        <p>Para criar um agendamento que será sincronizado com o Google Calendar:</p>
        <ol>
          <li>Acesse os detalhes de um cliente no Mini-CRM</li>
          <li>Vá para a aba "Appointments"</li>
          <li>Clique em "Schedule Appointment"</li>
          <li>Preencha os detalhes do agendamento:
            <ul>
              <li>Título</li>
              <li>Data e hora</li>
              <li>Duração</li>
              <li>Notas</li>
            </ul>
          </li>
          <li>Marque a opção "Sync with Google Calendar"</li>
          <li>Clique em "Save"</li>
        </ol>
        
        <h2>Visualizando agendamentos</h2>
        <p>Os agendamentos sincronizados aparecerão:</p>
        <ul>
          <li>No Google Calendar com o prefixo "[WhatsApp Pro]"</li>
          <li>Na aba "Appointments" do cliente no Mini-CRM</li>
          <li>No Dashboard em "Upcoming Tasks"</li>
        </ul>
        
        <h2>Solução de problemas</h2>
        <p>Se encontrar problemas com a sincronização:</p>
        <ol>
          <li>Verifique se a autorização ainda está ativa em "Integrações > Google Calendar > Status"</li>
          <li>Clique em "Reconectar" se a autorização expirou</li>
          <li>Use o botão "Sync Now" para forçar uma sincronização manual</li>
          <li>Verifique os logs de sincronização em "Integrações > Google Calendar > Logs"</li>
        </ol>
      `,
      author: "Equipe de Integrações",
      datePublished: "2024-01-20",
      lastUpdated: "2024-06-05",
    },
    "5": {
      title: "Problemas comuns de conexão",
      category: "Solução de Problemas",
      content: `
        <h1>Solucionando Problemas Comuns de Conexão</h1>
        
        <p>Este guia ajuda a resolver os problemas mais comuns relacionados à conexão com o WhatsApp.</p>
        
        <h2>QR Code expira rapidamente</h2>
        <p><strong>Problema:</strong> O QR Code expira antes que você consiga escaneá-lo.</p>
        <p><strong>Solução:</strong></p>
        <ol>
          <li>Clique em "Desconectar" (se disponível) na interface do WhatsApp Bot</li>
          <li>Clique em "Conectar" novamente para gerar um novo QR Code</li>
          <li>Tenha o WhatsApp aberto no seu celular e pronto para escanear</li>
          <li>Escaneie o QR Code imediatamente após ser gerado</li>
        </ol>
        
        <h2>Desconexões frequentes</h2>
        <p><strong>Problema:</strong> O bot desconecta frequentemente do WhatsApp.</p>
        <p><strong>Solução:</strong></p>
        <ol>
          <li>Verifique a conexão com a internet do servidor onde a plataforma está hospedada</li>
          <li>Certifique-se de que o WhatsApp no celular está atualizado</li>
          <li>Evite usar o WhatsApp Web em outros dispositivos simultaneamente</li>
          <li>Mantenha o celular conectado à energia e ao Wi-Fi</li>
          <li>Desative o modo de economia de bateria no celular</li>
        </ol>
        
        <h2>Mensagens não são enviadas</h2>
        <p><strong>Problema:</strong> O bot não consegue enviar mensagens.</p>
        <p><strong>Solução:</strong></p>
        <ol>
          <li>Verifique se o bot está conectado (status "Conectado")</li>
          <li>Verifique os logs na aba "Logs" para identificar erros específicos</li>
          <li>Certifique-se de que o número de telefone está no formato correto (com código do país, ex: +5511987654321)</li>
          <li>Verifique se o número de destino tem WhatsApp ativo</li>
          <li>Tente reconectar o bot (Desconectar > Conectar)</li>
        </ol>
        
        <h2>Erros de API</h2>
        <p><strong>Problema:</strong> Erros relacionados às APIs de IA (Gemini ou OpenAI).</p>
        <p><strong>Solução:</strong></p>
        <ol>
          <li>Verifique se a chave de API está correta nas configurações</li>
          <li>Confirme se há saldo suficiente na sua conta (especialmente para OpenAI)</li>
          <li>Verifique os limites de uso da API (rate limits)</li>
          <li>Tente usar uma chave de API diferente</li>
          <li>Verifique se o serviço está operacional consultando o status page do provedor</li>
        </ol>
        
        <h2>Problemas de permissão do WhatsApp</h2>
        <p><strong>Problema:</strong> Mensagens não são entregues devido a restrições do WhatsApp.</p>
        <p><strong>Solução:</strong></p>
        <ol>
          <li>Certifique-se de que está usando uma conta do WhatsApp Business</li>
          <li>Verifique se o número não foi marcado como spam por destinatários</li>
          <li>Evite enviar mensagens em massa para números que não iniciaram conversa</li>
          <li>Respeite as políticas do WhatsApp para mensagens comerciais</li>
          <li>Considere solicitar aprovação de template para mensagens iniciais</li>
        </ol>
        
        <h2>Quando contatar o suporte</h2>
        <p>Se você tentou as soluções acima e ainda enfrenta problemas, entre em contato com nosso suporte técnico fornecendo:</p>
        <ul>
          <li>Descrição detalhada do problema</li>
          <li>Capturas de tela dos erros</li>
          <li>Logs do sistema (disponíveis na aba "Logs")</li>
          <li>Informações sobre seu ambiente (sistema operacional, navegador)</li>
        </ul>
      `,
      author: "Equipe de Suporte Técnico",
      datePublished: "2024-02-15",
      lastUpdated: "2024-06-12",
    },
  };

  const article = articles[articleId];

  if (!article) {
    return (
      <Card className="w-full h-full">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <CardTitle>Artigo não encontrado</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p>
            O artigo solicitado não foi encontrado. Por favor, volte e tente
            outro artigo.
          </p>
          <Button className="mt-4" onClick={onBack}>
            Voltar para a Central de Ajuda
          </Button>
        </CardContent>
      </Card>
    );
  }

  const handleDownloadPDF = () => {
    // Em uma aplicação real, isso geraria um PDF
    alert("Função de download de PDF será implementada em breve!");
  };

  const handleSaveArticle = () => {
    // Em uma aplicação real, isso salvaria o artigo para leitura offline
    alert("Artigo salvo para leitura offline!");
  };

  const handleShareArticle = () => {
    // Em uma aplicação real, isso abriria opções de compartilhamento
    navigator.clipboard.writeText(window.location.href);
    alert("Link do artigo copiado para a área de transferência!");
  };

  return (
    <Card className="w-full h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <CardTitle>{article.title}</CardTitle>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleDownloadPDF}>
            <Download className="h-4 w-4 mr-2" /> PDF
          </Button>
          <Button variant="outline" size="sm" onClick={handleSaveArticle}>
            <Save className="h-4 w-4 mr-2" /> Salvar
          </Button>
          <Button variant="outline" size="sm" onClick={handleShareArticle}>
            <Share2 className="h-4 w-4 mr-2" /> Compartilhar
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex justify-between items-center">
          <div>
            <Badge variant="outline" className="mb-2">
              {article.category}
            </Badge>
            <div className="text-sm text-gray-500">
              <span>Publicado em: {article.datePublished}</span>
              <span className="mx-2">•</span>
              <span>Atualizado em: {article.lastUpdated}</span>
            </div>
          </div>
        </div>

        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        <div className="mt-8 pt-4 border-t">
          <p className="text-sm text-gray-500">Autor: {article.author}</p>
          <div className="mt-4 flex justify-between items-center">
            <Button variant="outline" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" /> Voltar para a Central de
              Ajuda
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleSaveArticle}>
                <Save className="h-4 w-4 mr-2" /> Salvar
              </Button>
              <Button variant="outline" size="sm" onClick={handleShareArticle}>
                <Share2 className="h-4 w-4 mr-2" /> Compartilhar
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArticleViewer;
