import { defineMessages } from "./lib/define-messages";

export const postMessages = defineMessages({
  CREATE_SUCCESS: { type: "success", text: "Post created successfully!" },
  CREATE_ERROR: { type: "error", text: "Failed to create post." },
  UPDATE_SUCCESS: { type: "success", text: "Post updated successfully!" },
  UPDATE_ERROR: { type: "error", text: "Could not update post." },
  DELETE_SUCCESS: { type: "success", text: "Post deleted." },
  DELETE_ERROR: { type: "error", text: "Failed to delete post." },
  NOT_FOUND: { type: "warning", text: "Post not found." },
  NO_OWN_POSTS: { type: "info", text: "You haven’t created any posts yet." },
  CREATE_LIMIT_REACHED: {
    type: "error",
    text: "You have reached the maximum post creation limit.",
  },
  UPDATE_LIMIT_REACHED: {
    type: "error",
    text: "You have reached the maximum post update limit.",
  },
} as const);
