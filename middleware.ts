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

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  url.pathname = `/${preferredLang(req.headers.get("accept-language"))}`;
  return NextResponse.redirect(url);
}

// Only the bare root is redirected; every other path already carries a language.
export const config = { matcher: ["/"] };
