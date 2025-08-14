export type LogType = "info" | "warn" | "error" | "debug";
export type LogArea =
  | "INVALID_USER_INPUT"
  | "FORM_RENDERING"
  | "DATA_RENDERING"
  | "INTERNAL_SERVER_ERROR"
  | "API_ROUTE_FETCH"
  | "API_ROUTE_MUTATE"
  | "SERVER_ACTION_FETCH"
  | "SERVER_ACTION_MUTATE";

export type LogData = {
  message?: string;
  source?: string;
  area?: LogArea;
  error?: {
    message?: string;
    stack?: string;
    name?: string;
    [key: string]: any;
  };
  type?: LogType;
  [key: string]: any;
};
