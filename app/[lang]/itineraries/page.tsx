import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import GuidePager from "@/components/GuidePager";
import PhotoCredit from "@/components/PhotoCredit";
import Reveal from "@/components/Reveal";
import TransitionLink from "@/components/TransitionLink";
import { getAimag, getPhotoByFile } from "@/lib/aimags";
import { getGuide, routes } from "@/lib/guide";
import { getDict, isLang } from "@/lib/i18n";
import { alternates, share } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

const HERO = "/images/gallery/selenge-3.jpg";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const it = getGuide(lang).itineraries;
  const hero = getPhotoByFile(HERO, lang)!;
  return {
    title: it.pageTitle,
    description: it.metaDescription,
    alternates: alternates(lang, "/itineraries"),
    ...share(lang, {
      path: "/itineraries",
      title: `${it.pageTitle} | ${getDict(lang).brand}`,
      description: it.metaDescription,
      images: [{ url: hero.file, width: hero.width, height: hero.height, alt: hero.caption }],
    }),
  };
}

export default async function ItinerariesPage({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = getDict(lang);
  const it = getGuide(lang).itineraries;
  const hero = getPhotoByFile(HERO, lang)!;

  return (
    <main>
      <section className="hero hero--guide">
        <div className="hero-media">
          <Image src={hero.file} alt={hero.caption} fill priority sizes="100vw" />
        </div>
        <div className="hero-content container">
          <h1 className="hero-title anim-up" style={{ animationDelay: "180ms" }}>
            {it.pageTitle}
          </h1>
          <p className="hero-lead anim-up" style={{ animationDelay: "300ms" }}>
            {it.pageLead}
          </p>
        </div>
        <PhotoCredit photo={hero} lang={lang} className="hero-credit" />
      </section>

      <div className="container stack">
        <ol className="routes">
          {routes.map((meta, i) => {
            const r = it.routes[meta.id];
            const photo = getPhotoByFile(meta.photo, lang);
            const provinces = meta.stops
              .map((slug) => (slug ? getAimag(slug, lang) : undefined))
              .filter((a, idx, arr) => a && arr.findIndex((b) => b?.slug === a.slug) === idx);

            return (
              <Reveal as="li" key={meta.id} className="route" delay={(i % 2) * 70}>
                <div className="route-media">
                  {photo && (
                    <Image src={photo.file} alt={photo.caption} fill sizes="(max-width: 900px) 100vw, 440px" />
                  )}
                  <span className="route-num" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="route-body">
                  <h2 className="h3 route-name">{r.name}</h2>
                  <p className="route-summary">{r.summary}</p>

                  <dl className="route-meta">
                    <div>
                      <dt>{it.daysLabel(meta.days[0], meta.days[1])}</dt>
                      <dd>{it.distanceLabel(meta.km)}</dd>
                    </div>
                    <div>
                      <dt>{it.bestTimeLabel}</dt>
                      <dd>{r.bestTime}</dd>
                    </div>
                  </dl>

                  <h3 className="label route-label">{it.stopsLabel}</h3>
                  <ol className="route-stops">
                    {r.stops.map((stop, si) => {
                      const slug = meta.stops[si];
                      const aimag = slug ? getAimag(slug, lang) : undefined;
                      return (
                        <li key={stop.place}>
                          <span className="route-stop-dot" aria-hidden="true" />
                          <p className="route-stop-place">
                            {stop.place}
                            {aimag && (
                              <TransitionLink href={`/${lang}/province/${aimag.slug}`} className="route-stop-link">
                                {aimag.name}
                                {t.provinceSuffix}
                              </TransitionLink>
                            )}
                          </p>
                          <p className="route-stop-text">{stop.text}</p>
                        </li>
                      );
                    })}
                  </ol>

                  <p className="route-tip">
                    <span className="route-tip-label">{it.tipLabel}</span>
                    {r.tip}
                  </p>

                  {provinces.length > 0 && (
                    <div className="route-provinces">
                      <h3 className="visually-hidden">{it.provincesLabel}</h3>
                      {provinces.map((a) => (
                        <TransitionLink
                          key={a!.slug}
                          href={`/${lang}/province/${a!.slug}`}
                          className="route-chip"
                          aria-label={it.openProvince(a!.name)}
                        >
                          {a!.name}
                          {t.provinceSuffix}
                        </TransitionLink>
                      ))}
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </ol>

        <Reveal as="p" className="guide-note">
          {it.note}
        </Reveal>

        <GuidePager lang={lang} current="itineraries" />
      </div>
    </main>
  );
}
