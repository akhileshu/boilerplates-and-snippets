"use client";

import { useEffect } from "react";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

export function useAutoRedirectToSigninOnSessionFailure(
  shouldRedirect: boolean,
  errorMessage?: string
) {
  useEffect(() => {
    if (!shouldRedirect) return;

    toast.error(
      `${
        errorMessage || "You are not Logged In"
      }. Redirecting you to sign in again.`
    );

    const timer = setTimeout(() => {
      signIn("google");
    }, 2000);

    return () => clearTimeout(timer); // cleanup
  }, [errorMessage, shouldRedirect]);
}
