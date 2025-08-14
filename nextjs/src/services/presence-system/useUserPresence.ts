"use client";

import { rtdb } from "@/server/firebase/firebase";
import { PresenceStatus } from "@/services/presence-system/types/PRESENCE_STATUS";
import { off, onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";

/**
get realtime presence of a user
 */
export function useUserPresence(userId: string) {
  const [presence, setPresence] = useState<PresenceStatus | null>(null);

  useEffect(() => {
    if (!userId) return;

    const userRef = ref(rtdb, `/status/${userId}`);

    const handleValue = (snapshot: any) => {
      const data = snapshot.val();
      if (data?.state) {
        setPresence(data.state);
      } else if (data === null) {
        // User has never connected
        setPresence("OFFLINE"); // or keep null
        return;
      }
    };

    onValue(userRef, handleValue);
    return () => off(userRef, "value", handleValue);
  }, [userId]);

  return presence;
}
