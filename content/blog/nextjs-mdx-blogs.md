---
title: Blog setup for multiple projects using Next.js
image: /blog/d.jpeg
author:
  name: Rajat Dhoot
  avatar: /blog/rajatdhoot.com/author/rajatdhoot.jpeg
draft: false
publishedAt: "2024-04-17"
updatedAt: "2024-04-17"
# tags:
#   - css
#   - web development
---

## Introduction

I am working on multiple side projects like [Launchify](https://launchify.club),[VA360](https://va360.club) and many more, and I want to set up blogs for all of them. Next.js static generation with MDX support is a cool way to set up a blog with minimal effort and great performance, so I decided to dig into it.

<img src="/nextjs-mdx-blogs/blog_setup.png" alt="Image alt" />

## The Challenge

For multiple projects, I have multiple repositories, but for the blog, I want a single repository to manage all projects. There are two ways to route to the blog:

1. Using a subdomain like `blog.launchify.club` or `blog.va360.club`.

2. Using a path like `launchify.club/blog` or `va360.club/blog`.

To set up a subdomain is straightforward; you can directly copy the code from the [tldraw/make-real](https://github.com/tldraw/make-real) repo. However, I want to set up the blog using the `/blog` path to benefit from all SEO in a single domain.

## The Approach

My approach is to use Next.js rewrites for my main project to point to blogs project [Launchify](https://launchify.club)

```js

async rewrites() {
	return [
		{
			source: "/blog",
			destination: "https://blogs-theta-six.vercel.app/blog/blog.launchify.club",
		},
		{
		source: "/blog/:path*",
		destination: "https://blogs-theta-six.vercel.app/blog/:path*",
		},
	];
},

```

You are now ready to rewrite all the paths from `/blog` and after it of your main project to your blog project.

## The Real Challenge

The real challenge is to handle all rewrites in the blog project, where requests can come from multiple projects like [Launchify](https://launchify.club)[VA360](https://va360.club) and you need to handle them to their respective destinations to serve blogs to the user.

First, in the blog project, we need to declare the base path. Without the base path, your assets will serve from the root `/`, which will conflict with your main app, so it will not work. Here's how you can declare the base path in `next.config.js`:

```js
const nextConfig = {
  basePath: "/blog",
};
```

Now all the assets will be served from `/blog`, and it will not conflict with our main project.

After this, we need to handle all the requests in the blog project to route them to their respective blogs post. For this, we can use middleware, where we can write logic to handle all of this.

Our logic depends Non identifying the request origin source. I tried a lot of things but was still unable to find how we can do this without Cloudflare support. In Cloudflare, we can add headers to all the requests. For example, I added a header with the key `x-product` and the value `launchify` to identify all the requests originating from Launchify.

<img src="/nextjs-mdx-blogs/cloudfare.png" alt="Image alt" />

## The Solution

Now we can identify all the requests originating from [Launchify](https://launchify.club) through this header `x-product`. Write the logic in the middleware, and we are done.

```js
export function middleware(req) {
  const url = req.nextUrl;

  const host = req.headers.get("host").toLowerCase();

  const header = headers();

  const rewrittenUrl = new URL(url.toString());

  const isLaunchify = header.get("x-product") === "launchify";

  if (isLaunchify) {
    rewrittenUrl.pathname = `/blog/blog.launchify.club${url.pathname}`;
  } else {
    rewrittenUrl.pathname = `${rewrittenUrl.pathname}`;
  }
  return NextResponse.rewrite(rewrittenUrl);
}
```

What I am doing here is identifying all the requests from [Launchify](https://launchify.club) and rewriting them to the desired path.

<img src="/nextjs-mdx-blogs/code_path.png" alt="Code Path" />

Here's the breakdown:

- `/blog` at the start because it's our base path.
- `blog.launchify.club` is the route folder.
- `url.pathname` provides the path the user is requesting.

In this way, you can set up a blog for all your projects very easily, and it is very performant, low-cost (mostly free), and easy to manage.
