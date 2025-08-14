"use client";

import { handleToastMessage } from "@/lib/__internal__/handleToastMessage";
import { getMessage } from "@/lib/message-handler/get-message";
import { firebaseAuth } from "@/server/firebase/firebase";
import { onAuthStateChanged, signInWithCustomToken } from "firebase/auth";
import { Session } from "next-auth";
import { useEffect } from "react";

export function useFirebaseAuthBridge(
  session: Session | null,
  enable: boolean
) {
  useEffect(() => {
    if (!enable || !session?.user?.email || !session?.user?.id) return;

    const { email, id } = session.user;

    const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
      if (user && user.uid === id && user.email === email) {
        // handleToastMessage(getMessage("auth", "FIREBASE_ALREADY_LOGGED_IN"));
        return;
      }

      try {
        const res = await fetch("/api/firebase/custom-token", {
          method: "POST",
          body: JSON.stringify({ email, userId: id }),
          headers: { "Content-Type": "application/json" },
        });

        const { token } = await res.json();
        await signInWithCustomToken(firebaseAuth, token);

        handleToastMessage(getMessage("auth", "FIREBASE_LOGIN_SUCCESS"));
      } catch (err) {
        handleToastMessage(
          getMessage("auth", "FIREBASE_LOGIN_FAILED"),
          undefined,
          err
        );
      }
    });

    return () => unsubscribe();
  }, [session, enable]);
}
