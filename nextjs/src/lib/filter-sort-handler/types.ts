
export type FilterOptions<T extends readonly string[]> = {
  options: T;
  fallback: T[number];
  label: string;
};
export type FilterSortConfigMap = Record<
  string,
  FilterOptions<readonly string[]>
>;

export type ExtractFilterValues<C> = {
  [K in keyof C]: C[K] extends { options: readonly (infer O)[] } ? O : never;
};