import { defineMessages } from "./lib/define-messages";

export const connectionMessages = defineMessages({
  CREATE_SUCCESS: {
    type: "success",
    text: "Connection request sent successfully.",
  },
  CREATE_ERROR: {
    type: "error",
    text: "Failed to send connection request. Please try again.",
  },
  UPDATE_STATUS_SUCCESS: {
    type: "success",
    text: "Connection status updated successfully.",
  },
  UPDATE_STATUS_ERROR: {
    type: "error",
    text: "Failed to update connection status. Please try again.",
  },
  FETCH_PENDING_ERROR: {
    type: "error",
    text: "Unable to fetch pending connection requests.",
  },
  FETCH_ACCEPTED_ERROR: {
    type: "error",
    text: "Unable to fetch accepted connections.",
  },
  ALREADY_CONNECTED_ERROR: {
    type: "error",
    text: "You are already connected with this user.",
  },
  SELF_CONNECTION_ERROR: {
    type: "error",
    text: "You cannot send a connection request to yourself.",
  },
  LOGIN_REQUIRED: {
    type: "error",
    text: "You must be logged in to perform this action.",
  },
} as const);

