---
title: Creating unlimited free domain emails
image: /blog/b.jpg
author:
  name: Rajat Dhoot
  avatar: /blog/author/rajatdhoot.jpeg
draft: false
publishedAt: "2024-04-16"
updatedAt: "2024-04-16"
# tags:
#   - css
#   - web development
---

## In this blog, we will discuss how to create unlimited free domain emails (e.g. hello@domainname).

### Why we need domain emails

1. Custom email addresses with your domain provide a professional appearance and brand recognition.
2. You have complete control, ownership, and scalability with unlimited email addresses.
3. Features like email forwarding, aliases, and robust spam filtering enhance organization and productivity.
4. Customization options allow branding and personalization of email appearance.
5. Custom email addresses enhance professionalism, credibility, and establish a professional online presence.

To create custom domain emails, one of the easiest options is to use a paid service like [Google Workspace](https://workspace.google.com) or [Microsoft 365](https://www.office.com). However, these services can be expensive, especially if you have created many apps and are yet to find paying users. For such use cases, the Cloudflare + Gmail combination works perfectly without any cost involved. In this blog, we will discuss how to create domain emails. In this blog, let create (hello@rajatdhoot.com) for my website, https://www.rajatdhoot.com.

### Our Requirements

- Custom email (hello@rajatdhoot.com)
- Free to send and receive messages
- Easy to use
- Can create unlimited custom emails

### Tools Required

- Gmail
- Cloudflare

First, we need a regular Gmail account. For our example, I am using my primary gmail account. If you don't have one, you can create a new account at https://www.gmail.com.

Next, we need a DNS management tool. We are using Cloudflare for this purpose. Set up your domain in Cloudflare.

Once you have the above tools ready, we can divide the process into two parts: receiving mail and sending mail.

### Receiving Mail

Will be using cloudfare email routing:

1. Log in to Cloudflare.
2. Set up your website.
3. Navigate to the Dashboard.
   Choose and click on the desired website. For me it's "rajatdhoot.com", as I want to create a custom email like "hello@rajatdhoot com".
4. Navigate to Email Routing for the selected website.
5. Click "Get started". You may be able to create your own address to receive emails and take action.
6. By default, email routing is disabled, so you need to enable it. Click the link to navigate to the Email Routing page.
7. Add the DNS records prompted by Cloudflare.
8. Now, you are ready to receive messages on your custom emails.

### Sending Mail

Sending mail requires a few more steps, which we will cover in [the next part](/blog/send-free-mail-domain-emails) of this blog.
