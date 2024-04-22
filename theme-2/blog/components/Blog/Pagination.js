"use client";
import config from "../../config/config.json";
import { useRef } from "react";
import Cta from "../Cta";
import Pagination from "../Pagination";
import Post from "./Post";
import Banner from "../Banner";

const { blog_folder } = config.settings;

// blog pagination
const BlogPagination = ({
  postIndex,
  posts,
  authors,
  currentPage,
  pagination,
}) => {
  const indexOfLastPost = currentPage * pagination;
  const indexOfFirstPost = indexOfLastPost - pagination;
  const totalPages = Math.ceil(posts.length / pagination);
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const { frontmatter } = postIndex;
  const { title } = frontmatter;
  const postsRef = useRef(null);

  return (
    <>
      <section className="pt-0">
        <Banner title={title} />
        <div className="container mx-auto p-3">
          <div
            className="grid md:grid-cols-2 grid-cols-1 gap-12 py-12"
            ref={postsRef}
          >
            {currentPosts.map((post, i) => (
              <div key={`key-${i}`}>
                <Post post={post} authors={authors} />
              </div>
            ))}
          </div>
          <Pagination
            section={blog_folder}
            totalPages={totalPages}
            currentPage={currentPage}
          />
        </div>
      </section>
      <Cta />
    </>
  );
};

export default BlogPagination;
