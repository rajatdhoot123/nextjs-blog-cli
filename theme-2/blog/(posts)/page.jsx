import config from "../config/config.json";
import { getListPage, getSinglePage } from "../utils/contentParser";
import BlogPagination from "../components/Blog/Pagination";
const { blog_folder } = config.settings;

const Page = async ({ searchParams: { page } }) => {
  const currentPage = parseInt(page || 1);
  const { pagination } = config.settings;
  const posts = getSinglePage(`content/${blog_folder}`);
  const postIndex = await getListPage(`content/_index.md`);

  return (
    <BlogPagination
      pagination={pagination}
      posts={posts.sort((a, b) =>
        new Date(a.frontmatter.date) < new Date(b.frontmatter.date) ? 1 : -1
      )}
      currentPage={currentPage}
      postIndex={postIndex}
    />
  );
};

export default Page;
