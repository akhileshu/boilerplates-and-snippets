import { getErrorMessage } from "../error-handler/getErrorMessage";
import { MessageExtras } from "../server-action-handler/message-extras.types";

export function getDescriptionFromExtra(
  extra?: MessageExtras | null,
  error?: unknown
): string | undefined {
  const descParts = [
    extra?.desc,
    extra?.resource ? `Resource: ${extra.resource}` : "",
    extra?.operation ? `Action: ${extra.operation}` : "",
    error ? `Error: ${getErrorMessage(error)}` : "",
  ].filter(Boolean);

  return descParts.length ? descParts.join("\n") : undefined;
}
