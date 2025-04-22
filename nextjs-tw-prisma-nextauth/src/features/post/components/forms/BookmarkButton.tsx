"use client";
import { Button, ButtonState } from "@/components/app/button";
import { useActionState, useEffect, useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { isPostBookmarked, toggleBookmark } from "../../actions/postActions";
import { useHandleFormState } from "@/lib/forms/useHandleFormState";
import { initialState } from "@/lib/server-actions/handleAction";
import { handleToastMessage } from "@/lib/tost/toast-utils";
import AppForm from "@/components/app/form";

export default function ToggleBookmarkForm({ postId }: { postId: number }) {
  const [toggleBookmarkState, formAction, isPending] = useActionState(
    toggleBookmark,
    initialState
  );

  const [isPostBookmarkedResult, setIsPostBookmarkedResult] =
    useState<
      Awaited<ReturnType<typeof isPostBookmarked> | typeof initialState>
    >(initialState);

  const isToggleClicked = toggleBookmarkState !== initialState;
  const isBookmarked = !isToggleClicked
    ? isPostBookmarkedResult?.data?.isBookmarked
    : toggleBookmarkState?.data?.isBookmarked;

  const getButtonState = (): ButtonState => {
    const { data, message, ok } = isPostBookmarkedResult;

    if (!ok) {
      return {
        disabled: true,
        tooltip: message.text,
      };
    }
    if (ok && !isToggleClicked) {
      return {
        disabled: isPending,
        tooltip:
          typeof data?.isBookmarked !== "boolean"
            ? "Something went wrong"
            : data.isBookmarked
            ? "Remove from Bookmark"
            : "Add Post to Bookmark",
      };
    } else
      return {
        disabled: isPending,
        tooltip:
          typeof toggleBookmarkState.data?.isBookmarked !== "boolean"
            ? toggleBookmarkState.message.text
            : toggleBookmarkState.data.isBookmarked
            ? "Remove from Bookmark"
            : "Add Post to Bookmark",
      };
  };

  useHandleFormState({
    state: toggleBookmarkState,
    revalidatePath: "/dashboard",
  });

  useEffect(() => {
    async function fetchBookmarkStatus() {
      const result = await isPostBookmarked(postId);
      setIsPostBookmarkedResult(result);
      if (!result.ok) handleToastMessage(result.message);
    }
    fetchBookmarkStatus();
  }, [postId]);

  return (
    <AppForm submitVariant="custom" action={formAction} className="space-y-4">
      <input type="hidden" name="postId" value={postId} />
      <Button {...getButtonState()} type="submit">
        {isBookmarked ? (
          <FaBookmark className="text-yellow-500" />
        ) : (
          <FaRegBookmark />
        )}
      </Button>
    </AppForm>
  );
}
