"use client";

import { getMessage } from "@/lib/message-handler/get-message";
import { ExternalToast, toast } from "sonner";
import { AppMessage, ToastMessageType } from "../message-handler/types";
import { MessageExtras } from "../server-action-handler/message-extras.types";
import { getDescriptionFromExtra } from "./getDescriptionFromExtra";
import { defaultMessage } from "../server-action-handler/utils";

const isToastMessageType = (type: string): type is ToastMessageType => {
  const allowedTypes: ToastMessageType[] = [
    "error",
    "warning",
    "success",
    "info",
  ];
  return allowedTypes.includes(type as ToastMessageType);
};

/**
 *
 * @param message - by getmessage - message.text is toast message
 * @param error - error obj - error.message is toast description
 * 
 * handleToastMessage utility is internally used in `useHandleFormState({ state })`
 * 
 * direct usage example - when using toast outside form
 * ```ts 
 * in useFirebaseAuthBridge function
handleToastMessage(getMessage("auth", "FIREBASE_LOGIN_SUCCESS"));
 * ```
 * todo : accept obj parameter insted of multiple params
 */
export const handleToastMessage = (
  message?: AppMessage,
  extra?: MessageExtras | null,
  error?: unknown
) => {
  // idea : pass more params like ok , etc , and handle non ToastMessageType messages accordingly
  if (!message || message === defaultMessage) return;

  if (!isToastMessageType(message.type)) {
    toast.info("An event occurred: " + message.text);
    return;
  }

  const toastMap: Record<
    ToastMessageType,
    (msg: string, data?: ExternalToast) => void
  > = {
    error: toast.error,
    warning: toast.warning,
    success: toast.success,
    info: toast.info,
  };

  toastMap[message.type]?.(message.text, {
    description: getDescriptionFromExtra(extra, error),
  });
};
