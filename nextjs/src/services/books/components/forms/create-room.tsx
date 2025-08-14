// example code - to list a book by seller
/*
"use client";

import { AppCard } from "@/components/app/app-card";
import { LabeledField } from "@/components/app/form-and-inputs/LabeledField";
import { TagsInput } from "@/components/app/form-and-inputs/TagsInput";
import SubmitButton from "@/components/app/form-and-inputs/button";
import { useFormActionHandler } from "@/lib/form-handler/useFormActionHandler";
import { useHandleFormState } from "@/lib/form-handler/useHandleFormState";
import { initialState } from "@/lib/server-action-handler/utils";
import { roomsEnumOptions } from "@/services/realtime-rooms/utils/room-enums-options";
import { RoomRecurrencePattern, RoomScheduleType } from "@prisma/client";
import { useActionState, useState } from "react";
import { ScheduleSection } from "./form-elements/ScheduleInputSection";
import { createRoom } from "../../actions/createRoom";

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

const MONTH_DAYS = Array.from({ length: 31 }, (_, i) => i + 1);

export function CreateRoomForm({ groupId }: { groupId: string }) {
  const [state, formAction, isPending] = useActionState(
    createRoom,
    initialState
  );
  const [scheduleType, setScheduleType] = useState<RoomScheduleType>("INSTANT");
  const [recurrencePattern, setRecurrencePattern] =
    useState<RoomRecurrencePattern>("WEEKLY");

  useHandleFormState({ state });
  const handleSubmit = useFormActionHandler(formAction);

  return (
    <AppCard title="Create New Room" className="max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <input type="hidden" name="groupId" value={groupId} />

        <div className="space-y-4">
          <LabeledField
            label="Room Name"
            name="name"
            errors={state.fieldErrors?.name}
          >
            <input
              type="text"
              name="name"
              className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. Daily Standup"
            />
          </LabeledField>

          <LabeledField
            label="Description"
            name="description"
            errors={state.fieldErrors?.description}
          >
            <textarea
              name="description"
              rows={3}
              className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="What's this room about?"
            />
          </LabeledField>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <LabeledField
              label="Topic Type"
              name="topicType"
              errors={state.fieldErrors?.topicType}
            >
              <select
                name="topicType"
                className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                {Object.entries(roomsEnumOptions.RoomTopicType).map(
                  ([key, value]) => (
                    <option key={key} value={value}>
                      {value}
                    </option>
                  )
                )}
              </select>
            </LabeledField>

            <LabeledField
              label="Visibility"
              name="visibility"
              errors={state.fieldErrors?.visibility}
            >
              <select
                name="visibility"
                className="block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                {Object.entries(roomsEnumOptions.RoomVisibility).map(
                  ([key, value]) => (
                    <option key={key} value={value}>
                      {value}
                    </option>
                  )
                )}
              </select>
            </LabeledField>
          </div>
        </div>

        <TagsInput name="tags" />

        <ScheduleSection
          mode="create"
          scheduleType={scheduleType}
          setScheduleType={setScheduleType}
          recurrencePattern={recurrencePattern}
          setRecurrencePattern={setRecurrencePattern}
          state={state}
        />

        <SubmitButton
          isPending={isPending}
          disabled={isPending}
          text="Create Room"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
        />
      </form>
    </AppCard>
  );
}

*/