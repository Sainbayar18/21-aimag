import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import PhotoCredit from "@/components/PhotoCredit";
import Reveal from "@/components/Reveal";
import { getPhotoByFile } from "@/lib/aimags";
import { emergencyNumbers, getGuide, phrases, practicalIds } from "@/lib/guide";
import { getDict, isLang } from "@/lib/i18n";
import { alternates, share } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

const HERO = "/images/gallery/dornogovi-5.jpg";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const p = getGuide(lang).practical;
  const hero = getPhotoByFile(HERO, lang)!;
  return {
    title: p.pageTitle,
    description: p.metaDescription,
    alternates: alternates(lang, "/practical"),
    ...share(lang, {
      path: "/practical",
      title: `${p.pageTitle} | ${getDict(lang).brand}`,
      description: p.metaDescription,
      images: [{ url: hero.file, width: hero.width, height: hero.height, alt: hero.caption }],
    }),
  };
}

export default async function PracticalPage({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const p = getGuide(lang).practical;
  const hero = getPhotoByFile(HERO, lang)!;

  return (
    <main>
      <section className="hero hero--guide">
        <div className="hero-media">
          <Image src={hero.file} alt={hero.caption} fill priority sizes="100vw" />
        </div>
        <div className="hero-content container">
          <h1 className="hero-title anim-up" style={{ animationDelay: "180ms" }}>
            {p.pageTitle}
          </h1>
          <p className="hero-lead anim-up" style={{ animationDelay: "300ms" }}>
            {p.pageLead}
          </p>
        </div>
        <PhotoCredit photo={hero} lang={lang} className="hero-credit" />
      </section>

      <div className="container stack">
        <section className="section">
          <div className="guide-grid">
            {practicalIds.map((id) => {
              const s = p.sections[id];
              return (
                <article key={id} className="guide-card">
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
          </div>
        </section>

        <section className="section" aria-labelledby="phrases-title">
          <Reveal className="section-head">
            <h2 id="phrases-title" className="h2">
              {p.phrasesTitle}
            </h2>
            <p className="lead muted">{p.phrasesLead}</p>
          </Reveal>
          <Reveal>
            {/* On a phone globals.css lays each row out as a block, and a
                table laid out in blocks loses its table semantics; the roles
                are what the elements mean anyway, so they are spelled out. */}
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
                  {phrases.map((ph, i) => (
                    <tr key={ph.mn} role="row">
                      <td lang="mn" className="phrase-mn" role="cell">
                        {ph.mn}
                      </td>
                      <td className="phrase-say" role="cell">
                        {ph.say}
                      </td>
                      <td role="cell">{p.phrases[i]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </section>

        <section className="band band--dark band--inset" aria-labelledby="emergency-title">
          <div className="section emergency-section">
            <Reveal className="section-head section-head--center">
              <h2 id="emergency-title" className="h2">
                {p.emergencyTitle}
              </h2>
              <p className="lead">{p.emergencyLead}</p>
            </Reveal>
            <ul className="emergency">
              {emergencyNumbers.map((num, i) => (
                <Reveal as="li" key={num} delay={i * 70}>
                  <span className="emergency-num">{num}</span>
                  <span className="emergency-label">{p.emergency[i]}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        <Reveal as="p" className="guide-note">
          {p.disclaimer}
        </Reveal>

      </div>
    </main>
  );
}
