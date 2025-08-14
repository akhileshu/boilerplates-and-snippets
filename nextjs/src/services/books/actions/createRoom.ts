// example code - seller list's a book on our platform
/* 
"use server";
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

import { z } from "zod";
import { getGoogleCalenderRRULE } from "@/lib/google-calender/get-google-calender-rrule";
import { zodFields } from "@/lib/zod-handler/zod-fields";
import { addMinutesToISO, toArray, toISOString, toNumber } from "@/lib/data-parser/data-parsers";
import { getGoogleCalendarClient } from "@/services/user-matching-and-meetings/actions/lib";
import { roomsZodEnums } from "../utils/room-enums-options";
export async function createRoom(_: unknown, formData: FormData) {
  async function method(): Promise<
    MutateResponse<{ roomId: string }, typeof createRoomSchema>
  > {
    const extra = { resource: "room", operation: "create" };
    const loggedInUser = await getServerUser();
    if (!loggedInUser) return mutateErrorNotLoggedIn;
    const raw = Object.fromEntries(formData.entries());
    const recurrenceInputObj = raw.recurrencePattern
      ? {
          pattern: raw.recurrencePattern,
          daysOfWeek: formData.getAll("daysOfWeek"), // checkbox array
          datesOfMonth: formData.getAll("datesOfMonth").map(Number),
        }
      : undefined;
    const parsed = {
      ...raw,
      durationMinutes: toNumber(raw.durationMinutes),
      tags: toArray(raw.tags),
      startTime: toISOString(raw.startTime),
      recurrenceInput: recurrenceInputObj,
    };

    const { data, error } = createRoomSchema.safeParse(parsed);
    if (error) {
      return mutationValidationError({
        error,
        extra,
      });
    }
    // if (error || data) throw new Error("testing");
    let {
      name,
      tags,
      topicType,
      description,
      groupId,
      visibility,
      scheduleType,
      recurrenceInput,
      durationMinutes,
      startTime,
    } = data;

    let recurrenceRule: string[] | null = null;
    if (scheduleType === "RECURRING" && recurrenceInput) {
      recurrenceRule = getGoogleCalenderRRULE({
        pattern: recurrenceInput.pattern,
        daysOfWeek: recurrenceInput.daysOfWeek,
        datesOfMonth: recurrenceInput.datesOfMonth,
      });
    }
    if (scheduleType === "INSTANT" && !startTime)
      startTime = toISOString(new Date());
    const endTimeIso = addMinutesToISO(startTime, durationMinutes);
    const invalidRecurrenceCase =
      scheduleType === "RECURRING" && (!recurrenceInput || !recurrenceRule);
    if (!endTimeIso || !startTime || invalidRecurrenceCase)
      return mutateError({
        message: getMessage("generic", "INVALID_INPUT"),
        extra,
      });
    // if (data || error) throw new Error("testing");
    const googleMeeting = await createGoogleMeeting({
      summary: name,
      description,
      startTime,
      endTimeIso,
      recurrenceRule,
      attendees: [{ email: loggedInUser.email }],
    });

    const room = await myPrisma.room.create({
      data: {
        groupId,
        tags,
        topicType,
        name,
        visibility,
        createdById: loggedInUser.id,
        scheduleType,
        description,
        durationMinutes,
        startTime,
        recurrence: {
          create:
            recurrenceInput && scheduleType === "RECURRING"
              ? {
                  pattern: recurrenceInput.pattern,
                  daysOfWeek: recurrenceInput.daysOfWeek,
                  datesOfMonth: recurrenceInput.datesOfMonth,
                }
              : undefined,
        },
        RoomMeeting: {
          create: {
            googleEventId: googleMeeting.eventId,
            meetUrl: googleMeeting.meetUrl,
          },
        },
        isActive: true,
        participants: {
          create: { userId: loggedInUser.id },
        },
      },
    });

    return mutateSuccess({
      message: getMessage("room", "ROOM_CREATED"),
      data: {
        roomId: room.id,
      },
      extra,
    });
  }

  return handleMutateAction(
    method,
    getMessage("room", "ROOM_CREATION_FAILED").text
  );
}

// This schema is for the recurrence config if type is RECURRING

const recurrenceSchema = z.object({
  pattern: roomsZodEnums.RoomRecurrencePattern,
  daysOfWeek: z.array(roomsZodEnums.Weekday).optional(), // for weekly/biweekly
  datesOfMonth: z.array(z.number().min(1).max(31)).optional(), // for monthly
});

const createRoomSchema = z
  .object({
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

async function createGoogleMeeting({
  summary,
  description,
  startTime,
  endTimeIso,
  recurrenceRule,
  attendees,
}: {
  summary: string;
  description?: string;
  startTime: string;
  endTimeIso: string;
  recurrenceRule: string[] | null;
  attendees: { email: string }[];
}) {
  const googleCalender = await getGoogleCalendarClient();
  const event = await googleCalender.events.insert({
    calendarId: "primary",
    requestBody: {
      summary,
      description,
      start: { dateTime: startTime, timeZone: "Asia/Kolkata" },
      end: { dateTime: endTimeIso, timeZone: "Asia/Kolkata" },
      recurrence: recurrenceRule,
      attendees: attendees, //assigns permissions to join the Meet.
      conferenceData: {
        createRequest: {
    
          requestId: `meet-${Date.now()}`,
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
    },
    conferenceDataVersion: 1,
    // sendUpdates: "all", // sends email invites
  });

  return {
    eventId: event.data.id!,
    meetUrl: event.data.hangoutLink!,
  };
}

*/