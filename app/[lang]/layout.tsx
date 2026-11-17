import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Alegreya, Alegreya_Sans } from "next/font/google";
import LangSwitch from "@/components/LangSwitch";
import Search from "@/components/Search";
import TransitionLink, { ViewTransitionResolver } from "@/components/TransitionLink";
import { getGuide } from "@/lib/guide";
import { getAbout } from "@/lib/history";
import { getDict, isLang, langs } from "@/lib/i18n";
import { alternates, share, siteUrl } from "@/lib/seo";
import "../globals.css";

/*
 * Alegreya (headings) and Alegreya Sans (text): one family with a calligraphic,
 * brush-like stroke — a nod to Mongolian manuscripts and the vertical script —
 * and full Cyrillic including the Mongolian letters Ө and Ү. Japanese, Korean
 * and Chinese fall back to system fonts (see globals.css).
 */
const alegreya = Alegreya({
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
  weight: ["500", "700", "800"],
  variable: "--font-alegreya",
});

const alegreyaSans = Alegreya_Sans({
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-alegreya-sans",
});

type Props = { children: React.ReactNode; params: Promise<{ lang: string }> };

export function generateStaticParams() {
  return langs.map((lang) => ({ lang }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const t = getDict(lang);
  return {
    // Every relative URL below — canonicals, hreflang, share images — is
    // resolved against this, so links shared from the site carry a full URL.
    metadataBase: new URL(siteUrl),
    title: { default: t.metaTitle, template: `%s | ${t.brand}` },
    description: t.metaDescription,
    applicationName: t.brand,
    alternates: alternates(lang),
    ...share(lang, { title: t.metaTitle, description: t.metaDescription }),
  };
}

export default async function LangLayout({ children, params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = getDict(lang);
  const g = getGuide(lang);

  return (
    <html lang={t.htmlLang} className={`${alegreya.variable} ${alegreyaSans.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          {t.skip}
        </a>
        <ViewTransitionResolver />
        <header className="site-header">
          <div className="site-header-inner">
            <TransitionLink href={`/${lang}`} className="brand">
              <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2} strokeLinejoin="round">
                <path d="M3 25 12 10l5 8 3-5 9 12Z" />
                <circle cx="23" cy="7" r="2.5" />
              </svg>
              <span className="brand-text">
                <span className="brand-name">{t.brand}</span>
                <span className="brand-sub">{t.brandSub}</span>
              </span>
            </TransitionLink>
            <nav className="site-nav" aria-label={t.navLabel}>
              <TransitionLink href={`/${lang}/about`}>{getAbout(lang).nav}</TransitionLink>
              <TransitionLink href={`/${lang}/destinations`}>{t.nav.destinations}</TransitionLink>
              <TransitionLink href={`/${lang}/itineraries`}>{g.nav.itineraries}</TransitionLink>
              <TransitionLink href={`/${lang}/culture`}>{g.nav.culture}</TransitionLink>
              <TransitionLink href={`/${lang}/practical`}>{g.nav.practical}</TransitionLink>
            </nav>
            <div className="header-tools">
              <Search lang={lang} />
              <LangSwitch lang={lang} />
            </div>
          </div>
        </header>

        <div id="main">{children}</div>

        <footer className="site-footer">
          <div className="container footer-inner">
            <div className="footer-brand">
              <span className="brand-name">{t.brand}</span>
              <span className="brand-sub">{t.brandSub}</span>
              <nav className="footer-nav" aria-label={t.navLabel}>
                <TransitionLink href={`/${lang}/about`}>{getAbout(lang).nav}</TransitionLink>
                <TransitionLink href={`/${lang}/destinations`}>{t.nav.destinations}</TransitionLink>
                <TransitionLink href={`/${lang}/itineraries`}>{g.nav.itineraries}</TransitionLink>
                <TransitionLink href={`/${lang}/culture`}>{g.nav.culture}</TransitionLink>
                <TransitionLink href={`/${lang}/practical`}>{g.nav.practical}</TransitionLink>
              </nav>
            </div>
            <p>{t.footer}</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
