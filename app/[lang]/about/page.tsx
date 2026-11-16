import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import PhotoCredit from "@/components/PhotoCredit";
import Reveal from "@/components/Reveal";
import TimelineRail from "@/components/TimelineRail";
import { getPhotoByFile } from "@/lib/aimags";
import { entryLabel, eraLabel, eras, getAbout, history } from "@/lib/history";
import { isLang, langs } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

const HERO = "/images/gallery/tuv-2.jpg";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const a = getAbout(lang);
  return {
    title: a.pageTitle,
    description: a.pageLead,
    alternates: { languages: Object.fromEntries(langs.map((l) => [l, `/${l}/about`])) },
  };
}

export default async function AboutPage({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const a = getAbout(lang);
  const hero = getPhotoByFile(HERO, lang)!;

  return (
    <main>
      <section className="hero hero--about">
        <div className="hero-media">
          <Image src={hero.file} alt={hero.caption} fill priority sizes="100vw" />
        </div>
        <div className="hero-content container">
          <h1 className="hero-title anim-up" style={{ animationDelay: "180ms" }}>
            {a.pageTitle}
          </h1>
          <p className="hero-lead anim-up" style={{ animationDelay: "300ms" }}>
            {a.pageLead}
          </p>
        </div>
        <PhotoCredit photo={hero} lang={lang} className="hero-credit" />
      </section>

      <div className="container stack">
        <section className="about-grid about-grid--page">
          <Reveal className="section-head">
            <h2 className="h2 about-title">{a.title}</h2>
            {a.intro.map((p) => (
              <p key={p.slice(0, 20)} className="about-intro">
                {p}
              </p>
            ))}
          </Reveal>
          <Reveal delay={120}>
            <dl className="glance">
              {a.facts.map((f) => (
                <div key={f.label}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </section>

        <section className="section" aria-labelledby="timeline-title">
          <Reveal className="section-head section-head--center">
            <h2 id="timeline-title" className="h2">{a.timelineTitle}</h2>
          </Reveal>

          <TimelineRail>
            {eras.map((era) => (
              <div key={era.id} className="tl-era">
                <Reveal className="tl-era-head">
                  <span className="tl-era-range">{eraLabel(era, lang).range}</span>
                  <h3 className="tl-era-name">{eraLabel(era, lang).name}</h3>
                </Reveal>
                <ol className="tl-list">
                  {history
                    .filter((h) => h.eraId === era.id)
                    .map((h) => {
                      const photo = h.photo ? getPhotoByFile(h.photo, lang) : undefined;
                      const e = entryLabel(h, lang);
                      return (
                        <Reveal as="li" key={h.id} className={`tl-item${h.key ? " is-key" : ""}`}>
                          <span className="tl-dot" aria-hidden="true" />
                          <article className="tl-card">
                            <p className="tl-date">{e.date}</p>
                            <h4 className="tl-title">{e.title}</h4>
                            <p className="tl-text">{e.text}</p>
                            {photo && (
                              <figure className="tl-photo">
                                <div className="tl-photo-media">
                                  <Image src={photo.file} alt={photo.caption} fill sizes="(max-width: 800px) 100vw, 520px" />
                                </div>
                                <figcaption>
                                  <PhotoCredit photo={photo} lang={lang} />
                                </figcaption>
                              </figure>
                            )}
                          </article>
                        </Reveal>
                      );
                    })}
                </ol>
              </div>
            ))}
          </TimelineRail>
          <p className="caption about-sources">{a.sources}</p>
        </section>
      </div>
    </main>
  );
}
