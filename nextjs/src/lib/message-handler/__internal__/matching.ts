import { defineMessages } from "../define-messages";

export const matchingMessages = defineMessages({
  // Profile Fetching
  MATCHING_PROFILES_FETCHED: {
    type: "success",
    text: "Profiles loaded successfully.",
  },
  MATCHING_PROFILES_FETCH_FAILED: {
    type: "error",
    text: "Failed to load matching profiles. Please try again.",
  },
  NO_MATCHING_PROFILES_FOUND: {
    type: "info",
    text: "No matching profiles found at the moment.",
  },

  // Matching actions
  PROFILE_MATCHED: {
    type: "success",
    text: "You matched with this profile!",
  },
  PROFILE_MATCH_FAILED: {
    type: "error",
    text: "Failed to match with this profile.",
  },
  PROFILE_SKIPPED: {
    type: "info",
    text: "Profile skipped.",
  },
  PROFILE_SKIP_FAILED: {
    type: "error",
    text: "Failed to skip profile.",
  },

  // Validation
  INVALID_MATCH_REQUEST: {
    type: "error",
    text: "Invalid match request. Please try again.",
  },

  // Status / Edge cases
  ALREADY_MATCHED: {
    type: "info",
    text: "You've already matched with this profile.",
  },
  CANNOT_MATCH_SELF: {
    type: "error",
    text: "You cannot match with your own profile.",
  },
});
