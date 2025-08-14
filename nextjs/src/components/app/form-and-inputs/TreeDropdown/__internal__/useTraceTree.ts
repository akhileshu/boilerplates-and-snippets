import { Node } from "@/components/app/form-and-inputs/TreeDropdown/types";
import { updateNodeTree } from "@/components/app/form-and-inputs/TreeDropdown/__internal__/updateNodeTree";
import { useState } from "react";

/**
 * Internal hook — used only inside TreeProvider.
 * Relies on initial tree and fetch logic passed via props from TreeProvider.
 *
 * Tracks and manages a dynamic tree structure based on user interaction (expand/collapse).
 *
 * Responsibilities:
 * - Maintains the current tree state.
 * - Handles updates like node toggling (open/close).
 * - Fetches and inserts children when a node is expanded (lazy loading).
 * - Computes the list of currently selected nodes.
 */
export function useTreeManager(
  initialTree: Node[],
   
  fetchChildrenHandler?: (node: Node) => Promise<Node[]>
) {
  const shouldAutoExpandRoot = initialTree.length === 1;

  const [tree, setTree] = useState<Node[]>(
    shouldAutoExpandRoot ? [{ ...initialTree[0], isOpen: true }] : initialTree
  );

  const updateTree = async (trace: Node[], isOpen: boolean) => {
    let newTree = updateNodeTree(tree, trace, isOpen);

    if (isOpen) {
      const target = trace[trace.length - 1];
      const alreadyHasChildren = target.children?.length;

      if (!alreadyHasChildren && fetchChildrenHandler) {
        const children = await fetchChildrenHandler(target);
        newTree = insertChildren(newTree, trace, children);
      }
    }

    setTree(newTree);
  };

  return { tree, updateTree, selectedTree: getSelectedTree(tree) };
}

function getSelectedTree(tree: Node[]): Node[] {
  return tree
    .filter((n) => n.isOpen)
    .map((n) => ({
      ...n,
      children: n.children ? getSelectedTree(n.children) : undefined,
    }))
    .filter((n) => n.isOpen || (n.children && n.children.length > 0));
}

function insertChildren(
  nodes: Node[],
  trace: Node[],
  children: Node[],
  level = 0
): Node[] {
  return nodes.map((n) => {
    if (n.name !== trace[level]?.name) return n;

    const isTarget = level === trace.length - 1;

    return {
      ...n,
      children: isTarget
        ? children
        : insertChildren(n.children || [], trace, children, level + 1),
    };
  });
}
