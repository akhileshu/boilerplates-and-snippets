"use client";
import AppForm from "@/components/app/form";
import { initialState } from "@/lib/server-actions/handleAction";
import { useHandleFormState } from "@/lib/forms/useHandleFormState";
import { useActionState } from "react";
import { deletePost } from "../../actions/postActions";

export default function DeletePostForm({ postId }: { postId: number }) {
  const [state, formAction, isPending] = useActionState(
    deletePost,
    initialState
  );

  useHandleFormState({
    state,
    revalidatePath: "/dashboard",
  });

  return (
    <AppForm
      action={formAction}
      variant="delete"
      confirmation={{
        message: "Are you sure you want to delete this?",
        enabled: true,
      }}
      submitVariant="default"
      submitProps={{
        isPending: isPending,
        buttonState: { disabled: isPending },
        label: "Delete",
      }}
    >
      <input type="hidden" name="id" value={postId} />
    </AppForm>
  );
}
