import { ReactNode } from "react";
import { StatusMessage } from "../../components/app/__internal__/StatusMessage";
import { FetchResponse } from "../server-action-handler/response.types";

export function renderStatusMessage<T>(
  result: FetchResponse<T>,
  cardTitle?: ReactNode | string,
  emptyListMessage = "No items found.",
  showEmpty = true
) {
 
  if (!result.ok)
    return <StatusMessage cardTitle={cardTitle} message={result.message} extra={result.extra} />;

  // if (showEmpty && Array.isArray(result.data) && result.data.length === 0)
  //   return (
  //     <StatusMessage
  //       extra={result.extra}
  //       cardTitle={cardTitle}
  //       message={{ text: emptyListMessage, type: "not_found" }}
  //     />
  //   );

  return null;
}
