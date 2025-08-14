"use client";
import { useTreeManager } from "@/components/app/form-and-inputs/TreeDropdown/__internal__/useTraceTree";
import { Node } from "@/components/app/form-and-inputs/TreeDropdown/types";
import React, { createContext, useContext } from "react";

export type AllowSearchMode = "all" | "first" | "exceptFirst" | false;
export const TreeContext = createContext<{
  tree: Node[];
  selectedTree: Node[];
   
  updateTree: (trace: Node[], open: boolean) => void; // ✅ Add this
}>({
  tree: [],
  selectedTree: [],
  updateTree: () => {},
});

export const useTree = () => {
  const context = useContext(TreeContext);
  if (!context) throw new Error("useTree must be used inside TreeProvider");
  return context;
};

/**
 * only exposing tree , selectedTree from context
 */
export function TreeProvider({
  children,
  fetchChildrenHandler,
  initialTree,
}: {
  children: React.ReactNode;
  fetchChildrenHandler?: (node: Node) => Promise<Node[]>;
  initialTree: Node[];
}) {
  const { tree, selectedTree, updateTree } = useTreeManager(
    initialTree,
    fetchChildrenHandler
  );

  return (
    <TreeContext.Provider
      value={{
        tree,
        selectedTree,
        updateTree,
      }}
    >
      {children}
    </TreeContext.Provider>
  );
}
