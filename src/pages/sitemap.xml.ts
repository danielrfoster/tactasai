import type { APIRoute } from "astro";
import { blogPosts } from "../lib/blog";
import { promptLibrary } from "../lib/promptLibrary";
import { getSiteUrl } from "../lib/site";

export const GET = (() => {
  const siteUrl = getSiteUrl();
  const lastModified = new Date().toISOString();
  const entries = [
    { path: "/", changefreq: "weekly", priority: "1.0" },
    { path: "/contact", changefreq: "monthly", priority: "0.7" },
    { path: "/about", changefreq: "monthly", priority: "0.8" },
    { path: "/pricing", changefreq: "monthly", priority: "0.85" },
    { path: "/ai-agent-prompt-library", changefreq: "weekly", priority: "0.86" },
    { path: "/blog", changefreq: "weekly", priority: "0.82" },
    ...blogPosts.map((post) => ({
      path: `/blog/${post.slug}`,
      changefreq: "monthly",
      priority: post.slug === "glean-vs-guru-vs-tactasai" ? "0.84" : "0.78",
    })),
    { path: "/industries", changefreq: "weekly", priority: "0.75" },
    { path: "/industries/ecommerce", changefreq: "weekly", priority: "0.85" },
    { path: "/industries/healthcare", changefreq: "weekly", priority: "0.85" },
    { path: "/industries/professional-services", changefreq: "weekly", priority: "0.85" },
    { path: "/services/ai-workflow-automation", changefreq: "weekly", priority: "0.9" },
    { path: "/services/ai-knowledge-base", changefreq: "weekly", priority: "0.9" },
    { path: "/use-cases", changefreq: "weekly", priority: "0.85" },
    { path: "/use-cases/ai-customer-support-automation", changefreq: "weekly", priority: "0.82" },
    { path: "/use-cases/ai-back-office-automation", changefreq: "weekly", priority: "0.82" },
    { path: "/use-cases/ai-crm-workflow-automation", changefreq: "weekly", priority: "0.82" },
    { path: "/privacy", changefreq: "yearly", priority: "0.4" },
    { path: "/terms", changefreq: "yearly", priority: "0.4" },
    { path: "/refund-policy", changefreq: "yearly", priority: "0.4" },
    ...promptLibrary.map((prompt) => ({
      path: `/ai-agent-prompt-library/${prompt.slug}`,
      changefreq: "monthly",
      priority: "0.72",
    })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (entry) => `  <url>
    <loc>${siteUrl}${entry.path}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}) satisfies APIRoute;
