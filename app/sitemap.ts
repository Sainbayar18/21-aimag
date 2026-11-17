import type { MetadataRoute } from "next";
import { slugs } from "@/lib/aimags";
import { langs } from "@/lib/i18n";
import { absolute, sitemapAlternates } from "@/lib/seo";

/** Every page except the province pages, which are added from the data. */
const pages = ["", "/destinations", "/itineraries", "/culture", "/food", "/practical", "/about"];

/**
 * All 162 pages, each listed once per language with the other five as
 * hreflang alternates, so a search engine can serve a visitor the version in
 * their own language.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...pages, ...slugs.map((slug) => `/province/${slug}`)];
  return paths.flatMap((path) =>
    langs.map((lang) => ({
      url: absolute(`/${lang}${path}`),
      alternates: sitemapAlternates(path),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : path.startsWith("/province/") ? 0.7 : 0.8,
    })),
  );
}
