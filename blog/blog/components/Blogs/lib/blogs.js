import { serialize } from "next-mdx-remote/serialize";
import rehypeSlug from "rehype-slug";
import remarkParse from "remark-parse";
import rehypeStringify from "rehype-stringify";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeHighlight from "rehype-highlight";
// mdx content parser

export const mdx_options = {
  mdxOptions: {
    format: "mdx",
    remarkPlugins: [remarkParse],
    rehypePlugins: [
      rehypeStringify,
      rehypePrettyCode,
      rehypeHighlight,
      rehypeSlug,
    ],
  },
};
const parseMDX = async (content) => {
  return await serialize(content, mdx_options);
};

export default parseMDX;
