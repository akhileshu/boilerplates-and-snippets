import { PresenceStatus } from "@/services/presence-system/types/PRESENCE_STATUS";
import {
  Availability,
  Interest,
  Skill,
  User,
  UserPreference,
} from "@prisma/client";

export type UserDetails = User & {
  presence?: PresenceStatus;
  preferences:
    | (UserPreference & {
        userFocus: {
          focus: {
            id: string;
            label: string;
          };
          skills:
            | {
                id: string;
                label: string;
              }[];
          interests:
            | {
                id: string;
                label: string;
              }[];
        } | null;
        availability: Availability | null;
      })
    | null;
};
