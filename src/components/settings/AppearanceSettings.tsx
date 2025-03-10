import React, { useState } from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AppearanceSettingsProps {
  onSave?: (settings: AppearanceSettingsType) => void;
  initialSettings?: AppearanceSettingsType;
}

type ThemeMode = "light" | "dark" | "system";
type ColorScheme = "blue" | "purple" | "green" | "orange";
type LayoutDensity = "comfortable" | "compact" | "spacious";

interface AppearanceSettingsType {
  themeMode: ThemeMode;
  colorScheme: ColorScheme;
  layoutDensity: LayoutDensity;
  enableAnimations: boolean;
  enableRoundedCorners: boolean;
}

const AppearanceSettings: React.FC<AppearanceSettingsProps> = ({
  onSave = () => {},
  initialSettings = {
    themeMode: "light",
    colorScheme: "blue",
    layoutDensity: "comfortable",
    enableAnimations: true,
    enableRoundedCorners: true,
  },
}) => {
  const [settings, setSettings] =
    useState<AppearanceSettingsType>(initialSettings);
  const [activeTab, setActiveTab] = useState<string>("theme");

  const handleThemeModeChange = (value: ThemeMode) => {
    setSettings({ ...settings, themeMode: value });
  };

  const handleColorSchemeChange = (value: ColorScheme) => {
    setSettings({ ...settings, colorScheme: value });
  };

  const handleLayoutDensityChange = (value: LayoutDensity) => {
    setSettings({ ...settings, layoutDensity: value });
  };

  const handleToggleChange = (
    key: "enableAnimations" | "enableRoundedCorners",
  ) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  const handleSave = () => {
    onSave(settings);
  };

  return (
    <div className="w-full bg-background p-6">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Appearance Settings</CardTitle>
          <CardDescription>
            Customize the look and feel of your dashboard interface
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full mb-6">
              <TabsTrigger value="theme" className="flex-1">
                Theme
              </TabsTrigger>
              <TabsTrigger value="layout" className="flex-1">
                Layout
              </TabsTrigger>
              <TabsTrigger value="effects" className="flex-1">
                Effects
              </TabsTrigger>
            </TabsList>

            <TabsContent value="theme" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Theme Mode</h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div
                    className={`flex flex-col items-center p-4 border rounded-lg cursor-pointer ${settings.themeMode === "light" ? "border-primary bg-primary/5" : "border-border"}`}
                    onClick={() => handleThemeModeChange("light")}
                  >
                    <Sun className="h-8 w-8 mb-2" />
                    <span>Light</span>
                  </div>
                  <div
                    className={`flex flex-col items-center p-4 border rounded-lg cursor-pointer ${settings.themeMode === "dark" ? "border-primary bg-primary/5" : "border-border"}`}
                    onClick={() => handleThemeModeChange("dark")}
                  >
                    <Moon className="h-8 w-8 mb-2" />
                    <span>Dark</span>
                  </div>
                  <div
                    className={`flex flex-col items-center p-4 border rounded-lg cursor-pointer ${settings.themeMode === "system" ? "border-primary bg-primary/5" : "border-border"}`}
                    onClick={() => handleThemeModeChange("system")}
                  >
                    <Monitor className="h-8 w-8 mb-2" />
                    <span>System</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Color Scheme</h3>
                <RadioGroup
                  value={settings.colorScheme}
                  onValueChange={(value) =>
                    handleColorSchemeChange(value as ColorScheme)
                  }
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="blue" id="blue" />
                    <label htmlFor="blue" className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-blue-500 mr-2"></div>
                      Blue (Default)
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="purple" id="purple" />
                    <label htmlFor="purple" className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-purple-500 mr-2"></div>
                      Purple
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="green" id="green" />
                    <label htmlFor="green" className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                      Green
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="orange" id="orange" />
                    <label htmlFor="orange" className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-orange-500 mr-2"></div>
                      Orange
                    </label>
                  </div>
                </RadioGroup>
              </div>
            </TabsContent>

            <TabsContent value="layout" className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Layout Density</h3>
                <Select
                  value={settings.layoutDensity}
                  onValueChange={(value) =>
                    handleLayoutDensityChange(value as LayoutDensity)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select layout density" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="compact">Compact</SelectItem>
                    <SelectItem value="comfortable">
                      Comfortable (Default)
                    </SelectItem>
                    <SelectItem value="spacious">Spacious</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground mt-2">
                  {settings.layoutDensity === "compact" &&
                    "Compact layout shows more content with less spacing."}
                  {settings.layoutDensity === "comfortable" &&
                    "Comfortable layout provides balanced spacing for most screens."}
                  {settings.layoutDensity === "spacious" &&
                    "Spacious layout provides more room between elements."}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Rounded Corners</h3>
                    <p className="text-sm text-muted-foreground">
                      Enable or disable rounded corners on UI elements
                    </p>
                  </div>
                  <Switch
                    checked={settings.enableRoundedCorners}
                    onCheckedChange={() =>
                      handleToggleChange("enableRoundedCorners")
                    }
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="effects" className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Animations</h3>
                    <p className="text-sm text-muted-foreground">
                      Enable or disable UI animations and transitions
                    </p>
                  </div>
                  <Switch
                    checked={settings.enableAnimations}
                    onCheckedChange={() =>
                      handleToggleChange("enableAnimations")
                    }
                  />
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm">
                  Additional effects settings will be available in future
                  updates.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setSettings(initialSettings)}
          >
            Reset to Default
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AppearanceSettings;
