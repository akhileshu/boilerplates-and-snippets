import { logService } from "@/services/log";
import { JSX } from "react";
import { getErrorMessageForFetch } from "../__internal__/get-error-message-for-fetch-mutate";
import { getErrorMessage } from "../error-handler/getErrorMessage";
import { serializeError } from "../error-handler/serializeError";
import { AppMessage } from "../message-handler/types";
import { renderStatusMessage } from "../rendering/renderStatusMessage";
import { MessageExtras } from "./message-extras.types";
import { FetchResponse } from "./response.types";
import { notLoggedInMessage } from "./utils";
export const fetchSuccess = <T>({
  data,
  message,
  extra,
}: {
  data: NonNullable<T>;
  message?: AppMessage;
  extra?: MessageExtras;
}): FetchResponse<T> => ({
  ok: true,
  data,
  extra: extra ?? null,
  message: message ?? null,
});

export const fetchError = ({
  message,
  extra,
}: {
  message: AppMessage;
  extra?: MessageExtras;
}): FetchResponse<null> => ({
  ok: false,
  data: null,
  extra: extra ?? null,
  message,
});

export async function handleFetchAction<T>(
  fn: () => Promise<FetchResponse<T>>,
  fallbackErrorMessage = "We couldn’t load the data. Please refresh and try again."
): Promise<FetchResponse<T>> {
  try {
    return await fn();
  } catch (error) {
    const message = getErrorMessageForFetch(error, fallbackErrorMessage);
    // todo : use appmessage along with error obj in logService
    console.log(getErrorMessage(error));
    logService.logEvent({
      error: serializeError(error),
      area: "SERVER_ACTION_FETCH",
    });
    return fetchError({ message });
  }
}

export const fetchErrorNotLoggedIn = fetchError({
  message: notLoggedInMessage,
});

/**
 * @usage
 - const result = checkFetchFailure(await someAction(), "key");
 - if (result.failed) return result.status;
 - const { data } = result.res;
 */
export function checkFetchResult<T>(
  res: FetchResponse<T>,
  cardTitle?: string
):
  | { failed: true; status: JSX.Element | null }
  | { failed: false; res: FetchResponse<T> & { ok: true } } {
  const status = renderStatusMessage(res, cardTitle);
  if (status || !res.ok) return { failed: true, status };
  return { failed: false, res };
}
