import { defineMessages } from "./lib/define-messages";

export const profileMessages = defineMessages({
  UPDATE_SUCCESS: { type: "success", text: "Profile updated!" },
  UPDATE_FAILED: { type: "error", text: "Could not update profile." },
} as const);
