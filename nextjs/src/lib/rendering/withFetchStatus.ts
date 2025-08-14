import { Session } from "next-auth";
import React from "react";
/*
import {
  ExtractFilterValues,
  FilterOptions,
  getValidatedFiltersFromSearchParams,
} from "../filter-sort-handler";
 */
import { renderStatusMessage } from "./renderStatusMessage";
import { SearchParams } from "./types";
import { FetchResponse } from "../server-action-handler/response.types";
import { ExtractFilterValues, FilterOptions } from "../filter-sort-handler/types";
import { getValidatedFiltersFromSearchParams } from "../filter-sort-handler/filters-and-sort";

/**
 * todo : improve types -   `fetchFn: (
    filters?: ExtractFilterValues<typeof filterConfig>
  ) => Promise<FetchResponse<T>>;`
   
  filters are required when filterConfig is provided
 *  
 * @example
 * export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return withFetchStatus({
  beforeRender: async (room) => {
        return await requireAuth({
          authorize: (session) => room.createdById === session.user.id,
          onFailure: {
            type: "not-room-owner",
            data: { room },
            action: "edit room details",
          },
        });
      },
    searchParams,
    filterConfig: profileService.utils.userProfileFilterConfig,
    fetchFn: (filters) => profileService.queries.getAllProfiles(filters!),
    renderFn: (profiles) => (
      <div>
        <profileService.Renderers.UserProfileOverview users={profiles} />
      </div>
    ),
    cardTitle: "user profile's",
  });
}
 */

export async function withFetchStatus<
  T,
  F extends Record<string, FilterOptions<any>>
>({
  fetchFn,
  renderFn,
  beforeRender,
  cardTitle,
  searchParams,
  filterConfig,
}: {
  searchParams?: SearchParams;
  filterConfig?: F;
  fetchFn: (
    filters?: ExtractFilterValues<typeof filterConfig>
  ) => Promise<FetchResponse<T>>;
  beforeRender?: (data: T) => Promise<Session>; // used for authorization
  renderFn: (data: T) => React.ReactNode;
  cardTitle?: string;
}) {
  let result: FetchResponse<T>;
  if (searchParams && filterConfig) {
    let filters = await getValidatedFiltersFromSearchParams(
      searchParams,
      filterConfig
    );
    result = await fetchFn(filters);
  } else result = await fetchFn();
  const statusMessage = renderStatusMessage(result, cardTitle);

  if (statusMessage || !result.ok) return statusMessage;
  if (beforeRender) await beforeRender(result.data);
  return renderFn(result.data as T);
}
