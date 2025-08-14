import { defineMessages } from "../define-messages";

export const meetingMessages = defineMessages({
  // Fetch
  FETCH_SUCCESS: {
    type: "success",
    text: "Meeting data loaded successfully.",
  },
  FETCH_FAILED: {
    type: "error",
    text: "Could not fetch meeting events.",
  },

  // Create
  CREATE_SUCCESS: {
    type: "success",
    text: "Meeting created successfully.",
  },
  CREATE_FAILED: {
    type: "error",
    text: "Failed to create meeting. Please try again.",
  },
  INVALID_INPUT: {
    type: "error",
    text: "Invalid meeting details. Please check the form.",
  },

  // Update
  UPDATE_SUCCESS: {
    type: "success",
    text: "Meeting updated successfully.",
  },
  UPDATE_FAILED: {
    type: "error",
    text: "Failed to update meeting.",
  },

  // Delete / Cancel
  DELETE_SUCCESS: {
    type: "success",
    text: "Meeting deleted successfully.",
  },
  DELETE_FAILED: {
    type: "error",
    text: "Failed to delete meeting.",
  },
  CANCEL_SUCCESS: {
    type: "success",
    text: "Meeting cancelled successfully.",
  },
  CANCEL_FAILED: {
    type: "error",
    text: "Failed to cancel meeting.",
  },

  // Auth & Sync
  AUTH_REQUIRED: {
    type: "warning",
    text: "Google Calendar access required. Please connect your account.",
  },
  CALENDAR_SYNC_FAILED: {
    type: "error",
    text: "Failed to sync with Google Calendar.",
  },
  CALENDAR_EVENT_NOT_FOUND: {
    type: "error",
    text: "Calendar event not found or already removed.",
  },

  // Status
  ALREADY_COMPLETED: {
    type: "info",
    text: "This meeting has already been completed.",
  },
  MEETING_NOT_FOUND: {
    type: "error",
    text: "Meeting not found.",
  },

  // Feedback
  FEEDBACK_SUBMITTED: {
    type: "success",
    text: "Thank you! Your feedback has been submitted.",
  },
  FEEDBACK_FAILED: {
    type: "error",
    text: "Failed to submit feedback.",
  },
});
