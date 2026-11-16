import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import GuideIcon from "@/components/GuideIcon";
import GuidePager from "@/components/GuidePager";
import PhotoCredit from "@/components/PhotoCredit";
import Reveal from "@/components/Reveal";
import { getPhotoByFile } from "@/lib/aimags";
import { emergencyNumbers, getGuide, phrases, practicalIds } from "@/lib/guide";
import { isLang, langs } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

const HERO = "/images/gallery/dornogovi-5.jpg";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const p = getGuide(lang).practical;
  return {
    title: p.pageTitle,
    description: p.metaDescription,
    alternates: { languages: Object.fromEntries(langs.map((l) => [l, `/${l}/practical`])) },
    openGraph: { images: [HERO] },
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
            {practicalIds.map((id, i) => {
              const s = p.sections[id];
              return (
                <Reveal as="article" key={id} className="guide-card" delay={(i % 2) * 80}>
                  <span className="guide-card-icon" aria-hidden="true">
                    <GuideIcon id={id} />
                  </span>
                  <h2 className="h3 guide-card-title">{s.title}</h2>
                  <p className="guide-card-text">{s.text}</p>
                  <ul className="guide-points">
                    {s.points.map((pt) => (
                      <li key={pt.slice(0, 24)}>{pt}</li>
                    ))}
                  </ul>
                </Reveal>
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
            <div className="phrases-wrap">
              <table className="phrases">
                <thead>
                  <tr>
                    <th scope="col">{p.phraseHeadMn}</th>
                    <th scope="col">{p.phraseHeadSay}</th>
                    <th scope="col">{p.phraseHeadMeaning}</th>
                  </tr>
                </thead>
                <tbody>
                  {phrases.map((ph, i) => (
                    <tr key={ph.mn}>
                      <td lang="mn" className="phrase-mn">
                        {ph.mn}
                      </td>
                      <td className="phrase-say">{ph.say}</td>
                      <td>{p.phrases[i]}</td>
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

        <GuidePager lang={lang} current="practical" />
      </div>
    </main>
  );
}
