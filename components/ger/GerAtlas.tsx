"use client";

import TransitionLink from "@/components/TransitionLink";
import { getAimags, provinceHref, ulaanbaatarPath } from "@/lib/aimags";
import { getDict, type Lang } from "@/lib/i18n";

/*
 * The map that comes off the ger's wall when you tap it.
 *
 * This is the atlas from the destinations page with its side panel and legend
 * left behind: the land, the names, the capital and the compass, and every
 * province still a link. It reuses the .map and .atlas-* rules in globals.css
 * so the two maps cannot drift apart.
 *
 * It is imported lazily (components/GerEntry.tsx). Built into the home page it
 * put the whole province geometry into the first load; behind an import it is
 * fetched when someone reaches for the map, which is also when the names are
 * first worth having.
 */

// the same padded frame as the atlas, with room for the neighbours' names
const VIEWBOX = "-30 -50 1060 590";
const UB = { x: 597, y: 193 };

export default function GerAtlas({ lang }: { lang: Lang }) {
  const t = getDict(lang);
  const aimags = getAimags(lang);

  return (
    <svg className="map atlas-map ger-atlas-map" viewBox={VIEWBOX} role="group" aria-label={t.mapAria}>
      <text className="atlas-country" x="620" y="22" aria-hidden="true">
        {t.mapRussia}
      </text>
      <text className="atlas-country" x="470" y="528" aria-hidden="true">
        {t.mapChina}
      </text>

      <g className="atlas-compass" transform="translate(40 452)" aria-hidden="true">
        <circle r="24" />
        <path d="M0 -20 6 0 0 20 -6 0Z" className="needle-s" />
        <path d="M0 -20 6 0 -6 0Z" className="needle-n" />
        <text y="-30">{t.mapNorth}</text>
      </g>

      <g className="atlas-land">
        {aimags.map((a) => (
          <TransitionLink
            key={a.id}
            href={provinceHref(lang, a.slug)}
            aria-label={a.name + t.provinceSuffix}
            className={`r-${a.regionId}`}
          >
            <path d={a.d} />
          </TransitionLink>
        ))}
        <path className="ub" d={ulaanbaatarPath} />
      </g>

      {aimags
        .filter((a) => a.label)
        .map((a) => (
          <text key={a.id} x={a.lx} y={a.ly} className="atlas-label" aria-hidden="true">
            {a.name}
          </text>
        ))}

      <g className="atlas-capital" transform={`translate(${UB.x} ${UB.y})`} aria-hidden="true">
        <path d="M0 -7 2 -2.2 7.1 -2.2 3 1 4.4 6 0 3 -4.4 6 -3 1 -7.1 -2.2 -2 -2.2Z" />
        <text x="0" y="-12">
          {t.mapCapital}
        </text>
      </g>
    </svg>
  );
}
