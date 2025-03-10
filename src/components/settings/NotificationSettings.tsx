import React from "react";
import { Bell, Mail, MessageSquare, Smartphone } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Switch } from "../ui/switch";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";

interface NotificationCategory {
  id: string;
  name: string;
  description: string;
  settings: NotificationSetting[];
}

interface NotificationSetting {
  id: string;
  label: string;
  description?: string;
  email: boolean;
  inApp: boolean;
  push: boolean;
  sms: boolean;
}

const defaultCategories: NotificationCategory[] = [
  {
    id: "customer-interactions",
    name: "Customer Interactions",
    description: "Notifications related to customer messages and interactions",
    settings: [
      {
        id: "new-message",
        label: "New customer message",
        description: "When a customer sends a new message",
        email: true,
        inApp: true,
        push: true,
        sms: false,
      },
      {
        id: "message-read",
        label: "Message read receipt",
        description: "When a customer reads your message",
        email: false,
        inApp: true,
        push: false,
        sms: false,
      },
    ],
  },
  {
    id: "automation",
    name: "Automation",
    description: "Notifications about your automated workflows",
    settings: [
      {
        id: "workflow-triggered",
        label: "Workflow triggered",
        description: "When an automation workflow is triggered",
        email: true,
        inApp: true,
        push: false,
        sms: false,
      },
      {
        id: "workflow-error",
        label: "Workflow error",
        description: "When an automation workflow encounters an error",
        email: true,
        inApp: true,
        push: true,
        sms: false,
      },
    ],
  },
  {
    id: "leads",
    name: "Leads & Appointments",
    description: "Notifications about new leads and scheduled appointments",
    settings: [
      {
        id: "new-lead",
        label: "New lead captured",
        description: "When a new lead is captured through WhatsApp",
        email: true,
        inApp: true,
        push: true,
        sms: false,
      },
      {
        id: "appointment-scheduled",
        label: "Appointment scheduled",
        description: "When a customer books an appointment",
        email: true,
        inApp: true,
        push: true,
        sms: true,
      },
      {
        id: "appointment-reminder",
        label: "Appointment reminder",
        description: "Reminder before an upcoming appointment",
        email: true,
        inApp: true,
        push: true,
        sms: true,
      },
    ],
  },
  {
    id: "system",
    name: "System",
    description: "System-related notifications and updates",
    settings: [
      {
        id: "system-updates",
        label: "System updates",
        description: "Updates about new features and improvements",
        email: true,
        inApp: true,
        push: false,
        sms: false,
      },
      {
        id: "billing",
        label: "Billing notifications",
        description: "Invoices and payment reminders",
        email: true,
        inApp: true,
        push: false,
        sms: false,
      },
    ],
  },
];

interface NotificationSettingsProps {
  categories?: NotificationCategory[];
  onSave?: (categories: NotificationCategory[]) => void;
}

