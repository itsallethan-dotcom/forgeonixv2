import type { MetadataRoute } from "next";
import { SITE } from "@/content/seo";
import { CASE_STUDIES } from "@/content/shipped";

/**
 * Sitemap — every public, indexable route on the canonical www host. There are
 * no private/admin routes in this project, so nothing is excluded.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/solutions", priority: 0.9, changeFrequency: "monthly" },
    { path: "/work", priority: 0.8, changeFrequency: "monthly" },
    { path: "/pricing", priority: 0.9, changeFrequency: "monthly" },
    { path: "/support", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
  ];

  const caseRoutes = CASE_STUDIES.map((c) => ({
    path: `/work/${c.slug}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  }));

  return [...staticRoutes, ...caseRoutes].map((r) => ({
    url: `${SITE.url}${r.path === "/" ? "/" : r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
