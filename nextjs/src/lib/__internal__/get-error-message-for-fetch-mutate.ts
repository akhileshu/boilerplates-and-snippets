import { Prisma } from "@prisma/client";
import { AppMessage } from "../message-handler/types";

export function getErrorMessageForMutation(
  error: unknown,
  fallbackErrorMessage: string
): AppMessage {
  let message: AppMessage = {
    type: "error",
    text: fallbackErrorMessage,
  };

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    // Handle known Prisma errors
    switch (error.code) {
      case "P2002":
        message = {
          type: "conflict",
          text: "Duplicate entry. Please use a unique value.",
        };
        break;

      case "P2025":
        message = {
          type: "not_found",
          text: "Record not found. It might have been deleted.",
        };
        break;

      default:
        message = {
          type: "error",
          text: `Database error: ${error.message}`,
        };
        break;
    }
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    message = {
      type: "validation",
      text: "Invalid data. Please check your input.",
    };
  } else if (error instanceof Prisma.PrismaClientInitializationError) {
    message = {
      type: "server",
      text: "Database connection issue. Please try again later.",
    };
  } else if (error instanceof Prisma.PrismaClientRustPanicError) {
    message = {
      type: "server",
      text: "Unexpected database crash. Please try again later.",
    };
  }
  return message;
}

export function getErrorMessageForFetch(
  error: unknown,
  fallbackErrorMessage: string
): AppMessage {
  let message: AppMessage = {
    type: "error",
    text: fallbackErrorMessage,
  };

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2001":
        message = {
          type: "not_found",
          text: "The requested record was not found.",
        };
        break;
      case "P2025":
        message = {
          type: "not_found",
          text: "Record not found. It might have been deleted.",
        };
        break;

      default:
        message = {
          type: "error",
          text: `Database error: ${error.message}`,
        };
        break;
    }
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    message = {
      type: "validation",
      text: "Invalid query parameters. Please check your request.",
    };
  } else if (error instanceof Prisma.PrismaClientInitializationError) {
    message = {
      type: "server",
      text: "Database connection issue. Please try again later.",
    };
  } else if (error instanceof Prisma.PrismaClientRustPanicError) {
    message = {
      type: "server",
      text: "Unexpected database crash. Please try again later.",
    };
  }
  return message;
}
