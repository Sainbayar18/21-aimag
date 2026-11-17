import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import GuidePager from "@/components/GuidePager";
import PhotoCredit from "@/components/PhotoCredit";
import Reveal from "@/components/Reveal";
import { getFoodPhoto } from "@/lib/food";
import { dishes, dishIds, foodPhrases, getGuide } from "@/lib/guide";
import { getDict, isLang } from "@/lib/i18n";
import { alternates, share } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const f = getGuide(lang).food;
  const hero = getFoodPhoto("hero", f.pageTitle);
  return {
    title: f.pageTitle,
    description: f.metaDescription,
    alternates: alternates(lang, "/food"),
    ...share(lang, {
      path: "/food",
      title: `${f.pageTitle} | ${getDict(lang).brand}`,
      description: f.metaDescription,
      images: [{ url: hero.file, width: hero.width, height: hero.height, alt: hero.caption }],
    }),
  };
}

/**
 * Mongolian food: what to eat, where, and how to behave at the table. The
 * dishes are set like a menu — a photograph, the dish's own name in
 * Mongolian, what it is and one thing worth knowing — and the rest of the
 * page uses the guidebook rows of the culture and practical pages.
 */
export default async function FoodPage({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const g = getGuide(lang);
  const f = g.food;
  const p = g.practical;
  const hero = getFoodPhoto("hero", f.pageTitle);

  return (
    <main>
      <section className="hero hero--guide">
        <div className="hero-media">
          <Image src={hero.file} alt={hero.caption} fill priority sizes="100vw" />
        </div>
        <div className="hero-content container">
          <h1 className="hero-title anim-up" style={{ animationDelay: "180ms" }}>
            {f.pageTitle}
          </h1>
          <p className="hero-lead anim-up" style={{ animationDelay: "300ms" }}>
            {f.pageLead}
          </p>
        </div>
        <PhotoCredit photo={hero} lang={lang} className="hero-credit" />
      </section>

      <div className="container stack">
        <Reveal as="section" className="guide-intro">
          {f.intro.map((para) => (
            <p key={para.slice(0, 24)} className="about-intro">
              {para}
            </p>
          ))}
        </Reveal>

        <section className="section" aria-labelledby="dishes-title">
          <Reveal className="section-head">
            <h2 id="dishes-title" className="h2">
              {f.dishesTitle}
            </h2>
            <p className="lead muted">{f.dishesLead}</p>
          </Reveal>

          <div className="dishes">
            {dishIds.map((id) => {
              const d = dishes[id];
              const t = f.dishes[id];
              const photo = getFoodPhoto(d.photo, t.name);
              return (
                <article key={id} id={id} className="dish">
                  <figure className="dish-figure">
                    <div className="dish-photo">
                      <Image
                        src={photo.file}
                        alt={t.name}
                        fill
                        sizes="(max-width: 820px) 100vw, 420px"
                      />
                    </div>
                    <figcaption>
                      <PhotoCredit photo={photo} lang={lang} className="dish-credit" />
                    </figcaption>
                  </figure>
                  <div className="dish-body">
                    <h3 className="h3 dish-name">{t.name}</h3>
                    {/* the dish's own name, for reading off a menu or asking
                        for it; in Mongolian the heading already is that */}
                    {lang !== "mn" && (
                      <p className="dish-local">
                        <span lang="mn">{d.mn}</span>
                        <span className="dish-say">{d.say}</span>
                      </p>
                    )}
                    <p className="dish-text">{t.text}</p>
                    <p className="dish-tip">{t.tip}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="section" aria-label={f.tableTitle}>
          <div className="guide-grid">
            <article className="guide-card">
              <h2 className="h3 guide-card-title">{f.tableTitle}</h2>
              <p className="guide-card-text">{f.tableLead}</p>
              <ul className="guide-points">
                {f.table.map((pt) => (
                  <li key={pt.slice(0, 24)}>{pt}</li>
                ))}
              </ul>
            </article>
            <article className="guide-card">
              <h2 className="h3 guide-card-title">{f.whereTitle}</h2>
              <p className="guide-card-text">{f.whereLead}</p>
              <ul className="guide-points">
                {f.where.map((w) => (
                  <li key={w.title}>
                    <strong className="food-where">{w.title}</strong>
                    {w.text}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="section" aria-labelledby="food-phrases-title">
          <Reveal className="section-head">
            <h2 id="food-phrases-title" className="h2">
              {f.phrasesTitle}
            </h2>
            <p className="lead muted">{f.phrasesLead}</p>
          </Reveal>
          <Reveal>
            {/* the same table as the practical page's phrases, and the same
                explicit roles for when a phone lays its rows out as blocks */}
            <div className="phrases-wrap">
              <table className="phrases" role="table">
                <thead>
                  <tr role="row">
                    <th scope="col" role="columnheader">
                      {p.phraseHeadMn}
                    </th>
                    <th scope="col" role="columnheader">
                      {p.phraseHeadSay}
                    </th>
                    <th scope="col" role="columnheader">
                      {p.phraseHeadMeaning}
                    </th>
                  </tr>
                </thead>
                <tbody role="rowgroup">
                  {foodPhrases.map((ph, i) => (
                    <tr key={ph.mn} role="row">
                      <td lang="mn" className="phrase-mn" role="cell">
                        {ph.mn}
                      </td>
                      <td className="phrase-say" role="cell">
                        {ph.say}
                      </td>
                      <td role="cell">{f.phrases[i]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </section>

        <Reveal as="p" className="guide-note">
          {f.note}
        </Reveal>

        <GuidePager lang={lang} current="food" />
      </div>
    </main>
  );
}
