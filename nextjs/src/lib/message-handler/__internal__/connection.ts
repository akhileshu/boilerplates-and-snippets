import { defineMessages } from "../define-messages";

// todo : {
//   type: "error",
//   text: "no connection exists.",
//   code: "NO_CONNECTION"
// }
// include code also
export const connectionMessages = defineMessages({
  SEND_SUCCESS: {
    type: "success",
    text: "Connection request sent successfully.",
  },
  SEND_FAILED: {
    type: "error",
    text: "Failed to send connection request.",
  },
  NO_CONNECTION: {
    type: "error",
    text: "no connection exists.",
  },
  ALREADY_EXISTS: {
    type: "warning",
    text: "Connection request already exists.",
  },
  SELF_REQUEST_NOT_ALLOWED: {
    type: "warning",
    text: "Cannot send a connection request to yourself.",
  },
  ACCEPT_SUCCESS: {
    type: "success",
    text: "Connection accepted successfully.",
  },
  REJECT_SUCCESS: {
    type: "info",
    text: "Connection rejected.",
  },
  RESPOND_FAILED: {
    type: "error",
    text: "Failed to respond to connection request.",
  },
  INVALID_REQUEST: {
    type: "error",
    text: "Invalid or expired connection request.",
  },
  FETCH_FAILED: {
    type: "error",
    text: "Failed to load connection data.",
  },
});
