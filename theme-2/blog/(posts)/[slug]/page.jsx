import config from "../../config/config.json";

import parseMDX from "../../utils/mdxParser";
import PostSingle from "../../components/Post/PostSingle";
import { getSinglePage } from "../../utils/contentParser";
import { sortByDate } from "../../utils/sortFunctions";

const { blog_folder } = config.settings;

export const generateStaticParams = async () => {
  const posts = getSinglePage(`content/${blog_folder}`);

  return posts.map((post) => ({
    slug: post.slug,
  }));
};

// post single layout
const Article = async ({ params }) => {
  const { slug } = params;
  const posts = getSinglePage(`content/${blog_folder}`);
  const post = posts.filter((p) => p.slug == slug);

  const mdxContent = await parseMDX(post[0].content);

  const recentPosts = sortByDate(posts).filter((post) => post.slug !== slug);

  const { frontmatter, content } = post[0];

  const authors = {};
  return (
    <PostSingle
      frontmatter={frontmatter}
      content={content}
      mdxContent={mdxContent}
      authors={authors}
      slug={slug}
      recentPosts={recentPosts}
    />
  );
};

// get post single slug
export default Article;
