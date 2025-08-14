import { getDescriptionFromExtra } from "@/lib/__internal__/getDescriptionFromExtra";

import { cn } from "@/lib/utils";
import { InfoIcon } from "lucide-react";
import { ReactNode } from "react";
import { AppCard } from "../app-card";
import { AppMessage } from "@/lib/message-handler/types";
import { MessageExtras } from "@/lib/server-action-handler/message-extras.types";

/**
 * Use this component only when rendering UI based on a specific error message.
 * For general error handling or validation, prefer using the `checkFetchResult` utility.
 * 
 * @example
 * ``` tsx
 *   const connectionResult = await connection.actions.getConnectionBetweenUsers(
     targetUser.id,
     loggedInUser.id
   );
   if (!connectionResult.ok) {
     if (
       connectionResult.message.text ===
       lib.messaging.getMessage("connection", "NO_CONNECTION").text
     )
       return <SendConnectionForm toUserId={targetUser.id} />;
     else return <StatusMessage message={connectionResult.message} />;
   }
   const connectionData = connectionResult.data;
 * ```
 */
export function StatusMessage({
  className,
  message,
  cardTitle,
  extra,
}: {
  className?: string;
  message: AppMessage;
  cardTitle?: ReactNode | string;
  extra: MessageExtras | null;
}) {
  const description = getDescriptionFromExtra(extra, undefined);
  const InfoCard = (
    <div
      className={cn(
        "flex items-center gap-2 p-3 border border-blue-200 bg-blue-50 text-blue-800 rounded-md text-sm",
        className
      )}
    >
      <InfoIcon size={18} />
      <span>{message.text}</span>
      <span className="text-gray-500 my-2">{description}</span>
    </div>
  );
  return cardTitle ? <AppCard title={cardTitle}>{InfoCard}</AppCard> : InfoCard;
}
