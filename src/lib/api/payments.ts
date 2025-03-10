import axios from "axios";

// Stripe configuration
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "";
const STRIPE_API_URL = "https://api.stripe.com/v1";

// MercadoPago configuration
const MERCADOPAGO_ACCESS_TOKEN = process.env.MERCADOPAGO_ACCESS_TOKEN || "";
const MERCADOPAGO_API_URL = "https://api.mercadopago.com/v1";

/**
 * Create a payment link with Stripe
 */
export async function createStripePaymentLink(
  amount: number,
  currency: string = "usd",
  description: string,
) {
  try {
    const response = await axios.post(
      `${STRIPE_API_URL}/payment_links`,
      {
        line_items: [
          {
            price_data: {
              currency,
              product_data: {
                name: description,
              },
              unit_amount: amount * 100, // Stripe uses cents
            },
            quantity: 1,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    return response.data.url;
  } catch (error) {
    console.error("Error creating Stripe payment link:", error);
    throw error;
  }
}

/**
 * Create a payment link with MercadoPago
 */
export async function createMercadoPagoPaymentLink(
  amount: number,
  description: string,
  payer: { email: string; name?: string },
) {
  try {
    const response = await axios.post(
      `${MERCADOPAGO_API_URL}/checkout/preferences`,
      {
        items: [
          {
            title: description,
            quantity: 1,
            unit_price: amount,
            currency_id: "BRL", // Brazilian Real
          },
        ],
        payer: {
          email: payer.email,
          name: payer.name || "",
        },
        back_urls: {
          success: "https://yourwebsite.com/success",
          failure: "https://yourwebsite.com/failure",
          pending: "https://yourwebsite.com/pending",
        },
        auto_return: "approved",
      },
      {
        headers: {
          Authorization: `Bearer ${MERCADOPAGO_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      },
    );

    return response.data.init_point;
  } catch (error) {
    console.error("Error creating MercadoPago payment link:", error);
    throw error;
  }
}

/**
 * Check payment status with Stripe
 */
export async function checkStripePaymentStatus(paymentIntentId: string) {
  try {
    const response = await axios.get(
      `${STRIPE_API_URL}/payment_intents/${paymentIntentId}`,
      {
        headers: {
          Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
        },
      },
    );

    return response.data.status;
  } catch (error) {
    console.error("Error checking Stripe payment status:", error);
    throw error;
  }
}

/**
 * Check payment status with MercadoPago
 */
export async function checkMercadoPagoPaymentStatus(paymentId: string) {
  try {
    const response = await axios.get(
      `${MERCADOPAGO_API_URL}/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${MERCADOPAGO_ACCESS_TOKEN}`,
        },
      },
    );

    return response.data.status;
  } catch (error) {
    console.error("Error checking MercadoPago payment status:", error);
    throw error;
  }
}
