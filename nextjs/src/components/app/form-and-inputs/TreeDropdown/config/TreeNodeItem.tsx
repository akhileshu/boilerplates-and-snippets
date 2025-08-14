import { AllowSearchMode } from "@/components/app/form-and-inputs/TreeDropdown/__internal__/tree-provider";
import {
  Node,
  onTraceChange,
} from "@/components/app/form-and-inputs/TreeDropdown/types";
import { cn } from "@/lib/utils";
import { ChevronRight, Search } from "lucide-react";

type TreeNodeItemProps = {
  node: Node;
  currentTrace: Node[];
  isOpen: boolean;
  onTraceChange: onTraceChange;
  searchTerm?: string;
   
  setSearchTerm?: (value: string) => void;
  allowSearch?: AllowSearchMode;
};

export function TreeNodeItem({
  node,
  currentTrace,
  isOpen,
  onTraceChange,
  searchTerm,
  setSearchTerm,
  allowSearch,
}: TreeNodeItemProps) {
  const isChildLevelSearchAllowed =
    allowSearch === "all" || allowSearch === "exceptFirst";
  const shouldBeAbleToSearchAndFilterChildren =
    isChildLevelSearchAllowed &&
    node.children &&
    node.children.length > 0 &&
    node.isOpen;
  return (
    <div className="group">
      <div
        onClick={() => onTraceChange(currentTrace, isOpen)}
        className={cn(
          "flex items-center justify-between cursor-pointer px-3 py-2 rounded-md text-sm transition-colors",
          "hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
          node.isOpen
            ? "bg-blue-50 text-blue-700 font-semibold"
            : "text-gray-700 hover:text-gray-900"
        )}
      >
        <span className="flex justify-between w-full">
          <div className="flex items-center">
            {node.children && node.children.length > 0 && (
              <ChevronRight
                className={cn(
                  "h-4 w-4 mr-2 transition-transform",
                  node.isOpen ? "transform rotate-90" : ""
                )}
              />
            )}
            <p>{node.name}</p>
          </div>
          {shouldBeAbleToSearchAndFilterChildren && setSearchTerm ? (
            <SearchChildrenInput
              className="m-0 p-0 bg-white rounded-md"
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          ) : null}
        </span>
      </div>
    </div>
  );
}

function SearchChildrenInput({
  searchTerm,
  setSearchTerm,
  className,
}: {
  searchTerm?: string;
  className?: string;
  setSearchTerm: (term: string) => void;
}) {
  return (
    <div
      className={cn("px-3 py-2 mt-1", className)}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search children..."
          className="w-full pl-9 pr-3 py-1 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
}
