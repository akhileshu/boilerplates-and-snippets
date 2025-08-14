import { defineMessages } from "../define-messages";

export const projectMessages = defineMessages({
  PROJECT_POST_SUCCESS: {
    type: "success",
    text: "Project posted successfully!",
  },
  PROJECT_POST_FAILED: {
    type: "error",
    text: "Failed to post project. Please try again.",
  },
  PROJECT_POST_INVALID: {
    type: "error",
    text: "Invalid project data. Please check and try again.",
  },
  PROJECT_FETCH_FAILED: {
    type: "error",
    text: "Failed to fetch project. Please try again.",
  },
  PROJECT_NOT_FOUND: {
    type: "warning",
    text: "The requested project was not found.",
  },

  PROJECTS_FETCH_SUCCESS: {
    type: "success",
    text: "Projects fetched successfully.",
  },
  PROJECTS_FETCH_FAILED: {
    type: "error",
    text: "Failed to fetch projects.",
  },

  COMMENT_SUCCESS: {
    type: "success",
    text: "Comment added successfully!",
  },
  COMMENT_FAILED: {
    type: "error",
    text: "Failed to add comment. Please try again.",
  },

  COLLAB_REQUEST_SENT: {
    type: "success",
    text: "Collaboration request sent.",
  },
  COLLAB_REQUEST_FAILED: {
    type: "error",
    text: "Failed to send collaboration request.",
  },
  COLLAB_REQUEST_ALREADY_EXISTS: {
    type: "info",
    text: "You are already a collaborator on this project.",
  },
  ALREADY_A_COLLABORATOR: {
    type: "info",
    text: "You are already a collaborator on this project.",
  },

  COLLAB_RESPONSE_SUCCESS: {
    type: "success",
    text: "Collaboration response recorded.",
  },
  COLLAB_RESPONSE_FAILED: {
    type: "error",
    text: "Failed to respond to collaboration request.",
  },
});
