import { format } from "date-fns";
import Link from "next/link";

const TwoBlogfromHome = ({ blog }) => {
  return (
    <article className="col-span-2 sm:col-span-1 row-span-1 relative">
      <div className="group grid grid-cols-12 gap-4 items-center text-dark dark:text-light">
        <Link
          className=" col-span-12  lg:col-span-4 h-full rounded-xl overflow-hidden"
          href={`/blog/${blog.slug}`}
        >
          <img
            alt={blog.title}
            loading="lazy"
            decoding="async"
            data-nimg="1"
            className="rounded-xl aspect-square w-full h-full object-cover object-center group-hover:scale-105 transition-all ease duration-300"
            src={blog.image}
          />
        </Link>
        <div className="col-span-12  lg:col-span-8 w-full">
          <span className="inline-block w-full uppercase text-accent dark:text-accentDark font-semibold text-xs sm:text-sm">
            {blog?.tags?.[0]}
          </span>
          <Link className="inline-block my-1" href={`/blog/${blog.slug}`}>
            <h2 className="font-semibold capitalize text-base sm:text-lg">
              <span className="bg-gradient-to-r from-accent/50 dark:from-accentDark/50 to-accent/50 dark:to-accentDark/50 bg-[length:0px_6px] group-hover:bg-[length:100%_6px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 ">
                {blog.title}
              </span>
            </h2>
          </Link>
          <span className="inline-block w-full capitalize text-gray dark:text-light/50 font-semibold  text-xs sm:text-base">
            {format(new Date(blog.publishedAt), "MMMM dd, yyyy")}
          </span>
        </div>
      </div>
    </article>
  );
};

export default TwoBlogfromHome;
