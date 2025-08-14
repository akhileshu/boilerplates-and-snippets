import { defineMessages } from "../define-messages";

export const groupMessages = defineMessages({
  // Create group
  GROUP_CREATED: {
    type: "success",
    text: "Group created successfully.",
  },
  GROUP_CREATION_FAILED: {
    type: "error",
    text: "Failed to create group. Please try again.",
  },
  // todo : use this pattern to provide feedback that mutate failed due to invalid formdata input
  // or better to send codes - invalid input , server error , etc
  GROUP_CREATION_INVALID_INPUT: {
    type: "error",
    text: "Invalid group input. Please check the form and try again.",
  },

  // Join group
  JOINED_GROUP: {
    type: "success",
    text: "You joined the group.",
  },
  JOIN_GROUP_FAILED: {
    type: "error",
    text: "Failed to join the group.",
  },
  ALREADY_IN_GROUP: {
    type: "info",
    text: "You are already a member of this group.",
  },

  // Leave group
  LEFT_GROUP: {
    type: "success",
    text: "You left the group.",
  },
  LEAVE_GROUP_FAILED: {
    type: "error",
    text: "Failed to leave the group.",
  },

  // Post in group
  POSTED_IN_GROUP: {
    type: "success",
    text: "Post created successfully.",
  },
  POST_IN_GROUP_FAILED: {
    type: "error",
    text: "Failed to create post.",
  },

  // Reply to post
  REPLIED_TO_POST: {
    type: "success",
    text: "Reply posted.",
  },
  REPLY_FAILED: {
    type: "error",
    text: "Failed to post reply.",
  },

  // Group fetch
  GROUPS_FETCHED: {
    type: "success",
    text: "Groups loaded.",
  },
  GROUPS_FETCH_FAILED: {
    type: "error",
    text: "Failed to fetch groups.",
  },

  // Group detail
  GROUP_NOT_FOUND: {
    type: "error",
    text: "Group not found.",
  },
  GROUP_FETCH_FAILED: {
    type: "error",
    text: "Failed to load group details.",
  },
});
