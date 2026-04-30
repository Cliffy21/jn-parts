 JN Parts - Change Summary (2026-04-23)

This file summarizes the work completed today so collaborators can review quickly before merge/deploy.

Scope Completed

1) Blog and Navigation UX
- Blog cards were improved to reduce awkward image cropping and better match the site palette.
- Header navigation was updated so `OUR BLOG` points to the blog section.
- Mobile navigation was cleaned so blog CTA is visible and usable on mobile.

 2) Contact Section Polish
- Removed icons from form input fields (cleaner form UI).
- Improved input styling consistency (spacing, borders, focus states).
- Reworked submit button styling with visible brand hover/focus/active behavior.

 3) SEO Foundation Implemented
- Added typed sitemap generation with valid routes only (`/`, `/blog`, `/blog/[slug]`).
- Added robots metadata route (`/robots.txt`) with sitemap reference.
- Added canonical handling via Next metadata.
- Added Open Graph + Twitter metadata for global, blog listing, and blog post pages.
- Added structured data:
  - `AutoPartsStore` JSON-LD on home page.
  - `BlogPosting` JSON-LD on blog post pages.

 4) Social Preview Assets (Dynamic OG Images)
- Added Next OG image routes for:
  - Site-wide preview
  - Blog listing preview
  - Per-blog-post preview (dynamic title/description from slug)

5) Favicon + PWA Icon Assets
- Generated favicon and app icon files from existing logo.
- Added `site.webmanifest`.
- Note: these files live in `public/` and require `public/` to be tracked (remove `/public/` from `.gitignore`, which you already plan to do).

---

 Files Modified (current working changes)

 Modified
- `app/layout.tsx`
- `app/page.tsx`
- `app/sitemap.ts`
- `app/blog/page.tsx`
- `app/blog/[slug]/page.tsx`
- `app/components/Products.tsx` *(pricing update in mock product data)*

 Added
- `app/robots.ts`
- `app/opengraph-image.tsx`
- `app/blog/opengraph-image.tsx`
- `app/blog/[slug]/opengraph-image.tsx`

Public assets added (once `public/` is no longer ignored)
- `public/favicon.ico`
- `public/favicon-16x16.png`
- `public/favicon-32x32.png`
- `public/apple-touch-icon.png`
- `public/android-chrome-192x192.png`
- `public/android-chrome-512x512.png`
- `public/site.webmanifest`

---

 Key Code Snippets

 Sitemap now includes real pages + dynamic blog slugs

```ts
import type { MetadataRoute } from "next";
import { blogPosts } from "./components/blogData";

const SITE_URL = "https://jncaraccessories.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    ...blogPosts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
```

 Robots metadata route

```ts
import type { MetadataRoute } from "next";

const SITE_URL = "https://jncaraccessories.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
```

 Global metadata now includes canonical + OG/Twitter image

```ts
export const metadata: Metadata = {
  metadataBase: new URL("https://jncaraccessories.com"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "JN Parts & Accessories" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
};
```

 Blog post metadata uses per-slug social image route

```ts
const ogImageUrl = `/blog/${post.slug}/opengraph-image`;

return {
  alternates: { canonical: `/blog/${post.slug}` },
  openGraph: {
    type: "article",
    url: `https://jncaraccessories.com/blog/${post.slug}`,
    images: [{ url: ogImageUrl, width: 1200, height: 630, alt: post.title }],
  },
  twitter: {
    card: "summary_large_image",
    images: [ogImageUrl],
  },
};
```

Structured data (home + blog posts)

```ts
// app/page.tsx (AutoPartsStore JSON-LD)
const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "AutoPartsStore",
  name: "JN Parts & Accessories",
  url: "https://jncaraccessories.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Kirinyaga Road",
    addressLocality: "Nairobi",
    addressCountry: "KE",
  },
};
```

```ts
// app/blog/[slug]/page.tsx (BlogPosting JSON-LD)
const blogPostingJsonLd = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: post.title,
  description: post.metaDescription,
  mainEntityOfPage: `https://jncaraccessories.com/blog/${post.slug}`,
};
```

---

Push Checklist
- [ ] Remove `/public/` from `.gitignore`
- [ ] Confirm `public/favicon.ico` is reachable locally (`/favicon.ico`)
- [ ] Run final smoke test on `/`, `/blog`, `/blog/[slug]`
- [ ] Push branch and share this changelog in PR description

