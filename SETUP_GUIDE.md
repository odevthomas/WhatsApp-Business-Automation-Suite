# Guia de Configuração Rápida

## Configuração do WhatsApp Bot

Este guia fornece instruções passo a passo para configurar o componente WhatsApp Bot da plataforma.

### Pré-requisitos

- Node.js 18.0.0 ou superior
- NPM ou Yarn
- Conta no WhatsApp Business
- Chave de API do Google Gemini ou OpenAI

### Passo 1: Instalação das Dependências

```bash
# Navegue até a pasta do componente WhatsApp Bot
cd src/components/whatsapp

# Instale as dependências
npm install
```

### Passo 2: Configuração das Chaves de API

```bash
# Execute o script de configuração
npm run config
```

O script irá guiá-lo através das seguintes etapas:

1. Escolha da IA a ser utilizada (GEMINI ou GPT)
2. Para GEMINI:
   - Insira a chave da API Gemini (obtenha em https://aistudio.google.com/app/apikey)
   - Insira o prompt inicial para o comportamento do bot
3. Para GPT:
   - Insira a chave da API OpenAI (obtenha em https://platform.openai.com/api-keys)
   - Insira o ID do assistente OpenAI (crie em https://platform.openai.com/assistants)

### Passo 3: Conexão com WhatsApp

1. Na interface da plataforma, acesse a seção "WhatsApp Bot"
2. Clique na aba "Chat"
3. Clique no botão "Conectar"
4. Um QR Code será exibido na aba "Logs"
5. Abra o WhatsApp no seu celular
6. Vá em Configurações > Dispositivos conectados > Conectar um dispositivo
7. Escaneie o QR Code exibido na tela
8. Aguarde a confirmação de conexão

### Passo 4: Teste do Bot

1. Após a conexão ser estabelecida, o status mudará para "Conectado"
2. Envie uma mensagem para o número do WhatsApp conectado
3. O bot responderá automaticamente com base na IA configurada
4. Verifique os logs na aba "Logs" para monitorar a atividade

### Passo 5: Personalização

#### Ajuste do Prompt (GEMINI)

Para personalizar o comportamento do bot com Gemini, edite o arquivo `.env` na pasta `src/components/whatsapp` e modifique o valor de `GEMINI_PROMPT`.

Exemplo de prompt eficaz:

```
Você é Eduardo, um assistente virtual amigável para uma empresa de desenvolvimento web. Seja sempre cordial e informal. Você tem conhecimento em desenvolvimento web e mobile, mas seu foco é em aplicações web. Não aceite projetos relacionados a transporte, mas sugira recursos ou especialistas para esses casos. Mesmo para perguntas fora do contexto, seja educado e ofereça sugestões úteis.
```

#### Configuração do Assistente (GPT)

Para personalizar o comportamento do bot com GPT, acesse o [OpenAI Assistants](https://platform.openai.com/assistants) e edite as instruções do assistente.

### Passo 6: Configurações Avançadas

#### Tempo de Resposta

Para ajustar o tempo que o bot aguarda antes de responder:

1. Na interface da plataforma, acesse a seção "WhatsApp Bot"
2. Clique na aba "Configurações"
3. Ajuste o valor em "Tempo de Espera para Resposta (segundos)"
4. Clique em "Salvar Configurações"

#### Resposta Automática

Para ativar/desativar a resposta automática:

1. Na interface da plataforma, acesse a seção "WhatsApp Bot"
2. Use o toggle "Resposta Automática" no painel de status

### Solução de Problemas

#### QR Code Expirado

Se o QR Code expirar antes de ser escaneado:

1. Clique em "Desconectar" (se disponível)
2. Clique em "Conectar" novamente para gerar um novo QR Code
3. Escaneie o novo QR Code imediatamente

#### Erros de API

Se ocorrerem erros relacionados à API de IA:

1. Verifique se a chave de API está correta
2. Confirme se há saldo suficiente na sua conta (OpenAI)
3. Verifique os limites de uso da API
4. Execute `npm run config` novamente para atualizar as chaves

#### Desconexões Frequentes

Se o bot desconectar frequentemente:

1. Verifique a conexão com a internet
2. Certifique-se de que o WhatsApp no celular está atualizado
3. Evite usar o WhatsApp Web em outros dispositivos simultaneamente
4. Considere usar um serviço de hospedagem estável para a aplicação

### Recursos Adicionais

- [Documentação Completa](DOCUMENTATION.md)
- [FAQ](DOCUMENTATION.md#faq)
- [Guia de Desenvolvimento](DEVELOPER_GUIDE.md)
