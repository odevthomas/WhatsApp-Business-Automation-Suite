import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  MessageSquare,
  Tag,
  Edit,
  Save,
  Plus,
  Clock,
  CheckCheck,
  Trash2,
} from "lucide-react";
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
  address?: string;
  notes?: string;
  tags?: string[];
  conversations?: Conversation[];
  appointments?: Appointment[];
}

interface Conversation {
  id: string;
  date: string;
  summary: string;
  messages: Message[];
}

interface Message {
  id: string;
  text: string;
  time: string;
  sender: "user" | "customer";
}

interface Appointment {
  id: string;
  title: string;
  date: string;
  time: string;
  status: "scheduled" | "completed" | "cancelled";
  notes?: string;
}

interface CustomerDetailProps {
  customer: Customer;
  onSave?: (customer: Customer) => void;
  onDelete?: () => void;
}

const CustomerDetail: React.FC<CustomerDetailProps> = ({
  customer = {
    id: "",
    name: "",
    email: "",
    phone: "",
    classification: "",
    lastContact: new Date().toISOString(),
    status: "pending" as const,
  },
  onSave = () => {},
  onDelete = () => {},
}) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState<Customer>({
    ...customer,
    tags: customer?.tags || [],
    conversations: customer?.conversations || [],
    appointments: customer?.appointments || [],
  });
  const [newTag, setNewTag] = useState("");

  const handleSave = () => {
    onSave(editedCustomer);
    setIsEditing(false);
  };

  const handleAddTag = () => {
    if (newTag.trim() && !editedCustomer.tags?.includes(newTag.trim())) {
      setEditedCustomer({
        ...editedCustomer,
        tags: [...(editedCustomer.tags || []), newTag.trim()],
      });
      setNewTag("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setEditedCustomer({
      ...editedCustomer,
      tags: editedCustomer.tags?.filter((t) => t !== tag),
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="h-full bg-white rounded-lg overflow-hidden flex flex-col">
      {/* Customer Header */}
      <div className="p-4 md:p-6 border-b">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              {customer?.avatarUrl ? (
                <AvatarImage src={customer.avatarUrl} alt={customer.name} />
              ) : (
                <AvatarFallback>
                  {customer?.initials || customer?.name?.charAt(0) || "?"}
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <h1 className="text-xl md:text-2xl font-bold">
                {customer?.name || "New Customer"}
              </h1>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <Badge
                  variant={
                    customer?.status === "active" ? "default" : "outline"
                  }
                  className={
                    customer?.status === "active" ? "bg-green-500" : ""
                  }
                >
                  {t(customer?.status || "pending")}
                </Badge>
                <Badge variant="outline">
                  {customer?.classification || ""}
                </Badge>
                <span className="text-sm text-gray-500">
                  {t("last_contact")}:{" "}
                  {customer?.lastContact
                    ? formatDate(customer.lastContact)
                    : ""}
                </span>
              </div>
            </div>
          </div>
          <div>
            {isEditing ? (
              <div className="flex gap-2">
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" /> {t("save_changes")}
                </Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  {t("cancel")}
                </Button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsEditing(true)}>
                  <Edit className="h-4 w-4 mr-2" /> {t("edit")}
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    if (confirm(t("confirm_delete_customer"))) {
                      onDelete();
                    }
                  }}
                >
                  <Trash2 className="h-4 w-4 mr-2" /> {t("delete")}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
        <div className="border-b">
          <TabsList className="mx-4 md:mx-6 overflow-x-auto">
            <TabsTrigger value="overview">{t("overview")}</TabsTrigger>
            <TabsTrigger value="conversations">
              {t("conversations")}
            </TabsTrigger>
            <TabsTrigger value="appointments">{t("appointments")}</TabsTrigger>
            <TabsTrigger value="notes">{t("notes")}</TabsTrigger>
          </TabsList>
        </div>

        <div className="p-4 md:p-6 flex-1 overflow-auto">
          <TabsContent value="overview" className="mt-0 h-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Contact Information */}
              <Card className="md:col-span-2">
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4">
                    {t("contact_information")}
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <User className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">
                          {t("full_name")}
                        </p>
                        {isEditing ? (
                          <Input
                            value={editedCustomer.name}
                            onChange={(e) =>
                              setEditedCustomer({
                                ...editedCustomer,
                                name: e.target.value,
                              })
                            }
                            className="mt-1"
                          />
                        ) : (
                          <p>{customer.name}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">
                          {t("email_address")}
                        </p>
                        {isEditing ? (
                          <Input
                            value={editedCustomer.email}
                            onChange={(e) =>
                              setEditedCustomer({
                                ...editedCustomer,
                                email: e.target.value,
                              })
                            }
                            className="mt-1"
                          />
                        ) : (
                          <p>{customer.email}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">
                          {t("phone_number")}
                        </p>
                        {isEditing ? (
                          <Input
                            value={editedCustomer.phone}
                            onChange={(e) =>
                              setEditedCustomer({
                                ...editedCustomer,
                                phone: e.target.value,
                              })
                            }
                            className="mt-1"
                          />
                        ) : (
                          <p>{customer.phone}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">{t("address")}</p>
                        {isEditing ? (
                          <Input
                            value={editedCustomer.address || ""}
                            onChange={(e) =>
                              setEditedCustomer({
                                ...editedCustomer,
                                address: e.target.value,
                              })
                            }
                            className="mt-1"
                          />
                        ) : (
                          <p>{customer.address || t("not_provided")}</p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Tag className="h-5 w-5 text-gray-400 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">{t("tags")}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {(editedCustomer.tags || []).map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="flex items-center gap-1"
                            >
                              {tag}
                              {isEditing && (
                                <button
                                  onClick={() => handleRemoveTag(tag)}
                                  className="text-gray-500 hover:text-gray-700 ml-1"
                                >
                                  ×
                                </button>
                              )}
                            </Badge>
                          ))}
                          {isEditing && (
                            <div className="flex items-center gap-2">
                              <Input
                                value={newTag}
                                onChange={(e) => setNewTag(e.target.value)}
                                placeholder={t("add_tag")}
                                className="w-32 h-8"
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleAddTag();
                                  }
                                }}
                              />
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={handleAddTag}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Stats */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4">
                    {t("customer_stats")}
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500">
                        {t("classification")}
                      </p>
                      <p className="font-medium">{customer.classification}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{t("status")}</p>
                      <Badge
                        variant={
                          customer.status === "active" ? "default" : "outline"
                        }
                        className={
                          customer.status === "active" ? "bg-green-500" : ""
                        }
                      >
                        {t(customer.status)}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        {t("last_contact")}
                      </p>
                      <p>{formatDate(customer.lastContact)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        {t("total_conversations")}
                      </p>
                      <p>{editedCustomer.conversations?.length || 0}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">
                        {t("appointments")}
                      </p>
                      <p>{editedCustomer.appointments?.length || 0}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Notes */}
              <Card className="md:col-span-3">
                <CardContent className="p-6">
                  <h2 className="text-lg font-semibold mb-4">{t("notes")}</h2>
                  {isEditing ? (
                    <Textarea
                      value={editedCustomer.notes || ""}
                      onChange={(e) =>
                        setEditedCustomer({
                          ...editedCustomer,
                          notes: e.target.value,
                        })
                      }
                      placeholder={t("add_notes")}
                      className="min-h-[150px]"
                    />
                  ) : (
                    <div className="p-4 bg-gray-50 rounded-md min-h-[150px]">
                      {customer.notes || t("no_notes")}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="conversations" className="mt-0 h-full">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">
                  {t("conversation_history")}
                </h2>
                <Button variant="outline">
                  <MessageSquare className="h-4 w-4 mr-2" />{" "}
                  {t("start_new_conversation")}
                </Button>
              </div>

              <ScrollArea className="h-[500px]">
                {editedCustomer.conversations &&
                editedCustomer.conversations.length > 0 ? (
                  <div className="space-y-4">
                    {editedCustomer.conversations.map((conversation) => (
                      <Card key={conversation.id}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="font-medium">
                                {t("conversation_on")}{" "}
                                {formatDate(conversation.date)}
                              </h3>
                              <p className="text-sm text-gray-500">
                                {conversation.summary}
                              </p>
                            </div>
                            <Button variant="ghost" size="sm">
                              {t("view_full_conversation")}
                            </Button>
                          </div>

                          <div className="space-y-3 mt-4">
                            {conversation.messages
                              .slice(0, 3)
                              .map((message) => (
                                <div
                                  key={message.id}
                                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                                >
                                  <div
                                    className={`max-w-[70%] rounded-lg p-3 ${message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100"}`}
                                  >
                                    <p className="text-sm">{message.text}</p>
                                    <div
                                      className={`flex items-center justify-end mt-1 text-xs ${message.sender === "user" ? "text-blue-200" : "text-gray-500"}`}
                                    >
                                      <span>{message.time}</span>
                                      {message.sender === "user" && (
                                        <CheckCheck className="h-3 w-3 ml-1" />
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            {conversation.messages.length > 3 && (
                              <div className="text-center text-sm text-gray-500">
                                + {conversation.messages.length - 3}{" "}
                                {t("more_messages")}
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    {t("no_conversation_history")}
                  </div>
                )}
              </ScrollArea>
            </div>
          </TabsContent>

          <TabsContent value="appointments" className="mt-0 h-full">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">{t("appointments")}</h2>
                <Button variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />{" "}
                  {t("schedule_appointment")}
                </Button>
              </div>

              <ScrollArea className="h-[500px]">
                {editedCustomer.appointments &&
                editedCustomer.appointments.length > 0 ? (
                  <div className="space-y-4">
                    {editedCustomer.appointments.map((appointment) => (
                      <Card key={appointment.id}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="flex items-start gap-3">
                              <div className="p-2 bg-blue-100 rounded-full">
                                <Calendar className="h-5 w-5 text-blue-600" />
                              </div>
                              <div>
                                <h3 className="font-medium">
                                  {appointment.title}
                                </h3>
                                <div className="flex items-center mt-1 text-sm text-gray-500">
                                  <Clock className="h-4 w-4 mr-1" />
                                  <span>
                                    {formatDate(appointment.date)} {t("at")}{" "}
                                    {appointment.time}
                                  </span>
                                </div>
                                {appointment.notes && (
                                  <p className="text-sm mt-2">
                                    {appointment.notes}
                                  </p>
                                )}
                              </div>
                            </div>
                            <Badge
                              variant={
                                appointment.status === "completed"
                                  ? "default"
                                  : appointment.status === "cancelled"
                                    ? "destructive"
                                    : "outline"
                              }
                              className={
                                appointment.status === "completed"
                                  ? "bg-green-500"
                                  : ""
                              }
                            >
                              {t(appointment.status)}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    {t("no_appointments")}
                  </div>
                )}
              </ScrollArea>
            </div>
          </TabsContent>

          <TabsContent value="notes" className="mt-0 h-full">
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">{t("customer_notes")}</h2>
              <Textarea
                value={editedCustomer.notes || ""}
                onChange={(e) =>
                  setEditedCustomer({
                    ...editedCustomer,
                    notes: e.target.value,
                  })
                }
                placeholder={t("add_notes")}
                className="min-h-[400px]"
              />
              <div className="flex justify-end">
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" /> {t("save_notes")}
                </Button>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default CustomerDetail;
