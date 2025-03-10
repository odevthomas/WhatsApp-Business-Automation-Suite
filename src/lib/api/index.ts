// Export all API modules
export * as whatsapp from "./whatsapp";
export * as openai from "./openai";
export * as payments from "./payments";
export * as googleSheets from "./googleSheets";
export * as googleCalendar from "./googleCalendar";
export * as zapier from "./zapier";

// API integration service
export class ApiIntegrationService {
  private static instance: ApiIntegrationService;
  private apiKeys: Record<string, string> = {};
  private initialized: boolean = false;

  private constructor() {}

  public static getInstance(): ApiIntegrationService {
    if (!ApiIntegrationService.instance) {
      ApiIntegrationService.instance = new ApiIntegrationService();
    }
    return ApiIntegrationService.instance;
  }

  public async initialize(apiKeys: Record<string, string>): Promise<boolean> {
    try {
      this.apiKeys = apiKeys;

      // Set environment variables for API modules
      process.env.WHATSAPP_TOKEN = apiKeys.whatsappToken || "";
      process.env.WHATSAPP_PHONE_ID = apiKeys.whatsappPhoneId || "";
      process.env.OPENAI_API_KEY = apiKeys.openaiApiKey || "";
      process.env.STRIPE_SECRET_KEY = apiKeys.stripeSecretKey || "";
      process.env.MERCADOPAGO_ACCESS_TOKEN =
        apiKeys.mercadoPagoAccessToken || "";

      this.initialized = true;
      return true;
    } catch (error) {
      console.error("Error initializing API integration service:", error);
      return false;
    }
  }

  public isInitialized(): boolean {
    return this.initialized;
  }

  public getApiKey(service: string): string {
    return this.apiKeys[service] || "";
  }

  public async testConnection(service: string): Promise<boolean> {
    try {
      switch (service) {
        case "whatsapp":
          // Simple test to check if WhatsApp API is accessible
          await fetch("https://graph.facebook.com/v16.0/me", {
            headers: {
              Authorization: `Bearer ${this.apiKeys.whatsappToken}`,
            },
          });
          return true;

        case "openai":
          // Test OpenAI connection
          const openaiResponse = await fetch(
            "https://api.openai.com/v1/models",
            {
              headers: {
                Authorization: `Bearer ${this.apiKeys.openaiApiKey}`,
              },
            },
          );
          return openaiResponse.ok;

        case "stripe":
          // Test Stripe connection
          const stripeResponse = await fetch(
            "https://api.stripe.com/v1/balance",
            {
              headers: {
                Authorization: `Bearer ${this.apiKeys.stripeSecretKey}`,
              },
            },
          );
          return stripeResponse.ok;

        default:
          return false;
      }
    } catch (error) {
      console.error(`Error testing connection to ${service}:`, error);
      return false;
    }
  }
}
