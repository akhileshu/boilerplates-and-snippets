// example code below - to fetch list
/*
"use server";
import { getMessage } from "@/lib/message-handler/get-message";
import {
  fetchErrorNotLoggedIn,
  fetchSuccess,
  handleFetchAction,
} from "@/lib/server-action-handler/fetchHelpers";
import { FetchResponse } from "@/lib/server-action-handler/response.types";
import { getServerUser } from "@/server/auth/getServerUser";
import { myPrisma } from "@/server/db/my-prisma";
import { RoomJoinRequestFilterValues } from "../utils/room-join-request-filter-config";
import { RoomRequests } from "../types/room-requests";

export async function getRoomJoinRequests(
  filters: RoomJoinRequestFilterValues
) {
  async function method(): Promise<FetchResponse<RoomRequests>> {
    const loggedInUser = await getServerUser();
    if (!loggedInUser) return fetchErrorNotLoggedIn;

    const { viewBy, status } = filters;

    const isAll = viewBy === "all";
    const isRaised = viewBy === "raisedByMe" || isAll;
    const isApprovable = viewBy === "involvedAsApprover" || isAll;

    const [raisedByMe, approvableByMe] = await Promise.all([
      isRaised
        ? myPrisma.roomJoinRequest.findMany({
            where: {
              userId: loggedInUser.id,
              ...(status !== "all" ? { status } : {}),
            },
            include: { user: true, room: true },
          })
        : [],
      isApprovable
        ? myPrisma.roomJoinRequest.findMany({
            where: {
              room: {
                participants: {
                  some: {
                    userId: loggedInUser.id,
                    isHost: true,
                  },
                },
              },
              ...(viewBy === "involvedAsApprover" && status === "all"
                ? {} // show all statuses
                : status !== "all"
                ? { status }
                : {}),
            },
            include: { user: true, room: true },
          })
        : [],
    ]);

    const filteredRequests: RoomRequests = {
      raisedByMe: viewBy === "involvedAsApprover" ? [] : raisedByMe,
      involvedAsApprover: viewBy === "raisedByMe" ? [] : approvableByMe,
    };

    return fetchSuccess({ data: filteredRequests });
  }

  return handleFetchAction(method, getMessage("room", "ROOM_FETCHED").text);
}


*/