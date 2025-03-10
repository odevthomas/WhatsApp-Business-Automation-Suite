import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Home,
  MessageSquare,
  Users,
  Link2,
  Settings,
  LogOut,
  HelpCircle,
  Bell,
  ChevronRight,
  Inbox,
  BarChart2,
} from "lucide-react";

interface SidebarProps {
  userName?: string;
  userEmail?: string;
  userAvatar?: string;
  activePage?: string;
  onLogout?: () => void;
  onPageChange?: (page: string) => void;
  currentLanguage?: "en" | "pt";
  onToggleLanguage?: () => void;
}

const Sidebar = ({
  userName = "John Doe",
  userEmail = "john@example.com",
  userAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  activePage = "dashboard",
  onLogout = () => console.log("Logout clicked"),
  onPageChange = () => {},
  currentLanguage = "en",
  onToggleLanguage = () => {},
}: SidebarProps) => {
  const navItems = [
    {
      name: "Dashboard",
      icon: <BarChart2 className="h-5 w-5" />,
      id: "dashboard",
    },
    {
      name: "Caixa de Entrada",
      icon: <Inbox className="h-5 w-5" />,
      id: "inbox",
    },
    {
      name: "Chatbot IA",
      icon: <MessageSquare className="h-5 w-5" />,
      id: "chatbot",
    },
    {
      name: "Mini-CRM",
      icon: <Users className="h-5 w-5" />,
      id: "crm",
    },
    {
      name: "Integrações",
      icon: <Link2 className="h-5 w-5" />,
      id: "integrations",
    },
    {
      name: "Configurações",
      icon: <Settings className="h-5 w-5" />,
      id: "settings",
    },
    {
      name: "Suporte",
      icon: <HelpCircle className="h-5 w-5" />,
      id: "support",
    },
  ];

  return (
    <div className="w-[280px] h-full bg-white border-r border-gray-200 flex flex-col">
      {/* Logo and Company Name */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-md">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png"
              alt="WhatsApp Logo"
              className="h-8 w-auto"
            />
          </div>
          <div>
            <h1 className="font-bold text-xl">WhatsApp Pro</h1>
            <p className="text-xs text-gray-500">Automação para Negócios</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onPageChange(item.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors w-full text-left ${
                  activePage === item.id
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
                {activePage === item.id && (
                  <ChevronRight className="h-4 w-4 ml-auto" />
                )}
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Suporte
          </h3>
          <ul className="mt-2 space-y-1">
            <li>
              <button className="flex items-center gap-3 px-4 py-3 text-gray-600 rounded-md hover:bg-gray-100 transition-colors w-full text-left">
                <HelpCircle className="h-5 w-5" />
                <span>Ajuda & Documentação</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Notifications */}
      <div className="p-4 border-t border-b border-gray-200">
        <div className="bg-blue-50 p-3 rounded-md flex items-center gap-3">
          <div className="bg-blue-100 p-2 rounded-full">
            <Bell className="h-5 w-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Novos recursos disponíveis</p>
            <p className="text-xs text-gray-500">
              Confira as últimas atualizações
            </p>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Ver atualizações</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200 mt-auto">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={userAvatar} alt={userName} />
            <AvatarFallback>{userName.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-medium truncate">{userName}</p>
            <p className="text-xs text-gray-500 truncate">{userEmail}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onToggleLanguage}
              className="text-xs px-2 py-1 h-auto"
            >
              {currentLanguage === "en" ? "PT" : "EN"}
            </Button>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-500"
                    onClick={onLogout}
                  >
                    <LogOut className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{currentLanguage === "en" ? "Logout" : "Sair"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
