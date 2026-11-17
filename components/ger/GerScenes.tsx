import { useState } from "react";
import { gerObjectIds, gerObjects, type GerObjectId } from "@/lib/guide";
import type { Lang } from "@/lib/i18n";

/*
 * The ger is two photorealistic pictures (AI-generated with Google Gemini,
 * November 2026) with the clickable parts laid over them.
 *
 * Each scene is one SVG whose viewBox is the picture's own pixel size, with the
 * picture as an <image> and the hotspots as plain shapes in the same
 * coordinates. Cropping and scaling then happen to picture and hotspots
 * together, so a hotspot can never drift off the thing it marks. On screens
 * wider than the picture the sky and roof are cropped rather than the floor,
 * so the door and the table stay whole.
 *
 * Hit areas are invisible to the mouse — no boxes over the photo. Hovering an
 * object grows its marker and shows its name instead; only keyboard focus
 * draws a ring, so keyboard users can still see where they are.
 */
const W = 1376;
const H = 768;

const EXTERIOR = "/images/ger/ger-exterior.jpg";
const INTERIOR = "/images/ger/ger-interior.jpg";

/** Clickable areas in picture pixels: x, y, width, height. */
const DOOR = { x: 588, y: 362, w: 256, h: 308 };

/*
 * Opening the door.
 *
 * LEAF is the painted board itself, measured off the photograph: it fills
 * the felt-trimmed opening and is hinged on its left edge. The board that
 * swings is a copy of the same photograph clipped to that rectangle, so
 * what moves is the real door, ornament, worn paint and all.
 *
 * THROUGH is the piece of the inside picture that lines up with the
 * opening — the stove and the altar, straight ahead of anyone standing in
 * the door. The inside picture was itself taken from the doorway, so the
 * two views agree. It is fitted into LEAF, which is what the translate and
 * scale below work out.
 */
const LEAF = { x: 596, y: 362, w: 218, h: 292 };
const THROUGH = { x: 540, y: 205, w: 300, h: 402 };
const THROUGH_S = LEAF.w / THROUGH.w;
const THROUGH_X = LEAF.x - THROUGH.x * THROUGH_S;
const THROUGH_Y = LEAF.y - THROUGH.y * THROUGH_S;
const SPOTS: Record<GerObjectId, { x: number; y: number; w: number; h: number }> = {
  map: { x: 1036, y: 276, w: 174, h: 122 },
  chest: { x: 448, y: 336, w: 160, h: 200 },
  ticket: { x: 140, y: 584, w: 196, h: 92 },
};

/* ---------------- outside ---------------- */

type ExteriorProps = { label: string; onEnter: () => void };

