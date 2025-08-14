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
import { addPresenceToUsers } from "@/services/presence-system/addPresenceToUsers";
import { UserDetails } from "@/services/profile/types/user-details";
import { UserProfileFilterValues } from "@/services/profile/utils/user-profile-filter-config";
import { Prisma } from "@prisma/client";

export async function getAllProfiles(filters: UserProfileFilterValues) {
  async function method(): Promise<FetchResponse<UserDetails[]>> {
    const extra = { resource: "profile", operation: "setupProfile" };

    const loggedInUser = await getServerUser();
    if (!loggedInUser) return fetchErrorNotLoggedIn;
    const where: Prisma.UserWhereInput = {
      isProfileSetupDone: true,
      id: { not: loggedInUser.id },
    };
    if (filters.connection === "connected") {
      // Check both directions for ACCEPTED
      where.OR = [
        {
          connectionsFrom: {
            some: {
              status: "ACCEPTED",
              toUserId: loggedInUser.id,
            },
          },
        },
        {
          connectionsTo: {
            some: {
              status: "ACCEPTED",
              fromUserId: loggedInUser.id,
            },
          },
        },
      ];
    }

    if (filters.connection === "sentRequest") {
      // I sent the request → I'm fromUser
      where.connectionsTo = {
        some: {
          status: "PENDING",
          fromUserId: loggedInUser.id,
        },
      };
    }

    if (filters.connection === "receivedRequest") {
      // I received the request → I'm toUser
      where.connectionsFrom = {
        some: {
          status: "PENDING",
          toUserId: loggedInUser.id,
        },
      };
    }

    if (filters.persona !== "all") {
      where.preferences = {
        persona: filters.persona,
      };
    }
    /**
     *  preferences?.is -because preferences is also 1:1
     * userFocus.is- because userFocus is 1:1
     */
    if (filters.focus !== "all") {
      where.preferences = {
        is: {
          userFocus: {
            is: {
              focus: {
                id: filters.focus,
              },
            },
          },
        },
      };
    }

    let orderBy: Prisma.UserOrderByWithRelationInput = {};
    switch (filters.sort) {
      case "nameAsc":
        orderBy = { name: "asc" };
        break;
      case "nameDesc":
        orderBy = { name: "desc" };
        break;
      case "recentlyJoined":
        orderBy = { createdAt: "desc" };
        break;
    }

    const users = await myPrisma.user.findMany({
      where,
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
      orderBy,
    });
    let usersList: UserDetails[] = users;
    if (filters.presence !== "all") {
      usersList = await addPresenceToUsers(users);
      usersList = usersList.filter(
        (user) => user.presence === filters.presence
      );
    }

    return fetchSuccess({ data: usersList });
  }

  return handleFetchAction(
    method,
    getMessage("profile", "PROFILE_NOT_FOUND").text
  );
}
