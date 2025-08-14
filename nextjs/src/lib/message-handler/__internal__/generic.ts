import { defineMessages } from "../define-messages";

export const genericMessages = defineMessages({
  INVALID_INPUT: {
    type: "error",
    text: "Invalid input. Please check and try again.",
    code: "INVALID_INPUT",
  },
  NOT_FOUND: {
    type: "error",
    text: "Resource not found.",
    code: "NOT_FOUND",
  },
  UNAUTHORIZED: {
    // about identity
    type: "error",
    text: "You are not authorized to perform this action.",
    code: "UNAUTHORIZED",
  },
  SERVER_ERROR: {
    type: "error",
    text: "Something went wrong. Please try again later.",
    code: "SERVER_ERROR",
  },
  ALREADY_EXISTS: {
    type: "error",
    text: "Resource already exists.",
    code: "ALREADY_EXISTS",
  },
  FORBIDDEN: {
    // about permissions.
    type: "error",
    text: "You don’t have permission to perform this action.",
    code: "FORBIDDEN",
  },
  RATE_LIMITED: {
    type: "error",
    text: "Too many requests. Please wait and try again.",
    code: "RATE_LIMITED",
  },
  CONFLICT: {
    // Use case: Booking overlaps, status race conditions, etc.
    type: "error",
    text: "Conflict occurred. Please resolve and retry.",
    code: "CONFLICT",
  },

  FETCH_SUCCESS: {
    type: "success",
    text: "Data fetched successfully.",
    code: "FETCH_SUCCESS",
  },

  CREATE_SUCCESS: {
    type: "success",
    text: "Created successfully.",
    code: "CREATE_SUCCESS",
  },
  UPDATE_SUCCESS: {
    type: "success",
    text: "Updated successfully.",
    code: "UPDATE_SUCCESS",
  },
  DELETE_SUCCESS: {
    type: "success",
    text: "Deleted successfully.",
    code: "DELETE_SUCCESS",
  },
  NO_CHANGES: {
    type: "info",
    text: "No changes were made.",
    code: "NO_CHANGES",
  },
  VALIDATION_FAILED: {
    type: "error",
    text: "Some fields are invalid. Please check your input.",
    code: "VALIDATION_FAILED",
  },
  PENDING_ACTION: {
    type: "info",
    text: "Your request is pending approval.",
    code: "PENDING_ACTION",
  },
  NOT_IMPLEMENTED: {
    type: "error",
    text: "This feature is not yet available.",
    code: "NOT_IMPLEMENTED",
  },
  ACTION_CANCELLED: {
    type: "info",
    text: "The action was cancelled.",
    code: "ACTION_CANCELLED",
  },
});
