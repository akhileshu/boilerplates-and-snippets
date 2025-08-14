// example code - to edit a book by seller / or mark that book is sold
/*
"use client";

import { AppCard } from "@/components/app/app-card";
import { LabeledField } from "@/components/app/form-and-inputs/LabeledField";
import { TagsInput } from "@/components/app/form-and-inputs/TagsInput";
import SubmitButton from "@/components/app/form-and-inputs/button";
import { useHandleFormState } from "@/lib/form-handler/useHandleFormState";
import { initialState } from "@/lib/server-action-handler/utils";
import { roomsEnumOptions } from "@/services/realtime-rooms/utils/room-enums-options";
import { RoomRecurrencePattern, RoomScheduleType } from "@prisma/client";
import { useActionState, useState } from "react";
import { ScheduleSection } from "./form-elements/ScheduleInputSection";
import { RoomDetails } from "../../types/get-room-by-id";
import { editRoom } from "../../actions/edit-room";

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

export function EditRoomForm({ room }: { room: RoomDetails }) {
  const [state, formAction, isPending] = useActionState(
    editRoom,
    initialState
  );

  // Initialize state with room data
  const [scheduleType, setScheduleType] = useState<RoomScheduleType>(
    room.scheduleType
  );
  const [recurrencePattern, setRecurrencePattern] =
    useState<RoomRecurrencePattern>(room.recurrence?.pattern || "WEEKLY");
  const [selectedDays, setSelectedDays] = useState<string[]>(
    room.recurrence?.daysOfWeek || []
  );
  const [selectedMonthDays, setSelectedMonthDays] = useState<number[]>(
    room.recurrence?.datesOfMonth || []
  );

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const toggleMonthDay = (day: number) => {
    setSelectedMonthDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };
  useHandleFormState({ state });

  return (
    <AppCard title="Manage Room" className="max-w-3xl mx-auto">
      <form action={formAction} className="space-y-6">
        <input type="hidden" name="roomId" value={room.id} />
        <input type="hidden" name="groupId" value={room.groupId} />

        <div className="space-y-4">
          <LabeledField
            label="Room Name"
            name="name"
            errors={state.fieldErrors?.name}
          >
            <input
              type="text"
              name="name"
              defaultValue={room.name}
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
              defaultValue={room.description ?? ""}
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
                defaultValue={room.topicType}
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
                defaultValue={room.visibility}
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

        <TagsInput name="tags" initialTags={room.tags} />

        <ScheduleSection
          className="space-y-4"
          mode="update"
          scheduleType={scheduleType}
          setScheduleType={setScheduleType}
          recurrencePattern={recurrencePattern}
          setRecurrencePattern={setRecurrencePattern}
          selectedDays={selectedDays}
          toggleDay={toggleDay}
          selectedMonthDays={selectedMonthDays}
          toggleMonthDay={toggleMonthDay}
          state={state}
          room={room}
        />

        <div className="flex gap-4">
          <SubmitButton
            isPending={isPending}
            disabled={isPending}
            text="Update Room"
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
          />
        </div>
      </form>
    </AppCard>
  );
}

*/