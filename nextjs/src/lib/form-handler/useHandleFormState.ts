"use client";

import { handleToastMessage } from "@/lib/__internal__/handleToastMessage";
import { revalidatePathAction } from "@/lib/__internal__/revalidate";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import { z } from "zod";
import { RevalidatePath } from "./types";
import { MutateResponse } from "../server-action-handler/response.types";

/**
 * Custom hook to handle form state updates, side effects like :
 * revalidating cache, navigation, showing toasts
 */

export function useHandleFormState<T, S extends z.ZodType<any> = any>({
  state,
  revalidatePath,
  navigateTo,
}: {
  state: MutateResponse<T, S>;
  revalidatePath?: RevalidatePath; // ✅ allows autocomplete for "current"
  navigateTo?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (!state) return;

    const { fieldErrors, message, ok, extra } = state;

    if (ok) {
      const pathToRevalidate =
        revalidatePath === "current" ? pathname : revalidatePath;
      if (pathToRevalidate) revalidatePathAction(pathToRevalidate);
      if (navigateTo) router.push(navigateTo);
    }

    if (fieldErrors) {
      //idea : Filter and collect non-user input errors (prefixed with "_")
      const nonUserErrors = Object.entries(fieldErrors)
        // .filter(([key]) => key.startsWith("_")) // Only prefixed fields
        .flatMap(([, errors]) => errors ?? []);

      if (nonUserErrors.length > 0) {
        toast.error(
          `Please fix the following errors:\n\n${nonUserErrors
            .map((err, index) => `${index + 1}. ${err}`)
            .join("\n")}`
        );
        return;
      }
    }

    if (message) {
      handleToastMessage(message, extra);
    }
  }, [state, revalidatePath, navigateTo, router, pathname]);
}
