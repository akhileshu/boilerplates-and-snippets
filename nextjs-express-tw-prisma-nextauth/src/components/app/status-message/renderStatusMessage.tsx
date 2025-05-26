import { FetchResponse } from "@/lib/server-actions/handleAction";
import { StatusMessage } from "../info";
import { ReactNode } from "react";

export function renderStatusMessage<T>(
  result: FetchResponse<T>,
  cardTitle: ReactNode | string,
  emptyListMessage = "No items found.",
  showEmpty = true
) {
  if (!result.ok)
    return <StatusMessage cardTitle={cardTitle} message={result.message} />;

  if (showEmpty && Array.isArray(result.data) && result.data.length === 0)
    return (
      <StatusMessage
        cardTitle={cardTitle}
        message={{ text: emptyListMessage, type: "not_found" }}
      />
    );

  return null;
}
