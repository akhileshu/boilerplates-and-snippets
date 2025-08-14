import { defineMessages } from "../define-messages";

export const roomMessages = defineMessages({
  // Room creation
  ROOM_CREATED: {
    type: "success",
    text: "Room created successfully.",
  },
  ROOM_CREATION_FAILED: {
    type: "error",
    text: "Failed to create room. Please try again.",
  },
  JOIN_REQUEST_APPROVED: {
    type: "success",
    text: "Join request approved.",
  },
  JOIN_REQUEST_REJECTED: {
    type: "info", // or "success" based on your UI preference
    text: "Join request rejected.",
  },
  RESPOND_JOIN_REQUEST_FAILED: {
    type: "error",
    text: "Failed to respond to join request. Please try again.",
  },

  ROOM_CREATION_INVALID_INPUT: {
    type: "error",
    text: "Invalid room input. Please check the form and try again.",
  },

  // Recurrence creation
  RECURRENCE_CREATED: {
    type: "success",
    text: "Recurring room scheduled successfully.",
  },
  RECURRENCE_MISSING_REQUIRED_FIELDS: {
    type: "error",
    text: "Recurring pattern is missing required days or dates.",
  },
  RECURRENCE_INVALID_PATTERN: {
    type: "error",
    text: "Invalid recurrence pattern. Must be DAILY, WEEKLY, BIWEEKLY or MONTHLY.",
  },

  // Validation
  INVALID_ROOM_TYPE: {
    type: "error",
    text: "Invalid room type.",
  },
  MISSING_START_TIME_OR_DURATION: {
    type: "error",
    text: "Start time and duration are required for scheduled or recurring rooms.",
  },

  // Update
  ROOM_UPDATED: {
    type: "success",
    text: "Room updated successfully.",
  },
  ROOM_UPDATE_FAILED: {
    type: "error",
    text: "Failed to update room.",
  },

  // Deletion
  ROOM_DELETED: {
    type: "success",
    text: "Room deleted successfully.",
  },
  ROOM_DELETE_FAILED: {
    type: "error",
    text: "Failed to delete room.",
  },

  // Status
  ROOM_INACTIVE: {
    type: "info",
    text: "Room is already inactive.",
  },
  RECURRING_ROOM_CANNOT_DELETE_DIRECTLY: {
    type: "error",
    text: "Recurring room cannot be deleted directly. Please disable recurrence first.",
  },

  // Fetch
  ROOM_FETCHED: {
    type: "success",
    text: "Room loaded.",
  },
  ROOM_FETCH_FAILED: {
    type: "error",
    text: "Failed to fetch room.",
  },
  ROOM_NOT_FOUND: {
    type: "error",
    text: "Room not found.",
  },

  // Join / participation
  JOINED_ROOM: {
    type: "success",
    text: "You joined the room.",
  },
  JOIN_ROOM_FAILED: {
    type: "error",
    text: "Failed to join the room.",
  },
  ALREADY_ROOM_PARTICIPANT: {
    type: "info",
    text: "You are already a participant in this room.",
  },
  ALREADY_JOIN_REQUEST_EXISTS: {
    type: "info",
    text: "A join request is already pending for this room.",
  },
  JOIN_ROOM_REQUEST_CREATED: {
    type: "success",
    text: "Join room request has been sent.",
  },
  NOT_A_ROOM_PARTICIPANT: {
    type: "error",
    text: "You are not a participant of this room.",
  },
  LEFT_ROOM_SUCCESS: {
    type: "success",
    text: "You have left the room.",
  },
  GOOGLE_EVENT_NOT_FOUND: {
    type: "error",
    text: "Google Calendar event not found for this room meeting.",
  },
  GOOGLE_ATTENDEES_SYNCED: {
    type: "success",
    text: "Google Calendar attendees synced successfully.",
  },
  TOGGLED_REMIND_ME: {
    type: "success",
    text: "Reminder preference updated for this room.",
  },

  // host
  BECOME_HOST_FAILED: {
    type: "error",
    text: "Failed to become host. Please try again.",
  },
  BECAME_HOST_SUCCESS: {
    type: "success",
    text: "You are now the host of this room.",
  },
});
