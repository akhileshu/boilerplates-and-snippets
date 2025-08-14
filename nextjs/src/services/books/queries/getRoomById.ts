// example code below - to fetch single item
/*
"use server";
import { getMessage } from "@/lib/message-handler/get-message";
import {
  fetchError,
  fetchSuccess,
  handleFetchAction,
} from "@/lib/server-action-handler/fetchHelpers";
import { FetchResponse } from "@/lib/server-action-handler/response.types";
import { myPrisma } from "@/server/db/my-prisma";
import { RoomDetails } from "../types/get-room-by-id";

export async function getRoomById(roomId: string) {
  async function method(): Promise<FetchResponse<RoomDetails>> {
    const extra = { resource: "room", operation: "getRoomDetails" };

    const room = await myPrisma.room.findUnique({
      where: { id: roomId },
      include: {
        recurrence: true,
        participants: {
          include: { user: true },
        },
      },
    });

    if (!room)
      return fetchError({
        message: getMessage("room", "ROOM_FETCH_FAILED"),
        extra,
      });

    return fetchSuccess({ data: room });
  }

  return handleFetchAction(
    method,
    getMessage("room", "ROOM_FETCH_FAILED").text
  );
}

*/