import TransitionLink from "@/components/TransitionLink";
import { getGuide } from "@/lib/guide";
import { getAbout } from "@/lib/history";
import type { Lang } from "@/lib/i18n";

type PageId = "about" | "culture" | "itineraries" | "practical";

/** Links on to the other guide pages, so no page is a dead end. */
export default function GuidePager({ lang, current }: { lang: Lang; current: PageId }) {
  const g = getGuide(lang);
  const about = getAbout(lang);

  const pages: Record<PageId, { href: string; title: string; lead: string }> = {
    about: { href: `/${lang}/about`, title: about.pageTitle, lead: about.pageLead },
    culture: { href: `/${lang}/culture`, title: g.culture.pageTitle, lead: g.culture.pageLead },
    itineraries: {
      href: `/${lang}/itineraries`,
      title: g.itineraries.pageTitle,
      lead: g.itineraries.pageLead,
    },
    practical: {
      href: `/${lang}/practical`,
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
            <span className="guide-pager-title">{p.title}</span>
            <span className="guide-pager-lead">{p.lead}</span>
          </TransitionLink>
        );
      })}
    </nav>
  );
}
