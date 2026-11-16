"use client";

import Image from "next/image";
import { useState } from "react";
import TransitionLink from "@/components/TransitionLink";
import { getAimags, getPhoto, provinceHref, ulaanbaatarPath } from "@/lib/aimags";
import { getDict, regionIds, type Lang, type RegionId } from "@/lib/i18n";

/*
 * Atlas-style overview map.
 * - provinces tinted by region, the land drawn as a raised plate
 * - hover/focus a province: it lifts (a highlight copy is drawn on top),
 *   the rest dims, and the side panel previews it
 * - hover/focus a legend entry: that region's provinces light up
 */

// Padded viewBox around the 1000×484 province geometry, room for neighbours' names.
const VIEWBOX = "-30 -50 1060 590";
const UB = { x: 597, y: 193 };

export default function MongoliaMap({ lang }: { lang: Lang }) {
  const t = getDict(lang);
  const aimags = getAimags(lang);
  const [active, setActive] = useState<string | null>(null);
  const [activeRegion, setActiveRegion] = useState<RegionId | null>(null);

  const current = aimags.find((a) => a.slug === active);
  const photo = current ? getPhoto(current.slug, lang) : null;
  const focusRegion = current?.regionId ?? activeRegion;

  return (
    <div className="map-layout">
      <div className="map-card atlas">
        <svg
          className={`map atlas-map${focusRegion ? " is-focused" : ""}`}
          viewBox={VIEWBOX}
          role="group"
          aria-label={t.mapAria}
          onMouseLeave={() => setActive(null)}
        >
          {/* neighbours */}
          <text className="atlas-country" x="620" y="22" aria-hidden="true">{t.mapRussia}</text>
          <text className="atlas-country" x="470" y="528" aria-hidden="true">{t.mapChina}</text>

          {/* compass */}
          <g className="atlas-compass" transform="translate(40 452)" aria-hidden="true">
            <circle r="24" />
            <path d="M0 -20 6 0 0 20 -6 0Z" className="needle-s" />
            <path d="M0 -20 6 0 -6 0Z" className="needle-n" />
            <text y="-30">{t.mapNorth}</text>
          </g>

          {/* raised land plate */}
          <g className="atlas-land">
            {aimags.map((a, i) => (
              <TransitionLink
                key={a.id}
                href={provinceHref(lang, a.slug)}
                aria-label={a.name + t.provinceSuffix}
                className={[
                  `r-${a.regionId}`,
                  a.slug === active ? "is-active" : "",
                  focusRegion === a.regionId ? "in-region" : "",
                ].join(" ")}
                onMouseEnter={() => setActive(a.slug)}
                onFocus={() => setActive(a.slug)}
                onBlur={() => setActive(null)}
              >
                <path d={a.d} style={{ animationDelay: `${i * 35}ms` }} />
              </TransitionLink>
            ))}
            <path className="ub" d={ulaanbaatarPath} />
          </g>

          {/* lifted copy of the active province, drawn above its neighbours */}
          {current && (
            <path
              key={current.slug}
              className={`atlas-lift r-${current.regionId}`}
              d={current.d}
              aria-hidden="true"
            />
          )}

          {/* labels */}
          {aimags
            .filter((a) => a.label)
            .map((a) => (
              <text
                key={a.id}
                x={a.lx}
                y={a.ly}
                className={`atlas-label${a.slug === active ? " is-active" : ""}`}
                aria-hidden="true"
              >
                {a.name}
              </text>
            ))}

          {/* capital */}
          <g className="atlas-capital" transform={`translate(${UB.x} ${UB.y})`} aria-hidden="true">
            <path d="M0 -7 2 -2.2 7.1 -2.2 3 1 4.4 6 0 3 -4.4 6 -3 1 -7.1 -2.2 -2 -2.2Z" />
            <text x="0" y="-12">{t.mapCapital}</text>
          </g>
        </svg>

        <ul className="atlas-legend" aria-label={t.mapLegend}>
          {regionIds.map((r) => (
            <li key={r}>
              <button
                type="button"
                className={`legend-item r-${r}${focusRegion === r ? " is-active" : ""}`}
                aria-pressed={activeRegion === r}
                onMouseEnter={() => setActiveRegion(r)}
                onMouseLeave={() => setActiveRegion(null)}
                onFocus={() => setActiveRegion(r)}
                onBlur={() => setActiveRegion(null)}
                onClick={() => setActiveRegion(activeRegion === r ? null : r)}
              >
                <span className="legend-swatch" aria-hidden="true" />
                {t.regions[r].name}
              </button>
            </li>
          ))}
        </ul>
        <p className="caption">{t.mapNote}</p>
      </div>

      <aside className="preview" aria-live="polite">
        {current && photo ? (
          <div className={`preview-inner r-${current.regionId}`} key={current.slug}>
            <div className="preview-media">
              <Image src={photo.file} alt={photo.caption} fill sizes="360px" />
              <span className="preview-region">{t.regions[current.regionId].name}</span>
            </div>
            <h3 className="preview-title">{current.name}</h3>
            <p className="preview-lead">{current.lead}</p>
            <dl className="preview-facts">
              <div>
                <dt>{t.capitalShort}</dt>
                <dd>{current.capital}</dd>
              </div>
              <div>
                <dt>{t.population}</dt>
                <dd>{current.pop}</dd>
              </div>
            </dl>
            <TransitionLink href={provinceHref(lang, current.slug)} className="preview-cta">
              {t.mapOpen(current.name)}
            </TransitionLink>
          </div>
        ) : (
          <div className="preview-empty">
            <svg width="44" height="44" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z" />
              <path d="M9 4v14M15 6v14" />
            </svg>
            <p>{t.mapEmpty}</p>
          </div>
        )}
      </aside>
    </div>
  );
}
