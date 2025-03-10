import axios from "axios";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";
const API_URL = "https://api.openai.com/v1/chat/completions";

/**
 * Generate a response using OpenAI's GPT-4 Turbo
 */
export async function generateResponse(
  prompt: string,
  context: string = "",
  maxTokens: number = 150,
) {
  try {
    const response = await axios.post(
      API_URL,
      {
        model: "gpt-4-turbo",
        messages: [
          {
            role: "system",
            content: `You are a helpful WhatsApp business assistant. ${context}`,
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: maxTokens,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error generating OpenAI response:", error);
    throw error;
  }
}

/**
 * Analyze message intent using OpenAI
 */
export async function analyzeIntent(message: string) {
  try {
    const response = await axios.post(
      API_URL,
      {
        model: "gpt-4-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are an AI assistant that analyzes customer messages to determine their intent. Respond with a JSON object containing 'intent' (string), 'confidence' (number between 0-1), and 'entities' (array of extracted entities).",
          },
          {
            role: "user",
            content: `Analyze the following customer message and determine the intent: "${message}"`,
          },
        ],
        max_tokens: 150,
        temperature: 0.3,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    const content = response.data.choices[0].message.content;
    return JSON.parse(content);
  } catch (error) {
    console.error("Error analyzing intent with OpenAI:", error);
    return {
      intent: "unknown",
      confidence: 0,
      entities: [],
    };
  }
}

/**
 * Generate suggested responses based on conversation history
 */
export async function generateSuggestedResponses(
  conversation: { role: string; content: string }[],
  customerContext: any = {},
) {
  try {
    const contextString = Object.entries(customerContext)
      .map(([key, value]) => `${key}: ${value}`)
      .join("\n");

    const response = await axios.post(
      API_URL,
      {
        model: "gpt-4-turbo",
        messages: [
          {
            role: "system",
            content: `You are a helpful WhatsApp business assistant. Generate 3 possible responses to the customer's latest message. Format your response as a JSON array of strings. Each response should be concise, professional, and helpful.\n\nCustomer context:\n${contextString}`,
          },
          ...conversation,
        ],
        max_tokens: 250,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    const content = response.data.choices[0].message.content;
    return JSON.parse(content);
  } catch (error) {
    console.error("Error generating suggested responses:", error);
    return [
      "Thank you for your message. How can I help you today?",
      "I appreciate your inquiry. Could you provide more details?",
      "Thanks for reaching out. I'll assist you with this right away.",
    ];
  }
}
