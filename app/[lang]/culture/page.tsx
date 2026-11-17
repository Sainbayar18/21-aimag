import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import GuidePager from "@/components/GuidePager";
import PhotoCredit from "@/components/PhotoCredit";
import Reveal from "@/components/Reveal";
import { getPhotoByFile } from "@/lib/aimags";
import { cultureIds, getGuide } from "@/lib/guide";
import { getDict, isLang } from "@/lib/i18n";
import { alternates, share } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

const HERO = "/images/gallery/bayan-ulgii-4.jpg";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const c = getGuide(lang).culture;
  const hero = getPhotoByFile(HERO, lang)!;
  return {
    title: c.pageTitle,
    description: c.metaDescription,
    alternates: alternates(lang, "/culture"),
    ...share(lang, {
      path: "/culture",
      title: `${c.pageTitle} | ${getDict(lang).brand}`,
      description: c.metaDescription,
      images: [{ url: hero.file, width: hero.width, height: hero.height, alt: hero.caption }],
    }),
  };
}

export default async function CulturePage({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const c = getGuide(lang).culture;
  const hero = getPhotoByFile(HERO, lang)!;

  return (
    <main>
      <section className="hero hero--guide">
        <div className="hero-media">
          <Image src={hero.file} alt={hero.caption} fill priority sizes="100vw" />
        </div>
        <div className="hero-content container">
          <h1 className="hero-title anim-up" style={{ animationDelay: "180ms" }}>
            {c.pageTitle}
          </h1>
          <p className="hero-lead anim-up" style={{ animationDelay: "300ms" }}>
            {c.pageLead}
          </p>
        </div>
        <PhotoCredit photo={hero} lang={lang} className="hero-credit" />
      </section>

      <div className="container stack">
        <Reveal as="section" className="guide-intro">
          {c.intro.map((p) => (
            <p key={p.slice(0, 24)} className="about-intro">
              {p}
            </p>
          ))}
        </Reveal>

        <section className="section">
          <div className="guide-grid">
            {cultureIds.map((id) => {
              const s = c.sections[id];
              return (
                <article key={id} className="guide-card">
                  <h2 className="h3 guide-card-title">{s.title}</h2>
                  <p className="guide-card-text">{s.text}</p>
                  <ul className="guide-points">
                    {s.points.map((p) => (
                      <li key={p.slice(0, 24)}>{p}</li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </section>

        <section className="section" aria-labelledby="etiquette-title">
          <Reveal className="section-head section-head--center">
            <h2 id="etiquette-title" className="h2">
              {c.etiquetteTitle}
            </h2>
            <p className="lead muted">{c.etiquetteLead}</p>
          </Reveal>
          <div className="etiquette">
            <Reveal className="etq etq--do">
              <h3 className="etq-title">{c.doTitle}</h3>
              <ul>
                {c.dos.map((d) => (
                  <li key={d.slice(0, 24)}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="m5 13 4 4 10-10" />
                    </svg>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="etq etq--dont" delay={100}>
              <h3 className="etq-title">{c.dontTitle}</h3>
              <ul>
                {c.donts.map((d) => (
                  <li key={d.slice(0, 24)}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M6 6l12 12M18 6 6 18" />
                    </svg>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        <GuidePager lang={lang} current="culture" />
      </div>
    </main>
  );
}
