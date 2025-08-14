// example code - to delete/remove a book
/*
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
import { myPrisma } from "@/server/db/my-prisma";

import { z } from "zod";

export async function deleteRoom(_: unknown, formData: FormData) {
  async function method(): Promise<
    MutateResponse<undefined, typeof deleteRoomSchema>
  > {
    const extra = { resource: "room", operation: "delete" };

    const loggedInUser = await getServerUser();
    if (!loggedInUser) return mutateErrorNotLoggedIn;

    const { data, error } = deleteRoomSchema.safeParse(
      Object.fromEntries(formData.entries())
    );
    if (error) {
      return mutationValidationError({
        error,
        extra,
      });
    }

    await myPrisma.room.delete({
      where: { id: data.roomId, createdById: loggedInUser.id },
    });

    return mutateSuccess({
      message: getMessage("generic", "DELETE_SUCCESS"),
      extra,
    });
  }

  return handleMutateAction(
    method,
    getMessage("room", "ROOM_UPDATE_FAILED").text
  );
}

const deleteRoomSchema = z.object({
  roomId: z.string().min(3),
});

*/