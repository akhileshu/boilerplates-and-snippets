import { z } from "zod";

export const zodFields = {
  ISODateTimeString: z.string().datetime(),
};
