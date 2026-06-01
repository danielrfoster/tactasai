import type { APIRoute } from "astro";
import { getSiteUrl } from "../lib/site";

export const GET = (() => {
  const siteUrl = getSiteUrl();
  const body = [`User-agent: *`, `Allow: /`, `Sitemap: ${siteUrl}/sitemap.xml`].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}) satisfies APIRoute;
