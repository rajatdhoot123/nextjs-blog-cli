import parseMDX from "@/app/(blog)/blog/components/Blogs/lib/blogs";
import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { slug } from "github-slugger";

// get all single pages, ex: blog/post.md
export const getSinglePage = (folder) => {
  const filesPath = fs.readdirSync(folder);

  const sanitizeFiles = filesPath.filter((file) => file.includes(".md"));
  const filterSingleFiles = sanitizeFiles.filter((file) =>
    file.match(/^(?!_)/)
  );

  const singlePages = filterSingleFiles.map((filename) => {
    const slug = filename.replace(".md", "");

    const pageData = fs.readFileSync(
      path.join(process.cwd(), folder, filename),
      "utf-8"
    );
    const pageDataParsed = matter(pageData);
    const frontmatterString = JSON.stringify(pageDataParsed.data);
    const frontmatter = JSON.parse(frontmatterString);
    const content = pageDataParsed.content;

    const url = frontmatter.url ? frontmatter.url.replace("/", "") : slug;

    return { ...frontmatter, slug: url, content: content };
  });

  const publishedPages = singlePages.filter(
    (page) => !page.draft && page.layout !== "404" && page
  );
  const filterByDate = publishedPages.filter(
    (page) => new Date(page.publishedAt || new Date()) <= new Date()
  );

  return filterByDate;
};

export async function getHeadings(source) {
  // Get each line individually, and filter out anything that
  // isn't a heading.
  const headingLines = source.split("\n").filter((line) => {
    return line.match(/^###*\s/);
  });

  // Transform the string '## Some text' into an object
  // with the shape '{ text: 'Some text', level: 2 }'
  return headingLines.map((raw) => {
    const heading = raw.replace(/^###*\s/, "");
    const text = slug(raw.replace(/^###*\s/, ""));

    // I only care about h2 and h3.
    // If I wanted more levels, I'd need to count the
    // number of #s.
    const level = raw.slice(0, 3) === "###" ? "three" : "two";

    return { text, level, heading };
  });
}

export const getBlogs = async ({ path: blog_path }) => {
  const source = fs.readFileSync(path.join(process.cwd(), blog_path), "utf-8");

  const { content, data } = matter(source);
  const [mdxContent, headings] = await Promise.all([
    parseMDX(content),
    getHeadings(content),
  ]);

  return {
    headings,
    content,
    blog: data,
    mdxContent,
  };
};
