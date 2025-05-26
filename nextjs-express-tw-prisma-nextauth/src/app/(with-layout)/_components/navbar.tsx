"use client";

import Auth from "@/lib/auth/components";

import { AppLink } from "@/components/app/link";
import { HoverDropdown } from "@/components/app/hover-dropdown";
import SendTestNotificationButton from "@/features/notification/components/SendNotificationButton";

export default function Navbar() {
  return (
    <nav className="w-full p-1 flex justify-between items-center border-b">
      <AppLink title="Go to homepage" className="font-bold text-lg" href={"/"}>
        MyApp
      </AppLink>
      {/* <AppLink href={getInternalHref("post", "create")}>Create Post</AppLink> */}
      {/* <Search /> */}

      <div className="flex gap-4">
        <HoverDropdown ariaLabel="Connections Menu" trigger="Connections">
          <ul className="min-w-56 p-2 text-sm space-y-1">
            <AppLink
              title="Find new people to connect with"
              href="/connections/recommendations"
            >
              Explore Connections
            </AppLink>
            <AppLink href="/connections">My Connections</AppLink>
            <AppLink href="/connections/requests">
              connection requests
            </AppLink>
          </ul>
        </HoverDropdown>
        
        <AppLink href="/notifications">Notifications</AppLink>
        <SendTestNotificationButton/>
      </div>

      <Auth />
    </nav>
  );
}
