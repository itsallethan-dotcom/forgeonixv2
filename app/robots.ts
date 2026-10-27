import type { MetadataRoute } from "next";
import { SITE } from "@/content/seo";

/**
 * robots.txt — allow normal public crawling. No private/admin routes exist in
 * this project, so nothing is disallowed. Points at the canonical sitemap and
 * declares the canonical host.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
