/**
 * import() is always async and returns a Promise.
It’s mostly useful when the code is:

Heavy (big dependencies, large JSON, computation-heavy)

Rarely used (like a feature behind a button click)

If the code is small and always needed, it’s better to use normal static imports so bundlers can optimize and avoid runtime delays.

--- 

 * @example
 * // named export
export function heavyFunction() {
  console.log("Heavy work...");
}

// default export
export default function heavyFunction() {
  console.log("Heavy work...");
}

export default async function page() {
  const heavyFunction = await dynamicFunction<
    typeof import("../../../../other/test-lazy-code-splitting/heavy-function").heavyFunction
  >(
    () => import("../../../../other/test-lazy-code-splitting/heavy-function"),
    "heavyFunction"
  );

  const heavyFunctionDef = await dynamicFunction<
    typeof import("../../../../other/test-lazy-code-splitting/heavy-function-def").default
  >(
    () =>
      import("../../../../other/test-lazy-code-splitting/heavy-function-def")
  );
  heavyFunction();
  heavyFunctionDef();
  return <div>page</div>;
}


 */
export async function dynamicFunction<T extends (...args: any[]) => any>(
  loader: () => Promise<any>, // dynamic import call
  exportName?: string // optional named export
): Promise<T> {
  const mod = await loader();
  return (exportName ? mod[exportName] : mod.default) as T;
}
