import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import IntegrationDirectory from "./IntegrationDirectory";
import IntegrationSetup from "./IntegrationSetup";
import ActiveIntegrations from "./ActiveIntegrations";

interface IntegrationPanelProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  selectedIntegration?: {
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
    category: string;
  };
}

const IntegrationPanel: React.FC<IntegrationPanelProps> = ({
  activeTab = "directory",
  onTabChange = () => {},
  selectedIntegration = null,
}) => {
  const [currentTab, setCurrentTab] = useState<string>(activeTab);
  const [setupIntegration, setSetupIntegration] = useState(selectedIntegration);
  const [showSetup, setShowSetup] = useState(!!selectedIntegration);

  // Logos oficiais para as integrações
  const integrationLogos = {
    "google-calendar":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Google_Calendar_icon_%282020%29.svg/2048px-Google_Calendar_icon_%282020%29.svg.png",
    "google-sheets":
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Google_Sheets_logo_%282014-2020%29.svg/1498px-Google_Sheets_logo_%282014-2020%29.svg.png",
    stripe:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/2560px-Stripe_Logo%2C_revised_2016.svg.png",
    mercadopago:
      "https://logodownload.org/wp-content/uploads/2019/06/mercado-pago-logo-1.png",
    zapier: "https://cdn.worldvectorlogo.com/logos/zapier-1.svg",
    salesforce:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/2560px-Salesforce.com_logo.svg.png",
    hubspot:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/HubSpot_Logo.svg/2560px-HubSpot_Logo.svg.png",
    mailchimp:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Mailchimp_Freddie_Wink.svg/1200px-Mailchimp_Freddie_Wink.svg.png",
  };

  const handleTabChange = (value: string) => {
    setCurrentTab(value);
    onTabChange(value);
  };

  const handleIntegrationSelect = (integration: any) => {
    setSetupIntegration(integration);
    setShowSetup(true);
  };

  const handleSetupComplete = () => {
    setShowSetup(false);
    setCurrentTab("active");
  };

  const handleSetupCancel = () => {
    setShowSetup(false);
  };

  return (
    <div className="w-full h-full bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Integrações</h1>
        <p className="text-gray-500 mt-1">
          Conecte sua conta do WhatsApp Business com outras ferramentas e
          serviços
        </p>
      </div>

      {showSetup ? (
        <div className="mb-6">
          <button
            onClick={handleSetupCancel}
            className="text-blue-600 hover:text-blue-800 flex items-center mb-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Voltar para Integrações
          </button>
          <IntegrationSetup
            integration={setupIntegration}
            onComplete={handleSetupComplete}
            onCancel={handleSetupCancel}
          />
        </div>
      ) : (
        <Card className="bg-white">
          <CardHeader className="pb-0">
            <CardTitle>Gerenciar Integrações</CardTitle>
            <CardDescription>
              Navegue, conecte e gerencie integrações com serviços externos
            </CardDescription>
          </CardHeader>
          <Tabs value={currentTab} onValueChange={handleTabChange}>
            <div className="px-6 pt-2">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="directory">
                  Diretório de Integrações
                </TabsTrigger>
                <TabsTrigger value="active">Integrações Ativas</TabsTrigger>
                <TabsTrigger value="settings">Configurações</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="directory" className="p-0 mt-0">
              <IntegrationDirectory />
            </TabsContent>

            <TabsContent value="active" className="p-0 mt-0">
              <ActiveIntegrations />
            </TabsContent>

            <TabsContent value="settings" className="p-6 mt-0">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium">
                    Configurações Globais de Integração
                  </h3>
                  <p className="text-gray-500">
                    Configure o comportamento padrão para todas as integrações
                  </p>
                </div>

                <div className="grid gap-4 border p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Sincronização de Dados</h4>
                      <p className="text-sm text-gray-500">
                        Controle com que frequência os dados são sincronizados
                        entre os serviços
                      </p>
                    </div>
                    <select className="border rounded-md p-2">
                      <option>Tempo real</option>
                      <option>A cada hora</option>
                      <option>Diariamente</option>
                      <option>Apenas manual</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Notificações de Erro</h4>
                      <p className="text-sm text-gray-500">
                        Receba notificações quando ocorrerem erros de integração
                      </p>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="error-notifications"
                        className="mr-2"
                        defaultChecked
                      />
                      <label htmlFor="error-notifications">Ativado</label>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Privacidade de Dados</h4>
                      <p className="text-sm text-gray-500">
                        Controle quais dados de clientes são compartilhados com
                        integrações
                      </p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800">
                      Configurar
                    </button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      )}
    </div>
  );
};

export default IntegrationPanel;
