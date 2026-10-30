import type { MetadataRoute } from "next";
import { getAllSlugs } from "@/lib/products";

const BASE_URL = "https://jazz.example.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllSlugs();
  const entries: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/products`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...slugs.map((slug) => ({
      url: `${BASE_URL}/products/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
  return entries;
}