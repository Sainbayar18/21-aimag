import type { Metadata } from "next";
import { Alegreya, Alegreya_Sans } from "next/font/google";
import NotFoundContent from "@/components/NotFoundContent";
import { getDict, langs } from "@/lib/i18n";

const alegreya = Alegreya({
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
  weight: ["700"],
  variable: "--font-alegreya",
});

const alegreyaSans = Alegreya_Sans({
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
  weight: ["400", "700"],
  variable: "--font-alegreya-sans",
});

export const metadata: Metadata = { title: "404", robots: { index: false, follow: true } };

/*
 * This page stands outside the language segments, so Next renders it without
 * the layout and without globals.css. The few rules it needs are written out
 * here rather than imported — the stylesheet would not be loaded.
 */
const css = `
  body { margin: 0; background: #e8eef3; color: #163a5f;
    font-family: var(--font-alegreya-sans), system-ui, sans-serif; }
  .container { width: 100%; max-width: 1240px; margin: 0 auto; padding: 0 32px; box-sizing: border-box; }
  .stack { padding: 96px 0; }
  .section { display: flex; flex-direction: column; gap: 24px; }
  .section-head { display: flex; flex-direction: column; gap: 8px; }
  .h2 { margin: 0; font-family: var(--font-alegreya), Georgia, serif; font-size: 34px; line-height: 40px; }
  .lead { margin: 0; font-size: 20px; line-height: 30px; }
  .muted { color: #4b5b6b; }
  .hero-actions { display: flex; flex-wrap: wrap; gap: 12px; margin: 0; }
  .primary-btn, .ghost-btn { display: inline-flex; align-items: center; min-height: 48px;
    padding: 10px 22px; border-radius: 8px; font-weight: 700; text-decoration: none; }
  .primary-btn { background: #b8431c; color: #fff; }
  .ghost-btn { border: 1px solid #c9d4de; color: #163a5f; }
`;

/**
 * The last-resort 404: an address that is not under a language at all, such as
 * a dead link to a file. Addresses under a language are caught by
 * app/[lang]/[...rest] and get the full page with header and footer.
 */
export default function NotFound() {
  const texts = Object.fromEntries(langs.map((l) => [l, getDict(l).notFound]));
  return (
    <html lang="en" className={`${alegreya.variable} ${alegreyaSans.variable}`}>
      <body>
        <style dangerouslySetInnerHTML={{ __html: css }} />
        <NotFoundContent texts={texts} />
      </body>
    </html>
  );
}