export function GerExterior({ label, onEnter }: ExteriorProps) {
  return (
    <>
      {/* The photograph on its own, with nothing moving in it. Animating
          inside this SVG makes the browser repaint the whole full-screen
          picture on every frame — the same lesson as the markers inside. */}
      <svg className="ger-svg ger-photo" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice">
        <image href={EXTERIOR} width={W} height={H} preserveAspectRatio="xMidYMax slice" aria-hidden="true" />
      </svg>

      {/* The door, in a layer of its own with the same viewBox and the same
          fitting, so its pixels stay over the pixels they came from however
          the picture is cropped. Each piece is an inner <svg>, whose viewport
          crops the picture to the opening: a viewport clip keeps the painted
          area down to the doorway instead of the whole photograph. */}
      {/* ger-photo as well, because every rule that keeps a hit area
          invisible is written against that class */}
      <svg
        className="ger-svg ger-photo ger-door-layer"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMax slice"
      >
        <defs>
          {/* the stove, seen from outside on a bright day: a small warm core
              in a room much darker than the steppe around it */}
          <radialGradient id="ger-hearth" cx="50%" cy="64%" r="58%">
            <stop offset="0%" stopColor="#ffd49a" stopOpacity="0.62" />
            <stop offset="34%" stopColor="#e8963c" stopOpacity="0.26" />
            <stop offset="100%" stopColor="#8d480d" stopOpacity="0" />
          </radialGradient>
          {/* the board turns its face away from the sun as it swings in */}
          <linearGradient id="ger-leaf-shade" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#120a04" stopOpacity="0.74" />
            <stop offset="58%" stopColor="#120a04" stopOpacity="0.36" />
            <stop offset="100%" stopColor="#231307" stopOpacity="0.12" />
          </linearGradient>
        </defs>

        {/* the room waiting behind the door */}
        <g className="ger-through" aria-hidden="true">
          <svg x={LEAF.x} y={LEAF.y} width={LEAF.w} height={LEAF.h} viewBox={`${LEAF.x} ${LEAF.y} ${LEAF.w} ${LEAF.h}`}>
            <rect x={LEAF.x} y={LEAF.y} width={LEAF.w} height={LEAF.h} fill="#130b05" />
            <image
              href={INTERIOR}
              width={W}
              height={H}
              transform={`translate(${THROUGH_X.toFixed(2)} ${THROUGH_Y.toFixed(2)}) scale(${THROUGH_S.toFixed(4)})`}
            />
            <rect x={LEAF.x} y={LEAF.y} width={LEAF.w} height={LEAF.h} fill="#130b05" opacity="0.44" />
            <rect x={LEAF.x} y={LEAF.y} width={LEAF.w} height={LEAF.h} fill="url(#ger-hearth)" />
          </svg>
        </g>

        {/* the door itself: the photograph's own pixels, cropped to the board */}
        <g className="ger-leaf" aria-hidden="true">
          <svg x={LEAF.x} y={LEAF.y} width={LEAF.w} height={LEAF.h} viewBox={`${LEAF.x} ${LEAF.y} ${LEAF.w} ${LEAF.h}`}>
            <image href={EXTERIOR} width={W} height={H} />
            <rect
              className="ger-leaf-shade"
              x={LEAF.x}
              y={LEAF.y}
              width={LEAF.w}
              height={LEAF.h}
              fill="url(#ger-leaf-shade)"
            />
          </svg>
        </g>

        {/* light reaching the felt and the grass around the opening */}
        <ellipse
          className="ger-spill"
          cx={LEAF.x + LEAF.w / 2}
          cy={LEAF.y + LEAF.h * 0.68}
          rx={LEAF.w * 1.05}
          ry={LEAF.h * 0.82}
          fill="url(#ger-hearth)"
          aria-hidden="true"
        />

        <g
          className="ger-door-g"
          role="button"
          tabIndex={0}
          aria-label={label}
          onClick={onEnter}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onEnter();
            }
          }}
        >
          <rect className="ger-hit" x={DOOR.x} y={DOOR.y} width={DOOR.w} height={DOOR.h} rx="10" />
        </g>
      </svg>
    </>
  );
}

/* ---------------- inside ---------------- */

type InteriorProps = {
  lang: Lang;
  active: GerObjectId | null;
  labels: Record<GerObjectId, string>;
  onPick: (id: GerObjectId) => void;
};

export function GerInterior({ active, labels, onPick }: InteriorProps) {
  const [hovered, setHovered] = useState<GerObjectId | null>(null);

  return (
    <>
      <svg className="ger-svg ger-svg--in ger-photo" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice">
        <image href={INTERIOR} width={W} height={H} preserveAspectRatio="xMidYMax slice" aria-hidden="true" />

        {gerObjectIds.map((id) => {
          const s = SPOTS[id];
          return (
            <g
              key={id}
              className={`ger-hotspot${active === id ? " is-active" : ""}`}
              role="button"
              tabIndex={0}
              aria-label={labels[id]}
              aria-pressed={active === id}
              onClick={() => onPick(id)}
              onPointerEnter={() => setHovered(id)}
              onPointerLeave={() => setHovered((v) => (v === id ? null : v))}
              onFocus={() => setHovered(id)}
              onBlur={() => setHovered((v) => (v === id ? null : v))}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onPick(id);
                }
              }}
            >
              <rect className="ger-hit" x={s.x} y={s.y} width={s.w} height={s.h} rx="12" />
            </g>
          );
        })}
      </svg>

      {/* The markers live in their own SVG without the picture: an animation
          inside the picture's SVG makes the browser repaint the whole
          full-screen image on every frame. */}
      <svg
        className="ger-svg ger-svg--in ger-pins"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
      >
        {gerObjectIds.map((id) => {
          const { anchor } = gerObjects[id];
          const lit = hovered === id || active === id;
          // the name sits on whichever side of the marker has more room
          const toLeft = anchor.x > W / 2;
          return (
            <g key={id} className={`ger-pin-g${lit ? " is-lit" : ""}`}>
              <circle className={`ger-pin${active === id ? " is-active" : ""}`} cx={anchor.x} cy={anchor.y} r="13" />
              <text
                className="ger-pin-label"
                x={toLeft ? anchor.x - 26 : anchor.x + 26}
                y={anchor.y + 7}
                textAnchor={toLeft ? "end" : "start"}
              >
                {labels[id]}
              </text>
            </g>
          );
        })}
      </svg>
    </>
  );
}
