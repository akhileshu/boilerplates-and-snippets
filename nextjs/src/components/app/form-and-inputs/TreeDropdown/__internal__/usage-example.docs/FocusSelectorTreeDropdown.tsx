"use client";
import { findNodeInTree } from "@/components/app/form-and-inputs/TreeDropdown/__internal__/utils";
import {
  TreeProvider,
  useTree,
} from "@/components/app/form-and-inputs/TreeDropdown/__internal__/tree-provider";
import { Node } from "@/components/app/form-and-inputs/TreeDropdown/types";
import TreeDropdownRoot from "../..";

 
function FocusSelectorTreeDropdown() {
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
    <>
      <TreeDropdownRoot allowSearch="all" className="" />
      <pre className="text-xs text-gray-600 mt-4">
        {JSON.stringify(selectedTree, null, 2)}
      </pre>
    </>
  );
}

/**
 * - fetch simulator
 */
function fetchChildrenHandler(node: Node): Promise<Node[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // node will have id , with that will be able to get children from DB
      //  resolve([{ name: "express" }, { name: "nestjs" }]);
      const match = findNodeInTree(initialTree, node.name);
      resolve(match?.children ?? []);
    }, 500); // delay to simulate API
  });
}

const initialTree: Node[] = [
  {
    name: "frontend",
    multi: false,
    children: [
      {
        name: "react",
        multi: false,
        children: [{ name: "useState" }, { name: "useEffect" }],
      },
      { name: "nextjs" },
    ],
  },
  {
    name: "backend",
    multi: true,
    children: [{ name: "express" }, { name: "nestjs" }],
  },
];
