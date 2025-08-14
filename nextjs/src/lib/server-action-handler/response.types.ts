import { z } from "zod";
import { AppMessage } from "../message-handler/types";
import { FieldErrors } from "./__internal__/types";
import { MessageExtras } from "./message-extras.types";

export type FetchResponse<T> =
  | {
      ok: true;
      data: NonNullable<T>;
      message: AppMessage | null;
      extra: MessageExtras | null;
    }
  | {
      ok: false;
      data: null;
      message: AppMessage;
      extra: MessageExtras | null;
    };

export type MutateResponse<T = any, S extends z.ZodType<any> = any> =
  | {
      ok: true;
      data: T | null;
      message: AppMessage;
      fieldErrors: null;
      extra: MessageExtras | null;
    }
  | {
      ok: false;
      data: null;
      message: AppMessage;
      fieldErrors: FieldErrors<S>;
      extra: MessageExtras | null;
    };
