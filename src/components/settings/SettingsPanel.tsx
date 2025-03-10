import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Settings, User, Bell, Palette } from "lucide-react";

import BusinessProfile from "./BusinessProfile";
import UserManagement from "./UserManagement";
import NotificationSettings from "./NotificationSettings";
import AppearanceSettings from "./AppearanceSettings";

interface SettingsPanelProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const SettingsPanel = ({
  activeTab = "business-profile",
  onTabChange = () => {},
}: SettingsPanelProps) => {
  const [currentTab, setCurrentTab] = useState(activeTab);

  const handleTabChange = (value: string) => {
    setCurrentTab(value);
    onTabChange(value);
  };

  return (
    <div className="w-full h-full bg-gray-50 p-6">
      <div className="max-w-screen-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your business profile, users, notifications, and appearance
          </p>
        </div>

        <Tabs
          value={currentTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <div className="flex flex-col md:flex-row gap-6">
            <Card className="md:w-64 bg-white">
              <CardContent className="p-4">
                <TabsList className="flex flex-col h-auto bg-transparent space-y-1">
                  <TabsTrigger
                    value="business-profile"
                    className="w-full justify-start px-3 py-2 h-auto data-[state=active]:bg-gray-100"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Business Profile
                  </TabsTrigger>
                  <TabsTrigger
                    value="user-management"
                    className="w-full justify-start px-3 py-2 h-auto data-[state=active]:bg-gray-100"
                  >
                    <User className="h-4 w-4 mr-2" />
                    User Management
                  </TabsTrigger>
                  <TabsTrigger
                    value="notifications"
                    className="w-full justify-start px-3 py-2 h-auto data-[state=active]:bg-gray-100"
                  >
                    <Bell className="h-4 w-4 mr-2" />
                    Notifications
                  </TabsTrigger>
                  <TabsTrigger
                    value="appearance"
                    className="w-full justify-start px-3 py-2 h-auto data-[state=active]:bg-gray-100"
                  >
                    <Palette className="h-4 w-4 mr-2" />
                    Appearance
                  </TabsTrigger>
                </TabsList>
              </CardContent>
            </Card>

            <div className="flex-1">
              <TabsContent value="business-profile" className="mt-0">
                <BusinessProfile />
              </TabsContent>
              <TabsContent value="user-management" className="mt-0">
                <UserManagement />
              </TabsContent>
              <TabsContent value="notifications" className="mt-0">
                <NotificationSettings />
              </TabsContent>
              <TabsContent value="appearance" className="mt-0">
                <AppearanceSettings />
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default SettingsPanel;
