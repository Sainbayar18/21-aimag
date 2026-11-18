import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import PhotoCredit from "@/components/PhotoCredit";
import Reveal from "@/components/Reveal";
import { getPhotoByFile } from "@/lib/aimags";
import { getAbout } from "@/lib/history";
import { getDict, isLang } from "@/lib/i18n";
import { alternates, share } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

const HERO = "/images/home.jpg";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const a = getAbout(lang);
  const hero = getPhotoByFile(HERO, lang)!;
  return {
    title: a.pageTitle,
    description: a.pageLead,
    alternates: alternates(lang, "/about"),
    ...share(lang, {
      path: "/about",
      title: `${a.pageTitle} | ${getDict(lang).brand}`,
      description: a.pageLead,
      images: [{ url: hero.file, width: hero.width, height: hero.height, alt: hero.caption }],
    }),
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

        <p className="caption about-sources">{a.sources}</p>
      </div>
    </main>
  );
}
