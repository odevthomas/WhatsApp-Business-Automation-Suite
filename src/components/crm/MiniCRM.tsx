import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import CustomerList from "./CustomerList";
import CustomerDetail from "./CustomerDetail";
import LeadClassification from "./LeadClassification";
import { t } from "@/lib/i18n";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  classification: string;
  lastContact: string;
  status: "active" | "inactive" | "pending";
  avatarUrl?: string;
  initials?: string;
  address: string;
  notes: string;
}

interface MiniCRMProps {
  initialCustomers?: Customer[];
  initialSelectedCustomerId?: string;
}

const MiniCRM = ({
  initialCustomers = [
    {
      id: "1",
      name: "Maria Silva",
      email: "maria.silva@exemplo.com",
      phone: "+55 (11) 98765-4321",
      classification: "lead",
      lastContact: "2023-06-15T14:30:00",
      status: "active",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=maria",
      initials: "MS",
      address: "Av. Paulista, 1000, São Paulo, SP",
      notes:
        "Interessada no plano premium. Fazer follow-up sobre desconto especial.",
    },
    {
      id: "2",
      name: "Roberto Ferreira",
      email: "roberto.ferreira@exemplo.com",
      phone: "+55 (11) 97654-3210",
      classification: "customer",
      lastContact: "2023-06-14T10:15:00",
      status: "active",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=roberto",
      initials: "RF",
      address: "Rua Augusta, 500, São Paulo, SP",
      notes:
        "Recentemente atualizou para o plano business. Agendar ligação de acompanhamento.",
    },
    {
      id: "3",
      name: "Ester Oliveira",
      email: "ester.oliveira@exemplo.com",
      phone: "+55 (21) 99876-5432",
      classification: "lead",
      lastContact: "2023-06-12T09:45:00",
      status: "pending",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=ester",
      initials: "EO",
      address: "Av. Atlântica, 1500, Rio de Janeiro, RJ",
      notes:
        "Solicitou demonstração do produto. Precisa discutir com a equipe.",
    },
  ],
  initialSelectedCustomerId = "",
}: MiniCRMProps) => {
  const [activeTab, setActiveTab] = useState("customers");
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>(
    initialSelectedCustomerId,
  );

  const selectedCustomer = customers.find(
    (customer) => customer.id === selectedCustomerId,
  );

  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomerId(customer.id);
    setActiveTab("customer-detail");
  };

  const handleCreateCategory = (category: any) => {
    // Implementação real seria aqui
    console.log("Criar categoria:", category);
  };

  const handleUpdateCategory = (category: any) => {
    // Implementação real seria aqui
    console.log("Atualizar categoria:", category);
  };

  const handleDeleteCategory = (id: string) => {
    // Implementação real seria aqui
    console.log("Excluir categoria:", id);
  };

  const handleUpdateCustomer = (updatedCustomer: Customer) => {
    const updatedCustomers = customers.map((customer) =>
      customer.id === updatedCustomer.id ? updatedCustomer : customer,
    );
    setCustomers(updatedCustomers);
  };

  const handleDeleteCustomer = (customerId: string) => {
    const filteredCustomers = customers.filter(
      (customer) => customer.id !== customerId,
    );
    setCustomers(filteredCustomers);
    if (selectedCustomerId === customerId) {
      setSelectedCustomerId("");
      setActiveTab("customers");
    }
  };

  const handleAddCustomer = (newCustomer: Omit<Customer, "id">) => {
    const id = Date.now().toString();
    const customerWithId = { ...newCustomer, id };
    setCustomers([...customers, customerWithId as Customer]);
  };

  return (
    <div className="w-full h-full bg-gray-50 flex flex-col">
      <div className="p-4 md:p-6 border-b bg-white">
        <h1 className="text-xl md:text-2xl font-bold">Mini-CRM</h1>
        <p className="text-gray-500 mt-1 text-sm md:text-base">
          {t("manage_customer_info")}
        </p>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="border-b bg-white px-4 md:px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mt-2 w-full md:w-auto overflow-x-auto">
              <TabsTrigger value="customers">{t("customers")}</TabsTrigger>
              <TabsTrigger
                value="customer-detail"
                disabled={!selectedCustomerId}
              >
                {t("customer_details")}
              </TabsTrigger>
              <TabsTrigger value="classifications">
                {t("lead_classifications")}
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex-1 p-4 md:p-6 overflow-auto">
          {activeTab === "customers" && (
            <CustomerList
              customers={customers}
              onSelectCustomer={handleSelectCustomer}
              selectedCustomerId={selectedCustomerId}
              onDeleteCustomer={handleDeleteCustomer}
              onAddCustomer={handleAddCustomer}
            />
          )}

          {activeTab === "customer-detail" &&
            (selectedCustomer ? (
              <CustomerDetail
                customer={selectedCustomer}
                onSave={handleUpdateCustomer}
                onDelete={() => handleDeleteCustomer(selectedCustomer.id)}
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500">{t("select_customer_to_view")}</p>
              </div>
            ))}

          {activeTab === "classifications" && (
            <LeadClassification
              onCreateCategory={handleCreateCategory}
              onUpdateCategory={handleUpdateCategory}
              onDeleteCategory={handleDeleteCategory}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MiniCRM;
