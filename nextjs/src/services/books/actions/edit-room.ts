// example code - seller updates a book details
/*
"use server";
import { getGoogleCalenderRRULE } from "@/lib/google-calender/get-google-calender-rrule";
import { getMessage } from "@/lib/message-handler/get-message";
import {
  handleMutateAction,
  mutateError,
  mutateErrorNotLoggedIn,
  mutateSuccess,
  mutationValidationError,
} from "@/lib/server-action-handler/mutateHelpers";
import { MutateResponse } from "@/lib/server-action-handler/response.types";
import { getServerUser } from "@/server/auth/getServerUser";
import { myPrisma } from "@/server/db/my-prisma";
import {
  addMinutesToISO,
  toArray,
  toISOString,
  toNumber,
} from "@/lib/data-parser/data-parsers";
import { zodFields } from "@/lib/zod-handler/zod-fields";
import { z } from "zod";
import { getGoogleCalendarClient } from "@/services/user-matching-and-meetings/actions/lib";
import { roomsZodEnums } from "../utils/room-enums-options";
export async function editRoom(_: unknown, formData: FormData) {
  async function method(): Promise<
    MutateResponse<{ roomId: string }, typeof updateRoomSchema>
  > {
    const extra = { resource: "room", operation: "update" };
    const loggedInUser = await getServerUser();
    if (!loggedInUser) return mutateErrorNotLoggedIn;

    const raw = Object.fromEntries(formData.entries());
    const recurrenceInputObj = raw.recurrencePattern
      ? {
          pattern: raw.recurrencePattern,
          daysOfWeek: formData.getAll("daysOfWeek"),
          datesOfMonth: formData.getAll("datesOfMonth").map(Number),
        }
      : undefined;

    const parsed = {
      ...raw,
      roomId: raw.roomId,
      durationMinutes: toNumber(raw.durationMinutes),
      tags: toArray(raw.tags),
      startTime: toISOString(raw.startTime),
      recurrenceInput: recurrenceInputObj,
    };

    const { data, error } = updateRoomSchema.safeParse(parsed);
    if (error) return mutationValidationError({ error, extra });

    const {
      roomId,
      name,
      tags,
      topicType,
      description,
      visibility,
      scheduleType,
      recurrenceInput,
      durationMinutes,
      startTime,
    } = data;

    const room = await myPrisma.room.findUnique({
      where: { id: roomId },
      include: { RoomMeeting: true },
    });

    if (
      !room ||
      room.createdById !== loggedInUser.id ||
      !room.RoomMeeting?.googleEventId
    )
      return mutateError({
        message: getMessage("generic", "NOT_FOUND"),
        extra,
      });

    let recurrenceRule: string[] | null = null;
    if (scheduleType === "RECURRING" && recurrenceInput) {
      recurrenceRule = getGoogleCalenderRRULE({
        pattern: recurrenceInput.pattern,
        daysOfWeek: recurrenceInput.daysOfWeek,
        datesOfMonth: recurrenceInput.datesOfMonth,
      });
    }

    const finalStartTime =
      scheduleType === "INSTANT" && !startTime
        ? toISOString(new Date())
        : startTime;

    const endTimeIso = addMinutesToISO(finalStartTime, durationMinutes);
    const invalidRecurrenceCase =
      scheduleType === "RECURRING" && (!recurrenceInput || !recurrenceRule);
    if (!endTimeIso || !finalStartTime || invalidRecurrenceCase)
      return mutateError({
        message: getMessage("generic", "INVALID_INPUT"),
        extra,
      });

    // todo : skip updateGoogleMeeting if (timings , recurrencerule didn't change)

    await updateGoogleMeeting({
      eventId: room.RoomMeeting.googleEventId,
      summary: name,
      description,
      startTime: finalStartTime,
      endTimeIso,
      recurrenceRule,
    });

    await myPrisma.room.update({
      where: { id: roomId },
      data: {
        name,
        tags,
        topicType,
        description,
        visibility,
        scheduleType,
        startTime: finalStartTime,
        durationMinutes,
        recurrence: {
          upsert: recurrenceInput
            ? {
                create: recurrenceInput,
                update: recurrenceInput,
              }
            : undefined,
        },
      },
    });

    return mutateSuccess({
      message: getMessage("room", "ROOM_UPDATED"),
      data: { roomId },
      extra,
    });
  }

  return handleMutateAction(
    method,
    getMessage("room", "ROOM_UPDATE_FAILED").text
  );
}

// This schema is for the recurrence config if type is RECURRING

const recurrenceSchema = z.object({
  pattern: roomsZodEnums.RoomRecurrencePattern,
  daysOfWeek: z.array(roomsZodEnums.Weekday).optional(), // for weekly/biweekly
  datesOfMonth: z.array(z.number().min(1).max(31)).optional(), // for monthly
});

const updateRoomSchema = z
  .object({
    roomId: z.string().min(1, "Room ID is required"),
    name: z.string().min(3),
    description: z.string().min(3).optional(),
    groupId: z.string(),
    // visibility: z.enum(
    //   Object.values(RoomVisibility) as [RoomVisibility, ...RoomVisibility[]]
    // ),
    visibility: roomsZodEnums.RoomVisibility,
    topicType: roomsZodEnums.RoomTopicType,

    scheduleType: roomsZodEnums.RoomScheduleType.default("INSTANT"),
    startTime: zodFields.ISODateTimeString.optional(),
    durationMinutes: z.number().min(1),
    tags: z.array(z.string()).min(1),

    recurrenceInput: recurrenceSchema.optional(), // if RECURRING, this must be passed
  })
  .superRefine((data, ctx) => {
    // Rule 1: RecurrenceInput must exist if scheduleType is RECURRING
    if (data.scheduleType === "RECURRING" && !data.recurrenceInput) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Recurrence details must be provided for RECURRING rooms",
        path: ["recurrence"],
      });
    }

    // Rule 2: startTime must be provided for RECURRING or SCHEDULED
    if (
      (data.scheduleType === "RECURRING" ||
        data.scheduleType === "SCHEDULED") &&
      !data.startTime
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Start time is required for scheduled or recurring rooms",
        path: ["startTime"],
      });
    }
  });

async function updateGoogleMeeting({
  eventId,
  summary,
  description,
  startTime,
  endTimeIso,
  recurrenceRule,
  attendees,
}: {
  eventId: string;
  summary: string;
  description?: string;
  startTime: string;
  endTimeIso: string;
  recurrenceRule: string[] | null;
  attendees?: { email: string }[];
}) {
  const googleCalender =
    await getGoogleCalendarClient();

  await googleCalender.events.patch({
    calendarId: "primary",
    eventId,
    requestBody: {
      summary,
      description,
      start: { dateTime: startTime, timeZone: "Asia/Kolkata" },
      end: { dateTime: endTimeIso, timeZone: "Asia/Kolkata" },
      recurrence: recurrenceRule,
      ...(attendees && { attendees }),
    },
  });
}

*/