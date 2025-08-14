import { AppMessage } from "../message-handler/types";
export function defineMessages<const T extends Record<string, AppMessage>>(
  messages: T
) {
  return messages;
}
