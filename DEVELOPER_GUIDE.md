# Guia do Desenvolvedor

## Estrutura do Projeto

Este guia fornece informações detalhadas sobre a estrutura do código e como estender ou modificar a plataforma.

### Visão Geral da Arquitetura

A plataforma é construída com React e utiliza uma arquitetura baseada em componentes. Os principais módulos são:

- **Dashboard**: Visualização de métricas e estatísticas
- **Chatbot**: Configuração e gerenciamento de bots
- **CRM**: Gerenciamento de clientes e leads
- **Integrações**: Conexão com serviços externos
- **WhatsApp Bot**: Serviço de backend para comunicação com WhatsApp

### Estrutura de Diretórios

```
├── src/
│   ├── components/
│   │   ├── auth/           # Componentes de autenticação
│   │   ├── chatbot/        # Componentes do construtor de chatbot
│   │   ├── crm/            # Componentes do mini-CRM
│   │   ├── dashboard/      # Componentes do dashboard
│   │   ├── inbox/          # Componentes da caixa de entrada
│   │   ├── integrations/   # Componentes de integração
│   │   ├── layout/         # Componentes de layout (sidebar, etc.)
│   │   ├── settings/       # Componentes de configuração
│   │   ├── ui/             # Componentes de UI reutilizáveis
│   │   └── whatsapp/       # Componentes do WhatsApp Bot
│   │       ├── src/
│   │       │   ├── service/  # Serviços de IA (Google, OpenAI)
│   │       │   └── util/     # Utilitários
│   │       ├── setup.js      # Script de configuração
│   │       └── package.json  # Dependências do bot
│   ├── lib/
│   │   ├── api/            # Serviços de API
│   │   ├── i18n.ts         # Internacionalização
│   │   └── utils.ts        # Utilitários gerais
│   └── types/              # Definições de tipos TypeScript
```

## Componente WhatsApp Bot

### Arquitetura

O componente WhatsApp Bot é construído como um módulo semi-independente que pode ser executado junto com a aplicação principal ou separadamente. Ele utiliza:

- **wppconnect**: Para comunicação com a API do WhatsApp
- **Google Generative AI / OpenAI**: Para processamento de linguagem natural
- **dotenv**: Para gerenciamento de variáveis de ambiente

### Fluxo de Dados

1. O cliente WhatsApp recebe mensagens através do wppconnect
2. As mensagens são armazenadas em um buffer temporário
3. Após um período de espera, as mensagens são processadas pela IA selecionada
4. A resposta da IA é dividida em partes menores, se necessário
5. As partes da resposta são enviadas de volta ao usuário com um atraso dinâmico

### Principais Arquivos

- **src/index.ts**: Ponto de entrada, configura o cliente WhatsApp e gerencia mensagens
- **src/service/google.ts**: Integração com Google Gemini
- **src/service/openai.ts**: Integração com OpenAI GPT
- **src/util/index.ts**: Utilitários para processamento de mensagens
- **setup.js**: Script interativo para configuração inicial

## Extensão e Personalização

### Adicionando um Novo Serviço de IA

Para adicionar suporte a um novo serviço de IA:

1. Crie um novo arquivo em `src/components/whatsapp/src/service/`
2. Implemente as funções necessárias seguindo o padrão dos serviços existentes
3. Modifique `src/index.ts` para incluir o novo serviço
4. Atualize `setup.js` para incluir opções de configuração para o novo serviço

Exemplo de implementação básica:

```typescript
// src/components/whatsapp/src/service/newai.ts
import dotenv from 'dotenv';

dotenv.config();

// Mapa para armazenar sessões de chat ativas
const activeSessions = new Map();

// Função para inicializar uma nova sessão de chat
export async function initializeNewAIChatSession(chatId: string): Promise<void> {
  if (!activeSessions.has(chatId)) {
    activeSessions.set(chatId, {
      id: chatId,
      createdAt: new Date(),
      messages: []
    });
  }
}

// Função principal para interagir com o modelo
export async function mainNewAI({
  currentMessage,
  chatId,
}: {
  currentMessage: string;
  chatId: string;
}): Promise<string> {
  // Implementação da integração com o novo serviço de IA
  // ...
  
  return "Resposta do novo serviço de IA";
}
```

### Personalizando a Interface do WhatsApp Bot

Para personalizar a interface do WhatsApp Bot:

1. Modifique `src/components/whatsapp/WhatsAppBot.tsx`
2. Adicione novos componentes em `src/components/whatsapp/`
3. Atualize os estilos usando as classes Tailwind existentes

### Adicionando Novas Integrações

Para adicionar uma nova integração externa:

1. Crie um novo arquivo em `src/lib/api/`
2. Implemente as funções necessárias para comunicação com o serviço externo
3. Crie um componente de configuração em `src/components/integrations/`
4. Adicione a nova integração ao diretório em `src/components/integrations/IntegrationDirectory.tsx`

## Boas Práticas

### Segurança

- Nunca armazene chaves de API diretamente no código
- Use variáveis de ambiente para informações sensíveis
- Implemente validação de entrada para todas as mensagens recebidas
- Considere implementar rate limiting para evitar abuso da API

### Performance

- Use memoização para componentes React que renderizam frequentemente
- Implemente paginação para listas longas de mensagens ou clientes
- Otimize as chamadas de API para minimizar o uso de recursos
- Considere implementar caching para respostas comuns da IA

### Manutenção

- Mantenha a documentação atualizada
- Escreva testes unitários para componentes críticos
- Use TypeScript para tipagem estática e melhor detecção de erros
- Siga um padrão consistente de nomenclatura e estrutura

## Contribuição

Para contribuir com o projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/nova-funcionalidade`)
3. Faça commit das suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Faça push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## Recursos Adicionais

- [Documentação do wppconnect](https://wppconnect.io/docs/)
- [Documentação do Google Gemini](https://ai.google.dev/docs)
- [Documentação da OpenAI](https://platform.openai.com/docs/)
- [Guia de Estilo React](https://reactjs.org/docs/code-style.html)
