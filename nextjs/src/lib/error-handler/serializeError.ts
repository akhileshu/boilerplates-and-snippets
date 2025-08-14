/**
 * 
 * @example
 * logService.logEvent({
       error: serializeError(error),
       area: "SERVER_ACTION_FETCH",
     });
 */
export function serializeError(err: unknown) {
  if (!(err instanceof Error)) return;
  return {
    name: err.name,
    message: err.message,
    stack: err.stack,
  };
}
