import { google } from "googleapis";

// Configuration
const SCOPES = ["https://www.googleapis.com/auth/calendar"];
let auth = null;
let calendarApi = null;

/**
 * Initialize the Google Calendar API client
 */
export async function initGoogleCalendarClient(credentials: any, token: any) {
  try {
    auth = new google.auth.OAuth2(
      credentials.client_id,
      credentials.client_secret,
      credentials.redirect_uris[0],
    );

    auth.setCredentials(token);
    calendarApi = google.calendar({ version: "v3", auth });

    return true;
  } catch (error) {
    console.error("Error initializing Google Calendar client:", error);
    return false;
  }
}

/**
 * Create a new calendar event
 */
export async function createCalendarEvent({
  summary,
  description,
  startDateTime,
  endDateTime,
  attendees = [],
  location = "",
  calendarId = "primary",
}: {
  summary: string;
  description: string;
  startDateTime: Date;
  endDateTime: Date;
  attendees?: { email: string; name?: string }[];
  location?: string;
  calendarId?: string;
}) {
  if (!calendarApi) {
    throw new Error("Google Calendar API client not initialized");
  }

  try {
    const event = {
      summary,
      description,
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      attendees: attendees.map((attendee) => ({ email: attendee.email })),
      location,
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 }, // 1 day before
          { method: "popup", minutes: 30 }, // 30 minutes before
        ],
      },
    };

    const response = await calendarApi.events.insert({
      calendarId,
      requestBody: event,
      sendUpdates: "all", // Send email notifications to attendees
    });

    return response.data;
  } catch (error) {
    console.error("Error creating calendar event:", error);
    throw error;
  }
}

/**
 * Get available time slots for a given date range
 */
export async function getAvailableTimeSlots({
  startDate,
  endDate,
  calendarId = "primary",
  durationMinutes = 60,
  workingHoursStart = 9, // 9 AM
  workingHoursEnd = 17, // 5 PM
  workingDays = [1, 2, 3, 4, 5], // Monday to Friday (0 = Sunday, 6 = Saturday)
}: {
  startDate: Date;
  endDate: Date;
  calendarId?: string;
  durationMinutes?: number;
  workingHoursStart?: number;
  workingHoursEnd?: number;
  workingDays?: number[];
}) {
  if (!calendarApi) {
    throw new Error("Google Calendar API client not initialized");
  }

  try {
    // Get busy times from calendar
    const freeBusyResponse = await calendarApi.freebusy.query({
      requestBody: {
        timeMin: startDate.toISOString(),
        timeMax: endDate.toISOString(),
        items: [{ id: calendarId }],
      },
    });

    const busySlots = freeBusyResponse.data.calendars[calendarId].busy;

    // Generate all possible time slots within working hours
    const availableSlots = [];
    const currentDate = new Date(startDate);

    while (currentDate < endDate) {
      const dayOfWeek = currentDate.getDay();

      // Check if it's a working day
      if (workingDays.includes(dayOfWeek)) {
        // Set time to working hours start
        currentDate.setHours(workingHoursStart, 0, 0, 0);

        // Generate slots until working hours end
        while (currentDate.getHours() < workingHoursEnd) {
          const slotStart = new Date(currentDate);
          const slotEnd = new Date(currentDate);
          slotEnd.setMinutes(slotEnd.getMinutes() + durationMinutes);

          // Check if slot end is still within working hours
          if (slotEnd.getHours() <= workingHoursEnd) {
            // Check if slot overlaps with any busy time
            const isAvailable = !busySlots.some((busySlot) => {
              const busyStart = new Date(busySlot.start);
              const busyEnd = new Date(busySlot.end);
              return (
                (slotStart >= busyStart && slotStart < busyEnd) || // Slot start during busy time
                (slotEnd > busyStart && slotEnd <= busyEnd) || // Slot end during busy time
                (slotStart <= busyStart && slotEnd >= busyEnd) // Slot contains busy time
              );
            });

            if (isAvailable) {
              availableSlots.push({
                start: new Date(slotStart),
                end: new Date(slotEnd),
              });
            }
          }

          // Move to next slot
          currentDate.setMinutes(currentDate.getMinutes() + durationMinutes);
        }
      }

      // Move to next day
      currentDate.setDate(currentDate.getDate() + 1);
      currentDate.setHours(0, 0, 0, 0);
    }

    return availableSlots;
  } catch (error) {
    console.error("Error getting available time slots:", error);
    throw error;
  }
}

/**
 * Update an existing calendar event
 */
export async function updateCalendarEvent({
  eventId,
  calendarId = "primary",
  updates,
}: {
  eventId: string;
  calendarId?: string;
  updates: any;
}) {
  if (!calendarApi) {
    throw new Error("Google Calendar API client not initialized");
  }

  try {
    // First get the existing event
    const event = await calendarApi.events.get({
      calendarId,
      eventId,
    });

    // Merge updates with existing event
    const updatedEvent = { ...event.data, ...updates };

    const response = await calendarApi.events.update({
      calendarId,
      eventId,
      requestBody: updatedEvent,
      sendUpdates: "all", // Send email notifications to attendees
    });

    return response.data;
  } catch (error) {
    console.error("Error updating calendar event:", error);
    throw error;
  }
}

/**
 * Delete a calendar event
 */
export async function deleteCalendarEvent(
  eventId: string,
  calendarId = "primary",
) {
  if (!calendarApi) {
    throw new Error("Google Calendar API client not initialized");
  }

  try {
    await calendarApi.events.delete({
      calendarId,
      eventId,
      sendUpdates: "all", // Send email notifications to attendees
    });

    return true;
  } catch (error) {
    console.error("Error deleting calendar event:", error);
    throw error;
  }
}
