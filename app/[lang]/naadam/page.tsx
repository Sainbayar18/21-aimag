import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import PhotoCredit from "@/components/PhotoCredit";
import { getGuide, naadamGameIds, naadamTitleIds, naadamTitles, wrestlerGear, wrestlerGearIds } from "@/lib/guide";
import { getDict, isLang } from "@/lib/i18n";
import { getNaadamPhoto } from "@/lib/naadam";
import { alternates, share } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const n = getGuide(lang).naadam;
  const hero = getNaadamPhoto("hero", n.photoAlt.hero);
  return {
    title: n.pageTitle,
    description: n.metaDescription,
    alternates: alternates(lang, "/naadam"),
    ...share(lang, {
      path: "/naadam",
      title: `${n.pageTitle} | ${getDict(lang).brand}`,
      description: n.metaDescription,
      images: [{ url: hero.file, width: hero.width, height: hero.height, alt: hero.caption }],
    }),
  };
}

/**
 * Naadam, opened by the wrestler's zodog in the chest. Wrestling is the
 * subject: how a bout is won, what a wrestler wears, the eagle dance, and
 * the titles, set as a stair that rises with each round a wrestler must win
 * — the one bold thing on the page. The horse races and archery follow
 * briefly, then where to watch.
 */
export default async function NaadamPage({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const n = getGuide(lang).naadam;
  const photo = (key: string) => getNaadamPhoto(key, n.photoAlt[key]);
  const hero = photo("hero");
  const outfit = photo("outfit");
  const dance = photo("dance");
  const grapple = photo("grapple");

  return (
    <main className="naadam">
      <section className="hero hero--guide">
        <div className="hero-media">
          <Image src={hero.file} alt={hero.caption} fill priority sizes="100vw" />
        </div>
        <div className="hero-content container">
          <h1 className="hero-title anim-up" style={{ animationDelay: "180ms" }}>
            {n.pageTitle}
          </h1>
          <p className="hero-lead anim-up" style={{ animationDelay: "300ms" }}>
            {n.pageLead}
          </p>
        </div>
        <PhotoCredit photo={hero} lang={lang} className="hero-credit" />
      </section>

      <div className="container stack">
        <section className="guide-intro">
          {n.intro.map((p) => (
            <p key={p.slice(0, 24)} className="about-intro">
              {p}
            </p>
          ))}
        </section>

        {/* ---- wrestling ---- */}
        <section className="section" aria-labelledby="bokh-title">
          <div className="section-head">
            <h2 id="bokh-title" className="h2">
              {n.wrestlingTitle}
            </h2>
            <p className="lead muted">{n.wrestlingLead}</p>
          </div>

          <div className="guide-grid">
            <article className="guide-card">
              <h3 className="h3 guide-card-title">{n.rulesTitle}</h3>
              <p className="guide-card-text">{n.rulesLead}</p>
              <ul className="guide-points">
                {n.rules.map((r) => (
                  <li key={r.slice(0, 24)}>{r}</li>
                ))}
              </ul>
            </article>
          </div>

          <figure className="naadam-wide">
            <div className="naadam-photo">
              <Image src={grapple.file} alt={grapple.caption} fill sizes="(max-width: 900px) 100vw, 1180px" />
            </div>
            <figcaption>
              <PhotoCredit photo={grapple} lang={lang} />
            </figcaption>
          </figure>
        </section>

        <section className="section naadam-pair" aria-labelledby="outfit-title">
          <figure className="naadam-figure">
            <div className="naadam-photo">
              <Image src={outfit.file} alt={outfit.caption} fill sizes="(max-width: 900px) 100vw, 560px" />
            </div>
            <figcaption>
              <PhotoCredit photo={outfit} lang={lang} />
            </figcaption>
          </figure>
          <div className="naadam-copy">
            <h2 id="outfit-title" className="h2">
              {n.outfitTitle}
            </h2>
            <p className="lead muted">{n.outfitText}</p>
            <dl className="naadam-gear">
              {wrestlerGearIds.map((id) => (
                <div key={id}>
                  <dt>
                    <span lang="mn">{wrestlerGear[id].mn}</span>
                    {lang !== "mn" && <span className="naadam-say">{wrestlerGear[id].say}</span>}
                  </dt>
                  <dd>{n.outfit[id]}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="section naadam-pair naadam-pair--flip" aria-labelledby="ritual-title">
          <figure className="naadam-figure">
            <div className="naadam-photo">
              <Image src={dance.file} alt={dance.caption} fill sizes="(max-width: 900px) 100vw, 560px" />
            </div>
            <figcaption>
              <PhotoCredit photo={dance} lang={lang} />
            </figcaption>
          </figure>
          <div className="naadam-copy">
            <h2 id="ritual-title" className="h2">
              {n.ritualTitle}
            </h2>
            <p className="naadam-ritual">{n.ritualText}</p>
          </div>
        </section>

        {/* ---- the titles: a stair, each step one round higher ---- */}
        <section className="section" aria-labelledby="titles-title">
          <div className="section-head">
            <h2 id="titles-title" className="h2">
              {n.titlesTitle}
            </h2>
            <p className="lead muted">{n.titlesLead}</p>
          </div>
          <ol className="naadam-stair">
            {naadamTitleIds.map((id, i) => (
              <li
                key={id}
                className={`naadam-step${i >= 4 ? " is-crown" : ""}`}
                style={{ "--step": i } as React.CSSProperties}
              >
                <span className="naadam-step-name" lang="mn">
                  {naadamTitles[id].mn}
                </span>
                {lang !== "mn" && <span className="naadam-say">{naadamTitles[id].say}</span>}
                {/* in Mongolian a title is often its own meaning: zaan is elephant */}
                {n.titles[id].meaning !== naadamTitles[id].mn && (
                  <span className="naadam-step-meaning">{n.titles[id].meaning}</span>
                )}
                <span className="naadam-step-rule">{n.titles[id].rule}</span>
              </li>
            ))}
          </ol>
        </section>

        {/* ---- the other two games ---- */}
        <section className="section" aria-labelledby="games-title">
          <div className="section-head">
            <h2 id="games-title" className="h2">
              {n.gamesTitle}
            </h2>
          </div>
          <div className="naadam-games">
            {naadamGameIds.map((id) => {
              const p = photo(id);
              return (
                <article key={id} className="naadam-game">
                  <figure className="naadam-figure">
                    <div className="naadam-photo">
                      <Image src={p.file} alt={p.caption} fill sizes="(max-width: 820px) 100vw, 560px" />
                    </div>
                    <figcaption>
                      <PhotoCredit photo={p} lang={lang} />
                    </figcaption>
                  </figure>
                  <h3 className="h3">{n.games[id].title}</h3>
                  <p className="naadam-game-text">{n.games[id].text}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="section" aria-label={n.watchTitle}>
          <div className="guide-grid">
            <article className="guide-card">
              <h2 className="h3 guide-card-title">{n.watchTitle}</h2>
              <p className="guide-card-text">{n.watchLead}</p>
              <ul className="guide-points">
                {n.watch.map((w) => (
                  <li key={w.slice(0, 24)}>{w}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <p className="guide-note">{n.note}</p>
      </div>
    </main>
  );
}
