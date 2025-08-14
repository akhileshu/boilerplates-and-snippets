"use client";

// import { useSession } from "next-auth/react";
// import { SignInWithGoogle } from "./_components/auth-status";
import { AppLink } from "@/components/app/app-link";

function Page() {
  // const { data: session } = useSession();

  return (
    <div>
      <div>welcome to my app</div>
      <AppLink href={"/books"}>find books</AppLink>
      {/* 
      {!session?.user.id ? (
        <SignInWithGoogle />
      ) : (
        <AppLink href={"/feed"}>Explore</AppLink>
      )}
       */}
    </div>
  );
}

export default Page;


