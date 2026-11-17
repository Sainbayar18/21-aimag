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
 * The photographed sheet does not hang square: its top edge rises to the
 * right and its far edge is a little taller. Matching that would need a
 * projective transform and SVG has only affine ones, so the sheet is drawn
 * as a polygon through the frame's exact corners with a paper of its own,
 * and only the land is laid on it, turned to the top edge (see PAPER).
 *
 * Province names are left off: the land is 213 units wide here, so a name
 * would set at about two pixels.
 *
 * The drawing itself is public/images/ger/wall-map.svg, a file rather than
 * markup, because this is a client component: built inline it put the whole
 * province geometry into the home page's JavaScript, 74 kB of it, for a
 * picture that never changes. Regenerate it with scripts/wall-map.mjs.
 */
/*
 * The sheet laid exactly over the photographed map's frame: its four outer
 * corners, read off the picture at ten times and pushed half a unit out so
 * the frame's pale edge cannot show past it. The bottom-right one sits behind
 * the enamel pot, which is drawn back over it (POT_LID).
 *
 * The frame is not a rectangle and the drawing inside is, so the drawing
 * carries no paper of its own: the paper and its dotted ground belong to
 * this polygon, and only the land is laid on it, turned to the top edge.
 */
const PAPER = [
  [1024, 245.5],
  [1256.5, 230.5],
  [1255.5, 408],
  [1021, 398.5],
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

/**
 * The sheet with every edge moved in by d, as a polygon: each edge shifted
 * along its inward normal and the neighbours intersected. Unlike scaling
 * about the middle, this keeps the same distance from every edge of a sheet
 * that is not a rectangle — what a printed border needs.
 */
function inset(d: number) {
  const n = PAPER.length;
  const lines = PAPER.map(([x, y], i) => {
    const [qx, qy] = PAPER[(i + 1) % n];
    const dx = qx - x;
    const dy = qy - y;
    const len = Math.hypot(dx, dy);
    // corners run clockwise on screen, so the inside is to the right
    return { px: x - (dy / len) * d, py: y + (dx / len) * d, dx, dy };
  });
  return lines
    .map((l2, i) => {
      const l1 = lines[(i - 1 + n) % n];
      const cross = l1.dx * l2.dy - l1.dy * l2.dx;
      const t = ((l2.px - l1.px) * l2.dy - (l2.py - l1.py) * l2.dx) / cross;
      return `${(l1.px + t * l1.dx).toFixed(2)},${(l1.py + t * l1.dy).toFixed(2)}`;
    })
    .join(" ");
}
/* the printed border: a pale mount on the very edge, a white margin, then a
   strong rule with a fine one inside it, as on the photographed map */
const MOUNT_LINE = inset(1.2);
const BORDER = inset(5);
const BORDER_FINE = inset(6.4);
/*
 * The lid of the enamel pot on the shelf below the map, traced round its rim,
 * dome and knob a hair inside the edge. It stands in front of the wall, so the
 * sheet's bottom corner must go behind it: the photograph is drawn again over
 * the sheet, clipped to this outline. Inside the edge, so no lattice from
 * behind the lid is redrawn over the paper.
 */
const POT_LID = [
  [1251, 412.5],
  [1251, 408.5],
  [1255.3, 405.8],
  [1262.6, 404],
  [1268.8, 402.2],
  [1273.9, 400.9],
  [1275.3, 398],
  [1286.6, 397.8],
  [1287.8, 400.9],
  [1295, 403.3],
  [1302.3, 406.5],
  [1307.2, 410.6],
  [1305, 412.5],
]
  .map(([x, y]) => `${x},${y}`)
  .join(" ");
/** the angle of the top edge, and where the map sits inside the sheet */
const PAPER_TILT = (Math.atan2(PAPER[1][1] - PAPER[0][1], PAPER[1][0] - PAPER[0][0]) * 180) / Math.PI;
/** the sheet's own frame, which the drawing is laid out in */
const SHEET = { w: 232.5, h: 153 };
/** the dotted ground, at the size the atlas card uses, scaled to the sheet */
const DOT = (18 * (SHEET.w - 30)) / 1000;
/*
 * Where the drawing goes. Not just turned: the frame is in perspective (its
 * far edge is taller), so the drawing's rectangle is mapped onto the frame
 * by the affine transform that comes closest to all four corners at once —
 * least squares, which for a rectangle's corners has this closed form. The
 * land then follows the frame's lean instead of riding high on one side.
 */
const SHEET_MATRIX = (() => {
  const [p0, p1, p2, p3] = PAPER;
  const a = (p1[0] + p2[0] - p0[0] - p3[0]) / (2 * SHEET.w);
  const b = (p1[1] + p2[1] - p0[1] - p3[1]) / (2 * SHEET.w);
  const c = (p2[0] + p3[0] - p0[0] - p1[0]) / (2 * SHEET.h);
  const d = (p2[1] + p3[1] - p0[1] - p1[1]) / (2 * SHEET.h);
  const mx = (p0[0] + p1[0] + p2[0] + p3[0]) / 4;
  const my = (p0[1] + p1[1] + p2[1] + p3[1]) / 4;
  const e = mx - (a * SHEET.w) / 2 - (c * SHEET.h) / 2;
  const f = my - (b * SHEET.w) / 2 - (d * SHEET.h) / 2;
  return [a, b, c, d, e, f].map((v) => +v.toFixed(5)).join(" ");
})();
const SPOTS: Record<GerObjectId, { x: number; y: number; w: number; h: number }> = {
  map: { x: 1014, y: 224, w: 248, h: 190 },
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
  /**
   * Where the light gives out, top to bottom, in picture pixels. Light from
   * behind an object falls on the wall behind it, not on the floor in front,
   * so it fades out before it reaches whatever stands there.
   */
  fade?: readonly [number, number];
};

const LAMPS: Lamp[] = [
  {
    id: "chest",
    // measured close up: the lid's top face starts at y 356.5 and the lid
    // runs down to 370; the outline starts a pixel inside that edge so no
    // lattice above the lid is caught in the lit copy
    points: [
      [528, 358],
      [887, 358],
      [888, 370],
      [883, 370],
      [883, 568],
      [532, 568],
      [532, 370],
      [527, 370],
    ],
    bloom: 1.18,
    // the pot on its trivet and the kettle stand in front of the chest: a
    // soft fade above them rather than cut-outs shaped like them, whose
    // edges showed on the floor
    fade: [500, 556],
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
          // a mouse tap should not leave a focus box on the photograph;
          // the keyboard still focuses it and gets its ring
          onMouseDown={(e) => e.preventDefault()}
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
        <clipPath id="ger-wallmap-front">
          <polygon points={POT_LID} />
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
          <stop offset="0%" stopColor="#fbf6ec" />
          <stop offset="100%" stopColor="#ebe3d3" />
        </linearGradient>
        <pattern
          id="ger-wallmap-dots"
          width={DOT}
          height={DOT}
          patternUnits="userSpaceOnUse"
          patternTransform={`rotate(${PAPER_TILT})`}
        >
          <circle cx={DOT / 2} cy={DOT / 2} r="0.3" fill="rgba(86,97,107,.3)" />
        </pattern>
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
      {/* the dotted ground stops at the border; the margin is plain paper */}
      <polygon points={BORDER} fill="url(#ger-wallmap-dots)" />

      <g clipPath="url(#ger-wallmap-clip)">
        <image
          href="/images/ger/wall-map.svg"
          width={SHEET.w}
          height={SHEET.h}
          transform={`matrix(${SHEET_MATRIX})`}
        />
      </g>

      <polygon className="ger-wallmap-shade" points={PAPER_POINTS} />
      {/* the frame: a dark rule on the sheet's own edge with a pale one just
          inside it, the way a map is mounted */}
      <polygon className="ger-wallmap-frame" points={PAPER_POINTS} />
      <polygon className="ger-wallmap-mount" points={MOUNT_LINE} />
      <polygon className="ger-wallmap-border" points={BORDER} />
      <polygon className="ger-wallmap-border-fine" points={BORDER_FINE} />

      {/* the enamel pot on the shelf stands in front of the sheet's corner */}
      <g clipPath="url(#ger-wallmap-front)">
        <image href={INTERIOR} width={W} height={H} preserveAspectRatio="xMidYMax slice" />
      </g>
    </g>
  );
}

/* ---------------- the chest and the ticket ---------------- */

function Lamp({ id, points, bloom, fade }: Lamp) {
  const outline = points.map(([x, y]) => `${x},${y}`).join(" ");
  return (
    <g className={`ger-lamp ger-lamp--${id}`} aria-hidden="true">
      <defs>
        <clipPath id={`ger-lamp-clip-${id}`}>
          <polygon points={outline} />
        </clipPath>
        {fade && (
          <>
            <linearGradient
              id={`ger-lamp-fade-grad-${id}`}
              gradientUnits="userSpaceOnUse"
              x1="0"
              y1={fade[0]}
              x2="0"
              y2={fade[1]}
            >
              <stop offset="0" stopColor="#fff" />
              <stop offset="1" stopColor="#000" />
            </linearGradient>
            <mask id={`ger-lamp-fade-${id}`} maskUnits="userSpaceOnUse" x="0" y="0" width={W} height={H}>
              <rect width={W} height={H} fill={`url(#ger-lamp-fade-grad-${id})`} />
            </mask>
          </>
        )}
      </defs>
      {/* the bloom and the rim share the map's blur filters (WallMap) */}
      <g mask={fade ? `url(#ger-lamp-fade-${id})` : undefined}>
        <polygon className="ger-lamp-glow" points={spread(points, bloom)} filter="url(#ger-wallmap-bloom)" />
        <polygon className="ger-lamp-rim" points={spread(points, 1.05)} filter="url(#ger-wallmap-rim)" />
      </g>
      {/* faded the same way, so the warming does not reach the pot either */}
      <g mask={fade ? `url(#ger-lamp-fade-${id})` : undefined}>
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
              // no focus box after a mouse tap; keyboard focus keeps its ring
              onMouseDown={(e) => e.preventDefault()}
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
