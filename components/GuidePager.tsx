import TransitionLink from "@/components/TransitionLink";
import { getGuide } from "@/lib/guide";
import { getAbout } from "@/lib/history";
import type { Lang } from "@/lib/i18n";

type PageId = "about" | "culture" | "itineraries" | "practical";

/** Links on to the other guide pages, so no page is a dead end. */
export default function GuidePager({ lang, current }: { lang: Lang; current: PageId }) {
  const g = getGuide(lang);
  const about = getAbout(lang);

  const pages: Record<PageId, { href: string; eyebrow: string; title: string; lead: string }> = {
    about: { href: `/${lang}/about`, eyebrow: about.nav, title: about.pageTitle, lead: about.pageLead },
    culture: { href: `/${lang}/culture`, eyebrow: g.nav.culture, title: g.culture.pageTitle, lead: g.culture.pageLead },
    itineraries: {
      href: `/${lang}/itineraries`,
      eyebrow: g.nav.itineraries,
      title: g.itineraries.pageTitle,
      lead: g.itineraries.pageLead,
    },
    practical: {
      href: `/${lang}/practical`,
      eyebrow: g.nav.practical,
      title: g.practical.pageTitle,
      lead: g.practical.pageLead,
    },
  };

  const order: PageId[] = ["about", "culture", "itineraries", "practical"];
  const others = order.filter((id) => id !== current).slice(0, 3);

  return (
    <nav className="guide-pager" aria-label={g.search.pages}>
      {others.map((id) => {
        const p = pages[id];
        return (
          <TransitionLink key={id} href={p.href} className="guide-pager-card">
            {/* some languages name the page and its nav entry the same — don't print it twice */}
            {p.eyebrow !== p.title && <span className="guide-pager-eyebrow">{p.eyebrow}</span>}
            <span className="guide-pager-title">{p.title}</span>
            <span className="guide-pager-lead">{p.lead}</span>
            <span className="card-arrow" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 10h12M11 5l5 5-5 5" />
              </svg>
            </span>
          </TransitionLink>
        );
      })}
    </nav>
  );
}