const NotificationSettings = ({
  categories = defaultCategories,
  onSave = () => {},
}: NotificationSettingsProps) => {
  const [activeCategories, setActiveCategories] =
    React.useState<NotificationCategory[]>(categories);
  const [activeTab, setActiveTab] = React.useState("all");

  const handleToggle = (
    categoryId: string,
    settingId: string,
    channel: "email" | "inApp" | "push" | "sms",
    value: boolean,
  ) => {
    setActiveCategories((prevCategories) => {
      return prevCategories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            settings: category.settings.map((setting) => {
              if (setting.id === settingId) {
                return {
                  ...setting,
                  [channel]: value,
                };
              }
              return setting;
            }),
          };
        }
        return category;
      });
    });
  };

  const handleSave = () => {
    onSave(activeCategories);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Notification Settings
        </h1>
        <p className="text-gray-500 mt-1">
          Configure how and when you receive notifications
        </p>
      </div>

      <Tabs
        defaultValue="all"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="mb-6 w-full justify-start">
          <TabsTrigger value="all">All Notifications</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="in-app">In-App</TabsTrigger>
          <TabsTrigger value="push">Push</TabsTrigger>
          <TabsTrigger value="sms">SMS</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {activeCategories.map((category) => (
            <Card key={category.id} className="overflow-hidden">
              <CardHeader className="bg-gray-50 pb-3">
                <CardTitle>{category.name}</CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-medium text-gray-500">
                        Notification
                      </th>
                      <th className="p-4 text-center font-medium text-gray-500 w-24">
                        <div className="flex flex-col items-center">
                          <Mail className="h-4 w-4 mb-1" />
                          <span className="text-xs">Email</span>
                        </div>
                      </th>
                      <th className="p-4 text-center font-medium text-gray-500 w-24">
                        <div className="flex flex-col items-center">
                          <Bell className="h-4 w-4 mb-1" />
                          <span className="text-xs">In-App</span>
                        </div>
                      </th>
                      <th className="p-4 text-center font-medium text-gray-500 w-24">
                        <div className="flex flex-col items-center">
                          <Smartphone className="h-4 w-4 mb-1" />
                          <span className="text-xs">Push</span>
                        </div>
                      </th>
                      <th className="p-4 text-center font-medium text-gray-500 w-24">
                        <div className="flex flex-col items-center">
                          <MessageSquare className="h-4 w-4 mb-1" />
                          <span className="text-xs">SMS</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {category.settings.map((setting) => (
                      <tr
                        key={setting.id}
                        className="border-b last:border-b-0 hover:bg-gray-50"
                      >
                        <td className="p-4">
                          <div className="font-medium">{setting.label}</div>
                          {setting.description && (
                            <div className="text-sm text-gray-500">
                              {setting.description}
                            </div>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          <Switch
                            checked={setting.email}
                            onCheckedChange={(checked) =>
                              handleToggle(
                                category.id,
                                setting.id,
                                "email",
                                checked,
                              )
                            }
                            className="mx-auto"
                          />
                        </td>
                        <td className="p-4 text-center">
                          <Switch
                            checked={setting.inApp}
                            onCheckedChange={(checked) =>
                              handleToggle(
                                category.id,
                                setting.id,
                                "inApp",
                                checked,
                              )
                            }
                            className="mx-auto"
                          />
                        </td>
                        <td className="p-4 text-center">
                          <Switch
                            checked={setting.push}
                            onCheckedChange={(checked) =>
                              handleToggle(
                                category.id,
                                setting.id,
                                "push",
                                checked,
                              )
                            }
                            className="mx-auto"
                          />
                        </td>
                        <td className="p-4 text-center">
                          <Switch
                            checked={setting.sms}
                            onCheckedChange={(checked) =>
                              handleToggle(
                                category.id,
                                setting.id,
                                "sms",
                                checked,
                              )
                            }
                            className="mx-auto"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="email" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Email Notification Settings</CardTitle>
              <CardDescription>
                Configure your email notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeCategories.flatMap((category) =>
                category.settings.map((setting) => (
                  <div
                    key={`${category.id}-${setting.id}`}
                    className="flex items-start space-x-3"
                  >
                    <Checkbox
                      id={`email-${setting.id}`}
                      checked={setting.email}
                      onCheckedChange={(checked) =>
                        handleToggle(
                          category.id,
                          setting.id,
                          "email",
                          checked as boolean,
                        )
                      }
                    />
                    <div className="space-y-1">
                      <label
                        htmlFor={`email-${setting.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {setting.label}
                      </label>
                      {setting.description && (
                        <p className="text-sm text-gray-500">
                          {setting.description}
                        </p>
                      )}
                      <p className="text-xs text-gray-500">
                        Category: {category.name}
                      </p>
                    </div>
                  </div>
                )),
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="in-app" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>In-App Notification Settings</CardTitle>
              <CardDescription>
                Configure your in-app notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeCategories.flatMap((category) =>
                category.settings.map((setting) => (
                  <div
                    key={`${category.id}-${setting.id}`}
                    className="flex items-start space-x-3"
                  >
                    <Checkbox
                      id={`inapp-${setting.id}`}
                      checked={setting.inApp}
                      onCheckedChange={(checked) =>
                        handleToggle(
                          category.id,
                          setting.id,
                          "inApp",
                          checked as boolean,
                        )
                      }
                    />
                    <div className="space-y-1">
                      <label
                        htmlFor={`inapp-${setting.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {setting.label}
                      </label>
                      {setting.description && (
                        <p className="text-sm text-gray-500">
                          {setting.description}
                        </p>
                      )}
                      <p className="text-xs text-gray-500">
                        Category: {category.name}
                      </p>
                    </div>
                  </div>
                )),
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="push" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Push Notification Settings</CardTitle>
              <CardDescription>
                Configure your mobile push notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeCategories.flatMap((category) =>
                category.settings.map((setting) => (
                  <div
                    key={`${category.id}-${setting.id}`}
                    className="flex items-start space-x-3"
                  >
                    <Checkbox
                      id={`push-${setting.id}`}
                      checked={setting.push}
                      onCheckedChange={(checked) =>
                        handleToggle(
                          category.id,
                          setting.id,
                          "push",
                          checked as boolean,
                        )
                      }
                    />
                    <div className="space-y-1">
                      <label
                        htmlFor={`push-${setting.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {setting.label}
                      </label>
                      {setting.description && (
                        <p className="text-sm text-gray-500">
                          {setting.description}
                        </p>
                      )}
                      <p className="text-xs text-gray-500">
                        Category: {category.name}
                      </p>
                    </div>
                  </div>
                )),
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sms" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SMS Notification Settings</CardTitle>
              <CardDescription>
                Configure your SMS notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeCategories.flatMap((category) =>
                category.settings.map((setting) => (
                  <div
                    key={`${category.id}-${setting.id}`}
                    className="flex items-start space-x-3"
                  >
                    <Checkbox
                      id={`sms-${setting.id}`}
                      checked={setting.sms}
                      onCheckedChange={(checked) =>
                        handleToggle(
                          category.id,
                          setting.id,
                          "sms",
                          checked as boolean,
                        )
                      }
                    />
                    <div className="space-y-1">
                      <label
                        htmlFor={`sms-${setting.id}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {setting.label}
                      </label>
                      {setting.description && (
                        <p className="text-sm text-gray-500">
                          {setting.description}
                        </p>
                      )}
                      <p className="text-xs text-gray-500">
                        Category: {category.name}
                      </p>
                    </div>
                  </div>
                )),
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8 flex justify-end space-x-4">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
};

export default NotificationSettings;
