"use client";

import { AppCard } from "@/components/app/app-card";
import AppImg from "@/components/app/AppImg";
import Label from "@/components/app/label";
import Pill from "@/components/app/ui-labels/pill";
import { cn } from "@/lib/utils";
import { useUserPresence } from "@/services/presence-system/useUserPresence";
import { UserDetails } from "@/services/profile/types/user-details";
import { Calendar, Clock, Server } from "lucide-react";

export function UserProfile({
  user,
  isCurrentUser,
  className,
}: {
  user: UserDetails;
  isCurrentUser: boolean;
  className?: string;
}) {
  const presence = useUserPresence(user.id);
  return (
    <AppCard
      jsonDebug={{ data: user }}
      title="User Profile"
      className={cn("max-w-4xl mx-auto", className)}
    >
      <p>presence : {presence}</p>
      <h1 className="text-2xl font-bold text-gray-800">
        {isCurrentUser ? "My Profile" : `${user.name}'s Profile`}
      </h1>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 flex items-start">
          <div className="relative h-24 w-24 rounded-full overflow-hidden border-4 border-white shadow-md">
            <AppImg
              src={user.image}
              alt={user.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="ml-6">
            <h1 className="text-2xl font-bold text-gray-800">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
            <div className="mt-2">
              <Pill
                label={user.preferences?.persona ?? "Unknown"}
                color="blue"
              />
            </div>
          </div>
        </div>

        {/* Profile Details */}
        {user.preferences &&
        user.preferences.userFocus &&
        user.preferences.availability ? (
          <div className="p-6 space-y-6">
            {/* Area of Focus */}

            <div className="space-y-4">
              <Label
                icon={<Server className="h-5 w-5 text-indigo-500" />}
                label="Area of Focus"
              />
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-medium text-gray-700">
                  {user.preferences.userFocus.focus.label}
                </h3>

                <div className="mt-3">
                  <h4 className="text-sm font-medium text-gray-600 mb-2">
                    Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {user.preferences.userFocus.skills.map((skill) => (
                      <Pill
                        label={skill.label}
                        key={skill.id}
                        className="text-sm py-0.5"
                        color="green"
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-3">
                  <h4 className="text-sm font-medium text-gray-600 mb-2">
                    Interests
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {user.preferences.userFocus.interests.map((interest) => (
                      <Pill
                        label={interest.label}
                        key={interest.id}
                        className="text-sm py-0.5"
                        color="purple"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Availability */}
            {/* todo : Active indicator */}
            <div className="space-y-4">
              <Label
                icon={<Calendar className="h-5 w-5 text-indigo-500" />}
                label="Availability"
              />
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-600">
                      Preferred Days
                    </h3>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {user.preferences.availability.preferredDays.map(
                        (day) => (
                          <Pill
                            key={day}
                            label={day}
                            className="text-xs py-0.5"
                            color="blue"
                          />
                        )
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-600">
                      Time Slot
                    </h3>
                    <p className="mt-1 text-sm text-gray-800 flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {user.preferences.availability.startTime} -{" "}
                      {user.preferences.availability.endTime}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-600">
                      Weekends
                    </h3>
                    <p className="mt-1 text-sm text-gray-800">
                      {user.preferences.availability.prefersWeekends
                        ? "Available"
                        : "Not Available"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>cant fetch user preferences</p>
        )}
      </div>
    </AppCard>
  );
}
