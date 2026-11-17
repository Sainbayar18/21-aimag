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
 * object only grows its marker, with no name beside it; only keyboard focus
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
const THROUGH = { x: 535, y: 250, w: 340, h: 455 };
const THROUGH_S = LEAF.w / THROUGH.w;
const THROUGH_X = LEAF.x - THROUGH.x * THROUGH_S;
const THROUGH_Y = LEAF.y - THROUGH.y * THROUGH_S;

/*
 * The map on the wall.
 *
 * The picture put a blurred approximation of a map there, so the site's own
 * map is printed over it instead: the real provinces, in the four region
 * colours the rest of the site uses.
 *
 * PAPER is the sheet's four corners, read off the picture — it does not hang
 * square, so the top edge rises to the right and the far edge is a little
 * taller. A quadrilateral like that needs a projective transform and SVG has
 * only affine ones, so the sheet itself is drawn as a polygon through the
 * exact corners, and the map inside it is placed with a rotation that follows
 * the top edge and clipped to the sheet. The small disagreement at the far
 * bottom corner falls on empty paper, where there is no straight edge to give
 * it away.
 *
 * Province names are left off: the land is 213 units wide here, so a name
 * would set at about two pixels.
 *
 * The drawing itself is public/images/ger/wall-map.svg, a file rather than
 * markup, because this is a client component: built inline it put the whole
 * province geometry into the home page's JavaScript, 74 kB of it, for a
 * picture that never changes. Regenerate it with scripts/wall-map.mjs.
 */
const PAPER = [
  [1016, 239],
  [1258, 224],
  [1263, 412],
  [1020, 409],
] as const;
const PAPER_POINTS = PAPER.map(([x, y]) => `${x},${y}`).join(" ");
/** the sheet pushed out from its middle, for the light behind it: a wide
    soft spread onto the lattice and a hotter rim at the sheet's own edge */
function expand(k: number) {
  const cx = PAPER.reduce((n, p) => n + p[0], 0) / PAPER.length;
  const cy = PAPER.reduce((n, p) => n + p[1], 0) / PAPER.length;
  return PAPER.map(([x, y]) => `${cx + (x - cx) * k},${cy + (y - cy) * k}`).join(" ");
}
const GLOW_WIDE = expand(1.3);
const GLOW_RIM = expand(1.09);
/** the angle of the top edge, and where the map sits inside the sheet */
const PAPER_TILT = -3.75;
/** the sheet's own frame, which the drawing is laid out in */
const SHEET = { w: 242.5, h: 177 };
const SPOTS: Record<GerObjectId, { x: number; y: number; w: number; h: number }> = {
  map: { x: 1016, y: 226, w: 248, h: 172 },
  chest: { x: 526, y: 346, w: 364, h: 226 },
  ticket: { x: 74, y: 644, w: 148, h: 100 },
};

/*
 * The chest and the ticket light up the way the map does.
 *
 * They are part of the photograph, so there is nothing to put a light
 * behind. Instead each one is drawn a second time on the light layer —
 * the same photograph, clipped to the object's outline — over a blurred
 * warm bloom: the bloom shows only round the edges, so the light seems to
 * come from behind the thing itself. The outlines are read off the picture,
 * in its own pixels: the chest with its lid standing a little proud of the
 * body, the ticket lying askew on the table.
 */
type Lamp = {
  id: Exclude<GerObjectId, "map">;
  points: readonly (readonly [number, number])[];
  bloom: number;
  /** things standing in front of the object, which its light must not fall on */
  front?: readonly ({ ellipse: [number, number, number, number] } | { rect: [number, number, number, number] })[];
};

const LAMPS: Lamp[] = [
  {
    id: "chest",
    points: [
      [528, 351],
      [887, 351],
      [887, 365],
      [883, 365],
      [883, 568],
      [532, 568],
      [532, 365],
      [528, 365],
    ],
    bloom: 1.18,
    // the pot on its trivet and the kettle stand in front of the chest
    front: [
      { ellipse: [695, 560, 90, 50] },
      { rect: [622, 560, 146, 90] },
      { ellipse: [810, 592, 32, 34] },
    ],
  },
  {
    id: "ticket",
    points: [
      [91, 679],
      [158, 666],
      [205, 715],
      [127, 738],
    ],
    bloom: 1.45,
  },
];

/** an outline pushed out from its middle, for the light behind it */
function spread(points: readonly (readonly [number, number])[], k: number) {
  const cx = points.reduce((n, p) => n + p[0], 0) / points.length;
  const cy = points.reduce((n, p) => n + p[1], 0) / points.length;
  return points.map(([x, y]) => `${cx + (x - cx) * k},${cy + (y - cy) * k}`).join(" ");
}

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

/* ---------------- the map on the wall ---------------- */

