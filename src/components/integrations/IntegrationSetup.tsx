import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { useToast } from "../ui/use-toast";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ExternalLink,
  RefreshCw,
} from "lucide-react";

interface IntegrationSetupProps {
  integration?: {
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
    category: string;
  };
  onComplete?: () => void;
  onCancel?: () => void;
}

const IntegrationSetup = ({
  integration = {
    id: "google-calendar",
    name: "Google Calendar",
    description: "Sincronize seus compromissos e agenda com o Google Calendar",
    icon: (
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Google_Calendar_icon_%282020%29.svg/2048px-Google_Calendar_icon_%282020%29.svg.png"
        alt="Google Calendar"
        className="h-8 w-8"
      />
    ),
    category: "calendar",
  },
  onComplete = () => {},
  onCancel = () => {},
}: IntegrationSetupProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Form state
  const [authCode, setAuthCode] = useState("");
  const [syncFrequency, setSyncFrequency] = useState("hourly");
  const [syncOptions, setSyncOptions] = useState({
    twoWaySync: true,
    includeCustomerInfo: true,
    notifyOnChanges: true,
  });

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onCancel();
    }
  };

  const handleAuthorize = () => {
    setLoading(true);
    // Simulate authorization process
    setTimeout(() => {
      setLoading(false);
      setAuthCode("auth-code-example-12345");
      toast({
        title: "Authorization Successful",
        description: "Your account has been connected successfully.",
      });
      handleNext();
    }, 1500);
  };

  const handleComplete = () => {
    setLoading(true);
    // Simulate setup completion
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Integration Setup Complete",
        description: `${integration.name} has been successfully integrated with your account.`,
      });
      onComplete();
    }, 1500);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto bg-white">
      <CardHeader>
        <div className="flex items-center gap-3">
          {integration.icon}
          <div>
            <CardTitle className="text-xl">{integration.name} Setup</CardTitle>
            <CardDescription>{integration.description}</CardDescription>
          </div>
        </div>
        <div className="flex justify-between items-center mt-6">
          <div className="flex items-center gap-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            >
              {currentStep > 1 ? <Check className="h-4 w-4" /> : "1"}
            </div>
            <div className="h-1 w-12 bg-gray-200">
              <div
                className={`h-full ${currentStep > 1 ? "bg-blue-600" : "bg-gray-200"}`}
                style={{ width: currentStep > 1 ? "100%" : "0%" }}
              ></div>
            </div>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            >
              {currentStep > 2 ? <Check className="h-4 w-4" /> : "2"}
            </div>
            <div className="h-1 w-12 bg-gray-200">
              <div
                className={`h-full ${currentStep > 2 ? "bg-blue-600" : "bg-gray-200"}`}
                style={{ width: currentStep > 2 ? "100%" : "0%" }}
              ></div>
            </div>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            >
              3
            </div>
          </div>
          <div className="text-sm font-medium">Step {currentStep} of 3</div>
        </div>
      </CardHeader>

      <CardContent>
        {currentStep === 1 && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Connect Your Account</h3>
            <p className="text-gray-500">
              To integrate with {integration.name}, you need to authorize access
              to your account. Click the button below to start the authorization
              process.
            </p>
            <div className="bg-blue-50 p-4 rounded-md">
              <p className="text-sm text-blue-700">
                You will be redirected to {integration.name} to authorize
                access. After authorization, you will be returned to this setup
                wizard.
              </p>
            </div>
            <Button
              onClick={handleAuthorize}
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Authorizing...
                </>
              ) : (
                <>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Authorize with {integration.name}
                </>
              )}
            </Button>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Configure Sync Settings</h3>
            <p className="text-gray-500">
              Customize how {integration.name} syncs with your WhatsApp Business
              account.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Sync Frequency
                </label>
                <Select value={syncFrequency} onValueChange={setSyncFrequency}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realtime">Real-time</SelectItem>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="manual">Manual only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium">
                  Sync Options
                </label>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="twoWaySync"
                    checked={syncOptions.twoWaySync}
                    onCheckedChange={(checked) =>
                      setSyncOptions({
                        ...syncOptions,
                        twoWaySync: checked as boolean,
                      })
                    }
                  />
                  <label htmlFor="twoWaySync" className="text-sm">
                    Enable two-way synchronization
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="includeCustomerInfo"
                    checked={syncOptions.includeCustomerInfo}
                    onCheckedChange={(checked) =>
                      setSyncOptions({
                        ...syncOptions,
                        includeCustomerInfo: checked as boolean,
                      })
                    }
                  />
                  <label htmlFor="includeCustomerInfo" className="text-sm">
                    Include customer information in events
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="notifyOnChanges"
                    checked={syncOptions.notifyOnChanges}
                    onCheckedChange={(checked) =>
                      setSyncOptions({
                        ...syncOptions,
                        notifyOnChanges: checked as boolean,
                      })
                    }
                  />
                  <label htmlFor="notifyOnChanges" className="text-sm">
                    Notify me when changes are made
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Review and Confirm</h3>
            <p className="text-gray-500">
              Review your integration settings before finalizing the setup.
            </p>

            <div className="bg-gray-50 p-4 rounded-md space-y-4">
              <div>
                <h4 className="text-sm font-medium">Integration</h4>
                <p className="text-sm">{integration.name}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium">Authorization</h4>
                <p className="text-sm">Account connected successfully</p>
              </div>

              <div>
                <h4 className="text-sm font-medium">Sync Frequency</h4>
                <p className="text-sm capitalize">{syncFrequency}</p>
              </div>

              <div>
                <h4 className="text-sm font-medium">Sync Options</h4>
                <ul className="text-sm list-disc list-inside">
                  {syncOptions.twoWaySync && (
                    <li>Two-way synchronization enabled</li>
                  )}
                  {syncOptions.includeCustomerInfo && (
                    <li>Customer information included in events</li>
                  )}
                  {syncOptions.notifyOnChanges && (
                    <li>Notifications for changes enabled</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between border-t p-6">
        <Button variant="outline" onClick={handleBack}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {currentStep === 1 ? "Cancel" : "Back"}
        </Button>

        <Button onClick={handleNext} disabled={loading}>
          {currentStep === 3 ? (
            loading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Completing Setup...
              </>
            ) : (
              <>
                Complete Setup
                <Check className="ml-2 h-4 w-4" />
              </>
            )
          ) : (
            <>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default IntegrationSetup;
