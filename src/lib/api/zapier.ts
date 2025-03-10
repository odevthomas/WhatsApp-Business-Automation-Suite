import axios from "axios";

/**
 * Trigger a Zapier webhook with data
 */
export async function triggerZapierWebhook(webhookUrl: string, data: any) {
  try {
    const response = await axios.post(webhookUrl, data);
    return response.data;
  } catch (error) {
    console.error("Error triggering Zapier webhook:", error);
    throw error;
  }
}

/**
 * Create a new lead in Zapier via webhook
 */
export async function createLeadViaZapier(
  webhookUrl: string,
  leadData: {
    name: string;
    phone: string;
    email?: string;
    source?: string;
    message?: string;
    timestamp?: string;
  },
) {
  try {
    // Add timestamp if not provided
    if (!leadData.timestamp) {
      leadData.timestamp = new Date().toISOString();
    }

    return await triggerZapierWebhook(webhookUrl, leadData);
  } catch (error) {
    console.error("Error creating lead via Zapier:", error);
    throw error;
  }
}

/**
 * Send notification via Zapier webhook
 */
export async function sendNotificationViaZapier(
  webhookUrl: string,
  notification: {
    title: string;
    message: string;
    type?: "info" | "success" | "warning" | "error";
    timestamp?: string;
    data?: any;
  },
) {
  try {
    // Add timestamp and default type if not provided
    if (!notification.timestamp) {
      notification.timestamp = new Date().toISOString();
    }
    if (!notification.type) {
      notification.type = "info";
    }

    return await triggerZapierWebhook(webhookUrl, notification);
  } catch (error) {
    console.error("Error sending notification via Zapier:", error);
    throw error;
  }
}

/**
 * Log conversation via Zapier webhook
 */
export async function logConversationViaZapier(
  webhookUrl: string,
  conversationData: {
    customerPhone: string;
    customerName?: string;
    messages: Array<{
      sender: "customer" | "business";
      text: string;
      timestamp: string;
    }>;
    conversationId?: string;
  },
) {
  try {
    // Generate conversation ID if not provided
    if (!conversationData.conversationId) {
      conversationData.conversationId = `conv_${Date.now()}`;
    }

    return await triggerZapierWebhook(webhookUrl, conversationData);
  } catch (error) {
    console.error("Error logging conversation via Zapier:", error);
    throw error;
  }
}
