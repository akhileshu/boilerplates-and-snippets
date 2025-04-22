import { useEffect, useState } from "react";
import { parseMDX, MDXContent } from "./mdx";
import { MDXRemote } from "next-mdx-remote";
import { components } from "./components";

export function useLiveMDX(input: string) {
  const [compiled, setCompiled] = useState<MDXContent | null>(null);

  useEffect(() => {
    const update = async () => {
      const result = await parseMDX(input);
      setCompiled(result);
    };
    update();
  }, [input]);

  const RenderedMDX = compiled
    ? () => <MDXRemote {...compiled} components={components} />
    : () => null;

  return { RenderedMDX };
}
