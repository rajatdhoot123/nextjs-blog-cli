import BlogLayoutThree from "@/app/(blog)/blog/components/Blogs/Home/BlogLayoutThree";
import HomeCoverSection from "@/app/(blog)/blog/components/Blogs/Home/HomeCover";
import OneBlogFromHome from "@/app/(blog)/blog/components/Blogs/Home/OneBlog";
import TwoBlogfromHome from "@/app/(blog)/blog/components/Blogs/Home/TwoBlog";
import { getSinglePage } from "@/app/(blog)/blog/components/Blogs/utils/contentParser";
import { sortBlogs } from "@/app/(blog)/blog/components/Blogs/utils/helper";
import Link from "next/link";

const Blogs = async () => {
  const all_post = await getSinglePage("content/blog");

  const [cover_blog, ...next_post] = sortBlogs(all_post);

  const [feature_1, feature_2, feature_3, ...recent] = next_post;
  return (
    <div>
      <div className="w-full sm:px-10 p-5  flex flex-col items-center justify-center space-y-12">
        <HomeCoverSection blog={cover_blog} />
        <div className="w-full">
          <h2 className="w-full inline-block font-bold capitalize text-2xl md:text-4xl text-dark dark:text-light">
            Feature Post
          </h2>
        </div>
        <section className=" grid grid-cols-2 grid-rows-2 gap-6 grid-auto-rows">
          <OneBlogFromHome blog={feature_1} />
          {feature_2 && <TwoBlogfromHome blog={feature_2} />}
          {feature_3 && <TwoBlogfromHome blog={feature_3} />}
        </section>
        {Boolean(recent.length) && (
          <section className="w-full flex flex-col items-center justify-center">
            <div className="w-full flex  justify-between">
              <div className="w-full">
                <h2 className="w-fit inline-block font-bold capitalize text-2xl md:text-4xl text-dark dark:text-light">
                  Recent Post
                </h2>
              </div>
              {Boolean(recent.length) > 2 && (
                <Link
                  href="/categories/all"
                  className="inline-block font-medium text-accent dark:text-accentDark underline underline-offset-2      text-base md:text-lg"
                >
                  view all
                </Link>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-16">
              {recent.map((blog, index) => {
                return (
                  <article key={index} className="col-span-1 row-span-1">
                    <BlogLayoutThree blog={blog} />
                  </article>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Blogs;
