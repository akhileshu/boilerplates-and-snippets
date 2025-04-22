"use client";
import { Button } from "@/components/app/button";
import { AppLink } from "@/components/app/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

import { useRouter } from "next/navigation";

export default function Auth() {
  const { data: session } = useSession();
  return (
    <div>
      {session ? (
        <div className="flex gap-1 items-center">
          <AppLink disableTransition disableUnderline href={"/dashboard"}>
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
        <Button disabled={false} onClick={() => signIn("google")}>Sign In with Google</Button>
      )}
    </div>
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
