import { APP_SETTINGS } from "@/lib/utils";
import { User } from "@prisma/client";

export type LimitField = keyof Pick<
  User,
  "totalPostsCreated" | "totalPostsUpdated" | "totalBookmarksAdded"
>;
type LimitKey = keyof (typeof APP_SETTINGS)["limits"];

// type MessageCategory =keyof Pick<typeof appMessages, "post" | "bookmark">; // "post" | "bookmark"
export const LIMIT_MAPPING: Record<LimitField, LimitKey> = {
  totalPostsCreated: "POSTS_CREATE",
  totalPostsUpdated: "POSTS_UPDATE",
  totalBookmarksAdded: "MAX_BOOKMARKS",
};