
import { cn } from "@/lib/utils";
import { sentenceCase } from "change-case";
import React, { ReactNode } from "react";
import { JsonDebug } from "./JsonDebug";
import { FilterOptions } from "@/lib/filter-sort-handler/types";
import { createFilterUIConfig } from "@/lib/filter-sort-handler/filters-and-sort";

type JsonDebugProps = {
  data: any;
  label?: string;
};
type FilteringOptions<F extends Record<string, FilterOptions<any>>> = {
  filterConfig: F;
  getParam: (key: string) => string | undefined;
  updateParam: (key: string, value: string, doRefresh?: boolean) => void;
};

export function AppCard<F extends Record<string, FilterOptions<any>>>({
  title,
  children,
  className,
  jsonDebug,
  emptyMessage = "No data found",
  itemsCount,
  filtering,
}: {
  title: ReactNode | string;
  children?: ReactNode;
  className?: string;
  jsonDebug?: JsonDebugProps;
  emptyMessage?: string;
  itemsCount?: number;

  filtering?: FilteringOptions<F>;
}) {
  const filterUIConfig: ReturnType<typeof createFilterUIConfig> | undefined =
    filtering
      ? createFilterUIConfig(filtering.filterConfig, filtering.getParam)
      : undefined;

  const handleChange = (key: string, value: string) => {
    filtering?.updateParam(key, value, true);
  };
  /*
  useUpdateInvalidFilterParamsInURL({
    filterConfig: filtering?.filterConfig,
    getParam: filtering?.getParam,
    updateParam: filtering?.updateParam,
  });
  */
  return (
    <div className={cn("p-4 m-2 bg-white border-1 rounded-sm", className)}>
      <div className="flex justify-between">
        <div className="mb-4">
          {React.isValidElement(title) ? (
            title
          ) : (
            <p className="font-semibold text-lg mb-1">{title}</p>
          )}
        </div>
        {filterUIConfig && (
          <div className="flex gap-4 mb-4">
            {Object.entries(filterUIConfig).map(
              ([key, { label, options, defaultValue }]) => (
                <div key={key} className="flex flex-col">
                  <label className="text-sm text-gray-500">{label}</label>
                  <select
                    className="border px-2 py-1 rounded"
                    value={defaultValue}
                    onChange={(e) => handleChange(key, e.target.value)}
                  >
                    {options.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {/* {opt.label}  */}
                        {sentenceCase(opt.label)}
                      </option>
                    ))}
                  </select>
                </div>
              )
            )}
          </div>
        )}
      </div>
      {itemsCount === 0 ? (
        <p className="text-gray-600">{emptyMessage}</p>
      ) : null}
      {children}
      {jsonDebug?.data ? (
        <JsonDebug data={jsonDebug.data} label={jsonDebug.label} />
      ) : null}
    </div>
  );
}
