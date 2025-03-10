import { google } from "googleapis";

// Configuration
const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
let auth = null;
let sheetsApi = null;

/**
 * Initialize the Google Sheets API client
 */
export async function initGoogleSheetsClient(credentials: any, token: any) {
  try {
    auth = new google.auth.OAuth2(
      credentials.client_id,
      credentials.client_secret,
      credentials.redirect_uris[0],
    );

    auth.setCredentials(token);
    sheetsApi = google.sheets({ version: "v4", auth });

    return true;
  } catch (error) {
    console.error("Error initializing Google Sheets client:", error);
    return false;
  }
}

/**
 * Add a new customer/lead to a Google Sheet
 */
export async function addCustomerToSheet(
  spreadsheetId: string,
  sheetName: string,
  customerData: any[],
) {
  if (!sheetsApi) {
    throw new Error("Google Sheets API client not initialized");
  }

  try {
    const response = await sheetsApi.spreadsheets.values.append({
      spreadsheetId,
      range: `${sheetName}!A:Z`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [customerData],
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error adding customer to Google Sheet:", error);
    throw error;
  }
}

/**
 * Find a customer in a Google Sheet by phone number
 */
export async function findCustomerByPhone(
  spreadsheetId: string,
  sheetName: string,
  phoneNumber: string,
  phoneColumnIndex: number = 1,
) {
  if (!sheetsApi) {
    throw new Error("Google Sheets API client not initialized");
  }

  try {
    const response = await sheetsApi.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A:Z`,
    });

    const rows = response.data.values;
    if (!rows || rows.length === 0) {
      return null;
    }

    // Get header row to use as keys
    const headers = rows[0];

    // Find the row with matching phone number
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (row[phoneColumnIndex] === phoneNumber) {
        // Convert row to object using headers as keys
        const customer = {};
        headers.forEach((header, index) => {
          customer[header] = row[index] || "";
        });
        return { rowIndex: i + 1, data: customer };
      }
    }

    return null;
  } catch (error) {
    console.error("Error finding customer in Google Sheet:", error);
    throw error;
  }
}

/**
 * Update customer data in a Google Sheet
 */
export async function updateCustomerInSheet(
  spreadsheetId: string,
  sheetName: string,
  rowIndex: number,
  customerData: any[],
) {
  if (!sheetsApi) {
    throw new Error("Google Sheets API client not initialized");
  }

  try {
    const response = await sheetsApi.spreadsheets.values.update({
      spreadsheetId,
      range: `${sheetName}!A${rowIndex}:Z${rowIndex}`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [customerData],
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error updating customer in Google Sheet:", error);
    throw error;
  }
}

/**
 * Get all customers from a Google Sheet
 */
export async function getAllCustomers(
  spreadsheetId: string,
  sheetName: string,
) {
  if (!sheetsApi) {
    throw new Error("Google Sheets API client not initialized");
  }

  try {
    const response = await sheetsApi.spreadsheets.values.get({
      spreadsheetId,
      range: `${sheetName}!A:Z`,
    });

    const rows = response.data.values;
    if (!rows || rows.length <= 1) {
      // Only header row or empty
      return [];
    }

    // Get header row to use as keys
    const headers = rows[0];

    // Convert all data rows to objects
    const customers = [];
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      const customer = {};
      headers.forEach((header, index) => {
        customer[header] = row[index] || "";
      });
      customers.push(customer);
    }

    return customers;
  } catch (error) {
    console.error("Error getting all customers from Google Sheet:", error);
    throw error;
  }
}
