import { NextResponse, type NextRequest } from "next/server";

const supported = ["en", "mn", "ja", "ko", "zh", "ru"];

/** Pick the visitor's preferred language from Accept-Language (falls back to English). */
function preferredLang(header: string | null): string {
  if (!header) return "en";
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { base: tag.toLowerCase().split("-")[0], q: q ? Number(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  return ranked.find((r) => supported.includes(r.base))?.base ?? "en";
}

/**
 * Every page lives under a language: /en, /ja/culture and so on. A visitor who
 * arrives without one — the bare root, or a link that lost its prefix — is sent
 * to the version in their own language, so that an address like
 * /province/umnugovi still lands somewhere instead of on a 404.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (supported.includes(pathname.split("/")[1])) return NextResponse.next();
  // a path with a dot is a file — a photo, an icon, the sitemap — not a page
  if (pathname.includes(".")) return NextResponse.next();

  const url = req.nextUrl.clone();
  const lang = preferredLang(req.headers.get("accept-language"));
  url.pathname = pathname === "/" ? `/${lang}` : `/${lang}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next's own files and /aimag/*, which next.config.ts redirects itself.
  matcher: ["/((?!_next/|_vercel/|aimag/).*)"],
};
