import { getMessage } from "@/lib/message-handler/get-message";
import { logService } from "@/services/log";
import { z } from "zod";
import { getErrorMessageForMutation } from "../__internal__/get-error-message-for-fetch-mutate";
import { getErrorMessage } from "../error-handler/getErrorMessage";
import { serializeError } from "../error-handler/serializeError";
import { AppMessage } from "../message-handler/types";
import { FieldErrors } from "./__internal__/types";
import { MessageExtras } from "./message-extras.types";
import { MutateResponse } from "./response.types";
import { notLoggedInMessage } from "./utils";

export const mutateSuccess = <T>({
  message,
  data,
  extra,
}: {
  message: AppMessage;
  data?: T;
  extra?: MessageExtras;
}): MutateResponse<T> => ({
  ok: true,
  data: data ?? null,
  extra: extra ?? null,
  message,
  fieldErrors: null,
});

export const mutateError = <S extends z.ZodType<any> = any>({
  message,
  fieldErrors,
  extra,
}: {
  message: AppMessage;
  fieldErrors?: FieldErrors<S>;
  extra?: MessageExtras;
}): MutateResponse<null, S> => ({
  ok: false,
  message,
  extra: extra ?? null,
  data: null,
  fieldErrors: fieldErrors ?? null,
});

export const mutationValidationError = <S extends z.ZodType<any>>({
  error,
  extra,
}: {
  error: z.ZodError<z.infer<S>>;
  extra?: MessageExtras;
}): MutateResponse<null, S> => {
  const fieldErrors = error.formErrors.fieldErrors as unknown as FieldErrors<S>;

  return mutateError({
    message: getMessage("generic", "VALIDATION_FAILED"),
    fieldErrors,
    extra,
  });
};

export async function handleMutateAction<T, S extends z.ZodType<any>>(
  fn: () => Promise<MutateResponse<T, S>>,
  fallbackErrorMessage = "Something went wrong while submitting. Please try again."
): Promise<MutateResponse<T, S>> {
  try {
    return await fn();
  } catch (error) {
    const message = getErrorMessageForMutation(error, fallbackErrorMessage);
    console.log(getErrorMessage(error));
    logService.logEvent({
      error: serializeError(error),
      area: "SERVER_ACTION_MUTATE",
    });
    return mutateError<S>({ message });
  }
}

export const mutateErrorNotLoggedIn = mutateError({
  message: notLoggedInMessage,
});
