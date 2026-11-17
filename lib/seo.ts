/**
 * One place for everything that needs to know where the site lives: canonical
 * URLs, hreflang sets, the share image and the JSON-LD blocks.
 */

import type { Metadata } from "next";
import { getDict, langs, type Lang } from "@/lib/i18n";

/**
 * The canonical origin. Vercel exposes the production domain at build time;
 * NEXT_PUBLIC_SITE_URL overrides it (useful behind a custom domain), and the
 * literal is the fallback for a plain `next build` on a laptop.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  "https://21-aimag.vercel.app"
).replace(/\/+$/, "");

/** "/en/province/umnugovi" → "https://…/en/province/umnugovi" */
export function absolute(path: string) {
  return `${siteUrl}${path}`;
}

/**
 * Canonical plus the full hreflang set for one page. `x-default` points at the
 * English version, which is what a search engine should offer a visitor whose
 * language we do not publish.
 */
export function alternates(lang: Lang, path = "") {
  return {
    canonical: `/${lang}${path}`,
    languages: {
      ...Object.fromEntries(langs.map((l) => [l, `/${l}${path}`])),
      "x-default": `/en${path}`,
    },
  };
}

/** Absolute hreflang set for the sitemap, which needs full URLs. */
export function sitemapAlternates(path: string) {
  return {
    languages: {
      ...Object.fromEntries(langs.map((l) => [l, absolute(`/${l}${path}`)])),
      "x-default": absolute(`/en${path}`),
    },
  };
}

/** og:locale wants language_TERRITORY, not the bare language code. */
export const ogLocales: Record<Lang, string> = {
  en: "en_US",
  mn: "mn_MN",
  ja: "ja_JP",
  ko: "ko_KR",
  zh: "zh_CN",
  ru: "ru_RU",
};

/**
 * The default share card: the ger exterior, cropped to the 1.91:1 that
 * Facebook, X, Slack and the rest expect. Province pages override it with
 * their own photo.
 */
export const shareImage = { url: "/images/og/og-default.jpg", width: 1200, height: 630 };

type ShareImage = { url: string; width?: number; height?: number; alt?: string };

/**
 * The Open Graph and X cards for one page. Next replaces a parent's
 * `openGraph` wholesale instead of merging it, so every page spells the whole
 * block out — this keeps that in one place.
 */
export function share(
  lang: Lang,
  opts: { path?: string; title: string; description: string; images?: ShareImage[]; type?: "website" | "article" },
): Pick<Metadata, "openGraph" | "twitter"> {
  const path = opts.path ?? "";
  const images = opts.images ?? [{ ...shareImage, alt: getDict(lang).ogImageAlt }];
  return {
    openGraph: {
      type: opts.type ?? "website",
      siteName: getDict(lang).brand,
      locale: ogLocales[lang],
      alternateLocale: langs.filter((l) => l !== lang).map((l) => ogLocales[l]),
      url: `/${lang}${path}`,
      title: opts.title,
      description: opts.description,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: opts.title,
      description: opts.description,
      images,
    },
  };
}
