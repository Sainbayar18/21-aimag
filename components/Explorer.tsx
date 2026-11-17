"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import AimagCard from "@/components/AimagCard";
import ExperienceIcon from "@/components/ExperienceIcon";
import { ExperienceFilterContext } from "@/components/ExperienceFilter";
import Reveal from "@/components/Reveal";
import { getAimags } from "@/lib/aimags";
import { experienceIds, getDict, regionIds, type ExperienceId, type Lang } from "@/lib/i18n";

const tilePhoto: Record<ExperienceId, string> = {
  desert: "/images/umnugovi.jpg",
  lakes: "/images/khuvsgul.jpg",
  mountains: "/images/bayan-ulgii.jpg",
  heritage: "/images/uvurkhangai.jpg",
  wildlife: "/images/gallery/govi-altai-2.jpg",
  nomadic: "/images/home.jpg",
};

/** "Find your Mongolia" tiles + filterable destination grid. */
export default function Explorer({ lang, middle }: { lang: Lang; middle?: ReactNode }) {
  const t = getDict(lang);
  const aimags = getAimags(lang);
  const [filter, setFilter] = useState<ExperienceId | null>(null);

  function pick(id: ExperienceId | null, scroll = false) {
    setFilter(id);
    if (scroll) {
      // the map first, where the choice lights up the provinces; the list follows it
      const target = document.getElementById("map") ?? document.getElementById("destinations");
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  const matches = filter ? aimags.filter((a) => a.experiences.includes(filter)) : aimags;

  return (
    <ExperienceFilterContext.Provider value={{ filter, setFilter }}>
      <section className="section" aria-labelledby="experiences-title">
        <Reveal className="section-head section-head--center">
          <h2 id="experiences-title" className="h2">{t.experiencesTitle}</h2>
          <p className="lead muted">{t.experiencesLead}</p>
        </Reveal>
        <div className="tiles">
          {experienceIds.map((id, i) => (
            <Reveal key={id} delay={(i % 3) * 80}>
              <button
                type="button"
                className={`tile${filter === id ? " is-active" : ""}`}
                aria-pressed={filter === id}
                onClick={() => pick(id, true)}
              >
                <Image src={tilePhoto[id]} alt="" fill sizes="(max-width: 700px) 100vw, 33vw" />
                <span className="tile-body">
                  <span className="tile-icon">
                    <ExperienceIcon id={id} />
                  </span>
                  <span className="tile-title">{t.experiences[id].title}</span>
                  <span className="tile-text">{t.experiences[id].text}</span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      {middle}

      <section id="destinations" className="section" aria-labelledby="destinations-title">
        <Reveal className="section-head">
          <h2 id="destinations-title" className="h2">{t.destinationsTitle}</h2>
          <p className="lead muted">{t.destinationsLead}</p>
        </Reveal>

        <div className="chips" role="group" aria-label={t.filterLabel}>
          <button type="button" className={`chip${filter === null ? " is-active" : ""}`} aria-pressed={filter === null} onClick={() => pick(null)}>
            {t.filterAll}
          </button>
          {experienceIds.map((id) => (
            <button
              key={id}
              type="button"
              className={`chip${filter === id ? " is-active" : ""}`}
              aria-pressed={filter === id}
              onClick={() => pick(filter === id ? null : id)}
            >
              <ExperienceIcon id={id} size={18} />
              {t.experiences[id].title}
            </button>
          ))}
          <span className="chips-count" aria-live="polite">
            {t.resultCount(matches.length)}
          </span>
        </div>

        {filter ? (
          <div className="card-grid" key={filter}>
            {matches.map((a, i) => (
              <Reveal key={a.id} delay={(i % 4) * 60}>
                <AimagCard aimag={a} lang={lang} />
              </Reveal>
            ))}
          </div>
        ) : (
          regionIds.map((r) => {
            const list = aimags.filter((a) => a.regionId === r);
            return (
              <div key={r} className="region-block">
                <Reveal className="region-head">
                  <h3 className="h3">{t.regions[r].name}</h3>
                  <p className="region-intro">{t.regions[r].intro}</p>
                  <span className="region-count">{t.resultCount(list.length)}</span>
                </Reveal>
                <div className="card-grid">
                  {list.map((a, i) => (
                    <Reveal key={a.id} delay={(i % 4) * 60}>
                      <AimagCard aimag={a} lang={lang} />
                    </Reveal>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </section>
    </ExperienceFilterContext.Provider>
  );
}
