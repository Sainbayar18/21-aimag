import Image from "next/image";
import { notFound } from "next/navigation";
import AboutTeaser from "@/components/AboutTeaser";
import Explorer from "@/components/Explorer";
import GerEntry from "@/components/GerEntry";
import MongoliaMap from "@/components/MongoliaMap";
import PhotoCredit from "@/components/PhotoCredit";
import Reveal from "@/components/Reveal";
import TransitionLink from "@/components/TransitionLink";
import { getPhoto } from "@/lib/aimags";
import { getGuide } from "@/lib/guide";
import { getDict, isLang } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

const seasonIcons = [
  // spring: sprout
  <path key="s" d="M12 20v-8m0 0c0-4 3-6 7-6 0 4-3 6-7 6Zm0 0c0-3-2.5-5-6-5 0 3 2.5 5 6 5Z" />,
  // summer: sun
  <g key="u"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></g>,
  // autumn: leaf
  <path key="a" d="M5 19c0-8 5-14 14-14 0 9-6 14-14 14Zm0 0 8-8" />,
  // winter: snowflake
  <path key="w" d="M12 2v20M4 7l16 10M4 17 20 7M9 3l3 2 3-2M9 21l3-2 3 2" />,
];

const planIcons = [
  <path key="1" d="M2 16l20-6-3-3-6 2-6-5-2 1 4 5-4 1-2-2-1 1 2 4Z" />,
  <g key="2"><path d="M3 15l2-6h14l2 6v4H3Z" /><circle cx="7" cy="17" r="1.5" /><circle cx="17" cy="17" r="1.5" /><path d="M3 15h18" /></g>,
  <g key="3"><path d="M3 20h18" /><path d="M4.5 20v-7L12 8.5l7.5 4.5v7" /><path d="M12 8.5V5M10 20v-4h4v4" /></g>,
  <g key="4"><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 8h8M8 12h8M8 16h5" /></g>,
];

export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = getDict(lang);
  const hero = getPhoto("home", lang);

  return (
    <main>
      <GerEntry lang={lang} />

      <section id="home-top" className="hero hero--home">
        <div className="hero-media">
          <Image src={hero.file} alt={hero.caption} fill priority sizes="100vw" />
        </div>
        <div className="hero-content container">
          <p className="hero-eyebrow anim-up" style={{ animationDelay: "80ms" }}>
            {t.hero.eyebrow}
          </p>
          <h1 className="hero-title hero-title--xl anim-up" style={{ animationDelay: "180ms" }}>
            {t.hero.title[0]}
            <br />
            <em>{t.hero.title[1]}</em>
          </h1>
          <p className="hero-lead anim-up" style={{ animationDelay: "320ms" }}>
            {t.hero.lead}
          </p>
          <div className="hero-actions anim-up" style={{ animationDelay: "440ms" }}>
            <a href="#map" className="primary-btn">
              {t.hero.ctaPrimary}
            </a>
            <TransitionLink href={`/${lang}/practical`} className="ghost-btn ghost-btn--light">
              {t.hero.ctaSecondary}
            </TransitionLink>
          </div>
        </div>
        <PhotoCredit photo={hero} lang={lang} className="hero-credit" />
      </section>

      <div className="container">
        <dl className="stats">
          {t.stats.map((s, i) => (
            <div key={s.label} className="anim-up" style={{ animationDelay: `${520 + i * 90}ms` }}>
              <dt>{s.label}</dt>
              <dd>{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="container stack">
        <AboutTeaser lang={lang} />
        <Explorer
          lang={lang}
          middle={
            <section id="map" className="section" aria-labelledby="map-title">
              <Reveal className="section-head">
                <p className="kicker">03</p>
                <h2 id="map-title" className="h2">{t.mapTitle}</h2>
                <p className="lead muted">{t.mapLead}</p>
              </Reveal>
              <Reveal>
                <MongoliaMap lang={lang} />
              </Reveal>
            </section>
          }
        />
      </div>

      <section id="seasons" className="band band--dark" aria-labelledby="seasons-title">
        <div className="container section">
          <Reveal className="section-head section-head--center">
            <p className="kicker kicker--light">05</p>
            <h2 id="seasons-title" className="h2">{t.seasonsTitle}</h2>
            <p className="lead">{t.seasonsLead}</p>
          </Reveal>
          <ol className="seasons">
            {t.seasons.map((s, i) => (
              <Reveal as="li" key={s.name} className="season" delay={i * 90}>
                <span className="season-icon" aria-hidden="true">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                    {seasonIcons[i]}
                  </svg>
                </span>
                <span className="season-months">{s.months}</span>
                <h3 className="season-name">{s.name}</h3>
                <p>{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <div className="container stack">
        <section id="plan" className="section" aria-labelledby="plan-title">
          <Reveal className="section-head">
            <p className="kicker">06</p>
            <h2 id="plan-title" className="h2">{t.planTitle}</h2>
            <p className="lead muted">{t.planLead}</p>
          </Reveal>
          <div className="plan-grid">
            {t.plan.map((p, i) => (
              <Reveal key={p.title} className="plan-card" delay={i * 80}>
                <span className="plan-icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                    {planIcons[i]}
                  </svg>
                </span>
                <h3 className="h4">{p.title}</h3>
                <p>{p.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="section-cta">
            <TransitionLink href={`/${lang}/practical`} className="primary-btn">
              {getGuide(lang).practical.pageTitle}
            </TransitionLink>
            <TransitionLink href={`/${lang}/itineraries`} className="ghost-btn">
              {getGuide(lang).itineraries.pageTitle}
            </TransitionLink>
          </Reveal>
        </section>
      </div>
    </main>
  );
}
