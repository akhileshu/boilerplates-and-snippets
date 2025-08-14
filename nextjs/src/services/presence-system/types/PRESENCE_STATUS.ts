/*
1. Signed-in and using app (online)
2. Signed-in but app is closed (offline)
3. Signed-in but on a different browser tab (away)
4. Signed-out but app is still opened (offline)
5. Signed-out and app closed (offline)
*/
export const PRESENCE_STATUS = {
  ONLINE: "ONLINE", // 1
  OFFLINE: "OFFLINE", // 2, 4, 5
  AWAY: "AWAY", // 3
} as const;

export type PresenceStatus =
  (typeof PRESENCE_STATUS)[keyof typeof PRESENCE_STATUS];
