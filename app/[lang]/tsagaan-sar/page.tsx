import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import PhotoCredit from "@/components/PhotoCredit";
import { getGuide, tsagaanSarDays, tsagaanSarPhrases } from "@/lib/guide";
import { getDict, isLang } from "@/lib/i18n";
import { alternates, share } from "@/lib/seo";
import { getTsagaanSarPhoto } from "@/lib/tsagaan-sar";

type Props = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang)) return {};
  const t = getGuide(lang).tsagaanSar;
  const hero = getTsagaanSarPhoto("hero", t.heroAlt);
  return {
    title: t.pageTitle,
    description: t.metaDescription,
    alternates: alternates(lang, "/tsagaan-sar"),
    ...share(lang, {
      path: "/tsagaan-sar",
      title: `${t.pageTitle} | ${getDict(lang).brand}`,
      description: t.metaDescription,
      images: [{ url: hero.file, width: hero.width, height: hero.height, alt: hero.caption }],
    }),
  };
}

/**
 * Tsagaan Sar, opened by the white food on the table in the ger. The one bold
 * element is the run of days — the eve, the first day, the visiting — set as
 * a strip of three under their Mongolian names, since they come in that
 * order. The greeting and the table follow beside their pictures (the same
 * photo-and-text pairs as the Naadam page), then how to be a guest and what
 * to say.
 */
export default async function TsagaanSarPage({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const g = getGuide(lang);
  const t = g.tsagaanSar;
  const p = g.practical;
  const hero = getTsagaanSarPhoto("hero", t.heroAlt);
  const table = getTsagaanSarPhoto("table", t.tableAlt);
  const boov = getTsagaanSarPhoto("boov", t.boovAlt);

  return (
    <main className="tsagaan">
      <PageHero
        bed="table"
        photo={{ src: hero.file, alt: hero.caption }}
        // a tower of ul boov seen from above: its lower edge, where the
        // stamped biscuits are, not only the white food in the middle
        focus="50% 92%"
        credit={<PhotoCredit photo={hero} lang={lang} className="page-hero-credit" />}
        title={t.pageTitle}
        lead={t.pageLead}
      />

      <div className="container stack">
        <section className="guide-intro">
          {t.intro.map((para) => (
            <p key={para.slice(0, 24)} className="about-intro">
              {para}
            </p>
          ))}
        </section>

        <section className="section" aria-labelledby="days-title">
          <div className="section-head">
            <h2 id="days-title" className="h2">
              {t.daysTitle}
            </h2>
          </div>
          <ol className="tsagaan-days">
            {tsagaanSarDays.map((day, i) => (
              <li key={day.mn} className="tsagaan-day">
                <h3 className="tsagaan-day-name" lang="mn">
                  {day.mn}
                </h3>
                {lang !== "mn" && <span className="naadam-say">{day.say}</span>}
                <p className="tsagaan-day-text">{t.days[i]}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="section naadam-pair" aria-labelledby="zolgokh-title">
          <figure className="naadam-figure">
            <div className="naadam-photo">
              <Image
                src="/images/tsagaan-sar/zolgokh.jpg"
                alt={t.zolgokhAlt}
                fill
                sizes="(max-width: 900px) 100vw, 560px"
              />
            </div>
            <figcaption>
              <p className="photo-credit">{t.aiCaption}</p>
            </figcaption>
          </figure>
          <div className="naadam-copy">
            <h2 id="zolgokh-title" className="h2">
              {t.zolgokhTitle}
            </h2>
            <p className="naadam-ritual">{t.zolgokhText}</p>
          </div>
        </section>

        <section className="section naadam-pair naadam-pair--flip" aria-labelledby="table-title">
          <figure className="naadam-figure">
            <div className="naadam-photo">
              <Image src={table.file} alt={table.caption} fill sizes="(max-width: 900px) 100vw, 560px" />
            </div>
            <figcaption>
              <PhotoCredit photo={table} lang={lang} />
            </figcaption>
          </figure>
          <div className="naadam-copy">
            <h2 id="table-title" className="h2">
              {t.tableTitle}
            </h2>
            <p className="lead muted">{t.tableLead}</p>
            <ul className="guide-points tsagaan-table">
              {t.table.map((item) => (
                <li key={item.slice(0, 24)}>{item}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section tsagaan-guest" aria-label={t.guestTitle}>
          <div className="guide-grid">
            <article className="guide-card">
              <h2 className="h3 guide-card-title">{t.guestTitle}</h2>
              <p className="guide-card-text">{t.guestLead}</p>
              <figure className="tsagaan-boov">
                <div className="naadam-photo">
                  <Image src={boov.file} alt={boov.caption} fill sizes="(max-width: 820px) 100vw, 360px" />
                </div>
                <figcaption>
                  <PhotoCredit photo={boov} lang={lang} />
                </figcaption>
              </figure>
              <ul className="guide-points">
                {t.guest.map((item) => (
                  <li key={item.slice(0, 24)}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="section" aria-labelledby="ts-phrases-title">
          <div className="section-head">
            <h2 id="ts-phrases-title" className="h2">
              {t.phrasesTitle}
            </h2>
            <p className="lead muted">{t.phrasesLead}</p>
          </div>
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
                {tsagaanSarPhrases.map((ph, i) => (
                  <tr key={ph.mn} role="row">
                    <td lang="mn" className="phrase-mn" role="cell">
                      {ph.mn}
                    </td>
                    <td className="phrase-say" role="cell">
                      {ph.say}
                    </td>
                    <td role="cell">{t.phrases[i]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <p className="guide-note">{t.note}</p>
      </div>
    </main>
  );
}
