// Simple internationalization utility

type Translations = {
  [key: string]: {
    [key: string]: string;
  };
};

const translations: Translations = {
  en: {
    // Common
    save: "Save",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",
    add: "Add",
    search: "Search",
    filter: "Filter",
    all: "All",
    active: "Active",
    inactive: "Inactive",
    pending: "Pending",
    criteria: "Criteria",
    manage_lead_categories: "Manage and organize your lead classifications",
    manage_customer_info:
      "Manage customer information, conversations, and lead classifications",
    select_customer_to_view: "Select a customer to view details",
    confirm_delete_customer:
      "Are you sure you want to delete this customer? This action cannot be undone.",
    overview: "Overview",
    conversations: "Conversations",
    conversation_history: "Conversation History",
    start_new_conversation: "Start New Conversation",
    conversation_on: "Conversation on",
    view_full_conversation: "View Full Conversation",
    more_messages: "more messages",
    no_conversation_history: "No conversation history available.",
    schedule_appointment: "Schedule Appointment",
    at: "at",
    scheduled: "Scheduled",
    completed: "Completed",
    cancelled: "Cancelled",
    no_appointments: "No appointments scheduled.",
    customer_notes: "Customer Notes",
    add_notes: "Add notes about this customer...",
    save_notes: "Save Notes",

    // Lead Classifications
    lead_classifications: "Lead Classifications",
    add_classification: "Add Classification",
    new_classification: "New Classification",
    edit_classification: "Edit Classification",
    name: "Name",
    description: "Description",
    color: "Color",
    save_classification: "Save Classification",
    save_changes: "Save Changes",
    leads: "leads",

    // Customer List
    customers: "Customers",
    add_customer: "Add Customer",
    search_customers: "Search customers...",
    all_status: "All Status",
    no_customers:
      "No customers found. Try adjusting your filters or add a new customer.",
    last_contact: "Last contact",

    // Customer Details
    customer_details: "Customer Details",
    contact_information: "Contact Information",
    full_name: "Full Name",
    email_address: "Email Address",
    phone_number: "Phone Number",
    address: "Address",
    not_provided: "Not provided",
    tags: "Tags",
    add_tag: "Add tag",
    customer_stats: "Customer Stats",
    classification: "Classification",
    status: "Status",
    total_conversations: "Total Conversations",
    appointments: "Appointments",
    notes: "Notes",
    no_notes: "No notes available.",

    // Integrations
    active_integrations: "Active Integrations",
    last_synced: "Last synced",
    manage: "Manage",
    disconnect: "Disconnect",
    sync_error: "Sync Error",
    no_active_integrations: "No active integrations",
    connect_services:
      "Connect with other services to enhance your WhatsApp business experience.",
    browse_integration_directory: "Browse Integration Directory",
  },

  pt: {
    // Comum
    save: "Salvar",
    cancel: "Cancelar",
    edit: "Editar",
    delete: "Excluir",
    add: "Adicionar",
    search: "Buscar",
    filter: "Filtrar",
    all: "Todos",
    active: "Ativo",
    inactive: "Inativo",
    pending: "Pendente",
    criteria: "Critérios",
    manage_lead_categories: "Gerencie e organize suas classificações de leads",
    manage_customer_info:
      "Gerencie informações de clientes, conversas e classificações de leads",
    select_customer_to_view: "Selecione um cliente para ver os detalhes",
    confirm_delete_customer:
      "Tem certeza que deseja excluir este cliente? Esta ação não pode ser desfeita.",
    overview: "Visão Geral",
    conversations: "Conversas",
    conversation_history: "Histórico de Conversas",
    start_new_conversation: "Iniciar Nova Conversa",
    conversation_on: "Conversa em",
    view_full_conversation: "Ver Conversa Completa",
    more_messages: "mais mensagens",
    no_conversation_history: "Nenhum histórico de conversa disponível.",
    schedule_appointment: "Agendar Compromisso",
    at: "às",
    scheduled: "Agendado",
    completed: "Concluído",
    cancelled: "Cancelado",
    no_appointments: "Nenhum compromisso agendado.",
    customer_notes: "Notas do Cliente",
    add_notes: "Adicione notas sobre este cliente...",
    save_notes: "Salvar Notas",

    // Classificações de Leads
    lead_classifications: "Classificações de Leads",
    add_classification: "Adicionar Classificação",
    new_classification: "Nova Classificação",
    edit_classification: "Editar Classificação",
    name: "Nome",
    description: "Descrição",
    color: "Cor",
    save_classification: "Salvar Classificação",
    save_changes: "Salvar Alterações",
    leads: "leads",

    // Lista de Clientes
    customers: "Clientes",
    add_customer: "Adicionar Cliente",
    search_customers: "Buscar clientes...",
    all_status: "Todos os Status",
    no_customers:
      "Nenhum cliente encontrado. Tente ajustar seus filtros ou adicione um novo cliente.",
    last_contact: "Último contato",

    // Detalhes do Cliente
    customer_details: "Detalhes do Cliente",
    contact_information: "Informações de Contato",
    full_name: "Nome Completo",
    email_address: "Endereço de Email",
    phone_number: "Número de Telefone",
    address: "Endereço",
    not_provided: "Não fornecido",
    tags: "Tags",
    add_tag: "Adicionar tag",
    customer_stats: "Estatísticas do Cliente",
    classification: "Classificação",
    status: "Status",
    total_conversations: "Total de Conversas",
    appointments: "Agendamentos",
    notes: "Notas",
    no_notes: "Nenhuma nota disponível.",

    // Integrações
    active_integrations: "Integrações Ativas",
    last_synced: "Última sincronização",
    manage: "Gerenciar",
    disconnect: "Desconectar",
    sync_error: "Erro de Sincronização",
    no_active_integrations: "Nenhuma integração ativa",
    connect_services:
      "Conecte-se com outros serviços para melhorar sua experiência de negócios no WhatsApp.",
    browse_integration_directory: "Explorar Diretório de Integrações",
  },
};

// Default language
let currentLanguage = "en";

// Set language
export const setLanguage = (lang: "en" | "pt") => {
  currentLanguage = lang;
};

// Get current language
export const getLanguage = () => currentLanguage;

// Translate function
export const t = (key: string): string => {
  if (!translations[currentLanguage]) {
    return key;
  }

  return translations[currentLanguage][key] || translations["en"][key] || key;
};

export default { t, setLanguage, getLanguage };
