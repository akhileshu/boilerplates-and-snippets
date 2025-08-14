"use client";
import { rtdb } from "@/server/firebase/firebase";
import { PresenceStatus } from "@/services/presence-system/types/PRESENCE_STATUS";
import { onDisconnect, ref, serverTimestamp, set } from "firebase/database";
import { useEffect } from "react";

export function useSetupUserPresence(
  userId: string | undefined,
  enablePresenceTracking: boolean
) {
  useEffect(() => {
    if (typeof window === "undefined" || !userId) return;

    const userRef = ref(rtdb, `/status/${userId}`);

    const setStatus = (state: PresenceStatus) => {
      set(userRef, { state, lastChanged: serverTimestamp() });
    };

    if (!enablePresenceTracking) {
      setStatus("OFFLINE");
      return;
    }

    onDisconnect(userRef).set({
      state: "OFFLINE",
      lastChanged: serverTimestamp(),
    });

    setStatus("ONLINE");

    const handleVisibilityChange = () => {
      setStatus(document.visibilityState === "hidden" ? "AWAY" : "ONLINE");
    };

    window.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("visibilitychange", handleVisibilityChange);
      setStatus("OFFLINE");
    };
  }, [userId, enablePresenceTracking]);
}
