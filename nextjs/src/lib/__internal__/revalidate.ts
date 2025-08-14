"use server";
import { revalidatePath } from "next/cache";

/**
 * used internally in `useHandleFormState({ state, revalidatePath: "current" })`
 */
export async function revalidatePathAction(path: string) {
  revalidatePath(path);
}
