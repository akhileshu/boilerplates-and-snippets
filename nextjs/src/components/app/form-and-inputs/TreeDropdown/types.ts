import { AllowSearchMode } from "@/components/app/form-and-inputs/TreeDropdown/__internal__/tree-provider";

export type Node = {
  name: string;
  multi?: boolean;
  isOpen?: boolean;
  children?: Node[];
};
export type onTraceChange = (trace: Node[], isOpen: boolean) => void;

export type DropdownProps = {
  node: Node;
  trace: Node[];
  onTraceChange: (trace: Node[], isOpen: boolean) => void;
  allowSearch: AllowSearchMode;
};
