"use server";

import { getMessage } from "@/lib/message-handler/get-message";
import {
  fetchError,
  fetchSuccess,
  handleFetchAction,
} from "@/lib/server-action-handler/fetchHelpers";
import { FetchResponse } from "@/lib/server-action-handler/response.types";
import { myPrisma } from "@/server/db/my-prisma";
import { UserDetails } from "@/services/profile/types/user-details";

export async function getProfileById(userId: string) {
  async function method(): Promise<FetchResponse<UserDetails>> {
    const extra = { resource: "profile", operation: "getProfileDetails" };
    const user = await myPrisma.user.findUnique({
      where: { id: userId },
      include: {
        preferences: {
          include: {
            userFocus: {
              select: {
                focus: {
                  select: {
                    id: true,
                    label: true,
                  },
                },
                skills: {
                  select: {
                    id: true,
                    label: true,
                  },
                },
                interests: {
                  select: {
                    id: true,
                    label: true,
                  },
                },
              },
            },
            availability: true,
          },
        },
      },
    });
    if (!user)
      return fetchError({ message: getMessage("generic", "NOT_FOUND"), extra });
    return fetchSuccess({ data: user, extra });
  }
  return handleFetchAction(
    method,
    getMessage("profile", "PROFILE_NOT_FOUND").text
  );
}
