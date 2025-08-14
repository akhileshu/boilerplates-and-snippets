import { defineMessages } from "../define-messages";

export const commonMessages = defineMessages({
  DEFAULT_MESSAGE: { type: "info", text: "No message available." },
  FETCH_FAILED: { type: "error", text: "Failed to load data." },
  EMPTY_STATE: { type: "info", text: "Nothing to display yet." },
  LIMIT_CHECK_FAILED: {
    type: "error",
    text: "Something went wrong while verifying limits.",
  },
});
