import { defineMessages } from "./lib/define-messages";

export const profileMessages = defineMessages({
  UPDATE_SUCCESS: { type: "success", text: "Profile updated!" },
  UPDATE_ERROR: { type: "error", text: "Could not update profile." },

  DELETE_SUCCESS: { type: "success", text: "Profile deleted successfully." },
  DELETE_ERROR: { type: "error", text: "Failed to delete profile." },

  SETUP_SUCCESS: { type: "success", text: "Profile setup completed!" },
  SETUP_ERROR: { type: "error", text: "Profile setup failed." },

  NOT_FOUND: { type: "warning", text: "Profile not found." },
} as const);
