import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Explorer from "@/components/Explorer";
import JsonLd from "@/components/JsonLd";
import MongoliaMap from "@/components/MongoliaMap";
import PhotoCredit from "@/components/PhotoCredit";
import Reveal from "@/components/Reveal";
import { getAimags, getPhoto, provinceHref } from "@/lib/aimags";
import { getDict, isLang } from "@/lib/i18n";
import { absolute, alternates, share } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const t = getDict(lang);
  const hero = getPhoto("home", lang);
  return {
    title: t.destinationsTitle,
    description: t.destinationsLead,
    alternates: alternates(lang, "/destinations"),
    ...share(lang, {
      path: "/destinations",
      title: `${t.destinationsTitle} | ${t.brand}`,
      description: t.destinationsLead,
      images: [{ url: hero.file, width: hero.width, height: hero.height, alt: hero.caption }],
    }),
  };
}

/** The map and the 21 provinces — moved here from the home page, which is now just the ger. */
export default async function DestinationsPage({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = getDict(lang);
  const hero = getPhoto("home", lang);

  /* The 21 provinces as one list, in the order they are shown. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t.destinationsTitle,
    description: t.destinationsLead,
    numberOfItems: getAimags(lang).length,
    itemListElement: getAimags(lang).map((a, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${a.name}${t.provinceSuffix}`,
      url: absolute(provinceHref(lang, a.slug)),
    })),
  };

  return (
    <main>
      <JsonLd data={jsonLd} />
      <section className="hero hero--about">
        <div className="hero-media">
          <Image src={hero.file} alt={hero.caption} fill priority sizes="100vw" />
        </div>
        <div className="hero-content container">
          <h1 className="hero-title anim-up" style={{ animationDelay: "180ms" }}>
            {t.destinationsTitle}
          </h1>
          <p className="hero-lead anim-up" style={{ animationDelay: "300ms" }}>
            {t.hero.lead}
          </p>
        </div>
        <PhotoCredit photo={hero} lang={lang} className="hero-credit" />
      </section>

      <div className="container stack">
        <Explorer
          lang={lang}
          middle={
            <section id="map" className="section" aria-labelledby="map-title">
              <Reveal className="section-head">
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
    </main>
  );
}
