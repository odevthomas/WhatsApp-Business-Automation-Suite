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
import { Checkbox } from "@/components/ui/checkbox";
import { Copy, Check, AlertCircle, Code } from "lucide-react";
import { t } from "@/lib/i18n";

interface WebhookSetupProps {
  webhookUrl?: string;
  verificationToken?: string;
  onSave?: (data: {
    webhookUrl: string;
    verificationToken: string;
    events: string[];
  }) => void;
}

const WebhookSetup: React.FC<WebhookSetupProps> = ({
  webhookUrl = "",
  verificationToken = "",
  onSave = () => {},
}) => {
  const [url, setUrl] = useState(webhookUrl);
  const [token, setToken] = useState(verificationToken || generateToken());
  const [activeTab, setActiveTab] = useState("configuration");
  const [selectedEvents, setSelectedEvents] = useState<string[]>([
    "messages",
    "message_status",
  ]);
  const [copied, setCopied] = useState<Record<string, boolean>>({});

  // Generate a random token
  function generateToken() {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied({ ...copied, [key]: true });
    setTimeout(() => {
      setCopied({ ...copied, [key]: false });
    }, 2000);
  };

  const handleSave = () => {
    onSave({
      webhookUrl: url,
      verificationToken: token,
      events: selectedEvents,
    });
  };

  const toggleEvent = (event: string) => {
    setSelectedEvents((prev) =>
      prev.includes(event) ? prev.filter((e) => e !== event) : [...prev, event],
    );
  };

  const webhookEvents = [
    { id: "messages", label: t("incoming_messages") },
    { id: "message_status", label: t("message_status_updates") },
    { id: "profile", label: t("profile_changes") },
    { id: "errors", label: t("error_notifications") },
  ];

  const getNodeJsCode = () => {
    return `const express = require('express');
const app = express();
app.use(express.json());

// WhatsApp webhook verification
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === '${token}') {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// Handle incoming webhook events
app.post('/webhook', (req, res) => {
  const body = req.body;

  if (body.object === 'whatsapp_business_account') {
    // Process the webhook payload
    console.log(JSON.stringify(body, null, 2));
    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.sendStatus(404);
  }
});

app.listen(3000, () => console.log('Webhook server is running on port 3000'));
`;
  };

  const getPhpCode = () => {
    return `<?php
// WhatsApp webhook verification
if (isset($_GET['hub_mode']) && isset($_GET['hub_verify_token'])) {
  $mode = $_GET['hub_mode'];
  $token = $_GET['hub_verify_token'];
  $challenge = $_GET['hub_challenge'];

  if ($mode === 'subscribe' && $token === '${token}') {
    echo $challenge;
    exit;
  } else {
    http_response_code(403);
    exit;
  }
}

// Handle incoming webhook events
$input = file_get_contents('php://input');
$body = json_decode($input, true);

if (isset($body['object']) && $body['object'] === 'whatsapp_business_account') {
  // Process the webhook payload
  file_put_contents('webhook_log.txt', $input . "\n", FILE_APPEND);
  http_response_code(200);
  echo 'EVENT_RECEIVED';
} else {
  http_response_code(404);
}
?>`;
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{t("webhook_setup")}</CardTitle>
        <CardDescription>{t("webhook_setup_description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="configuration">
              {t("configuration")}
            </TabsTrigger>
            <TabsTrigger value="code_samples">{t("code_samples")}</TabsTrigger>
            <TabsTrigger value="testing">{t("testing")}</TabsTrigger>
          </TabsList>

          <TabsContent value="configuration" className="space-y-6">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="webhookUrl">{t("webhook_url")}</Label>
                <div className="flex">
                  <Input
                    id="webhookUrl"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://your-server.com/webhook"
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    className="ml-2"
                    onClick={() => handleCopy(url, "url")}
                  >
                    {copied.url ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-sm text-gray-500">
                  {t("webhook_url_description")}
                </p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="verificationToken">
                  {t("verification_token")}
                </Label>
                <div className="flex">
                  <Input
                    id="verificationToken"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    className="ml-2"
                    onClick={() => handleCopy(token, "token")}
                  >
                    {copied.token ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-sm text-gray-500">
                  {t("verification_token_description")}
                </p>
              </div>

              <div className="space-y-2">
                <Label>{t("webhook_events")}</Label>
                <div className="grid gap-2">
                  {webhookEvents.map((event) => (
                    <div key={event.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={event.id}
                        checked={selectedEvents.includes(event.id)}
                        onCheckedChange={() => toggleEvent(event.id)}
                      />
                      <Label htmlFor={event.id} className="cursor-pointer">
                        {event.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>{t("important")}</AlertTitle>
                <AlertDescription>{t("webhook_setup_alert")}</AlertDescription>
              </Alert>
            </div>
          </TabsContent>

          <TabsContent value="code_samples" className="space-y-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Node.js (Express)</h3>
                <div className="relative">
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                    {getNodeJsCode()}
                  </pre>
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2 bg-gray-800 text-white hover:bg-gray-700"
                    onClick={() => handleCopy(getNodeJsCode(), "nodejs")}
                  >
                    {copied.nodejs ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">PHP</h3>
                <div className="relative">
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                    {getPhpCode()}
                  </pre>
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2 bg-gray-800 text-white hover:bg-gray-700"
                    onClick={() => handleCopy(getPhpCode(), "php")}
                  >
                    {copied.php ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="testing" className="space-y-6">
            <div className="space-y-4">
              <Alert className="bg-blue-50 border-blue-200">
                <Code className="h-4 w-4 text-blue-500" />
                <AlertTitle className="text-blue-700">
                  {t("testing_your_webhook")}
                </AlertTitle>
                <AlertDescription className="text-blue-600">
                  {t("webhook_testing_description")}
                </AlertDescription>
              </Alert>

              <div className="border p-4 rounded-md space-y-4">
                <h3 className="font-medium">{t("verification_request")}</h3>
                <p className="text-sm text-gray-500">
                  {t("verification_request_description")}
                </p>

                <div className="bg-gray-50 p-3 rounded-md">
                  <p className="text-sm font-mono">
                    GET {url || "/webhook"}?hub.mode=subscribe&hub.verify_token=
                    {token}&hub.challenge=CHALLENGE_CODE
                  </p>
                </div>

                <p className="text-sm text-gray-500">
                  {t("expected_response")}:{" "}
                  <span className="font-mono">CHALLENGE_CODE</span>
                </p>
              </div>

              <div className="border p-4 rounded-md space-y-4">
                <h3 className="font-medium">{t("sample_webhook_payload")}</h3>
                <div className="relative">
                  <pre className="bg-gray-50 p-3 rounded-md overflow-x-auto text-sm font-mono">
                    {JSON.stringify(
                      {
                        object: "whatsapp_business_account",
                        entry: [
                          {
                            id: "WHATSAPP_BUSINESS_ACCOUNT_ID",
                            changes: [
                              {
                                value: {
                                  messaging_product: "whatsapp",
                                  metadata: {
                                    display_phone_number: "+1234567890",
                                    phone_number_id: "PHONE_NUMBER_ID",
                                  },
                                  messages: [
                                    {
                                      from: "+9876543210",
                                      id: "wamid.abcdefg",
                                      timestamp: "1677770306",
                                      text: {
                                        body: "Hello, this is a test message",
                                      },
                                      type: "text",
                                    },
                                  ],
                                },
                                field: "messages",
                              },
                            ],
                          },
                        ],
                      },
                      null,
                      2,
                    )}
                  </pre>
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() =>
                      handleCopy(
                        JSON.stringify(
                          {
                            object: "whatsapp_business_account",
                            entry: [
                              {
                                id: "WHATSAPP_BUSINESS_ACCOUNT_ID",
                                changes: [
                                  {
                                    value: {
                                      messaging_product: "whatsapp",
                                      metadata: {
                                        display_phone_number: "+1234567890",
                                        phone_number_id: "PHONE_NUMBER_ID",
                                      },
                                      messages: [
                                        {
                                          from: "+9876543210",
                                          id: "wamid.abcdefg",
                                          timestamp: "1677770306",
                                          text: {
                                            body: "Hello, this is a test message",
                                          },
                                          type: "text",
                                        },
                                      ],
                                    },
                                    field: "messages",
                                  },
                                ],
                              },
                            ],
                          },
                          null,
                          2,
                        ),
                        "payload",
                      )
                    }
                  >
                    {copied.payload ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => setToken(generateToken())}>
          {t("generate_new_token")}
        </Button>
        <Button onClick={handleSave}>{t("save_webhook_settings")}</Button>
      </CardFooter>
    </Card>
  );
};

export default WebhookSetup;
