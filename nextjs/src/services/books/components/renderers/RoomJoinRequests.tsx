/* example code - to fetch and render a list of books
"use client";

import Avatar from "@/components/app/Avatar";
import { AppCard } from "@/components/app/app-card";
import { Button } from "@/components/app/form-and-inputs/button";
import Label from "@/components/app/label";
import Chip from "@/components/app/ui-labels/chip";
import { useQueryParamHandler } from "@/lib/query-param-handler/useQueryParamController";
import { cn } from "@/lib/utils";
import {
  Calendar,
  Clock,
  EyeOff,
  Globe,
  Lock,
  User,
  Users,
} from "lucide-react";
import { roomJoinRequestsFilterConfig } from "../../utils/room-join-request-filter-config";
import { RespondToRoomJoinRequestFrom } from "../forms/RespondToRoomJoinRequest";
import { RoomRequests } from "../../types/room-requests";

export function RoomJoinRequests({
  requests,
  className,
}: {
  requests: RoomRequests;
  className?: string;
}) {
  const { getParam, updateParam } = useQueryParamHandler();

  return (
    <AppCard
      title="Room Join Requests"
      className={cn("max-w-6xl mx-auto", className)}
      filtering={{
        filterConfig: roomJoinRequestsFilterConfig,
        getParam,
        updateParam,
      }}
    >
      <div className="bg-white rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 gap-6 p-6">
          {requests.raisedByMe.length > 0 && (
            <div className="space-y-6">
              <Label
                icon={<User className="h-5 w-5 text-indigo-500" />}
                label={`Requests Raised By Me (${requests.raisedByMe.length})`}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {requests.raisedByMe.map((request) => (
                  <RequestCard key={request.id} request={request} />
                ))}
              </div>
            </div>
          )}

          {requests.involvedAsApprover.length > 0 && (
            <div className="space-y-6">
              <Label
                icon={<Users className="h-5 w-5 text-indigo-500" />}
                label={`Requests Involving My Approval (${requests.involvedAsApprover.length})`}
              />

              {["PENDING", "ACCEPTED", "REJECTED"].map((status) => {
                const filtered = requests.involvedAsApprover.filter(
                  (r) => r.status === status
                );
                if (filtered.length === 0) return null;

                return (
                  <div key={status} className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-600">
                      {statusLabels[status as keyof typeof statusLabels]} (
                      {filtered.length})
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filtered.map((request) => (
                        <RequestCard
                          key={request.id}
                          request={request}
                          isApprover
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </AppCard>
  );
}

function RequestCard({
  request,
  isApprover = false,
}: {
  request: RoomRequests["raisedByMe"][0];
  isApprover?: boolean;
}) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-gray-800">{request.room.name}</h3>
          <p className="text-sm text-gray-600 mt-1">
            {request.room.description}
          </p>
        </div>
        <Chip
          //   color={request.status === "PENDING" ? "warning" : "success"}
          label={request.status.toLowerCase()}
          className="text-xs"
        />
      </div>

      <div className="mt-3 flex items-center">
        <Avatar
          src={request.user.image}
          alt={request.user.name}
          className="h-6 w-6"
        />
        <span className="ml-2 text-sm text-gray-700">
          {isApprover ? "Requested by: " : "Request to join: "}
          {request.user.name}
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {request.room.tags.map((tag) => (
          <Chip
            color="secondary"
            key={tag}
            label={tag}
            className="text-xs py-0.5"
          />
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        <div className="flex items-center text-gray-600">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{new Date(request.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Clock className="h-4 w-4 mr-1" />
          <span>
            {new Date(request.room.startTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
        <div className="text-gray-600">{request.room.durationMinutes} mins</div>
        <div className="flex items-center text-gray-600">
          {request.room.visibility === "PUBLIC" ? (
            <Globe className="h-4 w-4 mr-1 text-green-500" />
          ) : request.room.visibility === "PRIVATE" ? (
            <Lock className="h-4 w-4 mr-1 text-yellow-500" />
          ) : (
            <EyeOff className="h-4 w-4 mr-1 text-red-500" />
          )}
          <span>{request.room.visibility.toLowerCase()}</span>
        </div>
      </div>

      <div className="mt-4 flex gap-2">
        {isApprover && request.status === "PENDING" && (
          <RespondToRoomJoinRequestFrom requestId={request.id} />
        )}
        {!isApprover && request.status === "PENDING" && (
          <Button disabled size="sm">
            Cancel Request
          </Button>
        )}
      </div>
    </div>
  );
}

const statusLabels = {
  PENDING: "Pending Approval",
  ACCEPTED: "Approved",
  REJECTED: "Rejected",
};


*/