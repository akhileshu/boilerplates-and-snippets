import { generateEnumsFromPrisma } from "@/lib/__internal__/generateEnumsFromPrisma";
import { PersonaType } from "@prisma/client";

// 1. Typed enum map
const rawEnums = {
  PersonaType,
} as const;

export const { zodEnums: userProfileZodEnums, enumOptions: userProfileEnumOptions } =
  generateEnumsFromPrisma(rawEnums);
