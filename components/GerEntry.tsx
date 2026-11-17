"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import TransitionLink from "@/components/TransitionLink";
import { useEffect, useRef, useState } from "react";
import { GerExterior, GerInterior } from "@/components/ger/GerScenes";
import { getGuide, gerObjectIds, gerObjects, type GerObjectId } from "@/lib/guide";
import type { Lang } from "@/lib/i18n";

const SEEN_KEY = "ger-entered";

/* The map comes with the whole province geometry, so it is fetched when
   somebody reaches for it rather than with the home page. */
const GerAtlas = dynamic(() => import("@/components/ger/GerAtlas"), { ssr: false });

/* How long the door takes to swing before the walk through it begins, and
   how long that walk lasts. Both are also written into globals.css. */
const DOOR_MS = 640;
const WALK_MS = 620;

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
  const [opening, setOpening] = useState(false);
  const [inside, setInside] = useState(false);
  const [active, setActive] = useState<GerObjectId | null>(null);
  const insideRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);
  const sceneRef = useRef<HTMLElement>(null);
  const doorRef = useRef<HTMLButtonElement>(null);
  /* where the sheet is on screen when it is tapped, so the panel can grow
     out of it instead of appearing from nowhere */
  const [from, setFrom] = useState<{ x: number; y: number; s: number } | null>(null);

  // Someone who has been in before shouldn't have to open the door again.
  useEffect(() => {
    try {
      if (localStorage.getItem(SEEN_KEY)) setInside(true);
    } catch {
      /* private mode, blocked storage — the door simply shows */
    }
  }, []);

  // Leaving mid-swing would otherwise set state on a gone component.
  useEffect(() => {
    const ids = timers.current;
    return () => ids.forEach(window.clearTimeout);
  }, []);

  function after(ms: number, fn: () => void) {
    timers.current.push(window.setTimeout(fn, ms));
  }

  /*
   * Opening the door: the board swings in and the light inside comes up,
   * and only then does the picture push through the doorway into the room.
   * Anyone who has asked for less movement is simply put inside.
   */
  function enter() {
    if (opening || inside) return;
    try {
      localStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* nothing to do: it just means the door shows again next time */
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInside(true);
      after(60, () => insideRef.current?.focus());
      return;
    }

    setOpening(true);
    after(DOOR_MS, () => setInside(true));
    after(DOOR_MS + WALK_MS, () => insideRef.current?.focus());
  }

  /*
   * Going back out: the room pulls back through the doorway and the door
   * swings shut behind you — the way in, run backwards. The door is what
   * shows next time too, since that is where the visitor left.
   */
  function leave() {
    if (!inside) return;
    try {
      localStorage.removeItem(SEEN_KEY);
    } catch {
      /* the room simply shows again next time */
    }
    setActive(null);
    setOpening(false);
    setInside(false);
    after(80, () => doorRef.current?.focus({ preventScroll: true }));
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
  /*
   * Tapping a thing. The chest and the ticket are doors to their pages, so a
   * tap goes straight there; marking them active first keeps them lit while
   * the page loads. The map is the map, so it comes off the wall instead.
   * Measuring the sheet first lets that panel grow out of where it hangs
   * rather than fading in over the middle of the screen.
   */
  function pick(id: GerObjectId) {
    if (id !== "map") {
      setActive(id);
      follow(id);
      return;
    }
    if (active === id) {
      setActive(null);
      return;
    }
    const sheet = sceneRef.current?.querySelector(".ger-wallmap");
    const box = sheet?.getBoundingClientRect();
    setFrom(
      box && box.width > 0
        ? {
            x: box.left + box.width / 2 - window.innerWidth / 2,
            y: box.top + box.height / 2 - window.innerHeight / 2,
            s: Math.max(0.12, box.width / Math.min(window.innerWidth * 0.92, 980)),
          }
        : null,
    );
    setActive(id);
  }

  const mapObject = g.objects.map;

  return (
    <section
      ref={sceneRef}
      className={`ger${opening ? " is-opening" : ""}${inside ? " is-inside" : ""}`}
      aria-label={g.sceneTitle}
    >
      {/* ——— outside ——— */}
      <div className="ger-stage ger-stage--out" aria-hidden={inside}>
        <GerExterior label={g.doorAria} onEnter={enter} />
        <div className="ger-out-content container">
          <p className="ger-kicker">{g.doorKicker}</p>
          <h1 className="ger-title">{g.doorTitle}</h1>
          <p className="ger-lead">{g.doorLead}</p>
          <button
            type="button"
            ref={doorRef}
            className="ger-door-cta"
            onClick={enter}
            disabled={opening}
            tabIndex={inside ? -1 : 0}
          >
            {g.doorAction}
          </button>
        </div>
      </div>

      {/* ——— inside ——— */}
      <div className="ger-stage ger-stage--in" aria-hidden={!inside} ref={insideRef} tabIndex={-1}>
        <GerInterior lang={lang} active={active} labels={labels} onPick={pick} />

        <button type="button" className="ger-back" onClick={leave} tabIndex={inside ? 0 : -1}>
          <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
            {/* a door standing open, and the way out through it */}
            <path d="M8 3.5h7.5v13H8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M8 3.5 3.5 5v11L8 16.5z" fill="currentColor" opacity=".35" />
            <path d="M12.5 10H6m0 0 2.4-2.4M6 10l2.4 2.4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {g.back}
        </button>

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
                onClick={() => pick(id)}
                aria-pressed={active === id}
                tabIndex={inside ? 0 : -1}
              >
                {g.objects[id].name}
              </button>
            </li>
          ))}
        </ul>

        {active === "map" && (
          <div
            className="ger-mapview"
            role="dialog"
            aria-modal="true"
            aria-label={mapObject.name}
            onClick={(e) => {
              if (e.target === e.currentTarget) setActive(null);
            }}
          >
            <div
              className="ger-mapview-panel"
              style={
                from
                  ? ({
                      "--from-x": `${from.x}px`,
                      "--from-y": `${from.y}px`,
                      "--from-s": from.s,
                    } as React.CSSProperties)
                  : undefined
              }
            >
              <button
                type="button"
                className="ger-mapview-close"
                onClick={() => setActive(null)}
                aria-label={g.close}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
              <GerAtlas lang={lang} />
              <div className="ger-mapview-foot">
                <p className="ger-mapview-text">{mapObject.teaser}</p>
                <button type="button" className="primary-btn" onClick={() => follow("map")}>
                  {mapObject.cta}
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 10h12M11 5l5 5-5 5" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
