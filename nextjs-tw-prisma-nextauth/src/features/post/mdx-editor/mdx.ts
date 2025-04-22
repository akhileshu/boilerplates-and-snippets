import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";

export async function parseMDX(source: string) {
  return await serialize(source, {
    mdxOptions: {
      remarkPlugins: [remarkGfm, remarkFrontmatter],
    },
  });
}

export type MDXContent = MDXRemoteSerializeResult;
