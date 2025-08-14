export type FilterConfig<T> = Record<
  keyof T,
  {
    fallback: T[keyof T];
    options: readonly T[keyof T][];
  }
>;
