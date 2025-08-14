import { useChildSearch } from "@/components/app/form-and-inputs/TreeDropdown/__internal__/useChildSearch";
import { TreeNodeItem } from "@/components/app/form-and-inputs/TreeDropdown/config/TreeNodeItem";
import { DropdownProps } from "@/components/app/form-and-inputs/TreeDropdown/types";

export function TreeDropdownNode({
  node,
  trace,
  onTraceChange,
  allowSearch,
}: DropdownProps) {
  const currentTrace = [...trace, node];
  const isOpen = !(node.isOpen ?? false);
  const { searchTerm, setSearchTerm, filteredChildren } = useChildSearch(
    node.children
  );
  return (
    <div className="flex flex-col gap-1">
      <TreeNodeItem
        node={node}
        currentTrace={currentTrace}
        isOpen={isOpen}
        onTraceChange={onTraceChange}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        allowSearch={allowSearch}
      />

      {node.isOpen && filteredChildren.map && (
        <div className="ml-4 border-l-2 border-gray-200 pl-3 space-y-1">
          {filteredChildren.map((child) => (
            <TreeDropdownNode
              key={child.name}
              node={child}
              trace={currentTrace}
              onTraceChange={onTraceChange}
              allowSearch={allowSearch}
            />
          ))}
        </div>
      )}
    </div>
  );
}
