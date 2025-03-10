import React, { useState, useEffect } from "react";
import Sidebar from "./layout/Sidebar";
import DashboardOverview from "./dashboard/DashboardOverview";
import ChatbotBuilder from "./chatbot/ChatbotBuilder";
import MiniCRM from "./crm/MiniCRM";
import IntegrationPanel from "./integrations/IntegrationPanel";
import SettingsPanel from "./settings/SettingsPanel";
import MessageInbox from "./inbox/MessageInbox";
import AnalyticsDashboard from "./dashboard/AnalyticsDashboard";
import LoginPage from "./auth/LoginPage";
import SupportPage from "./support/SupportPage";
import { setLanguage } from "@/lib/i18n";

const Home = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const [language, setCurrentLanguage] = useState<"en" | "pt">("pt");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Definir português como idioma padrão ao iniciar
  useEffect(() => {
    setLanguage("pt");
  }, []);

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "pt" : "en";
    setCurrentLanguage(newLanguage);
    setLanguage(newLanguage);
  };

  const handleLogin = (email: string, password: string, remember: boolean) => {
    console.log("Login com:", { email, password, remember });
    setIsLoggedIn(true);
  };

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return <AnalyticsDashboard />;
      case "chatbot":
        return <ChatbotBuilder />;
      case "crm":
        return <MiniCRM />;
      case "integrations":
        return <IntegrationPanel />;
      case "settings":
        return <SettingsPanel />;
      case "inbox":
        return <MessageInbox />;
      case "support":
        return <SupportPage />;
      default:
        return <AnalyticsDashboard />;
    }
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden">
      <Sidebar
        activePage={activePage}
        onLogout={() => setIsLoggedIn(false)}
        userName="Maria Silva"
        userEmail="maria@whatsapppro.com.br"
        userAvatar="https://api.dicebear.com/7.x/avataaars/svg?seed=Maria"
        onPageChange={handlePageChange}
        currentLanguage={language}
        onToggleLanguage={toggleLanguage}
      />
      <main className="flex-1 overflow-auto">{renderContent()}</main>
    </div>
  );
};

export default Home;
