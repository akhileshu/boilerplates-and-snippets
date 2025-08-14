import { useMemo, useState } from "react";

export function useChildSearch<T extends { name: string }>(children?: T[]) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredChildren = useMemo(() => {
    if (!children) return [];

    return children.filter((child) =>
      child.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, children]);

  return {
    searchTerm,
    setSearchTerm,
    filteredChildren,
  };
}
