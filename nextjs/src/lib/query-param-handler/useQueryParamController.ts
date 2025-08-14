"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";



/**
 * 
 * used along with filter sort system
 * @example
 * const { getParam, updateParam } = useQueryParamHandler();
 *
 * const filterUIConfig = createFilterUIConfig(
 *   roomJoinRequestsFilterConfig,
 *   getParam
 * );
 */
export function useQueryParamHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  //   router.push erases other params by below approach
  //   router.push(`?direction=${e.target.value}`);

  const getParam = useCallback(
    (key: string): string | undefined => searchParams.get(key) ?? undefined,
    [searchParams]
  );

  const updateParam = useCallback(
    (key: string, value: string, doRefresh = false) => {
      // const params = new URLSearchParams(searchParams.toString());
      const params = new URLSearchParams(window.location.search); // 🔁 Always fresh
      // const params = new URLSearchParams(window.location.search);
      params.set(key, value);
      const url = `${window.location.pathname}?${params.toString()}`;
      if (doRefresh) router.push(url);
      else window.history.replaceState({}, "", url); // No rerender, updates URL

      /*
    router.refresh();      // forces data refresh, but doesn't update URL
router.replace(...);   // updates URL + triggers SSR
router.push(...);      // same as replace, but scrolls and adds history entry
*/
    },
    [router]
  );

  return { getParam, updateParam };
}
