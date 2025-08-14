"use client";

import { signIn, signOut } from "next-auth/react";
import Image from "next/image";

import { useAuthStatus } from "@/app/_components/auth-status/hooks/useAuthStatus";
import { useAutoRedirectToSigninOnSessionFailure } from "@/app/_components/auth-status/hooks/useAutoRedirectOnSessionFailure";
import { useFirebaseAuthBridge } from "@/app/_components/auth-status/hooks/useFirebaseAuthBridge";
import { AppLink } from "@/components/app/app-link";
import { Button } from "@/components/app/form-and-inputs/button";
import { useRouter } from "next/navigation";
import { useSetupUserPresence } from "@/services/presence-system/setupPresence";

export default function AuthStatus() {
  const {
    session,
    shouldForceLogin,
    enableFirebaseBridge,
    enablePresenceTracking,
  } = useAuthStatus();

  useSetupUserPresence(
    session?.user?.id,
    enablePresenceTracking
  );
  // useFirebaseAuthBridge(session, enableFirebaseBridge);
  useAutoRedirectToSigninOnSessionFailure(shouldForceLogin, session?.error);

  return (
    <div>
      {session ? (
        <div className="flex gap-1 items-center">
          <AppLink
            title="my profile"
            disableTransition
            disableUnderline
            href={"/profile/me"}
          >
            <Image
              alt="user-img"
              src={session.user.image}
              width={40}
              height={40}
              className="aspect-square rounded-full"
            />
          </AppLink>
          <LogoutButton />
        </div>
      ) : (
        <SignInWithGoogle />
      )}
    </div>
  );
}

export function SignInWithGoogle() {
  return (
    <Button disabled={false} onClick={() => signIn("google")}>
      Sign In with Google
    </Button>
  );
}

function LogoutButton() {
  const router = useRouter();

  async function handleSignOut() {
    await signOut({ redirect: false });
    router.refresh(); // Clear client-side cache and re-render
  }

  return (
    <Button disabled={false} onClick={handleSignOut}>
      Sign Out
    </Button>
  );
}
