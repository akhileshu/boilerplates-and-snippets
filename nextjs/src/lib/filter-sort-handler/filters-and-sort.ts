import { FilterOptions, FilterSortConfigMap } from "./types";

type ValidOptions<T extends string> = readonly T[];

function createValidator<T extends string>(validOptions: ValidOptions<T>) {
  const isValid = (val: any): val is T => validOptions.includes(val);
  const getValidated = (val: any, fallback: T): T =>
    isValid(val) ? val : fallback;
  return { isValid, getValidated };
}

function createFilter<
  T extends readonly string[],
  V extends T[number] = T[number]
>(options: T, fallback: V) {
  const values = [...options] as V[];

  return {
    options,
    fallback,
    isValid: (val: any): val is V => values.includes(val),
    getValidated: (val: any): V => (values.includes(val) ? val : fallback),
    toSelectOptions: (): { label: string; value: V }[] =>
      values.map((opt) => ({ label: capitalize(opt), value: opt })),
  };
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

//

type FilterKey = string;

type GenericFilterValue<T extends readonly string[]> = T[number];

/**
 * `todo`
 * might take value , label array in options field
 * 
 * ```ts [
  { value: "startTimeAsc", label: "Soonest First" },  // earliest upcoming first
  { value: "startTimeDesc", label: "Farthest First" }, // farthest in future first
  { value: "durationAsc", label: "Shortest First" },
  { value: "durationDesc", label: "Longest First" },
]
  ```

 */

export function defineFilterConfig<T extends readonly string[]>(config: {
  label: string;
  options: T;
  fallback: T[number];
}): FilterOptions<T> {
  return config;
}

export function createFilterUIConfig<
  T extends Record<FilterKey, FilterOptions<any>>
>(
  config: T,
  getParam: (key: string) => string | undefined
): {
  [K in keyof T]: {
    label: string;
    options: { label: string; value: T[K]["options"][number] }[];
    defaultValue: T[K]["options"][number];
  };
} {
  const result = {} as any;

  for (const key in config) {
    const { options, fallback, label } = config[key];
    const validator = createValidator(options);
    const filter = createFilter(options, fallback);

    result[key] = {
      label,
      options: filter.toSelectOptions(),
      defaultValue: validator.getValidated(getParam(key), fallback),
    };
  }

  return result;
}

export async function getValidatedFiltersFromSearchParams<
  T extends FilterSortConfigMap
>(
  searchParamsPromise: Promise<Record<string, string | string[] | undefined>>,
  config: T
): Promise<{ [K in keyof T]: T[K]["options"][number] }> {
  const searchParams = await searchParamsPromise;
  const result = {} as any;

  for (const key in config) {
    const { options, fallback } = config[key];
    const validator = createValidator(options);
    const rawValue = searchParams[key];

    result[key] = validator.getValidated(
      typeof rawValue === "string" ? rawValue : undefined,
      fallback
    );
  }

  return result;
}

/**
 * filter-sort system
 *
 * @example Setup
 * ```ts
 *
 * import { ExtractFilterValues } from "@/lib/utils/filters-and-sort";
 *
 * const {
 *   utils: {
 *     filters: { defineFilterConfig },
 *   },
 * } = lib;
 *
 * export const roomJoinRequestsFilterConfig = {
 *   status: defineFilterConfig({
 *     label: "Status",
 *     options: ["all", "pending", "accepted", "rejected"] as const,
 *     fallback: "all",
 *   }),
 *   sort: defineFilterConfig({
 *     label: "Sort By",
 *     options: ["latest", "oldest"] as const,
 *     fallback: "latest",
 *   }),
 * };
 *
 * type RoomJoinRequestFilterValues = ExtractFilterValues<
 *   typeof roomJoinRequestsFilterConfig
 * >;
 * ```
 *
 * @example Client-side Usage (React component)
 * ```ts
 * const { getParam, updateParam } = useQueryParamHandler();
 *
 * const filterUIConfig = createFilterUIConfig(
 *   roomJoinRequestsFilterConfig,
 *   getParam
 * );
 *
 * //optional
 * useUpdateInvalidFilterParamsInURL(
 *   roomJoinRequestsFilterConfig,
 *   getParam,
 *   updateParam
 * );
 *
 * return (
 *   <AppCard
 *     title="Room Join Requests"
 *     className="max-w-6xl mx-auto"
 *     filterConfig={filterUIConfig}
 *     onFilterChange={(key, value) => updateParam(key, value, true)}
 *   >
 *     // children...
 *   </AppCard>
 * );
 * ```
 *
 * @example Server-side Usage
 * ```ts
 * const filters = await getValidatedFiltersFromSearchParams(
 *   searchParams,
 *   roomJoinRequestsFilterConfig
 * );
 *
 * const title = "room join requests";
 * const RoomJoinRequestsResult = checkFetchResult(
 *   await roomService.queries.getRoomJoinRequests(filters),
 *   title
 * );
 * ```
 */
let usage;
