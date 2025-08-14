import { z } from "zod";

/**
 * 
 * @usage 
 * ```ts
 * import {
  RoomRecurrencePattern,
...
} from "@prisma/client";

 * const rawEnums = {
  RoomRecurrencePattern,
  RoomVisibility,
  RoomTopicType,
  RoomScheduleType,
  Weekday,
} as const;

 * export const { zodEnums: roomsZodEnums, enumOptions: roomsEnumOptions } =
  generateEnums(rawEnums);

  // loop over enums
   <select>
          {roomsEnumOptions.RoomScheduleType.map((option) => (
            <option key={option} value={option}>
              {option.charAt(0) + option.slice(1).toLowerCase()}{" "}
            </option>
          ))}
        </select>
  ```
 */
export function generateEnumsFromPrisma<
  T extends Record<string, Record<string, string | number>>
>(enums: T) {
  // @ts-expect-error:this is a common TypeScript edge case with nativeEnum() and generic inference.
  const zodEnums = {} as { [K in keyof T]: z.ZodNativeEnum<T[K]> };
  const enumOptions = {} as { [K in keyof T]: (typeof enums)[K][keyof T[K]][] };

  for (const key in enums) {
    // @ts-expect-error:this is a common TypeScript edge case with nativeEnum() and generic inference.
    zodEnums[key] = z.nativeEnum(enums[key]);
    // @ts-expect-error:this is a common TypeScript edge case with nativeEnum() and generic inference.
    enumOptions[key] = Object.values(enums[key]);
  }

  return { zodEnums, enumOptions };
}

// older - manual method
/*
export const roomsZodEnums = {
  RoomRecurrencePattern: z.nativeEnum(RoomRecurrencePattern),
  RoomVisibility: z.nativeEnum(RoomVisibility),
  RoomTopicType: z.nativeEnum(RoomTopicType),
  RoomScheduleType: z.nativeEnum(RoomScheduleType),
  Weekday: z.nativeEnum(Weekday),
};

export const roomsEnumOptions = {
  RoomRecurrencePattern: Object.values(RoomRecurrencePattern),
  RoomVisibility: Object.values(RoomVisibility),
  RoomTopicType: Object.values(RoomTopicType),
  RoomScheduleType: Object.values(RoomScheduleType),
  Weekday: Object.values(Weekday),
};
*/
