"use client";

import { ArrowRight } from "lucide-react";
import { useActionState, useState } from "react";

import { ButtonState } from "@/components/app/button";
import { FieldError } from "@/components/app/FieldError";
import { Input } from "@/components/app/Input";
import SubmitButton from "@/components/app/SubmitButton";
import { createPost, updatePost } from "@/features/post/actions/postActions";
import MdEditor from "@/features/post/components/md-editor";
import { useHandleFormState } from "@/lib/forms/useHandleFormState";
import { Post } from "@prisma/client";
import { initialState } from "@/lib/server-actions/handleAction";
import AppForm from "@/components/app/form";

interface CreateOrEditProps {
  post?: Post;
}

export default function CreateOrEditPostForm({ post }: CreateOrEditProps) {
  const isEdit = !!post;
  const placeholderMDContent = `Start writing your amazing content here...`;
  const [content, setContent] = useState(post?.content ?? placeholderMDContent);
  const [title, setTitle] = useState(post?.title ?? "");
  const actionFn = isEdit ? updatePost : createPost;
  const [state, formAction, isPending] = useActionState(actionFn, initialState);

  const { fieldErrors } = state ?? {};

  useHandleFormState({
    state,
    revalidatePath: "/dashboard",
    navigateTo: "/dashboard",
  });

  const getButtonState = (): ButtonState => {
    if (isPending)
      return { disabled: true, tooltip: "Processing... Please wait." };
    if (!content)
      return { disabled: true, tooltip: "Content cannot be empty." };
    if (!title.trim()) return { disabled: true, tooltip: "Title is required." };
    if (content === placeholderMDContent)
      return { disabled: true, tooltip: "Write something before submitting." };
    if (content === post?.content && title === post?.title)
      return { disabled: true, tooltip: "No changes made to update." };

    return { disabled: false, tooltip: "" };
  };

  return (
    <AppForm submitVariant="custom" action={formAction} className="space-y-4">
      <input type="hidden" name="id" value={post?.id ?? ""} />
      <div className="flex gap-2 mt-2">
        <Input
          required
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter post title"
        />
        <FieldError errors={fieldErrors?.title} />
        <input type="hidden" name="content" value={content} />
        <SubmitButton
          {...getButtonState()}
          text={isEdit ? "Update" : "Save"}
          icon={<ArrowRight />}
          pendingText={isEdit ? "Updating..." : "Saving..."}
          isPending={isPending}
          className="self-start"
        />
      </div>
      <div>
        <MdEditor isEditing setContent={setContent} content={content} />
        <FieldError errors={fieldErrors?.content} />
      </div>
    </AppForm>
  );
}
