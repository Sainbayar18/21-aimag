import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import AimagCard from "@/components/AimagCard";
import ExperienceIcon from "@/components/ExperienceIcon";
import LocatorMap from "@/components/LocatorMap";
import PhotoSlider from "@/components/PhotoSlider";
import Reveal from "@/components/Reveal";
import TransitionLink from "@/components/TransitionLink";
import { getAimag, getGallery, getNeighbors, getPhoto, slugs } from "@/lib/aimags";
import { getDict, isLang, langs } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams() {
  return langs.flatMap((lang) => slugs.map((slug) => ({ lang, slug })));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLang(lang)) return {};
  const a = getAimag(slug, lang);
  if (!a) return {};
  const t = getDict(lang);
  return {
    title: a.name + t.provinceSuffix,
    description: a.lead,
    alternates: { languages: Object.fromEntries(langs.map((l) => [l, `/${l}/province/${slug}`])) },
    openGraph: { images: [getPhoto(slug, lang).file] },
  };
}

export default async function ProvincePage({ params }: Props) {
  const { lang, slug } = await params;
  if (!isLang(lang)) notFound();
  const a = getAimag(slug, lang);
  if (!a) notFound();
  const t = getDict(lang);
  const { prev, next } = getNeighbors(slug, lang);
  const gallery = getGallery(slug, lang);
  const region = t.regions[a.regionId].name;

  const facts = [
    { label: t.facts.capital, value: a.capital },
    { label: t.facts.founded, value: t.foundedValue(a.year) },
    { label: t.facts.area, value: a.area },
    { label: t.facts.population, value: a.pop },
  ];

  return (
    <main>
      <PhotoSlider photos={gallery} lang={lang} label={t.photosLabel(a.name)} className="hero--aimag">
        <div className="hero-content container">
          <TransitionLink href={`/${lang}/destinations`} className="back-link back-link--light anim-up">
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 4l-6 6 6 6" />
            </svg>
            {t.allProvinces}
          </TransitionLink>
          <p className="hero-eyebrow anim-up" style={{ animationDelay: "120ms" }}>
            {region}
          </p>
          <h1 className="hero-title anim-up" style={{ animationDelay: "220ms" }}>
            {a.name}
            {t.provinceSuffix}
          </h1>
          <p className="hero-lead anim-up" style={{ animationDelay: "340ms" }}>
            {a.lead}
          </p>
          {gallery.length > 1 && (
            <p className="scroll-hint anim-up" style={{ animationDelay: "600ms" }}>
              <span className="mouse" aria-hidden="true">
                <span />
              </span>
              {t.scrollHint(gallery.length)}
            </p>
          )}
        </div>
      </PhotoSlider>

      <div className="container stack">
        <dl className="facts">
          {facts.map((f, i) => (
            <div key={f.label} className="anim-up" style={{ animationDelay: `${420 + i * 80}ms` }}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>

        <div className="detail-grid">
          <div className="detail-text">
            <Reveal as="section" className="text-block">
              <span className="section-icon section-icon--gobi" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19V5a1 1 0 0 1 1-1h11l4 4v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Z" />
                  <path d="M8 9h8M8 13h8M8 17h5" />
                </svg>
              </span>
              <h2 className="h2">{t.history}</h2>
              <p>{a.history}</p>
            </Reveal>
            <Reveal as="section" className="text-block" delay={100}>
              <span className="section-icon section-icon--steppe" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <path d="m3 20 6-11 4 6 3-4 5 9Z" />
                  <circle cx="17" cy="6" r="2" />
                </svg>
              </span>
              <h2 className="h2">{t.nature}</h2>
              <p>{a.nature}</p>
            </Reveal>
          </div>

          <aside className="detail-side">
            <Reveal className="info-card" delay={120}>
              <h2 className="label">{t.bestTime}</h2>
              <p className="info-best">{t.seasonNames[a.season]}</p>
              <h2 className="label">{t.experiencesHere}</h2>
              <ul className="exp-list">
                {a.experiences.map((e) => (
                  <li key={e}>
                    <ExperienceIcon id={e} size={18} />
                    {t.experiences[e].title}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={180}>
              <h2 className="label side-label">{t.location}</h2>
              <LocatorMap aimag={a} lang={lang} />
            </Reveal>
          </aside>
        </div>

        <Reveal as="section" className="section">
          <h2 className="h2">{t.highlights}</h2>
          <ol className="sights">
            {a.sights.map((s, i) => (
              <li key={s} style={{ transitionDelay: `${i * 60}ms` }}>
                <span className="sight-num">{String(i + 1).padStart(2, "0")}</span>
                {s}
              </li>
            ))}
          </ol>
        </Reveal>

        {gallery.length > 1 && (
          <section className="section">
            <Reveal>
              <h2 className="h2">{t.gallery}</h2>
            </Reveal>
            <div className={`gallery gallery--${Math.min(gallery.length, 5)}`}>
              {gallery.map((p, i) => (
                <Reveal key={p.file} as="figure" className="gallery-item" delay={i * 70}>
                  <Image src={p.file} alt={p.caption} fill sizes="(max-width: 700px) 100vw, 50vw" />
                  <figcaption>{p.caption}</figcaption>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        <Reveal as="nav" className="pager">
          <h2 className="visually-hidden">{t.pagerLabel}</h2>
          <AimagCard aimag={prev} lang={lang} eyebrow={t.prev} compact />
          <AimagCard aimag={next} lang={lang} eyebrow={t.next} compact />
        </Reveal>
      </div>
    </main>
  );
}
