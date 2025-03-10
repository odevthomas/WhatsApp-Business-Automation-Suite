# Documentação Completa - WhatsApp Business Automation Platform

## Índice

1. [Introdução](#introdução)
2. [Instalação e Configuração](#instalação-e-configuração)
   - [Requisitos do Sistema](#requisitos-do-sistema)
   - [Instalação](#instalação)
   - [Configuração Inicial](#configuração-inicial)
3. [Configuração do WhatsApp Bot](#configuração-do-whatsapp-bot)
   - [Configuração do Google Gemini](#configuração-do-google-gemini)
   - [Configuração do OpenAI GPT](#configuração-do-openai-gpt)
   - [Conexão com WhatsApp](#conexão-com-whatsapp)
4. [Uso da Plataforma](#uso-da-plataforma)
   - [Dashboard](#dashboard)
   - [Chatbot Builder](#chatbot-builder)
   - [Mini-CRM](#mini-crm)
   - [Integrações](#integrações)
   - [Configurações](#configurações)
5. [Personalização](#personalização)
   - [Fluxos de Conversação](#fluxos-de-conversação)
   - [Templates de Resposta](#templates-de-resposta)
   - [Classificação de Leads](#classificação-de-leads)
6. [Integrações Externas](#integrações-externas)
   - [Google Calendar](#google-calendar)
   - [Processadores de Pagamento](#processadores-de-pagamento)
   - [Outras Ferramentas](#outras-ferramentas)
7. [Solução de Problemas](#solução-de-problemas)
8. [FAQ](#faq)

## Introdução

A WhatsApp Business Automation Platform é uma solução completa para empresas que desejam automatizar suas interações com clientes através do WhatsApp. Utilizando inteligência artificial, a plataforma permite criar fluxos de conversação personalizados, gerenciar leads e integrar com outras ferramentas de negócios.

## Instalação e Configuração

### Requisitos do Sistema

- Node.js 18.0.0 ou superior
- NPM ou Yarn
- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Conta no WhatsApp Business
- Chaves de API para serviços de IA (Google Gemini ou OpenAI)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/whatsapp-business-automation.git
cd whatsapp-business-automation

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

### Configuração Inicial

1. Acesse a aplicação em `http://localhost:5173` (ou a porta indicada no terminal)
2. Faça login com as credenciais padrão:
   - Email: `admin@exemplo.com`
   - Senha: `senha123`
3. Após o primeiro login, altere a senha padrão em Configurações > Perfil de Usuário

## Configuração do WhatsApp Bot

O componente principal da plataforma é o WhatsApp Bot, que pode ser configurado para usar diferentes modelos de IA.

### Configuração do Google Gemini

1. Acesse a seção "WhatsApp Bot" no menu lateral
2. Clique na aba "Configurações"
3. Selecione "GEMINI" como a IA a ser utilizada
4. Obtenha uma chave de API do Google Gemini:
   - Acesse [Google AI Studio](https://aistudio.google.com/app/apikey)
   - Crie uma conta ou faça login
   - Clique em "Create API Key"
   - Copie a chave gerada
5. Cole a chave no campo "Chave da API Gemini"
6. No campo "Prompt Inicial", insira as instruções para o comportamento do bot, por exemplo:
   ```
   Você é Eduardo, um assistente virtual amigável e descontraído para uma empresa de desenvolvimento web. Seja sempre cordial e informal. Você tem conhecimento em desenvolvimento web e mobile, mas seu foco é em aplicações web. Não aceite projetos relacionados a transporte, mas sugira recursos ou especialistas para esses casos. Mesmo para perguntas fora do contexto, seja educado e ofereça sugestões úteis.
   ```
7. Clique em "Salvar Configurações"

### Configuração do OpenAI GPT

1. Acesse a seção "WhatsApp Bot" no menu lateral
2. Clique na aba "Configurações"
3. Selecione "GPT" como a IA a ser utilizada
4. Obtenha uma chave de API da OpenAI:
   - Acesse [OpenAI API Keys](https://platform.openai.com/api-keys)
   - Crie uma conta ou faça login
   - Clique em "Create new secret key"
   - Copie a chave gerada
5. Cole a chave no campo "Chave da API OpenAI"
6. Crie um assistente na OpenAI:
   - Acesse [OpenAI Assistants](https://platform.openai.com/assistants)
   - Clique em "Create"
   - Configure o assistente conforme suas necessidades
   - Copie o ID do assistente
7. Cole o ID no campo "ID do Assistente"
8. Clique em "Salvar Configurações"

### Conexão com WhatsApp

1. Na seção "WhatsApp Bot", clique na aba "Chat"
2. Clique no botão "Conectar"
3. Um QR Code será exibido na aba "Logs"
4. Abra o WhatsApp no seu celular
5. Vá em Configurações > Dispositivos conectados > Conectar um dispositivo
6. Escaneie o QR Code exibido na tela
7. Aguarde a confirmação de conexão
8. O status mudará para "Conectado" quando a conexão for estabelecida

## Uso da Plataforma

### Dashboard

O Dashboard fornece uma visão geral das métricas-chave do seu atendimento:

- **Mensagens Recebidas**: Total de mensagens recebidas no período
- **Taxa de Conversão**: Percentual de conversas que resultaram em vendas ou objetivos
- **Tempo Médio de Resposta**: Tempo médio para responder às mensagens
- **Novos Leads**: Quantidade de novos leads gerados no período

Você também pode visualizar gráficos detalhados de:

- Mensagens recebidas vs. respondidas
- Taxa de conversão ao longo do tempo
- Tempo médio de resposta
- Origem dos leads

### Chatbot Builder

O Chatbot Builder permite criar fluxos de conversação personalizados:

1. Acesse a seção "Chatbot IA" no menu lateral
2. Selecione um chatbot existente ou crie um novo
3. Use o "Flow Designer" para criar o fluxo de conversação:
   - Arraste e solte nós de diferentes tipos (gatilho, mensagem, condição, ação)
   - Conecte os nós para criar o fluxo lógico
   - Configure cada nó com conteúdo e condições específicas
4. Use "Response Templates" para criar modelos de resposta reutilizáveis
5. Use "Test Console" para testar o fluxo antes de publicá-lo
6. Clique em "Save" para salvar as alterações

### Mini-CRM

O Mini-CRM permite gerenciar seus contatos e leads:

1. Acesse a seção "Mini-CRM" no menu lateral
2. Visualize a lista de clientes e suas informações básicas
3. Clique em um cliente para ver detalhes completos:
   - Informações de contato
   - Histórico de conversas
   - Agendamentos
   - Notas
4. Use a aba "Lead Classifications" para criar e gerenciar categorias de leads
5. Atribua classificações aos clientes para organizar seu funil de vendas

### Integrações

A plataforma permite integração com diversas ferramentas externas:

1. Acesse a seção "Integrações" no menu lateral
2. Navegue pelo diretório de integrações disponíveis
3. Clique em "Conectar" na integração desejada
4. Siga as instruções específicas para cada integração
5. Após conectada, a integração aparecerá em "Integrações Ativas"

### Configurações

A seção de Configurações permite personalizar diversos aspectos da plataforma:

1. Acesse a seção "Configurações" no menu lateral
2. Navegue pelas diferentes abas:
   - **Perfil de Negócio**: Informações da empresa, logo, etc.
   - **Gerenciamento de Usuários**: Adicione ou remova usuários da plataforma
   - **Notificações**: Configure alertas e notificações
   - **Aparência**: Personalize a interface da plataforma

## Personalização

### Fluxos de Conversação

Para criar fluxos de conversação eficientes:

1. Comece com um nó de gatilho que define quando o fluxo é iniciado
2. Adicione nós de mensagem para as respostas do bot
3. Use nós de condição para criar ramificações baseadas em respostas do usuário
4. Implemente nós de ação para executar operações como agendamento ou pagamento
5. Teste o fluxo completo antes de publicá-lo

### Templates de Resposta

Os templates de resposta permitem criar mensagens padronizadas com variáveis dinâmicas:

1. Acesse a aba "Response Templates" no Chatbot Builder
2. Clique em "Create New Template"
3. Defina um nome e categoria para o template
4. Escreva o conteúdo da mensagem
5. Adicione variáveis usando a sintaxe `{{nome_da_variavel}}`
6. Adicione mídia (imagens, documentos) se necessário
7. Salve o template para uso nos fluxos de conversação

### Classificação de Leads

Para organizar seus leads de forma eficiente:

1. Acesse a aba "Lead Classifications" no Mini-CRM
2. Crie categorias como "Hot Lead", "Warm Lead", "Cold Lead"
3. Defina critérios para cada categoria
4. Atribua cores para identificação visual
5. Aplique as classificações aos clientes no Mini-CRM

## Integrações Externas

### Google Calendar

Para integrar com o Google Calendar:

1. Acesse a seção "Integrações" > "Google Calendar"
2. Clique em "Conectar"
3. Faça login na sua conta Google
4. Autorize o acesso ao Calendar
5. Configure as opções de sincronização:
   - Frequência de sincronização
   - Sincronização bidirecional
   - Notificações de mudanças

### Processadores de Pagamento

A plataforma suporta integração com Stripe e MercadoPago:

#### Stripe

1. Acesse a seção "Integrações" > "Stripe"
2. Obtenha sua chave secreta em [Stripe Dashboard](https://dashboard.stripe.com/apikeys)
3. Cole a chave no campo "Secret Key"
4. Teste a conexão
5. Configure as opções de pagamento

#### MercadoPago

1. Acesse a seção "Integrações" > "MercadoPago"
2. Obtenha seu Access Token em [MercadoPago Developers](https://www.mercadopago.com.br/developers/panel/credentials)
3. Cole o token no campo "Access Token"
4. Teste a conexão
5. Configure as opções de pagamento

### Outras Ferramentas

A plataforma também suporta integração com:

- **Zapier**: Para conectar com centenas de outros serviços
- **Google Sheets**: Para exportar e sincronizar dados de clientes
- **HubSpot**: Para integração com CRM mais robusto
- **Mailchimp**: Para campanhas de email marketing

## Solução de Problemas

### Problemas de Conexão com WhatsApp

1. **QR Code expira rapidamente**:
   - Certifique-se de escanear o QR Code imediatamente após ser gerado
   - Clique em "Conectar" novamente para gerar um novo QR Code

2. **Desconexões frequentes**:
   - Verifique a conexão com a internet
   - Certifique-se de que o WhatsApp no celular está atualizado
   - Evite usar o WhatsApp Web em outros dispositivos simultaneamente

3. **Mensagens não são enviadas**:
   - Verifique se o bot está conectado (status "Conectado")
   - Verifique os logs na aba "Logs" para identificar erros
   - Certifique-se de que o número de telefone está no formato correto (com código do país)

### Problemas com IA

1. **Respostas inadequadas**:
   - Revise e ajuste o prompt inicial
   - Teste diferentes variações do prompt
   - Considere usar um modelo de IA diferente

2. **Erros de API**:
   - Verifique se a chave de API está correta
   - Confirme se há saldo suficiente na sua conta (OpenAI)
   - Verifique os limites de uso da API

3. **Lentidão nas respostas**:
   - Ajuste o tempo de espera nas configurações
   - Considere usar mensagens mais curtas
   - Verifique a conexão com a internet

## FAQ

### Perguntas Gerais

**P: Quantos usuários posso adicionar à plataforma?**
R: O plano básico permite até 5 usuários. Para mais usuários, é necessário atualizar para um plano superior.

**P: A plataforma funciona com WhatsApp pessoal ou apenas Business?**
R: A plataforma é otimizada para WhatsApp Business, mas também funciona com contas pessoais.

**P: Posso usar a plataforma em múltiplos dispositivos?**
R: Sim, a interface web pode ser acessada de qualquer dispositivo, mas a conexão com o WhatsApp é única.

### Perguntas sobre IA

**P: Qual modelo de IA é melhor para meu negócio?**
R: Depende das suas necessidades. O Google Gemini é geralmente mais econômico, enquanto o OpenAI GPT pode oferecer respostas mais sofisticadas para casos complexos.

**P: Como posso melhorar a qualidade das respostas da IA?**
R: Refine o prompt inicial com instruções claras sobre o tom, conhecimento e limites do bot. Teste diferentes abordagens e ajuste com base nos resultados.

**P: Há limites de uso para as APIs de IA?**
R: Sim, tanto o Google Gemini quanto a OpenAI têm limites de uso. Consulte a documentação oficial de cada serviço para detalhes atualizados.

### Perguntas sobre Integrações

**P: Posso integrar com meu próprio sistema?**
R: Sim, através da API da plataforma ou usando Zapier como intermediário.

**P: As integrações são bidirecionais?**
R: A maioria das integrações suporta sincronização bidirecional, que pode ser configurada nas opções de cada integração.

**P: Preciso de conhecimento técnico para configurar integrações?**
R: Não para as integrações padrão. Para integrações personalizadas, algum conhecimento técnico pode ser necessário.

---

Para suporte adicional, entre em contato com nossa equipe através do email support@whatsapp-automation.com ou acesse nossa base de conhecimento em https://help.whatsapp-automation.com.
