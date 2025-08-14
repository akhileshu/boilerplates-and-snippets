"use client";
import {
  AllowSearchMode,
  useTree,
} from "@/components/app/form-and-inputs/TreeDropdown/__internal__/tree-provider";
import { useChildSearch } from "@/components/app/form-and-inputs/TreeDropdown/__internal__/useChildSearch";
import { cn } from "@/lib/utils";

import { TreeDropdownNode } from "@/components/app/form-and-inputs/TreeDropdown/__internal__/TreeDropdownNode";
import { Search } from "lucide-react";
import { ReactNode } from "react";

/**
 * Renders a progressive tree UI with optional per-node or top-level search.
 *
 * @component
 *
 * @example
 * ```tsx
 * export function FocusSelectorTreeDropdown() {
   return (
     <TreeProvider
       fetchChildrenHandler={fetchChildrenHandler}
       initialTree={initialTree}
     >
       <FocusTreeContent />
     </TreeProvider>
   );
 }
 
 function FocusTreeContent() {
   const { selectedTree, tree } = useTree();
   return (
     <TreeDropdownRoot allowSearch="all" className="" />
   );
 }
 * />

 TreeProvider (state logic)
 └── TreeDropdownRoot (UI)
      └── TreeDropdownNode (Recursive node UI)


 * ```
 *
 * @prop {'all' | 'first' | 'exceptFirst' | false} [allowSearch=false] - Controls where search inputs are shown.
 *    - `'all'`: search on every node
 *    - `'first'`: only top-level
 *    - `'exceptFirst'`: all except root
 *    - `false`: disables search entirely
 */

export default function TreeDropdownRoot({
  className,
  allowSearch,
  title = "Progressive Tree Select Dropdown",
}: {
  className?: string;
  title?: ReactNode | string;
  allowSearch: AllowSearchMode;
}) {
  const { tree, updateTree } = useTree();

  const { searchTerm, setSearchTerm, filteredChildren } = useChildSearch(tree);
  const isFirstLevelSearchAllowed =
    (allowSearch === "all" || allowSearch === "first") && tree.length > 1;

  return (
    <div
      className={cn("flex flex-col min-h-60 w-lg border rounded-sm", className)}
    >
      <div className="p-4 border-b">
        <div className="font-semibold text-gray-700">{title}</div>

        {isFirstLevelSearchAllowed && (
          <div className="relative mt-3">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search nodes..."
              className="pl-10 pr-4 py-2 w-full text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {filteredChildren.length > 0 ? (
          filteredChildren.map((node) => (
            <TreeDropdownNode
              key={node.name}
              node={node}
              trace={[]}
              onTraceChange={updateTree}
              allowSearch={allowSearch}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 py-8">
            <Search className="h-6 w-6 mb-2" />
            <p className="text-sm">No results found</p>
          </div>
        )}
      </div>
    </div>
  );
}
