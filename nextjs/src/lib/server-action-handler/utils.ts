import { AppMessage } from "../message-handler/types";

export const getFormValues = (formData: FormData) =>
  Object.fromEntries(formData.entries());

/* not using currently
export const parseFormData = <T>(formData: FormData, schema: ZodSchema<T>) => {
  const { data, error } = schema.safeParse(getFormValues(formData));
  if (error) return { data: null, fieldErrors: error.formErrors.fieldErrors };
  return { data, fieldErrors: null };
};
*/

// const notLoggedInMessage = getMessage("auth", "NOT_LOGGED_IN");
// todo- lets hardcode commonly used messages as of now for speed
export const notLoggedInMessage = {
  type: "warning",
  text: "You are not logged in. Please log in to continue.",
} as AppMessage;

export const defaultMessage = {
  type: "info",
  text: "No message available.",
} as AppMessage;

export const initialState = {
  ok: false,
  data: null,
  fieldErrors: null,
  // message: getMessage("common", "DEFAULT_MESSAGE"),
  message: defaultMessage,
  extra: null,
};
