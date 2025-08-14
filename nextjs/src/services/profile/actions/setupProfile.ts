"use server";
import { getMessage } from "@/lib/message-handler/get-message";
import {
  handleMutateAction,
  mutateErrorNotLoggedIn,
  mutateSuccess,
  mutationValidationError,
} from "@/lib/server-action-handler/mutateHelpers";
import { MutateResponse } from "@/lib/server-action-handler/response.types";
import { getServerUser } from "@/server/auth/getServerUser";

export async function setupProfile(_: unknown, formData: FormData) {
  async function method(): Promise<
    MutateResponse<undefined, typeof setupProfileSchema>
  > {
    const extra = { resource: "profile", operation: "setupProfile" };

    const loggedInUser = await getServerUser();
    if (!loggedInUser) return mutateErrorNotLoggedIn;

    const parsedFormData = Object.fromEntries(formData.entries());

    // ✅ Normalize multi-select fields , checkbox
    const arrayKeys = ["preferredDays", "skillIds", "interestIds"];
    arrayKeys.forEach((key) => {
      // @ts-ignore
      parsedFormData[key] = formData.getAll(key);
    });
    // @ts-ignore
    parsedFormData.prefersWeekends = formData.get("prefersWeekends") === "on";

    const { data, error } = setupProfileSchema.safeParse(parsedFormData);
    if (error) {
      return mutationValidationError({
        error,
        extra,
      });
    }

    // console.log({ data });
    // throw new Error("Not implemented");

    const {
      areaId,
      skillIds,
      interestIds,
      startTime,
      endTime,
      preferredDays,
      prefersWeekends,
      persona,
    } = data;
    const focusId = areaId;

    await myPrisma.userPreference.upsert({
      where: { userId: loggedInUser.id },
      create: {
        userId: loggedInUser.id,
        persona,
        userFocus: {
          create: {
            focusId,
            skills: {
              connect: skillIds.map((id) => ({ id })),
            },
            interests: {
              connect: interestIds.map((id) => ({ id })),
            },
          },
        },
        availability: {
          create: { startTime, endTime, preferredDays, prefersWeekends },
        },
      },
      update: {
        userFocus: {
          create: {
            focusId,
            skills: {
              connect: skillIds.map((id) => ({ id })),
            },
            interests: {
              connect: interestIds.map((id) => ({ id })),
            },
          },
        },
        availability: {
          upsert: {
            create: { startTime, endTime, preferredDays, prefersWeekends },
            update: { startTime, endTime, preferredDays, prefersWeekends },
          },
        },
      },
    });

    // // todo - this can be improved , as we dont need to update skills , interest table on every profile setup
    // await myPrisma.areaOfFocus.update({
    //   where: { id: areaId },
    //   data: {
    //     skills: {
    //       set: [], // clear old ones first
    //       connect: skillIds.map((id) => ({ id })),
    //     },
    //     interests: {
    //       set: [],
    //       connect: interestIds.map((id) => ({ id })),
    //     },
    //   },
    // });

    await myPrisma.user.update({
      where: { id: loggedInUser.id },
      data: {
        isProfileSetupDone: true,
      },
    });

    return mutateSuccess({
      message: getMessage("profile", "PROFILE_UPDATED"),
      extra,
    });
  }

  return handleMutateAction(
    method,
    getMessage("profile", "PROFILE_UPDATE_FAILED").text
  );
}

import { myPrisma } from "@/server/db/my-prisma";
import { z } from "zod";
const setupProfileSchema = z.object({
  areaId: z.string().min(1, "Area is required"),
  persona: z.enum([
    "LEARNER",
    "MENTOR",
    "COLLABORATOR",
    "PRODUCT_IMPROVER",
    "SHOWCASER",
    "NETWORKER",
  ]),

  skillIds: z
    .union([z.string(), z.array(z.string())])
    .transform((val) => (Array.isArray(val) ? val : [val]))
    .refine((arr) => arr.length > 0, "Select at least one skill"),

  interestIds: z
    .union([z.string(), z.array(z.string())])
    .optional()
    .transform((val) => (Array.isArray(val) ? val : val ? [val] : [])),

  preferredDays: z
    .array(
      z.enum([
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ])
    )
    .optional()
    .default([]),

  startTime: z
    .string()
    .regex(/^([0-1][0-9]|2[0-3]):([0-5][0-9])$/, "Invalid start time"),

  endTime: z
    .string()
    .regex(/^([0-1][0-9]|2[0-3]):([0-5][0-9])$/, "Invalid end time"),

  prefersWeekends: z.boolean().optional().default(false),
});
