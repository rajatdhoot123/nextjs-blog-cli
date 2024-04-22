import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Pagination = ({ section, currentPage, totalPages }) => {
  const indexPageLink = currentPage === 2;
  const hasPrevPage = currentPage > 1;
  const hasNextPage = totalPages > currentPage;
  const pathname = usePathname();
  let pageList = [];
  for (let i = 1; i <= totalPages; i++) {
    pageList.push(i);
  }

  return (
    <>
      {totalPages > 1 && (
        <nav
          className="mb-4 flex justify-center space-x-1"
          aria-label="Pagination"
        >
          {/* previous */}
          {hasPrevPage ? (
            <Link
              href={`${pathname}/?page=${currentPage - 1}`}
              className="inline-flex h-11 w-11 items-center justify-center rounded px-2 py-2 text-primary hover:bg-primary hover:text-body"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                version="1.1"
                viewBox="0 0 17 17"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g></g>
                <path d="M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z"></path>
              </svg>
            </Link>
          ) : (
            <span
              className={`inline-flex h-11 w-11 items-center justify-center rounded px-2 py-2 text-primary hover:bg-primary hover:text-body`}
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                version="1.1"
                viewBox="0 0 17 17"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g></g>
                <path d="M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z"></path>
              </svg>
            </span>
          )}

          {/* page index */}
          {pageList.map((pagination, i) => (
            <React.Fragment key={`page-${i}`}>
              {pagination === currentPage ? (
                <span
                  aria-current="page"
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-md bg-primary px-4 py-2 font-medium text-white`}
                >
                  {pagination}
                </span>
              ) : (
                <Link
                  href={`${pathname}/?page=${pagination}`}
                  aria-current="page"
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-md px-4 py-2 font-medium text-primary hover:bg-primary hover:text-body`}
                >
                  {pagination}
                </Link>
              )}
            </React.Fragment>
          ))}

          {/* next page */}
          {hasNextPage ? (
            <Link
              href={`${pathname}/?page=${currentPage + 1}`}
              className="inline-flex h-11 w-11 items-center justify-center rounded px-2 py-2 text-primary hover:bg-primary hover:text-body"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                version="1.1"
                viewBox="0 0 17 17"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g></g>
                <path d="M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z"></path>
              </svg>
            </Link>
          ) : (
            <span
              className={`inline-flex h-11 w-11 items-center justify-center rounded px-2 py-2 text-primary hover:bg-primary hover:text-body`}
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                version="1.1"
                viewBox="0 0 17 17"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g></g>
                <path d="M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z"></path>
              </svg>
            </span>
          )}
        </nav>
      )}
    </>
  );
};

export default Pagination;
