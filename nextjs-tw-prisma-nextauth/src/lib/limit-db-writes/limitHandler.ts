import { AppMessage } from "@/features/message/lib/define-messages";
import { getMessage } from "@/features/message/lib/get-message";
import { prisma } from "@/lib/db/prisma";
import { mutateError } from "@/lib/server-actions/handleAction";
import { APP_SETTINGS, getErrorMessage } from "@/lib/utils";
import { LIMIT_MAPPING, LimitField } from "./schema-config";

export async function checkLimit(
  userId: string,
  limitfield: LimitField,
  messageOnLimitReached: AppMessage
) {
  try {
    if (!APP_SETTINGS.isProd) return null; // Skip in dev
    const limitKey = LIMIT_MAPPING[limitfield];
    const userData = await prisma.user.findUnique({
      where: { id: userId },
      select: { [limitfield]: true },
    });

    if (
      userData &&
      Number(userData[limitfield]) >= APP_SETTINGS.limits[limitKey]
    ) {
      return mutateError(messageOnLimitReached);
    }

    return null;
  } catch (error) {
    console.log(getErrorMessage(error));
    return mutateError(getMessage("common", "LIMIT_CHECK_FAILED"));
  }
}

export async function incrementLimit(userId: string, field: LimitField) {
  try {
    if (!APP_SETTINGS.isProd) return;

    await prisma.user.update({
      where: { id: userId },
      data: { [field]: { increment: 1 } },
    });
  } catch (error) {
    console.log(getErrorMessage(error));
    return mutateError(getMessage("common", "LIMIT_CHECK_FAILED"));
  }
}
