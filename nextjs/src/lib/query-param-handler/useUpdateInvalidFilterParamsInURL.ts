import { useEffect } from "react";
import { FilterConfig } from "./types";

/**
 * Updates invalid URL filter search params to fallback values defined in filterConfig.
 *
 * Example:
 * `/rooms/requests?status=accepted&sort=latestzz` becomes `?status=accepted&sort=latest`
 *
 * Note:
 * Even if this hook is not used, `createFilterUIConfig(...)` still uses fallback defaults internally.
 * This hook is purely for syncing the URL to reflect valid filter values.
 * 
 * @example usage
 * 
 * ```ts
 * const { getParam, updateParam } = useQueryParamHandler();
 
   const filterUIConfig = createFilterUIConfig(roomJoinRequestsFilterConfig, getParam);
   useUpdateInvalidFilterParamsInURL(
     roomJoinRequestsFilterConfig,
     getParam,
     updateParam
   );
 * ```
 */


interface UseUpdateInvalidFilterParamsProps<T> {
  filterConfig?: FilterConfig<T>;
  getParam?: (key: string) => string | undefined;
  updateParam?: (key: string, value: string, replace?: boolean) => void;
}

export function useUpdateInvalidFilterParamsInURL<
  T extends Record<string, any>
>({
  filterConfig,
  getParam,
  updateParam,
}: UseUpdateInvalidFilterParamsProps<T>): T | void {
  useEffect(() => {
    if(!filterConfig || !getParam || !updateParam) return;
    for (const key in filterConfig) {
      const current = getParam(key);
      const { fallback, options } = filterConfig[key];
      if (current && !options.includes(current as T[keyof T])) {
        updateParam(key, fallback as string, true);
      }
    }
  }, [filterConfig, getParam, updateParam]);

  /*
    const validatedParams = useMemo(() => {
      const result: Partial<T> = {};

      for (const key in filterConfig) {
        const value = getParam(key);
        const { fallback, options } = filterConfig[key];
        result[key] = options.includes(value as T[keyof T]) ? value : fallback;
      }

      return result as T;
    }, [filterConfig, getParam]);

    return validatedParams;
    */
}
