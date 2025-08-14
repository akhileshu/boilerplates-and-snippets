import { adminDb } from "@/server/firebase/firebase-admin";

type Presence = "ONLINE" | "AWAY" | "OFFLINE";

export async function addPresenceToUsers<T extends { id: string }>(
  users: T[]
): Promise<(T & { presence: Presence })[]> {
  const statusRef = adminDb.ref("/status");
  const snapshot = await statusRef.get();
  // const statusRef = ref(adminDb, "/status");
  // const snapshot = await get(statusRef);
  const statusData = snapshot.val() || {};

  return users.map((user) => ({
    ...user,
    presence: statusData[user.id]?.state || "OFFLINE",
  }));
}
