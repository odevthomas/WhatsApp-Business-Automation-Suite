import axios from "axios";

// WhatsApp API configuration
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN || "";
const PHONE_ID = process.env.WHATSAPP_PHONE_ID || "";
const API_VERSION = "v16.0";
const BASE_URL = `https://graph.facebook.com/${API_VERSION}`;

/**
 * Send a text message via WhatsApp API
 */
export async function sendTextMessage(to: string, text: string) {
  try {
    const response = await axios.post(
      `${BASE_URL}/${PHONE_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to,
        text: { body: text },
      },
      {
        headers: { Authorization: `Bearer ${WHATSAPP_TOKEN}` },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error sending WhatsApp message:", error);
    throw error;
  }
}

/**
 * Send a template message via WhatsApp API
 */
export async function sendTemplateMessage(
  to: string,
  templateName: string,
  languageCode: string,
  components: any[] = [],
) {
  try {
    const response = await axios.post(
      `${BASE_URL}/${PHONE_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to,
        template: {
          name: templateName,
          language: { code: languageCode },
          components,
        },
      },
      {
        headers: { Authorization: `Bearer ${WHATSAPP_TOKEN}` },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error sending WhatsApp template message:", error);
    throw error;
  }
}

/**
 * Send an interactive message with buttons via WhatsApp API
 */
export async function sendInteractiveMessage(
  to: string,
  headerText: string,
  bodyText: string,
  buttons: { id: string; title: string }[],
) {
  try {
    const response = await axios.post(
      `${BASE_URL}/${PHONE_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to,
        interactive: {
          type: "button",
          header: {
            type: "text",
            text: headerText,
          },
          body: {
            text: bodyText,
          },
          action: {
            buttons: buttons.map((button) => ({
              type: "reply",
              reply: {
                id: button.id,
                title: button.title,
              },
            })),
          },
        },
      },
      {
        headers: { Authorization: `Bearer ${WHATSAPP_TOKEN}` },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error sending WhatsApp interactive message:", error);
    throw error;
  }
}

/**
 * Mark a message as read
 */
export async function markMessageAsRead(messageId: string) {
  try {
    const response = await axios.post(
      `${BASE_URL}/${PHONE_ID}/messages`,
      {
        messaging_product: "whatsapp",
        status: "read",
        message_id: messageId,
      },
      {
        headers: { Authorization: `Bearer ${WHATSAPP_TOKEN}` },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error marking message as read:", error);
    throw error;
  }
}

/**
 * Process incoming webhook data from WhatsApp
 */
export function processWebhookData(webhookData: any) {
  try {
    if (!webhookData.entry || !webhookData.entry[0].changes) {
      return null;
    }

    const change = webhookData.entry[0].changes[0];
    const value = change.value;

    if (!value.messages || !value.messages[0]) {
      return null;
    }

    const message = value.messages[0];
    const sender = message.from;
    const messageId = message.id;
    let messageContent = null;

    // Process different message types
    if (message.type === "text") {
      messageContent = {
        type: "text",
        content: message.text.body,
      };
    } else if (message.type === "interactive") {
      const interactive = message.interactive;
      if (interactive.type === "button_reply") {
        messageContent = {
          type: "button_reply",
          buttonId: interactive.button_reply.id,
          buttonText: interactive.button_reply.title,
        };
      }
    } else if (message.type === "image") {
      messageContent = {
        type: "image",
        id: message.image.id,
      };
    }

    return {
      sender,
      messageId,
      timestamp: message.timestamp,
      messageContent,
    };
  } catch (error) {
    console.error("Error processing webhook data:", error);
    return null;
  }
}
