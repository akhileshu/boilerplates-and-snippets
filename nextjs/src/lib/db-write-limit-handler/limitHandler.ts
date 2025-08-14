import { getMessage } from "@/lib/message-handler/get-message";
import { myPrisma } from "@/server/db/my-prisma";
import { appConfig } from "../app-config/app-config";
import { getErrorMessage } from "../error-handler/getErrorMessage";
import { AppMessage } from "../message-handler/types";
import { mutateError } from "../server-action-handler/mutateHelpers";
import { LIMIT_MAPPING, LimitField } from "./__internal__/schema-config";

/**
 * example usage : https://github.com/akhileshu/solo-to-squard/blob/78157c87753665ef98e33c7f0e05dce4554c5126/src/features/post/actions/postActions.ts#L112
 */
export async function checkLimit(
  userId: string,
  limitfield: LimitField,
  messageOnLimitReached: AppMessage
) {
  try {
    if (!appConfig.isProd) return null; // Skip in dev
    const limitKey = LIMIT_MAPPING[limitfield];
    const userData = await myPrisma.user.findUnique({
      where: { id: userId },
      select: { [limitfield]: true },
    });

    if (
      userData &&
      Number(userData[limitfield]) >= appConfig.limits[limitKey]
    ) {
      return mutateError({ message: messageOnLimitReached });
    }

    return null;
  } catch (error) {
    console.log(getErrorMessage(error));
    return mutateError({ message: getMessage("common", "LIMIT_CHECK_FAILED") });
  }
}

export async function incrementLimit(userId: string, field: LimitField) {
  try {
    if (!appConfig.isProd) return;

    await myPrisma.user.update({
      where: { id: userId },
      data: { [field]: { increment: 1 } },
    });
  } catch (error) {
    console.log(getErrorMessage(error));
    return mutateError({ message: getMessage("common", "LIMIT_CHECK_FAILED") });
  }
}
