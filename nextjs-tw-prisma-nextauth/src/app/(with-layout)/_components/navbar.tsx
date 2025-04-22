"use client";

import Auth from "@/lib/auth/components";

import { AppLink } from "@/components/app/link";
import { getInternalHref } from "@/lib/getInternalHref";
import { Search } from "../../../features/post/components/search";

export default function Navbar() {
  return (
    <nav className="w-full p-1 flex justify-between items-center border-b">
      <AppLink className="font-bold text-lg" href={"/"}>
        MyApp
      </AppLink>
      <AppLink href={getInternalHref("post", "create")}>Create Post</AppLink>
      <Search />
      <Auth />
    </nav>
  );
}
