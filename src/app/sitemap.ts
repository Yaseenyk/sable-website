import type { MetadataRoute } from "next";
import { ROUTES } from "@/lib/routes";
import { canonicalUrl } from "@/lib/seo";

export const dynamic = "force-static";

// The day the pages were last changed by hand. Not the build time: a rebuild must not mark every page as changed.
const UPDATED = new Date("2026-11-19");

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((r) => ({ url: canonicalUrl(r.path), lastModified: UPDATED, changeFrequency: "monthly", priority: r.priority }));
}
