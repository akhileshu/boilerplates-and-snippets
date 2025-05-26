import { defineMessages } from "./lib/define-messages";

export const bookmarkMessages = defineMessages({
  ADD_SUCCESS: { type: "success", text: "Bookmark added!" },
  ADD_ERROR: { type: "error", text: "Could not add bookmark." },
  REMOVE_SUCCESS: { type: "success", text: "Bookmark removed." },
  REMOVE_ERROR: { type: "error", text: "Could not remove bookmark." },
  NO_OWN_BOOKMARKS: {
    type: "info",
    text: "You haven’t bookmarked anything yet.",
  },
  BOOKMARK_LIMIT: {
    type: "error",
    text: "You have reached the maximum number of bookmarks allowed.",
  },
} as const);