function WallMap() {
  return (
    <g className="ger-wallmap" aria-hidden="true">
      <defs>
        <clipPath id="ger-wallmap-clip">
          <polygon points={PAPER_POINTS} />
        </clipPath>
        <filter id="ger-wallmap-shade" x="-20%" y="-20%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
        <filter id="ger-wallmap-bloom" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="24" />
        </filter>
        <filter id="ger-wallmap-rim" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="7" />
        </filter>
        <linearGradient id="ger-wallmap-paper" x1="0%" y1="0%" x2="70%" y2="100%">
          <stop offset="0%" stopColor="#f8f5ec" />
          <stop offset="100%" stopColor="#ddd4c4" />
        </linearGradient>
        {/* the room is lit from the roof wheel, so the sheet darkens away
            from it, which is what seats it into the photograph */}
        <linearGradient id="ger-wallmap-tint" x1="0%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%" stopColor="#3a2612" stopOpacity="0" />
          <stop offset="100%" stopColor="#3a2612" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {/* light from behind the sheet, spilling onto the lattice when a
          cursor comes near it */}
      <polygon className="ger-wallmap-glow" points={GLOW_WIDE} filter="url(#ger-wallmap-bloom)" />
      <polygon className="ger-wallmap-rim" points={GLOW_RIM} filter="url(#ger-wallmap-rim)" />
      <polygon
        className="ger-wallmap-cast"
        points={PAPER_POINTS}
        transform="translate(3 5)"
        filter="url(#ger-wallmap-shade)"
      />
      <polygon className="ger-wallmap-sheet" points={PAPER_POINTS} />

      <g clipPath="url(#ger-wallmap-clip)">
        <image
          href="/images/ger/wall-map.svg"
          x={PAPER[0][0]}
          y={PAPER[0][1]}
          width={SHEET.w}
          height={SHEET.h}
          transform={`rotate(${PAPER_TILT} ${PAPER[0][0]} ${PAPER[0][1]})`}
        />
      </g>

      <polygon className="ger-wallmap-shade" points={PAPER_POINTS} />
      {/* the frame: a dark rule on the sheet's own edge with a pale one just
          inside it, the way a map is mounted */}
      <polygon className="ger-wallmap-frame" points={PAPER_POINTS} />
      <polygon className="ger-wallmap-mount" points={PAPER_POINTS} />
    </g>
  );
}

/* ---------------- the chest and the ticket ---------------- */

function Lamp({ id, points, bloom, front }: Lamp) {
  const outline = points.map(([x, y]) => `${x},${y}`).join(" ");
  return (
    <g className={`ger-lamp ger-lamp--${id}`} aria-hidden="true">
      <defs>
        <clipPath id={`ger-lamp-clip-${id}`}>
          <polygon points={outline} />
        </clipPath>
        {front && (
          <mask id={`ger-lamp-front-${id}`} maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
            <rect width={W} height={H} fill="#fff" />
            {front.map((f, i) =>
              "ellipse" in f ? (
                <ellipse key={i} cx={f.ellipse[0]} cy={f.ellipse[1]} rx={f.ellipse[2]} ry={f.ellipse[3]} fill="#000" />
              ) : (
                <rect key={i} x={f.rect[0]} y={f.rect[1]} width={f.rect[2]} height={f.rect[3]} fill="#000" />
              ),
            )}
          </mask>
        )}
      </defs>
      {/* the bloom and the rim share the map's blur filters (WallMap) */}
      <g mask={front ? `url(#ger-lamp-front-${id})` : undefined}>
        <polygon className="ger-lamp-glow" points={spread(points, bloom)} filter="url(#ger-wallmap-bloom)" />
        <polygon className="ger-lamp-rim" points={spread(points, 1.05)} filter="url(#ger-wallmap-rim)" />
      </g>
      {/* masked too, so the warming stops at the pot standing in front */}
      <g mask={front ? `url(#ger-lamp-front-${id})` : undefined}>
        <g clipPath={`url(#ger-lamp-clip-${id})`}>
          <image
            className="ger-lamp-copy"
            href={INTERIOR}
            width={W}
            height={H}
            preserveAspectRatio="xMidYMax slice"
          />
        </g>
      </g>
    </g>
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
              data-spot={id}
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

      {/* The map hangs in a layer of its own, for the same reason the markers
          do: its light fades in and out, and inside the picture's SVG that
          would repaint the whole full-screen photograph on every frame. */}
      <svg
        className="ger-svg ger-svg--in ger-map-layer"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
      >
        <WallMap />
        {LAMPS.map((lamp) => (
          <Lamp key={lamp.id} {...lamp} />
        ))}
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
        <defs>
          {/* warm lamplight: a zul (butter lamp) rather than a map pin */}
          <radialGradient id="ger-pin-glow">
            <stop offset="0" stopColor="#fff4d6" stopOpacity="0.95" />
            <stop offset="0.38" stopColor="#ffd88a" stopOpacity="0.5" />
            <stop offset="1" stopColor="#ffc861" stopOpacity="0" />
          </radialGradient>
        </defs>
        {gerObjectIds.map((id, i) => {
          const { anchor } = gerObjects[id];
          const lit = hovered === id || active === id;
          // No name beside the marker: the name reaches screen readers through
          // the hit area's label. Each marker breathes on its own beat, so the
          // three never pulse in step.
          return (
            <g
              key={id}
              className={`ger-pin-g${lit ? " is-lit" : ""}${active === id ? " is-active" : ""}`}
              style={{ "--pin-delay": `${i * 0.9}s` } as React.CSSProperties}
            >
              <circle className="ger-pin-glow" cx={anchor.x} cy={anchor.y} r="26" fill="url(#ger-pin-glow)" />
              <circle className="ger-pin-ripple" cx={anchor.x} cy={anchor.y} r="8" />
              <circle className="ger-pin-ring" cx={anchor.x} cy={anchor.y} r="11" />
              {/* a dark disc under the lamp, so it reads on pale paper as well as on paint */}
              <circle className="ger-pin-shade" cx={anchor.x} cy={anchor.y} r="9.5" />
              <circle className="ger-pin-core" cx={anchor.x} cy={anchor.y} r="6.5" />
            </g>
          );
        })}
      </svg>
    </>
  );
}
