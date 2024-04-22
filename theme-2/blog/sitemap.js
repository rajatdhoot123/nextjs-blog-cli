import config from "./config/config.json";
import { getSinglePage } from "./utils/contentParser";

const { blog_folder } = config.settings;
const { site } = config;

const BASE_URL = site.absoule_base_url;
export default async function sitemap() {
  const posts = getSinglePage(`content/${blog_folder}`);

  return [
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
    },
    ...posts.map(({ slug, frontmatter }) => ({
      url: `${BASE_URL}/blog/${slug}`,
      lastModified: frontmatter.date,
    })),
  ];
}
