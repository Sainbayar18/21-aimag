import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import PhotoCredit from "@/components/PhotoCredit";
import { getDeelPhoto } from "@/lib/deels";
import { deelFamilyIds, deelGroups, deelIds, getGuide, type DeelId } from "@/lib/guide";
import { getDict, isLang } from "@/lib/i18n";
import { alternates, share } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

/*
 * The deels of Mongolia's peoples, opened by the silk deel in the chest.
 * A line-up of every people at the top leads down to their entries, which
 * are grouped the way Mongolian ethnography groups them. Each pictured deel
 * is a man and a woman side by side on the same pale backdrop, so the
 * differences between peoples read at a glance; where no reliable
 * description was found, the people are named but nothing is drawn.
 */

const imageFile = (id: DeelId) => `/images/deel/${id}.jpg`;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const d = getGuide(lang).deels;
  return {
    title: d.pageTitle,
    description: d.metaDescription,
    alternates: alternates(lang, "/deels"),
    ...share(lang, {
      path: "/deels",
      title: `${d.pageTitle} | ${getDict(lang).brand}`,
      description: d.metaDescription,
      images: [{ url: imageFile("khalkha"), width: 1600, height: 1200, alt: d.groups.khalkha.name }],
    }),
  };
}

export default async function DeelsPage({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const d = getGuide(lang).deels;
  const alt = (id: DeelId) => d.imageAlt.replace("{name}", d.groups[id].name);

  return (
    <main className="deels">
      <section className="deels-hero container" aria-labelledby="deels-title">
        <div className="deels-intro">
          <h1 id="deels-title" className="deels-title anim-up" style={{ animationDelay: "120ms" }}>
            {d.pageTitle}
          </h1>
          <p className="lead deels-lead anim-up" style={{ animationDelay: "240ms" }}>
            {d.pageLead}
          </p>
          <p className="guide-note">{d.note}</p>
        </div>

        <nav className="deels-lineup" aria-label={d.lineupLabel}>
          {deelIds.map((id) => (
            <a key={id} href={`#${id}`} className={`deels-lineup-item${deelGroups[id].image ? "" : " is-empty"}`}>
              <span className="deels-lineup-media" aria-hidden="true">
                {deelGroups[id].image && (
                  <Image src={imageFile(id)} alt="" width={1600} height={1200} sizes="120px" />
                )}
              </span>
              <span className="deels-lineup-name">{d.groups[id].name}</span>
            </a>
          ))}
        </nav>
      </section>

      <div className="container stack deels-body">
        {deelFamilyIds.map((family) => {
          const members = deelIds.filter((id) => deelGroups[id].family === family);
          const pictured = members.filter((id) => deelGroups[id].image);
          const unpictured = members.filter((id) => !deelGroups[id].image);
          return (
            <section key={family} className="section" aria-labelledby={`family-${family}`}>
              <div className="section-head deels-family-head">
                <h2 id={`family-${family}`} className="h2">
                  {d.families[family].title}
                </h2>
                <p className="lead muted">{d.families[family].text}</p>
              </div>

              <div className="deels-grid">
                {pictured.map((id) => {
                  const g = d.groups[id];
                  const photo = deelGroups[id].image === "photo" ? getDeelPhoto(id, d.photoCaption) : null;
                  return (
                    <article key={id} id={id} className="deel">
                      <figure className="deel-figure">
                        <Image
                          src={imageFile(id)}
                          alt={photo ? photo.caption : alt(id)}
                          width={1600}
                          height={1200}
                          sizes="(max-width: 800px) 100vw, 580px"
                        />
                        <figcaption>
                          {photo ? <PhotoCredit photo={photo} lang={lang} /> : <p className="photo-credit">{d.aiCaption}</p>}
                        </figcaption>
                      </figure>
                      <h3 className="h3 deel-name">{g.name}</h3>
                      <p className="deel-place">{g.place}</p>
                      <p className="deel-text">{g.text}</p>
                    </article>
                  );
                })}
              </div>

              {unpictured.length > 0 && (
                <ul className="deels-missing">
                  {unpictured.map((id) => {
                    const g = d.groups[id];
                    return (
                      <li key={id} id={id} className="deel deel--missing">
                        <h3 className="h3 deel-name">{g.name}</h3>
                        <p className="deel-place">{g.place}</p>
                        <p className="deel-text">{g.text}</p>
                        <p className="deel-missing-note">{d.missing}</p>
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>
          );
        })}

        <p className="guide-note">{d.sources}</p>
      </div>
    </main>
  );
}
