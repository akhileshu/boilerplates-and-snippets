// types/announcement.ts

type AnnouncementType = "info" | "warning" | "success";

/**
 * @example
 * const announcements: Announcement[] = [
  {
    tag: "terms-update-v2",
    text: "📄 Our Terms & Conditions have been updated.",
    type: "info",
    showOn: "2025-07-25T00:00:00Z",
    expiresOn: "2025-08-25T00:00:00Z",
    link: "/terms",
  },
  {
    tag: "new-feature-xp",
    text: "🎯 New XP rewards launched for co-hosts!",
    type: "success",
    link: "/rewards",
  },
];
 */
export interface Announcement {
  tag: string;
  text: string;
  type: AnnouncementType;
  showOn?: string; // optional ISO date
  expiresOn?: string; // optional ISO date
  link: string;
}


