"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import config from "../../config/config.json";
import ImageFallback from "../ImageFallback";
import readingTime from "../../utils/readingTime";
import dateFormat from "../../utils/dateFormat";

const Post = ({ post, i }) => {
  const { summary_length } = config.settings;

  const pathname = usePathname();

  const url_prefix = pathname.split("/")[1];
  return (
    <div className="overflow-hidden rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,.05)] h-full">
      {post.frontmatter.image && (
        <Link href={`${url_prefix}/${post.slug}`}>
          <ImageFallback
            className="h-[335px] w-full object-cover"
            src={post?.frontmatter?.image}
            alt={post?.frontmatter?.title}
            width={570}
            height={335}
          />
        </Link>
      )}
      <div className="p-8">
        <h2 className="h4">
          <Link
            href={`${url_prefix}/${post.slug}`}
            className="block hover:text-primary hover:underline"
          >
            {post.frontmatter.title}
          </Link>
        </h2>
        <p className="mt-4">
          {post.content.slice(0, Number(summary_length))}...
        </p>
        <div className="mt-6 flex items-center">
          <div className="overflow-hidden rounded-full border-2 border-white shadow-[0_0_0_2px] shadow-primary">
            <ImageFallback
              src={post?.frontmatter?.author?.avatar ?? "/avatar.jpg"}
              width={50}
              height={50}
              alt="author"
            />
          </div>
          <div className="pl-5">
            <p className="font-medium text-dark">
              {post.frontmatter.author.name}
            </p>
            <p>
              {dateFormat(post.frontmatter.date)} - {readingTime(post.content)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
