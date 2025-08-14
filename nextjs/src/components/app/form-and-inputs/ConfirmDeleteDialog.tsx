"use client";

import { RevalidatePath } from "@/lib/form-handler/types";
import { useHandleFormState } from "@/lib/form-handler/useHandleFormState";
import { MutateResponse } from "@/lib/server-action-handler/response.types";
import { initialState } from "@/lib/server-action-handler/utils";
import { cn } from "@/lib/utils";
import { sentenceCase } from "change-case";
import { Trash2 } from "lucide-react";
import React, { useActionState, useEffect, useRef, useState } from "react";
import { ZodType, ZodTypeDef } from "zod";
import { DialogComponent } from "../dialog-component";
import SubmitButton from "./button";
import { LabeledField } from "./LabeledField";

export type ServerAction<
  TSchema extends ZodType<any, ZodTypeDef, any>,
  TReturn = undefined
> = (
  _: unknown,
  formData: FormData
) => Promise<MutateResponse<TReturn, TSchema>>;

interface ConfirmDeleteDialogProps<
  TSchema extends ZodType<any, ZodTypeDef, any>,
  TReturn = undefined
> {
  item: {
    id: string;
    name: string;
    type?: string; // e.g. "group", "room"
  };
  dialogOptions?: {
    trigger?: React.ReactNode;
    triggerType?: "text" | "icon";
    title?: string;
    description?: string;
  };
  action: {
    fn: ServerAction<TSchema, TReturn>;
    redirectTo?: string;
    revalidatePath?: RevalidatePath;
  };
  className?: string;
  skipConfirmation?: boolean;
}

/**
 * 
 * @example
 * <ConfirmDeleteDialog
         item={{
           id: room.id,
           name: room.name,
           type: "room",
         }}
         action={{
           fn: roomService.actions.deleteRoom,
           redirectTo: "/groups",
         }}
         dialog={{
           description:
             "This action cannot be undone. All messages and room data will be permanently deleted.",
         }}
         className="my-2"
       /> 

       <ConfirmDeleteDialog
            skipConfirmation
            item={{
                id: group.id,
                name: group.name,
                type: "group",
            }}
            action={{
                fn: groupService.actions.deleteGroup,
                redirectTo: "/groups",
            }}
            />
 */
export function ConfirmDeleteDialog<
  TSchema extends ZodType<any, ZodTypeDef, any>,
  TReturn = undefined
>({
  item,
  dialogOptions,
  action,
  className,
  skipConfirmation = false,
}: ConfirmDeleteDialogProps<TSchema, TReturn>) {
  const { fn: serverAction, redirectTo = "/" } = action;
  const { id: itemId, name: itemName, type: itemType = "item" } = item;

  const [state, formAction, isPending] = useActionState(
    serverAction,
    initialState
  );
  const [confirmationText, setConfirmationText] = useState("");
  const dialogCloseButtonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (state.ok && dialogCloseButtonRef.current) {
      dialogCloseButtonRef.current.click();
    }
  }, [state]);
  useHandleFormState({
    state,
    navigateTo: redirectTo,
    revalidatePath: action.revalidatePath,
  });

  if (skipConfirmation && !dialogOptions)
    return (
      <form action={formAction}>
        <input type="hidden" name={`${itemType}Id`} value={itemId} />
        <SubmitButton
          disabled={isPending}
          isPending={isPending}
          // todo : let take children prop insted of text
          text={
            <span className="flex gap-2 items-center">
              {<Trash2 />} {`Delete ${itemType}`}
            </span>
          }
        />
      </form>
    );
  if (!dialogOptions) return null; //Assert it's defined
  const {
    trigger = <Trash2 />,
    triggerType = "icon",
    title: dialogTitle = `Delete ${itemType}`,
    // title: dialogTitle = "Delete Item",
    description: dialogDescription = "This action cannot be undone.",
  } = dialogOptions;

  const isConfirmed = confirmationText === itemName;

  return (
    <DialogComponent
      className={cn("block", className)}
      ref={dialogCloseButtonRef}
      trigger={trigger}
      triggerType={triggerType}
      dialogDetails={{
        title: dialogTitle,
        description: dialogDescription,
      }}
    >
      <form action={formAction} className="space-y-4">
        <input type="hidden" name={`${itemType}Id`} value={itemId} />

        <div className="text-red-600 font-medium">
          <p>
            Warning: This will permanently delete the {itemType} &quot;
            {itemName}&quot; and all related data.
          </p>
          <p className="mt-2">
            To confirm, please type the {itemType} name below:
          </p>
        </div>

        <LabeledField
          name="confirmation"
          label={`Type "${itemName}" to confirm`}
        >
          <input
            type="text"
            value={confirmationText}
            onChange={(e) => setConfirmationText(e.target.value)}
            className="border px-2 py-1 rounded w-full"
            placeholder={itemName}
          />
        </LabeledField>

        <SubmitButton
          disabled={isPending || !isConfirmed}
          isPending={isPending}
          text={`Delete ${sentenceCase(itemType)} Permanently`}
        />
      </form>
    </DialogComponent>
  );
}
