import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { ApiIntegrationService } from "@/lib/api";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { t } from "@/lib/i18n";

interface ApiIntegrationFormProps {
  onSave?: (apiKeys: Record<string, string>) => void;
  onCancel?: () => void;
  initialApiKeys?: Record<string, string>;
}

const ApiIntegrationForm: React.FC<ApiIntegrationFormProps> = ({
  onSave = () => {},
  onCancel = () => {},
  initialApiKeys = {},
}) => {
  const [activeTab, setActiveTab] = useState("whatsapp");
  const [apiKeys, setApiKeys] =
    useState<Record<string, string>>(initialApiKeys);
  const [testResults, setTestResults] = useState<
    Record<string, boolean | null>
  >({});
  const [isTesting, setIsTesting] = useState<Record<string, boolean>>({});
  const [errorMessages, setErrorMessages] = useState<Record<string, string>>(
    {},
  );

  const handleInputChange = (service: string, key: string, value: string) => {
    setApiKeys((prev) => ({
      ...prev,
      [`${service}${key}`]: value,
    }));

    // Reset test result when input changes
    setTestResults((prev) => ({
      ...prev,
      [service]: null,
    }));
  };

  const testConnection = async (service: string) => {
    setIsTesting((prev) => ({ ...prev, [service]: true }));
    setErrorMessages((prev) => ({ ...prev, [service]: "" }));

    try {
      const apiService = ApiIntegrationService.getInstance();

      // Initialize with current keys for this service
      const serviceKeys = {};
      Object.keys(apiKeys).forEach((key) => {
        if (key.startsWith(service)) {
          serviceKeys[key] = apiKeys[key];
        }
      });

      await apiService.initialize(serviceKeys);
      const result = await apiService.testConnection(service);

      setTestResults((prev) => ({ ...prev, [service]: result }));

      if (!result) {
        setErrorMessages((prev) => ({
          ...prev,
          [service]: `Could not connect to ${service} API. Please check your credentials.`,
        }));
      }
    } catch (error) {
      setTestResults((prev) => ({ ...prev, [service]: false }));
      setErrorMessages((prev) => ({
        ...prev,
        [service]: error.message || `Error connecting to ${service} API`,
      }));
    } finally {
      setIsTesting((prev) => ({ ...prev, [service]: false }));
    }
  };

  const handleSave = () => {
    onSave(apiKeys);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{t("api_integrations")}</CardTitle>
        <CardDescription>{t("configure_api_keys_description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="whatsapp">
              WhatsApp API
              {testResults.whatsapp === true && (
                <Badge
                  variant="outline"
                  className="ml-2 bg-green-100 text-green-800"
                >
                  {t("connected")}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="openai">
              OpenAI API
              {testResults.openai === true && (
                <Badge
                  variant="outline"
                  className="ml-2 bg-green-100 text-green-800"
                >
                  {t("connected")}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="payments">
              {t("payment_apis")}
              {(testResults.stripe === true ||
                testResults.mercadopago === true) && (
                <Badge
                  variant="outline"
                  className="ml-2 bg-green-100 text-green-800"
                >
                  {t("connected")}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="whatsapp" className="space-y-4">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="whatsappToken">{t("access_token")}</Label>
                <Input
                  id="whatsappToken"
                  type="password"
                  value={apiKeys.whatsappToken || ""}
                  onChange={(e) =>
                    handleInputChange("whatsapp", "Token", e.target.value)
                  }
                  placeholder="EAABw...."
                />
                <p className="text-sm text-gray-500">
                  {t("whatsapp_token_description")}
                </p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="whatsappPhoneId">{t("phone_id")}</Label>
                <Input
                  id="whatsappPhoneId"
                  value={apiKeys.whatsappPhoneId || ""}
                  onChange={(e) =>
                    handleInputChange("whatsapp", "PhoneId", e.target.value)
                  }
                  placeholder="1234567890"
                />
                <p className="text-sm text-gray-500">
                  {t("whatsapp_phone_id_description")}
                </p>
              </div>

              {errorMessages.whatsapp && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>{t("connection_error")}</AlertTitle>
                  <AlertDescription>{errorMessages.whatsapp}</AlertDescription>
                </Alert>
              )}

              <div className="flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => testConnection("whatsapp")}
                  disabled={
                    isTesting.whatsapp ||
                    !apiKeys.whatsappToken ||
                    !apiKeys.whatsappPhoneId
                  }
                >
                  {isTesting.whatsapp ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t("testing")}
                    </>
                  ) : (
                    t("test_connection")
                  )}
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="openai" className="space-y-4">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="openaiApiKey">{t("api_key")}</Label>
                <Input
                  id="openaiApiKey"
                  type="password"
                  value={apiKeys.openaiApiKey || ""}
                  onChange={(e) =>
                    handleInputChange("openai", "ApiKey", e.target.value)
                  }
                  placeholder="sk-..."
                />
                <p className="text-sm text-gray-500">
                  {t("openai_api_key_description")}
                </p>
              </div>

              {errorMessages.openai && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>{t("connection_error")}</AlertTitle>
                  <AlertDescription>{errorMessages.openai}</AlertDescription>
                </Alert>
              )}

              <div className="flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => testConnection("openai")}
                  disabled={isTesting.openai || !apiKeys.openaiApiKey}
                >
                  {isTesting.openai ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t("testing")}
                    </>
                  ) : (
                    t("test_connection")
                  )}
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="payments" className="space-y-4">
            <div className="space-y-6">
              <div className="border p-4 rounded-md space-y-4">
                <h3 className="font-medium">Stripe</h3>

                <div className="grid gap-2">
                  <Label htmlFor="stripeSecretKey">{t("secret_key")}</Label>
                  <Input
                    id="stripeSecretKey"
                    type="password"
                    value={apiKeys.stripeSecretKey || ""}
                    onChange={(e) =>
                      handleInputChange("stripe", "SecretKey", e.target.value)
                    }
                    placeholder="sk_..."
                  />
                </div>

                {errorMessages.stripe && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>{t("connection_error")}</AlertTitle>
                    <AlertDescription>{errorMessages.stripe}</AlertDescription>
                  </Alert>
                )}

                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    onClick={() => testConnection("stripe")}
                    disabled={isTesting.stripe || !apiKeys.stripeSecretKey}
                  >
                    {isTesting.stripe ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t("testing")}
                      </>
                    ) : (
                      t("test_connection")
                    )}
                  </Button>
                </div>
              </div>

              <div className="border p-4 rounded-md space-y-4">
                <h3 className="font-medium">Mercado Pago</h3>

                <div className="grid gap-2">
                  <Label htmlFor="mercadoPagoAccessToken">
                    {t("access_token")}
                  </Label>
                  <Input
                    id="mercadoPagoAccessToken"
                    type="password"
                    value={apiKeys.mercadoPagoAccessToken || ""}
                    onChange={(e) =>
                      handleInputChange(
                        "mercadoPago",
                        "AccessToken",
                        e.target.value,
                      )
                    }
                    placeholder="APP_USR-..."
                  />
                </div>

                {errorMessages.mercadopago && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>{t("connection_error")}</AlertTitle>
                    <AlertDescription>
                      {errorMessages.mercadopago}
                    </AlertDescription>
                  </Alert>
                )}

                <div className="flex justify-end">
                  <Button
                    variant="outline"
                    onClick={() => testConnection("mercadopago")}
                    disabled={
                      isTesting.mercadopago || !apiKeys.mercadoPagoAccessToken
                    }
                  >
                    {isTesting.mercadopago ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t("testing")}
                      </>
                    ) : (
                      t("test_connection")
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onCancel}>
          {t("cancel")}
        </Button>
        <Button onClick={handleSave}>{t("save_api_keys")}</Button>
      </CardFooter>
    </Card>
  );
};

export default ApiIntegrationForm;
