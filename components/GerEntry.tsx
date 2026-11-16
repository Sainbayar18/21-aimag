"use client";

import { useRouter } from "next/navigation";
import TransitionLink from "@/components/TransitionLink";
import { useEffect, useRef, useState } from "react";
import { GerExterior, GerInterior } from "@/components/ger/GerScenes";
import { getGuide, gerObjectIds, gerObjects, type GerObjectId } from "@/lib/guide";
import type { Lang } from "@/lib/i18n";

const SEEN_KEY = "ger-entered";

/**
 * The landing scene: a ger door you open, and then the inside of the ger, where
 * the things standing around are the way into the rest of the site.
 *
 * It is the whole home page. Everything it leads to has its own page, and the
 * "skip" links go straight to the province list for anyone who would rather
 * not open the door.
 */
export default function GerEntry({ lang }: { lang: Lang }) {
  const router = useRouter();
  const g = getGuide(lang).ger;
  const [inside, setInside] = useState(false);
  const [active, setActive] = useState<GerObjectId | null>(null);
  const insideRef = useRef<HTMLDivElement>(null);

  // Someone who has been in before shouldn't have to open the door again.
  useEffect(() => {
    try {
      if (localStorage.getItem(SEEN_KEY)) setInside(true);
    } catch {
      /* private mode, blocked storage — the door simply shows */
    }
  }, []);

  function enter() {
    setInside(true);
    try {
      localStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* nothing to do: it just means the door shows again next time */
    }
    window.setTimeout(() => insideRef.current?.focus(), 420);
  }

  function leave() {
    setActive(null);
    setInside(false);
  }

  function follow(id: GerObjectId) {
    const { target } = gerObjects[id];
    if (target.kind === "page") {
      router.push(`/${lang}/${target.path}`);
    } else {
      document.getElementById(target.id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  const labels = Object.fromEntries(gerObjectIds.map((id) => [id, g.objects[id].name])) as Record<GerObjectId, string>;
  const card = active ? g.objects[active] : null;

  return (
    <section className={`ger${inside ? " is-inside" : ""}`} aria-label={g.sceneTitle}>
      {/* ——— outside ——— */}
      <div className="ger-stage ger-stage--out" aria-hidden={inside}>
        <GerExterior label={g.doorAria} onEnter={enter} />
        <div className="ger-out-content container">
          <p className="ger-kicker">{g.doorKicker}</p>
          <h1 className="ger-title">{g.doorTitle}</h1>
          <p className="ger-lead">{g.doorLead}</p>
          <button type="button" className="ger-door-cta" onClick={enter} tabIndex={inside ? -1 : 0}>
            {g.doorAction}
          </button>
        </div>
        <TransitionLink href={`/${lang}/destinations`} className="ger-skip" tabIndex={inside ? -1 : 0}>
          {g.skip}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 12h14M13 6l6 6-6 6" />
          </svg>
        </TransitionLink>
      </div>

      {/* ——— inside ——— */}
      <div className="ger-stage ger-stage--in" aria-hidden={!inside} ref={insideRef} tabIndex={-1}>
        <GerInterior lang={lang} active={active} labels={labels} onPick={(id) => setActive((v) => (v === id ? null : id))} />

        <div className="ger-in-top container">
          <h2 className="ger-in-title">{g.sceneTitle}</h2>
          <p className="ger-hint">{g.hint}</p>
        </div>

        {/* a plain list of the same links, so the scene is usable on a phone
            and with a screen reader without touching the drawing */}
        <ul className="ger-objects container" aria-label={g.objectsLabel}>
          {gerObjectIds.map((id) => (
            <li key={id}>
              <button
                type="button"
                className={`ger-object${active === id ? " is-active" : ""}`}
                onClick={() => setActive((v) => (v === id ? null : id))}
                aria-pressed={active === id}
                tabIndex={inside ? 0 : -1}
              >
                {g.objects[id].name}
              </button>
            </li>
          ))}
        </ul>

        {card && active && (
          <div className="ger-card" role="group" aria-label={card.name}>
            <button type="button" className="ger-card-close" onClick={() => setActive(null)} aria-label={g.close}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
            <div className="ger-card-body">
              <h3 className="ger-card-title">{card.name}</h3>
              <p className="ger-card-text">{card.teaser}</p>
            </div>
            <button type="button" className="primary-btn ger-card-cta" onClick={() => follow(active)}>
              {card.cta}
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 10h12M11 5l5 5-5 5" />
              </svg>
            </button>
          </div>
        )}

        <div className="ger-in-foot container">
          <button type="button" className="ger-back" onClick={leave} tabIndex={inside ? 0 : -1}>
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M16 10H4M9 5 4 10l5 5" />
            </svg>
            {g.back}
          </button>
          <TransitionLink href={`/${lang}/destinations`} className="ger-scroll" tabIndex={inside ? 0 : -1}>
            {g.scrollHint}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 12h14M13 6l6 6-6 6" />
            </svg>
          </TransitionLink>
        </div>
      </div>
    </section>
  );
}
