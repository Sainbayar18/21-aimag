import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArriveMap from "@/components/ArriveMap";
import TransitionLink from "@/components/TransitionLink";
import { getGuide, wayIds } from "@/lib/guide";
import { getDict, isLang } from "@/lib/i18n";
import { alternates, share } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

/*
 * How to get to Mongolia, opened by the plane ticket in the ger. The map is
 * the page's one picture: every way in, each in its colour, and under it a
 * legend that leads to a guidebook row per way, laid out like the practical
 * page's.
 */

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const a = getGuide(lang).arrive;
  return {
    title: a.pageTitle,
    description: a.metaDescription,
    alternates: alternates(lang, "/getting-here"),
    ...share(lang, {
      path: "/getting-here",
      title: `${a.pageTitle} | ${getDict(lang).brand}`,
      description: a.metaDescription,
    }),
  };
}

export default async function GettingHerePage({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const a = getGuide(lang).arrive;
  const [visaBefore, visaAfter] = a.visa.split("{link}");

  return (
    <main className="arrive">
      <section className="arrive-hero container" aria-labelledby="arrive-title">
        <div className="arrive-intro">
          <h1 id="arrive-title" className="arrive-title anim-up" style={{ animationDelay: "120ms" }}>
            {a.pageTitle}
          </h1>
          <p className="lead arrive-lead anim-up" style={{ animationDelay: "240ms" }}>
            {a.pageLead}
          </p>
        </div>

        <figure className="arrive-figure">
          <ArriveMap lang={lang} text={a} />
        </figure>

        <nav className="arrive-ways" aria-label={a.waysLabel}>
          {wayIds.map((id) => (
            <a key={id} href={`#${id}`} className="arrive-way" data-way={id}>
              <span className="arrive-swatch" aria-hidden="true" />
              {a.ways[id].title}
            </a>
          ))}
        </nav>
      </section>

      <div className="container stack arrive-body">
        <section className="section">
          <div className="guide-grid">
            {wayIds.map((id) => {
              const s = a.ways[id];
              return (
                <article key={id} id={id} className="guide-card arrive-card" data-way={id}>
                  <h2 className="h3 guide-card-title">{s.title}</h2>
                  <p className="guide-card-text">{s.text}</p>
                  <ul className="guide-points">
                    {s.points.map((pt) => (
                      <li key={pt.slice(0, 24)}>{pt}</li>
                    ))}
                  </ul>
                </article>
              );
            })}
            <article className="guide-card">
              <h2 className="h3 guide-card-title">{a.border.title}</h2>
              <p className="guide-card-text">{a.border.text}</p>
              <ul className="guide-points">
                {a.border.points.map((pt) => (
                  <li key={pt.slice(0, 24)}>{pt}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <div className="arrive-notes">
          <p className="lead arrive-visa">
            {visaBefore}
            <TransitionLink href={`/${lang}/practical`}>{a.visaLink}</TransitionLink>
            {visaAfter}
          </p>
          <p className="guide-note">{a.disclaimer}</p>
        </div>
      </div>
    </main>
  );
}
