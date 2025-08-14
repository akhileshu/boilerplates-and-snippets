"use client";

import { AppCard } from "@/components/app/app-card";
import { LabeledField } from "@/components/app/form-and-inputs/LabeledField";
import {
  TreeProvider,
  useTree,
} from "@/components/app/form-and-inputs/TreeDropdown/__internal__/tree-provider";
import { Node } from "@/components/app/form-and-inputs/TreeDropdown/types";
import SubmitButton from "@/components/app/form-and-inputs/button";
import Label from "@/components/app/label";
import { useHandleFormState } from "@/lib/form-handler/useHandleFormState";
import { initialState } from "@/lib/server-action-handler/utils";
import {
  UserFocusinitialTree,
  UserFocusSelectorTreeDropdown,
} from "@/services/profile/components/forms/form-elements/UserFocusSelectorTreeDropdown";
import { Calendar, ChevronDown, Clock } from "lucide-react";
import { useSession } from "next-auth/react";
import { useActionState, useEffect, useState } from "react";
import { userProfileEnumOptions } from "../../utils/profile-enums-options";
import { setupProfile } from "../../actions/setupProfile";

function extractSelectedFocus(tree: Node[]) {
  const areaNode = tree[0]?.children?.find(Boolean);
  if (!areaNode) return { skillIds: [], interestIds: [] };

  const skillIds =
    areaNode.children
      ?.find((n) => n.name === "Skills")
      ?.children?.map((n) => n.name) || [];
  const interestIds =
    areaNode.children
      ?.find((n) => n.name === "Interests")
      ?.children?.map((n) => n.name) || [];

  return {
    areaId: areaNode.name,
    skillIds,
    interestIds,
  };
}

export function SetupProfileFormWrapper() {
  return (
    <TreeProvider initialTree={UserFocusinitialTree}>
      <SetupProfileForm />
    </TreeProvider>
  );
}

function SetupProfileForm() {
  const { update } = useSession();
  const [state, formAction, isPending] = useActionState(
    setupProfile,
    initialState
  );
  const { fieldErrors } = state;

  const { selectedTree } = useTree();
  const { areaId, skillIds, interestIds } = extractSelectedFocus(selectedTree);

  useHandleFormState({ state, navigateTo: "/feed" });

  useEffect(() => {
    if (state.ok) {
      update({ isProfileSetupDone: true });
    }
    // note : dont add `update` here , causing multiple request trigger
  }, [state.ok]);

  return (
    <AppCard
      title="Complete Your Profile"
      className="border-0 shadow-lg mx-auto p-4"
    >
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column - Focus Selection */}
        <UserFocusSelectorTreeDropdown className="space-y-6" />

        {/* Right Column - Form */}
        <form action={formAction} className="space-y-6">
          <SelectedFocus
            areaId={areaId}
            skillIds={skillIds}
            interestIds={interestIds}
          />
          <div className="space-y-4">
            <LabeledField
              label="Persona"
              name="persona"
              errors={fieldErrors?.persona}
            >
              <div className="relative">
                <select
                  name="persona"
                  required
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md appearance-none"
                >
                  <option value="">Select your role...</option>
                  {userProfileEnumOptions.PersonaType.map((persona, index) => (
                    <option key={index} value={persona}>
                      {persona}
                    </option>
                  ))}
                </select>
                <ChevronDown className="h-5 w-5 text-gray-400 absolute right-3 top-2.5 pointer-events-none" />
              </div>
            </LabeledField>
            <Label
              icon={<Calendar className="h-5 w-5 text-blue-600" />}
              label="Availability Preferences"
              className=""
            />

            <div className="grid grid-cols-2 gap-4">
              <LabeledField
                label="Start Time"
                name="startTime"
                errors={fieldErrors?.startTime}
              >
                <div className="relative">
                  <Clock className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    name="startTime"
                    type="time"
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </LabeledField>

              <LabeledField
                label="End Time"
                name="endTime"
                errors={fieldErrors?.endTime}
              >
                <div className="relative">
                  <Clock className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    name="endTime"
                    type="time"
                    required
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </LabeledField>
            </div>

            <LabeledField
              label="Preferred Days"
              name="preferredDays"
              errors={fieldErrors?.preferredDays}
            >
              <DaysSelector />
            </LabeledField>

            <LabeledField
              label="Prefer Weekends?"
              name="prefersWeekends"
              errors={fieldErrors?.prefersWeekends}
              isCheckbox
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="prefersWeekends"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">
                  I&apos;m generally available on weekends
                </span>
              </div>
            </LabeledField>
          </div>

          <input type="hidden" name="areaId" value={areaId || ""} />
          {skillIds.map((id) => (
            <input key={id} type="hidden" name="skillIds" value={id} />
          ))}
          {interestIds.map((id) => (
            <input key={id} type="hidden" name="interestIds" value={id} />
          ))}

          <div className="flex justify-center">
            <SubmitButton
              disabled={isPending}
              isPending={isPending}
              text="Complete Profile Setup"
              className="mx-auto bg-blue-500 text-white"
            />
          </div>
        </form>
      </div>
    </AppCard>
  );
}

interface SelectedFocusProps {
  areaId: string | undefined;
  skillIds: string[];
  interestIds: string[];
}

function SelectedFocus({ areaId, skillIds, interestIds }: SelectedFocusProps) {
  return (
    <>
      {areaId ? (
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h3 className="font-medium text-blue-800 mb-2">Selected Focus</h3>
          <div className="space-y-2">
            <p className="text-sm text-gray-700">
              <span className="font-medium">Area:</span> {areaId}
            </p>
            {skillIds.length > 0 && (
              <div>
                <p className="text-sm font-medium text-gray-700">Skills:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {skillIds.map((skill) => (
                    <span
                      key={skill}
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {interestIds.length > 0 && (
              <div>
                <p className="text-sm font-medium text-gray-700">Interests:</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {interestIds.map((interest) => (
                    <span
                      key={interest}
                      className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          Please select a focus. and related skills and interests
        </p>
      )}
    </>
  );
}

function DaysSelector() {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const toggleAllDays = () => {
    setSelectedDays((prev) => (prev.length === days.length ? [] : [...days]));
  };

  return (
    <div className="space-y-2">
      <label className="flex items-center mb-2 w-fit">
        <input
          type="checkbox"
          checked={selectedDays.length === days.length}
          onChange={toggleAllDays}
          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <span className="ml-2 text-sm font-medium text-gray-700">
          {selectedDays.length === days.length ? "Unselect All" : "Select All"}
        </span>
      </label>

      <div className="border border-gray-300 rounded-md p-2">
        <div className="flex flex-wrap gap-2">
          {days.map((day) => (
            <label key={day} className="inline-flex items-center">
              <input
                type="checkbox"
                name="preferredDays"
                value={day}
                checked={selectedDays.includes(day)}
                onChange={() => toggleDay(day)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">
                {day.substring(0, 3)}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
