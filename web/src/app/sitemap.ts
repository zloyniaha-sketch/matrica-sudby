import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${SITE.url}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE.url}/privacy/`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE.url}/offer/`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
  ];
}
