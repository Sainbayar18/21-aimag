import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import AimagCard from "@/components/AimagCard";
import ExperienceIcon from "@/components/ExperienceIcon";
import JsonLd from "@/components/JsonLd";
import LocatorMap from "@/components/LocatorMap";
import PhotoSlider from "@/components/PhotoSlider";
import TransitionLink from "@/components/TransitionLink";
import { getAimag, getGallery, getNeighbors, getPhoto, slugs } from "@/lib/aimags";
import { getDict, isLang, langs } from "@/lib/i18n";
import { absolute, alternates, share } from "@/lib/seo";

type Props = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams() {
  return langs.flatMap((lang) => slugs.map((slug) => ({ lang, slug })));
}

// An unknown slug renders the 404 inside the language layout instead of
// Next's bare default page.
export const dynamicParams = true;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLang(lang)) return {};
  const a = getAimag(slug, lang);
  if (!a) return {};
  const t = getDict(lang);
  const photo = getPhoto(slug, lang);
  return {
    title: a.name + t.provinceSuffix,
    description: a.lead,
    alternates: alternates(lang, `/province/${slug}`),
    ...share(lang, {
      path: `/province/${slug}`,
      type: "article",
      title: `${a.name}${t.provinceSuffix} | ${t.brand}`,
      description: a.lead,
      images: [{ url: photo.file, width: photo.width, height: photo.height, alt: photo.caption }],
    }),
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
  const url = absolute(`/${lang}/province/${slug}`);

  /* The province as a place a search engine can understand, plus the trail
     back to the province list. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "TouristDestination",
        "@id": `${url}#place`,
        name: `${a.name}${t.provinceSuffix}`,
        description: a.lead,
        url,
        inLanguage: lang,
        image: gallery.slice(0, 5).map((p) => absolute(p.file)),
        address: { "@type": "PostalAddress", addressCountry: "MN", addressRegion: a.name },
        containedInPlace: { "@type": "Country", name: "Mongolia", sameAs: "https://www.wikidata.org/wiki/Q711" },
        includesAttraction: a.sights.map((s) => ({ "@type": "TouristAttraction", name: s })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t.brand, item: absolute(`/${lang}`) },
          { "@type": "ListItem", position: 2, name: t.destinationsTitle, item: absolute(`/${lang}/destinations`) },
          { "@type": "ListItem", position: 3, name: `${a.name}${t.provinceSuffix}` },
        ],
      },
    ],
  };

  const facts = [
    { label: t.facts.capital, value: a.capital },
    { label: t.facts.founded, value: t.foundedValue(a.year) },
    { label: t.facts.area, value: a.area },
    { label: t.facts.population, value: a.pop },
  ];

  return (
    <main>
      <JsonLd data={jsonLd} />
      <PhotoSlider photos={gallery} lang={lang} label={t.photosLabel(a.name)} className="hero--aimag">
        <div className="hero-content container">
          <TransitionLink href={`/${lang}/destinations`} className="back-link back-link--light anim-up">
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 4l-6 6 6 6" />
            </svg>
            {t.allProvinces}
          </TransitionLink>
          <p className="hero-region anim-up" style={{ animationDelay: "120ms" }}>
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
        <div className="detail-grid">
          <div className="detail-text">
            <section className="text-block">
              <h2 className="h2">{t.history}</h2>
              <p>{a.history}</p>
            </section>
            <section className="text-block">
              <h2 className="h2">{t.nature}</h2>
              <p>{a.nature}</p>
            </section>
            <section className="text-block">
              <h2 className="h2">{t.highlights}</h2>
              <ul className="sights">
                {a.sights.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </section>
          </div>

          {/* the facts a traveller checks, together in one panel beside the text */}
          <aside className="detail-side">
            <div className="info-card">
              <dl className="fact-list">
                {facts.map((f) => (
                  <div key={f.label}>
                    <dt>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
                <div>
                  <dt>{t.bestTime}</dt>
                  <dd className="fact-long">{t.seasonNames[a.season]}</dd>
                </div>
              </dl>
              <h2 className="side-heading">{t.experiencesHere}</h2>
              <ul className="exp-list">
                {a.experiences.map((e) => (
                  <li key={e}>
                    <ExperienceIcon id={e} size={18} />
                    {t.experiences[e].title}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="side-heading">{t.location}</h2>
              <LocatorMap aimag={a} lang={lang} />
            </div>
          </aside>
        </div>

        {gallery.length > 1 && (
          <section className="section">
            <h2 className="h2">{t.gallery}</h2>
            <div className={`gallery gallery--${Math.min(gallery.length, 5)}`}>
              {gallery.map((p) => (
                <figure key={p.file} className="gallery-item">
                  <Image src={p.file} alt={p.caption} fill sizes="(max-width: 700px) 100vw, 50vw" />
                  <figcaption>{p.caption}</figcaption>
                </figure>
              ))}
            </div>
          </section>
        )}

        <nav className="pager">
          <h2 className="visually-hidden">{t.pagerLabel}</h2>
          <AimagCard aimag={prev} lang={lang} eyebrow={t.prev} compact />
          <AimagCard aimag={next} lang={lang} eyebrow={t.next} compact />
        </nav>
      </div>
    </main>
  );
}
