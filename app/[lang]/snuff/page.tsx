import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getGuide, snuffBottleIds } from "@/lib/guide";
import { getDict, isLang } from "@/lib/i18n";
import { alternates, share } from "@/lib/seo";
import { getSnuffPhoto } from "@/lib/snuff";

type Props = { params: Promise<{ lang: string }> };

const HERO = "/images/snuff/exchange.jpg";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const s = getGuide(lang).snuff;
  return {
    title: s.pageTitle,
    description: s.metaDescription,
    alternates: alternates(lang, "/snuff"),
    ...share(lang, {
      path: "/snuff",
      title: `${s.pageTitle} | ${getDict(lang).brand}`,
      description: s.metaDescription,
      images: [{ url: HERO, width: 2000, height: 1116, alt: s.heroAlt }],
    }),
  };
}

/**
 * The snuff-bottle greeting, opened by the snuff bottle in the chest. The
 * page's one bold element is the exchange itself, set as five numbered steps
 * along a line — it really is a sequence, done in this order. The elder's
 * form and the things not to do follow as guidebook rows, then the bottles,
 * photographed in the National Museum of Mongolia.
 */
export default async function SnuffPage({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const s = getGuide(lang).snuff;

  return (
    <main className="snuff">
      <section className="hero hero--guide">
        <div className="hero-media">
          <Image src={HERO} alt={s.heroAlt} fill priority sizes="100vw" />
        </div>
        <div className="hero-content container">
          <h1 className="hero-title anim-up" style={{ animationDelay: "180ms" }}>
            {s.pageTitle}
          </h1>
          <p className="hero-lead anim-up" style={{ animationDelay: "300ms" }}>
            {s.pageLead}
          </p>
        </div>
        <p className="photo-credit hero-credit">{s.aiCaption}</p>
      </section>

      <div className="container stack">
        <section className="guide-intro">
          {s.intro.map((p) => (
            <p key={p.slice(0, 24)} className="about-intro">
              {p}
            </p>
          ))}
        </section>

        <section className="section" aria-labelledby="steps-title">
          <div className="section-head">
            <h2 id="steps-title" className="h2">
              {s.stepsTitle}
            </h2>
          </div>
          <ol className="snuff-steps">
            {s.steps.map((step, i) => (
              <li key={step.title} className="snuff-step">
                <span className="snuff-step-num" aria-hidden="true">
                  {i + 1}
                </span>
                <h3 className="snuff-step-title">{step.title}</h3>
                <p className="snuff-step-text">{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="section" aria-label={s.elderTitle}>
          <div className="guide-grid">
            <article className="guide-card">
              <h2 className="h3 guide-card-title">{s.elderTitle}</h2>
              <p className="guide-points snuff-elder">{s.elderText}</p>
            </article>
            <article className="guide-card">
              <h2 className="h3 guide-card-title">{s.avoidTitle}</h2>
              <p className="guide-card-text">{s.avoidLead}</p>
              <ul className="guide-points">
                {s.avoid.map((a) => (
                  <li key={a.slice(0, 24)}>{a}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="section" aria-labelledby="bottles-title">
          <div className="section-head">
            <h2 id="bottles-title" className="h2">
              {s.bottlesTitle}
            </h2>
            <p className="lead muted">{s.bottlesText}</p>
          </div>
          <div className="snuff-bottles">
            {snuffBottleIds.map((id) => {
              const photo = getSnuffPhoto(id, s.bottles[id]);
              return (
                <figure key={id} className="snuff-bottle">
                  <div className="snuff-bottle-photo">
                    <Image src={photo.file} alt={photo.caption} fill sizes="(max-width: 700px) 50vw, 280px" />
                  </div>
                  <figcaption>
                    <span className="snuff-bottle-name">{photo.caption}</span>
                    {/* the name is the caption, so the credit is only who and what licence */}
                    <span className="photo-credit snuff-bottle-credit">
                      <a href={photo.source} target="_blank" rel="noopener noreferrer">
                        {photo.author}
                      </a>
                      , {photo.license}
                    </span>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </section>

        <p className="guide-note">{s.note}</p>
      </div>
    </main>
  );
}
