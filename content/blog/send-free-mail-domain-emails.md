---
title: Send emails from custom domain email free
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

# Using Gmail SMTP with Cloudflare Email Routing: Step-by-Step Guide

Learn how to send emails through Gmail SMTP with Cloudflare Email Routing in this comprehensive guide.

## Step 1: Enable 2-Factor Authentication

To proceed with this method, ensure that you have enabled [two-factor authentication](https://safety.google/authentication/) for your Google account. If you haven't done so already, you can follow the link to set it up → [Enable 2FA in your Google account](https://myaccount.google.com/signinoptions/two-step-verification).

## Step 2: Create an App Password for Mail

In your Google account settings, create an App Password specifically for Mail. Follow this link to create the App Password → [Create an App Password](https://security.google.com/settings/security/apppasswords) (You will need to copy and use this password later along with your Gmail address in the Google SMTP server settings in the "Add another email address" form).

When creating the App Password, select "Mail" as the app and choose your computer as the device. Click on "Generate" and make sure to copy the generated password. You will need it later in the process.

## Step 3: Add Your Cloudflare-Routed Email Address to Gmail

Open Gmail and navigate to Settings → Accounts → **Send mail as**. In this section, click on "Add another email address" and fill out the form with your name and your Cloudflare-routed email address. Untick the "Treat as an alias" option and click on "Next Step."

## Step 4: Fill Out the Next Form

**SMTP Server:** `smtp.gmail.com`  
**Port:** `587`  
**Username:** Your Gmail address (including `@gmail.com`)  
**Password:** The App Password you generated in Step 2  
Leave **TLS enabled**  
Click on **Add Account**

You will receive an email from Gmail asking you to confirm ownership by providing a code. Enter the code in the dialog box or click the link provided in the confirmation email to complete the process.

## Step 5: Setup SPF Records & DMARC Policy in Cloudflare DNS

### SPF Record

- **Type:** `TXT`
- **Name:** `@`
- **TTL:** `auto`
- **Content:**

```
v=spf1 include:_spf.mx.cloudflare.net include:_spf.google.com ~all
```

### DMARC Policy

If you wish to set up a DMARC Policy or already have one, ensure that the policy's `p` parameter is set to `none`. Otherwise, your outbound emails may fail to authenticate and get blocked.

You can use Cloudflare's DMARC Management to set up a policy for monitoring outbound emails.

Example TXT Record:

```
v=DMARC1; p=none; rua=mailto:<your-email-to-report>
```
