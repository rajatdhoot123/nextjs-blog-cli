import config from "../../config/config.json";
// import { DiscussionEmbed } from "disqus-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";
import { markdownify } from "../../utils/textConverter";
import ImageFallback from "../ImageFallback";
import Post from "../Blog/Post";
import Cta from "../Cta";
import dateFormat from "../../utils/dateFormat";
import readingTime from "../../utils/readingTime";
import shortcodes from "../shortcodes/all";

const PostSingle = ({ frontmatter, content, mdxContent, recentPosts }) => {
  let { description, title, date, image, author } = frontmatter;
  description = description ? description : content.slice(0, 120);

  const { disqus } = config;

  return (
    <>
      <section className="py-12 lg:px-44 p-3">
        <div className="container mx-auto">
          <article>
            <div className="row justify-center">
              <div className="">
                {image && (
                  <Image
                    src={image}
                    height="700"
                    width="1120"
                    alt={title}
                    priority={true}
                    className="fade w-full rounded-lg max-h-96 object-cover object-center"
                  />
                )}
              </div>
              <div className="lg:col-8">
                {markdownify(title, "h1", "h2 mt-6")}
                <div className="mt-6 flex items-center">
                  <div className="overflow-hidden rounded-full border-2 border-white shadow-[0_0_0_2px] shadow-primary">
                    <ImageFallback
                      fallback={"/avatar.jpg"}
                      src={author?.avatar ?? "/avatar.jpg"}
                      width={50}
                      height={50}
                      alt="author"
                    />
                  </div>
                  <div className="pl-5">
                    <p className="font-medium text-dark">{author.name}</p>
                    <p>
                      {dateFormat(date)} - {readingTime(content)}
                    </p>
                  </div>
                </div>
                <div className="content mb-16 mt-16 text-left">
                  <MDXRemote source={content} components={shortcodes} />
                </div>
              </div>
              {/* {disqus.enable && (
                <div className="fade row justify-center">
                  <div className="lg:col-8">
                    <DiscussionEmbed
                      shortname={disqus.shortname}
                      config={disqus.settings}
                    />
                  </div>
                </div>
              )} */}
            </div>
          </article>

          <div className="section mt-16">
            <h2 className="section-title text-center">Recent Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {recentPosts.slice(0, 2).map((post, index) => (
                <div key={"post-" + index} className="animate mt-16 lg:col-5">
                  <Post post={post} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Cta />
    </>
  );
};

export default PostSingle;
