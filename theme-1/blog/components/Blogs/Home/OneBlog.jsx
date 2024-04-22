import Link from "next/link";
import Tag from "@/app/(blog)/blog/components/Blogs/Elements/Tag";

const OneBlogFromHome = ({ blog }) => {
  return (
    <article className=" col-span-2  sxl:col-span-1 row-span-2 relative ">
      <div className="group inline-block overflow-hidden rounded-xl w-full">
        <Link className="mt-6" href={`/blog/${blog.slug}`}>
          <div className="absolute top-0 left-0 bottom-0 right-0 h-full bg-gradient-to-b from-transparent from-0% to-dark/90 rounded-xl z-10"></div>
        </Link>
        <img
          alt={blog.title}
          loading="lazy"
          decoding="async"
          src={blog.image}
          className="w-full h-full object-center object-cover rounded-xl group-hover:scale-105 transition-all ease duration-300 rounded-xl"
        />
        <div className="w-full absolute bottom-6 md:bottom-0 p-4 xs:p-6 sm:p-10 z-20">
          {blog?.tags?.[0] && (
            <Tag
              link={`/categories/${blog?.tags?.[0]}`}
              name={blog?.tags?.[0]}
            />
          )}
          <Link className="mt-6" href={`/blog/${blog.slug}`}>
            <h2 className="font-bold capitalize text-sm xs:text-base sm:text-xl md:text-2xl text-light mt-2 sm:mt-4">
              <span className="bg-gradient-to-r from-accent to-accent bg-[length:0px_6px] dark:from-accentDark/50 dark:to-accentDark/50 group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 ">
                {blog.title}
              </span>
            </h2>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default OneBlogFromHome;
