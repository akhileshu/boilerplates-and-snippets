"use client";

import AppImg from "@/components/app/AppImg";
import { AppCard } from "@/components/app/app-card";
import { AppLink } from "@/components/app/app-link";
import Label from "@/components/app/label";
import Pill from "@/components/app/ui-labels/pill";
import { useQueryParamHandler } from "@/lib/query-param-handler/useQueryParamController";
import { cn } from "@/lib/utils";
import { UserDetails } from "@/services/profile/types/user-details";
import { Server } from "lucide-react";
import { useSession } from "next-auth/react";
import { userProfileFilterConfig } from "../../utils/user-profile-filter-config";
import { useUserPresence } from "@/services/presence-system/useUserPresence";

export function UserProfilesOverview({
  users,
  className,
}: {
  users: UserDetails[];
  className?: string;
}) {
  const { data: session } = useSession();
  const loggedInUserId = session?.user?.id;
  if (!loggedInUserId) throw new Error("User not logged in");
  const { getParam, updateParam } = useQueryParamHandler();

  return (
    <AppCard
      title="user profile's"
      itemsCount={users.length}
      jsonDebug={{ data: users }}
      className={cn("max-w-6xl mx-auto", className)}
      filtering={{
        filterConfig: userProfileFilterConfig,
        getParam,
        updateParam,
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {users
          .filter((user) => user.id !== loggedInUserId)
          .map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
      </div>
    </AppCard>
  );
}

export function UserCard({ user }: { user: UserDetails }) {
  const presence = useUserPresence(user.id);

  return (
    <AppLink
      href={`/profile/${user.id}`}
      key={user.id}
      disableUnderline
      className="hover:shadow-md transition-shadow"
    >
      <div className="bg-white w-full rounded-lg p-2 shadow-sm overflow-hidden border border-gray-100">
        <p>online-presence : {presence}</p>
        {/* Profile Header */}
        <div className="p-4 flex items-center">
          <div className="relative h-16 w-16 rounded-full overflow-hidden border-2 border-white shadow-sm">
            <AppImg
              src={user.image}
              alt={user.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="ml-4">
            <h2 className="font-bold text-gray-800">{user.name}</h2>
            <p className="text-sm text-gray-600 truncate max-w-[180px]">
              {user.email}
            </p>
            {user.preferences?.persona && (
              <Pill
                label={user.preferences.persona}
                className="mt-2"
                color="blue"
              />
            )}
          </div>
        </div>
        {user.preferences?.userFocus && (
          <div className="px-4 pb-4">
            <Label
              icon={<Server className="h-4 w-4 text-indigo-500" />}
              label={user.preferences.userFocus.focus.label}
              className="text-sm font-light gap-1"
            />
            <div className="flex flex-wrap gap-1 mt-2">
              {user.preferences.userFocus.skills.slice(0, 3).map((skill) => (
                <Pill
                  key={skill.id}
                  className="text-xs py-0.5"
                  label={skill.label}
                  color="green"
                />
              ))}
              {user.preferences.userFocus.skills.length > 3 && (
                <Pill
                  className="text-xs py-0.5"
                  label={`+${user.preferences.userFocus.skills.length - 3}`}
                  color="gray"
                />
              )}
            </div>
          </div>
        )}
      </div>
    </AppLink>
  );
}
