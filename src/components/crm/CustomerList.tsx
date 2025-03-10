import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Search,
  Plus,
  Filter,
  Trash2,
  MoreVertical,
  Download,
  Upload,
} from "lucide-react";
import { t } from "@/lib/i18n";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  address?: string;
  notes?: string;
}

interface CustomerListProps {
  customers: Customer[];
  onSelectCustomer: (customer: Customer) => void;
  selectedCustomerId?: string;
  onDeleteCustomer?: (customerId: string) => void;
  onAddCustomer?: (customer: Omit<Customer, "id">) => void;
}

const CustomerList: React.FC<CustomerListProps> = ({
  customers,
  onSelectCustomer,
  selectedCustomerId,
  onDeleteCustomer = () => {},
  onAddCustomer = () => {},
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Filter customers based on search query and status filter
  const filteredCustomers = customers
    ? customers.filter((customer) => {
        const matchesSearch =
          customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          customer.phone.includes(searchQuery);

        const matchesStatus =
          statusFilter === "all" || customer.status === statusFilter;

        return matchesSearch && matchesStatus;
      })
    : [];

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const handleAddNewCustomer = () => {
    const newCustomer = {
      name: "New Customer",
      email: "customer@example.com",
      phone: "+1 (555) 000-0000",
      classification: "lead",
      lastContact: new Date().toISOString(),
      status: "pending" as const,
      address: "",
      notes: "",
    };
    onAddCustomer(newCustomer);
  };

  // Função para exportar clientes
  const handleExportCustomers = () => {
    alert(`${filteredCustomers.length} clientes exportados com sucesso!`);
  };

  // Função para importar clientes
  const handleImportCustomers = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".csv,.xlsx";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        alert(
          `Arquivo "${file.name}" importado com sucesso! 5 novos clientes adicionados.`,
        );
      }
    };
    input.click();
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle>{t("customers")}</CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleExportCustomers}>
              <Download className="h-4 w-4 mr-2" /> Exportar
            </Button>
            <Button variant="outline" onClick={handleImportCustomers}>
              <Upload className="h-4 w-4 mr-2" /> Importar
            </Button>
            <Button onClick={handleAddNewCustomer}>
              <Plus className="h-4 w-4 mr-2" /> {t("add_customer")}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder={t("search_customers")}
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <select
              className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">{t("all_status")}</option>
              <option value="active">{t("active")}</option>
              <option value="pending">{t("pending")}</option>
              <option value="inactive">{t("inactive")}</option>
            </select>
          </div>
        </div>

        <ScrollArea className="h-[500px]">
          <div className="space-y-2">
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => (
                <div
                  key={customer.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${customer.id === selectedCustomerId ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"}`}
                  onClick={() => onSelectCustomer(customer)}
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      {customer.avatarUrl ? (
                        <AvatarImage
                          src={customer.avatarUrl}
                          alt={customer.name}
                        />
                      ) : (
                        <AvatarFallback>
                          {customer.initials || customer.name.charAt(0)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium truncate">
                          {customer.name}
                        </h3>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              customer.status === "active"
                                ? "default"
                                : "outline"
                            }
                            className={
                              customer.status === "active" ? "bg-green-500" : ""
                            }
                          >
                            {t(customer.status)}
                          </Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                className="text-red-600 cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (confirm(t("confirm_delete_customer"))) {
                                    onDeleteCustomer(customer.id);
                                  }
                                }}
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                {t("delete")}
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 truncate">
                        {customer.email}
                      </p>
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-sm">{customer.phone}</p>
                        <span className="text-xs text-gray-500">
                          {t("last_contact")}:{" "}
                          {formatDate(customer.lastContact)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">{t("no_customers")}</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default CustomerList;
