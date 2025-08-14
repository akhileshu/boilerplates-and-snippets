"use client";

import TreeDropdownRoot from "@/components/app/form-and-inputs/TreeDropdown";
import { Node } from "@/components/app/form-and-inputs/TreeDropdown/types";
import Label from "@/components/app/label";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { focusList } from "../../../../../data/focus-list";

export function UserFocusSelectorTreeDropdown({
  className,
}: {
  className?: string;
}) {
  return (
    <TreeDropdownRoot
      allowSearch="all"
      className=""
      title={
        <Label
          icon={<Check className="h-5 w-5 text-blue-600" />}
          label="Select Your Focus Area"
          className={cn("", className)}
        />
      }
    />
  );
}

/**
 * - fetch simulator
 */
// function fetchChildrenHandler(node: Node): Promise<Node[]> {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       // node will have id , with that will be able to get children from DB
//       //  resolve([{ name: "express" }, { name: "nestjs" }]);
//       const match = findNodeInTree(initialTree, node.name);
//       resolve(match?.children ?? []);
//     }, 500); // delay to simulate API
//   });
// }

// const initialTree: Node[] = [
//   {
//     name: "frontend",
//     multi: false,
//     children: [
//       {
//         name: "react",
//         multi: false,
//         children: [{ name: "useState" }, { name: "useEffect" }],
//       },
//       { name: "nextjs" },
//     ],
//   },
//   {
//     name: "backend",
//     multi: true,
//     children: [{ name: "express" }, { name: "nestjs" }],
//   },
// ];

/**
 * todo - plan to keep focus list as a server resource and access it from server only
 * ``` tsx
 *  // app/api/internal/focus-list/route.ts
import { NextResponse } from "next/server";
import { focusList } from "@/lib/focus/focus-list";

export function GET() {
  return NextResponse.json(focusList);
}
 ```
 */
export const UserFocusinitialTree: Node[] = [
  {
    name: "Area of Focus",
    multi: false, // only one focus area allowed at a time
    children: focusList.map((area) => ({
      name: area.id,
      multi: true,
      children: [
        {
          name: "Skills",
          multi: true,
          children: area.skills.map((skill) => ({
            name: skill.id,
          })),
        },
        {
          name: "Interests",
          multi: true,
          children: area.interests.map((interest) => ({
            name: interest.id,
          })),
        },
      ],
    })),
  },
];
