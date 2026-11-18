"use client";

import { useState } from "react";
import { chestItemIds, chestItems, type ChestItemId } from "@/lib/guide";
import type { GerText } from "@/lib/guide/types";

/*
 * The painted chest, opened: a photograph looking down into it, and the
 * three things lying inside, each a way to a page. They light the way the
 * things in the ger do — a warm glow behind, the thing itself brightened —
 * when a cursor finds them or their name below, and a tap opens the page.
 *
 * The picture's viewBox is its own pixels (1376×768), so the outlines in
 * chestItems sit on what they trace at any size. A thing may be several
 * pieces (the zodog, its cord and the shuudag), each outlined apart.
 */

const W = 1376;
const H = 768;
const PICTURE = "/images/ger/chest-open.jpg";

/** an outline pushed out from its middle, for the light behind it */
function spread(points: [number, number][], k: number) {
  const cx = points.reduce((n, p) => n + p[0], 0) / points.length;
  const cy = points.reduce((n, p) => n + p[1], 0) / points.length;
  return points.map(([x, y]) => `${cx + (x - cx) * k},${cy + (y - cy) * k}`).join(" ");
}
const join = (points: [number, number][]) => points.map(([x, y]) => `${x},${y}`).join(" ");

type Props = {
  g: GerText;
  onOpen: (path: string) => void;
};

export default function GerChest({ g, onOpen }: Props) {
  // lit from the picture or from the names below; both light the same thing
  const [lit, setLit] = useState<ChestItemId | null>(null);

  return (
    <div className="ger-chest">
      <svg
        className="ger-chest-svg"
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label={g.objects.chest.name}
        onPointerLeave={() => setLit(null)}
      >
        <defs>
          <filter id="ger-chest-bloom" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="22" />
          </filter>
          <filter id="ger-chest-rim" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
          {chestItemIds.map((id) => (
            <clipPath key={id} id={`ger-chest-clip-${id}`}>
              {chestItems[id].parts.map((part, i) => (
                <polygon key={i} points={join(part)} />
              ))}
            </clipPath>
          ))}
          <radialGradient id="ger-chest-pin-glow">
            <stop offset="0%" stopColor="#ffd58a" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#ffd58a" stopOpacity="0" />
          </radialGradient>
        </defs>

        <image href={PICTURE} width={W} height={H} preserveAspectRatio="xMidYMid slice" />

        {chestItemIds.map((id) => {
          const item = chestItems[id];
          const t = g.chest[id];
          return (
            <g
              key={id}
              className={`ger-chest-item${lit === id ? " is-lit" : ""}`}
              role="link"
              tabIndex={0}
              aria-label={`${t.name}: ${t.page}`}
              onPointerEnter={() => setLit(id)}
              onFocus={() => setLit(id)}
              onBlur={() => setLit(null)}
              // a mouse tap should not leave a focus box on the photograph
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => onOpen(item.path)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onOpen(item.path);
                }
              }}
            >
              {/* each piece has its own light, so the felt between the pieces
                  of the wrestler's outfit stays dark */}
              {item.parts.map((part, i) => (
                <polygon key={`g${i}`} className="ger-chest-glow" points={spread(part, 1.25)} filter="url(#ger-chest-bloom)" />
              ))}
              {item.parts.map((part, i) => (
                <polygon key={`r${i}`} className="ger-chest-rim" points={spread(part, 1.04)} filter="url(#ger-chest-rim)" />
              ))}
              <image
                className="ger-chest-copy"
                href={PICTURE}
                width={W}
                height={H}
                clipPath={`url(#ger-chest-clip-${id})`}
              />
              {item.parts.map((part, i) => (
                <polygon key={`h${i}`} className="ger-chest-hit" points={join(part)} />
              ))}
              <g className="ger-chest-pin" aria-hidden="true">
                <circle cx={item.anchor.x} cy={item.anchor.y} r="30" fill="url(#ger-chest-pin-glow)" />
                <circle className="ger-chest-pin-ring" cx={item.anchor.x} cy={item.anchor.y} r="13" />
                <circle className="ger-chest-pin-core" cx={item.anchor.x} cy={item.anchor.y} r="8" />
              </g>
            </g>
          );
        })}
      </svg>

      <div className="ger-chest-foot">
        <p className="ger-chest-text">{g.objects.chest.teaser}</p>
        <ul className="ger-chest-list">
          {chestItemIds.map((id) => (
            <li key={id}>
              <button
                type="button"
                className={`ger-chest-link${lit === id ? " is-lit" : ""}`}
                onPointerEnter={() => setLit(id)}
                onPointerLeave={() => setLit(null)}
                onFocus={() => setLit(id)}
                onBlur={() => setLit(null)}
                onClick={() => onOpen(chestItems[id].path)}
              >
                <span className="ger-chest-name">{g.chest[id].name}</span>
                <span className="ger-chest-page">{g.chest[id].page}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
