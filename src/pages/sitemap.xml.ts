import type { APIRoute } from "astro";
import { blogPosts } from "../lib/blog";
import { industryLandingPages } from "../lib/industryLandingPages";
import { promptLibrary } from "../lib/promptLibrary";
import { getSiteUrl } from "../lib/site";

const canonicalIndustryLandingPages = industryLandingPages.filter(
  (industry) => !["ai-assistant-for-ecommerce", "ai-assistant-for-healthcare-clinics"].includes(industry.slug),
);

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
    ...canonicalIndustryLandingPages.map((industry) => ({
      path: `/industries/${industry.slug}`,
      changefreq: "weekly",
      priority: industry.slug === "ai-assistant-for-vps-hosting-providers" ? "0.82" : "0.84",
    })),
    { path: "/product", changefreq: "weekly", priority: "0.92" },
    { path: "/product/data-readiness", changefreq: "weekly", priority: "0.9" },
    { path: "/product/agent-system-design", changefreq: "weekly", priority: "0.9" },
    { path: "/product/ai-workflow-automation", changefreq: "weekly", priority: "0.9" },
    { path: "/product/assistant", changefreq: "weekly", priority: "0.78" },
    { path: "/product/deep-research", changefreq: "weekly", priority: "0.9" },
    { path: "/product/ai-knowledge-base", changefreq: "weekly", priority: "0.9" },
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
