/* example code - button opens a dialog , for mutation(post / patch)
"use client";

import { DialogComponent } from "@/components/app/dialog-component";
import { LabeledField } from "@/components/app/form-and-inputs/LabeledField";
import SubmitButton from "@/components/app/form-and-inputs/button";
import { useHandleFormState } from "@/lib/form-handler/useHandleFormState";
import { initialState } from "@/lib/server-action-handler/utils";
import { useActionState, useEffect, useRef } from "react";
import { joinRoom } from "../../actions/joinRoom";
export function RequestToJoinPrivateRoomDialogButton({
  roomId,
}: {
  roomId: string;
}) {
  const [state, formAction, isPending] = useActionState(
    joinRoom,
    initialState
  );
  const dialogCloseButtonRef = useRef<HTMLButtonElement>(null);

  useHandleFormState({
    state,
    revalidatePath: "current",
  });

  useEffect(() => {
    if (state.ok && dialogCloseButtonRef.current) {
      dialogCloseButtonRef.current.click();
    }
  }, [state]);

  const { fieldErrors } = state;

  return (
    <DialogComponent
      ref={dialogCloseButtonRef}
      trigger="Request to Join"
      //   triggerVariant="outline"
      dialogDetails={{
        title: "Request to Join Room",
        description: "Submit your request to join this room",
      }}
    >
      <form action={formAction} className="space-y-4">
        <input type="hidden" name="roomId" value={roomId} />

        <LabeledField
          name="message"
          label="Message (Optional)"
          //   errors={fieldErrors?.message}
        >
          <textarea
            name="message"
            id="message"
            className="border px-2 py-1 rounded w-full"
            placeholder="Tell the room admin why you want to join..."
            rows={3}
          />
        </LabeledField>

        <SubmitButton
          disabled={isPending}
          isPending={isPending}
          text="Submit Request"
        />
      </form>
    </DialogComponent>
  );
}

*/