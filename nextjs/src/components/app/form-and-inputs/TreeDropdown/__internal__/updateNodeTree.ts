import { Node } from "@/components/app/form-and-inputs/TreeDropdown/types";

/**
 * 
   - Node is in the trace path → toggle its open state, update children
   - if clicking an Opened node, close it
   - if only single select enabled on parent , open current , close others
 */
function getToggledNodeWithChildren(
  node: Node,
  trace: Node[],
  isOpen: boolean,
  level: number,
  isLastInTrace: boolean
): Node {
  const isOpenUpdated = isLastInTrace ? isOpen : node.isOpen;
  const childrenUpdated =
    isOpenUpdated && node.children
      ? updateNodeTree(node.children, trace, isOpen, level + 1)
      : undefined;

  if (isOpenUpdated === false) return getFullyClosedNode(node);
  return {
    ...node,
    isOpen: isOpenUpdated,
    children: childrenUpdated,
  };
}

/**
 * Recursively closes a node and all its descendants.
 * 
 * Children are preserved in memory, just marked as collapsed.
 * This avoids refetching or regenerating child nodes on re-expand.
 */
function getFullyClosedNode(node: Node): Node {
  return {
    ...node,
    isOpen: false,
    children: node.children ? node.children.map(getFullyClosedNode) : undefined,
  };
}

/**
 * Updates the tree structure based on a trace path.
 *
 * - Traverses the tree according to `trace` (the path to the clicked node).
 * - Toggles `isOpen` for the target node.
 * - Preserves children for all nodes, even when collapsed.
 * - If parent node has `multi: false`, all other sibling nodes are closed.
 *
 * Note: Best debugged visually with breakpoints due to recursive trace-based logic.
 */
export function updateNodeTree(
  nodes: Node[],
  trace: Node[],
  isOpen: boolean,
  level = 0
): Node[] {
  return nodes.map((node) => {
    const currentTraceNode = trace[level];
    const isCurrentMatch = node.name === currentTraceNode?.name;
    const isLastInTrace = level === trace.length - 1;
    const parent = trace[level - 1];
    const isParentAllowsSingleSelect = parent?.multi === false;

    console.log({
      isCurrentMatch,
      isClickedNode: isLastInTrace,
      isParentAllowsSingleSelect,
      name: node.name,
    });

    if (!isCurrentMatch) {
      // if only single select enabled on parent , open current , close others
      if (isParentAllowsSingleSelect && isLastInTrace)
        return getFullyClosedNode(node);
      return node; // ignore this node as nothing has changed about this
    }

    return getToggledNodeWithChildren(
      node,
      trace,
      isOpen,
      level,
      isLastInTrace
    );
  });
}
