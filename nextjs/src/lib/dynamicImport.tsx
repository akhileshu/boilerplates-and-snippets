import dynamic from "next/dynamic";
import { ComponentType } from "react";

type NamedOrDefault<T> = { default: T } | T;

/**
 * Dynamically import a component, supports both default and named exports.
 *
 * @param loader - dynamic import function
 * @param exportName - if not provided, assumes default export
 * 
 * @example
 * const RoomAccessSection = dynamicComponent<{ room: UserSerializedRoom }>(
  () => import("../../../realtime-rooms/components/renderers/RoomAccessSection"),
  "RoomAccessSection" // named export
);

const SomeDefaultComp = dynamicComponent<{ foo: string }>(
  () => import("./SomeDefaultComp")
);

@example 
- with suspense 
<Suspense fallback={<div>Loading room access...</div>}>
    <RoomAccessSection room={room} />
  </Suspense>

  --- 
  
  Server Component (async function) → Suspense natively waits for any top-level await in it.

Client Component → Suspense does not wait for your data fetching unless you explicitly integrate it with a Suspense-aware data library (React Query with suspense: true, Relay, SWR + suspense, etc.).

Dynamic import + { ssr: false } → The JS chunk load can be wrapped in Suspense, but it won’t wait for internal API calls unless the component itself suspends.

So in your case:

If RoomAccessSection is a Server Component async function, <Suspense> in GroupDetails will pause until its awaits resolve.

If it’s a Client Component, you have to manually cause a suspension (or show a loading prop) for data fetch.

 */
export function dynamicComponent<Props>(
  loader: () => Promise<any>, // accept any module shape
  exportName?: string,
  ssr: boolean = false
) {
  return dynamic<Props>(
    () =>
      loader().then((mod) =>
        exportName
          ? (mod[exportName] as ComponentType<Props>)
          : (mod.default as ComponentType<Props>)
      ),
    {
      ssr,
      loading: () => (
        <div className="text-gray-400 animate-pulse">
          Loading dynamicComponent
        </div>
      ),
    }
  );
}
