import { getAimags } from "@/lib/aimags";
import { gerObjectIds, gerObjects, type GerObjectId } from "@/lib/guide";
import type { Lang } from "@/lib/i18n";

/*
 * The ger is drawn, not photographed: the site already builds its Mongolia map
 * out of hand-made SVG paths, and a vector ger stays sharp, stays light, and
 * takes its colours from the same tokens as the rest of the pages.
 *
 * Interior geometry. Looking in from the door, a round room reads as three
 * stacked ellipses — the roof ring (toono), the top of the lattice wall and the
 * line where that wall meets the floor. Only the far half of each is visible,
 * which is the arc from angle π to 2π.
 */
const TOONO = { cx: 600, cy: 212, rx: 150, ry: 54 };
const WALL_TOP = { cx: 600, cy: 470, rx: 555, ry: 112 };
const WALL_BOT = { cx: 600, cy: 648, rx: 555, ry: 112 };

type Ellipse = { cx: number; cy: number; rx: number; ry: number };

function on(e: Ellipse, t: number): [number, number] {
  return [e.cx + e.rx * Math.cos(t), e.cy + e.ry * Math.sin(t)];
}

/** The far (upper) half of an ellipse, left end to right end. */
function farArc(e: Ellipse) {
  return `M ${e.cx - e.rx} ${e.cy} A ${e.rx} ${e.ry} 0 0 1 ${e.cx + e.rx} ${e.cy}`;
}

/** The same arc traced back, for closing a band. */
function farArcBack(e: Ellipse) {
  return `L ${e.cx + e.rx} ${e.cy} A ${e.rx} ${e.ry} 0 0 0 ${e.cx - e.rx} ${e.cy} Z`;
}

const UNI_COUNT = 19;
const KHANA_STEPS = 30;

/* ---------------- outside ---------------- */

type ExteriorProps = { label: string; onEnter: () => void };

/**
 * The door lives inside this drawing rather than beside it: the scene is
 * cropped to whatever shape the window is, and only a door that scales with the
 * ger stays on the ger.
 */
export function GerExterior({ label, onEnter }: ExteriorProps) {
  return (
    <svg className="ger-svg" viewBox="0 0 1200 760" preserveAspectRatio="xMidYMax slice">
      <defs>
        <linearGradient id="ger-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7eaed6" />
          <stop offset="55%" stopColor="#b9d4e8" />
          <stop offset="100%" stopColor="#e4e2d2" />
        </linearGradient>
        <linearGradient id="ger-felt-out" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#ddd5c4" />
        </linearGradient>
        <linearGradient id="ger-steppe" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9aa86a" />
          <stop offset="100%" stopColor="#6f8248" />
        </linearGradient>
        <linearGradient id="ger-door-wood" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#c8872a" />
          <stop offset="50%" stopColor="#e0a84a" />
          <stop offset="100%" stopColor="#c8872a" />
        </linearGradient>
      </defs>

      <rect width="1200" height="760" fill="url(#ger-sky)" />
      {/* a low sun and a few quiet clouds */}
      <circle cx="960" cy="180" r="56" fill="#fff3d2" opacity="0.7" />
      <ellipse cx="230" cy="150" rx="118" ry="24" fill="#ffffff" opacity="0.45" />
      <ellipse cx="310" cy="176" rx="86" ry="18" fill="#ffffff" opacity="0.32" />
      <rect y="624" width="1200" height="136" fill="url(#ger-steppe)" />
      <ellipse cx="600" cy="726" rx="330" ry="32" fill="#3d4a26" opacity="0.22" />

      {/* the ger: a cylinder of felt with a shallow cone on top */}
      <ellipse cx="600" cy="720" rx="250" ry="36" fill="#ddd5c4" />
      <rect x="350" y="600" width="500" height="120" fill="url(#ger-felt-out)" />
      <path d="M350 600 Q600 320 850 600 A250 36 0 0 1 350 600 Z" fill="url(#ger-felt-out)" stroke="#b7ad99" strokeWidth="3" />
      <path d="M350 720 A250 36 0 0 0 850 720" fill="none" stroke="#b7ad99" strokeWidth="3" />
      <path d="M350 600v120M850 600v120" stroke="#b7ad99" strokeWidth="3" />
      {/* the ropes that hold the felt down */}
      <path d="M350 644 A250 36 0 0 0 850 644" fill="none" stroke="#c9bfa8" strokeWidth="3" />
      <path d="M350 684 A250 36 0 0 0 850 684" fill="none" stroke="#c9bfa8" strokeWidth="3" />

      {/* toono cap at the apex */}
      <ellipse cx="600" cy="468" rx="54" ry="17" fill="#b5762f" />
      <ellipse cx="600" cy="458" rx="54" ry="17" fill="#d99a3c" stroke="#9c6a1f" strokeWidth="3" />
      <path d="M548 458h104M600 444v28" stroke="#9c6a1f" strokeWidth="3" />

      {/* ——— the door ——— */}
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
        <rect className="ger-hit" x="498" y="584" width="204" height="142" fill="transparent" />
        <rect x="512" y="596" width="176" height="128" rx="4" fill="#a86f22" />
        <rect x="524" y="606" width="152" height="118" fill="#7c4e1c" />
        <g className="ger-leaf ger-leaf--l">
          <rect x="526" y="608" width="74" height="114" fill="url(#ger-door-wood)" stroke="#8a5620" strokeWidth="2" />
          <rect x="537" y="618" width="52" height="40" fill="none" stroke="#8a5620" strokeWidth="2.5" />
          <rect x="537" y="668" width="52" height="44" fill="none" stroke="#8a5620" strokeWidth="2.5" />
          <circle cx="593" cy="664" r="4" fill="#f4e3c0" />
        </g>
        <g className="ger-leaf ger-leaf--r">
          <rect x="600" y="608" width="74" height="114" fill="url(#ger-door-wood)" stroke="#8a5620" strokeWidth="2" />
          <rect x="611" y="618" width="52" height="40" fill="none" stroke="#8a5620" strokeWidth="2.5" />
          <rect x="611" y="668" width="52" height="44" fill="none" stroke="#8a5620" strokeWidth="2.5" />
          <circle cx="607" cy="664" r="4" fill="#f4e3c0" />
        </g>
        {/* the lintel, painted as ger doors are */}
        <rect x="512" y="582" width="176" height="18" rx="3" fill="#d99a3c" stroke="#9c6a1f" strokeWidth="2" />
      </g>
    </svg>
  );
}

/* ---------------- inside ---------------- */

type InteriorProps = {
  lang: Lang;
  active: GerObjectId | null;
  labels: Record<GerObjectId, string>;
  onPick: (id: GerObjectId) => void;
};

export function GerInterior({ lang, active, labels, onPick }: InteriorProps) {
  const aimags = getAimags(lang);

  const uni = Array.from({ length: UNI_COUNT }, (_, i) => {
    const t = Math.PI + ((i + 0.5) / UNI_COUNT) * Math.PI;
    const [x1, y1] = on(TOONO, t);
    const [x2, y2] = on(WALL_TOP, t);
    return { x1, y1, x2, y2, key: i };
  });

  const khana: { d: string; key: string }[] = [];
  for (let i = 0; i < KHANA_STEPS; i += 2) {
    const t0 = Math.PI + (i / KHANA_STEPS) * Math.PI;
    const t1 = Math.PI + ((i + 2) / KHANA_STEPS) * Math.PI;
    const [ax, ay] = on(WALL_TOP, t0);
    const [bx, by] = on(WALL_BOT, t1);
    const [cx, cy] = on(WALL_TOP, t1);
    const [dx, dy] = on(WALL_BOT, t0);
    khana.push({ d: `M${ax} ${ay} L${bx} ${by}`, key: `a${i}` });
    khana.push({ d: `M${cx} ${cy} L${dx} ${dy}`, key: `b${i}` });
  }

  function hotspot(id: GerObjectId, children: React.ReactNode) {
    return (
      <g
        className={`ger-hotspot${active === id ? " is-active" : ""}`}
        role="button"
        tabIndex={0}
        aria-label={labels[id]}
        aria-pressed={active === id}
        onClick={() => onPick(id)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onPick(id);
          }
        }}
      >
        {children}
      </g>
    );
  }

  return (
    <svg className="ger-svg ger-svg--in" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid meet">
      <defs>
        <radialGradient id="ger-in-light" cx="50%" cy="22%" r="72%">
          <stop offset="0%" stopColor="#fff6e2" />
          <stop offset="55%" stopColor="#efe3cc" />
          <stop offset="100%" stopColor="#d9c9ab" />
        </radialGradient>
        <linearGradient id="ger-shaft" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fffaf0" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#fffaf0" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="ger-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c7ae88" />
          <stop offset="100%" stopColor="#a98f69" />
        </linearGradient>
        <linearGradient id="ger-deel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1f6fae" />
          <stop offset="100%" stopColor="#14507f" />
        </linearGradient>
      </defs>

      <rect width="1200" height="800" fill="url(#ger-in-light)" />

      {/* roof felt, then the poles across it */}
      <path d={`${farArc(TOONO)} ${farArcBack(WALL_TOP)}`} fill="#e7d9bd" />
      {uni.map((u) => (
        <line key={u.key} x1={u.x1} y1={u.y1} x2={u.x2} y2={u.y2} stroke="#c8872a" strokeWidth="7" strokeLinecap="round" />
      ))}

      {/* the roof ring, open to the sky */}
      <ellipse cx={TOONO.cx} cy={TOONO.cy} rx={TOONO.rx} ry={TOONO.ry} fill="#bcd8ee" stroke="#c8872a" strokeWidth="10" />
      <path
        d={`M${TOONO.cx - TOONO.rx + 10} ${TOONO.cy} h${2 * TOONO.rx - 20} M${TOONO.cx} ${TOONO.cy - TOONO.ry + 6} v${2 * TOONO.ry - 12}`}
        stroke="#d99a3c"
        strokeWidth="5"
      />
      <ellipse cx={TOONO.cx} cy={TOONO.cy} rx={TOONO.rx * 0.6} ry={TOONO.ry * 0.6} fill="none" stroke="#d99a3c" strokeWidth="5" />
      {/* daylight falling in */}
      <path d="M455 248 L250 800 H950 L745 248 Z" fill="url(#ger-shaft)" />

      {/* lattice wall */}
      <path d={`${farArc(WALL_TOP)} ${farArcBack(WALL_BOT)}`} fill="#f0e7d4" />
      {khana.map((k) => (
        <path key={k.key} d={k.d} stroke="#b98f52" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.9" />
      ))}
      <path d={farArc(WALL_TOP)} fill="none" stroke="#a8763c" strokeWidth="6" />
      <path d={farArc(WALL_BOT)} fill="none" stroke="#a8763c" strokeWidth="5" />

      {/* floor */}
      <path d={`${farArc(WALL_BOT)} L 1200 800 L 0 800 Z`} fill="url(#ger-floor)" />
      <ellipse cx="600" cy="710" rx="330" ry="62" fill="#b9814a" opacity="0.35" />

      {/* two painted pillars */}
      <rect x="392" y="398" width="18" height="190" rx="4" fill="#c8872a" />
      <rect x="790" y="398" width="18" height="190" rx="4" fill="#c8872a" />

      {/* ——— the chest at the khoimor ——— */}
      {hotspot(
        "chest",
        <g className="ger-chest">
          <rect className="ger-hit" x="462" y="424" width="276" height="140" fill="transparent" />
          {/* what the open lid reveals */}
          <g className="ger-chest-inside">
            <rect x="488" y="452" width="224" height="60" rx="4" fill="#5b4428" />
            <path d="M506 506v-36a22 22 0 0 1 22-22h144a22 22 0 0 1 22 22v36Z" fill="url(#ger-deel)" />
            <path d="M528 448h144l-30 26h-84Z" fill="#f4e3c0" />
            <rect x="506" y="486" width="188" height="14" fill="#c8872a" />
          </g>
          <rect x="478" y="462" width="244" height="92" rx="6" fill="#a8763c" stroke="#7c4e1c" strokeWidth="4" />
          {/* painted panels */}
          <rect x="500" y="480" width="86" height="56" fill="#c8872a" stroke="#7c4e1c" strokeWidth="3" />
          <rect x="614" y="480" width="86" height="56" fill="#c8872a" stroke="#7c4e1c" strokeWidth="3" />
          <path d="M531 494h24v24h-24Zm6-6v12h12v-12m0 12h-12v12" fill="none" stroke="#7c4e1c" strokeWidth="3" strokeLinejoin="round" />
          <path d="M645 494h24v24h-24Zm6-6v12h12v-12m0 12h-12v12" fill="none" stroke="#7c4e1c" strokeWidth="3" strokeLinejoin="round" />
          {/* lid, hinged at the back */}
          <g className="ger-chest-lid">
            <rect x="470" y="440" width="260" height="30" rx="6" fill="#b9854a" stroke="#7c4e1c" strokeWidth="4" />
            <rect x="588" y="448" width="24" height="14" rx="3" fill="#f4e3c0" stroke="#7c4e1c" strokeWidth="2" />
          </g>
        </g>,
      )}

      {/* a horse-head fiddle leaning by the chest, for company */}
      <g opacity="0.95">
        <rect x="414" y="470" width="16" height="92" rx="4" fill="#8a5620" transform="rotate(-8 422 516)" />
        <rect x="400" y="548" width="42" height="34" rx="5" fill="#a8763c" stroke="#7c4e1c" strokeWidth="3" />
        <path d="M418 462c0-10 10-12 10-22" fill="none" stroke="#8a5620" strokeWidth="6" strokeLinecap="round" />
      </g>

      {/* stove and its pipe, in front of everything behind it */}
      <rect x="746" y="250" width="9" height="382" rx="3" fill="#7a6d5e" />
      <rect x="738" y="600" width="25" height="12" rx="3" fill="#6c6054" />
      <rect x="702" y="628" width="98" height="82" rx="8" fill="#6b6155" stroke="#4d453c" strokeWidth="4" />
      <rect x="718" y="656" width="42" height="30" rx="4" fill="#e8893a" />
      <rect x="692" y="706" width="118" height="11" rx="4" fill="#4d453c" />

      {/* ——— the map on the wall ——— */}
      {hotspot(
        "map",
        <g className="ger-map">
          <rect className="ger-hit" x="836" y="386" width="200" height="148" fill="transparent" />
          <rect x="845" y="396" width="182" height="128" rx="5" fill="#fffaf0" stroke="#8a5620" strokeWidth="6" />
          <svg x="857" y="412" width="158" height="96" viewBox="0 0 1000 484" preserveAspectRatio="xMidYMid meet">
            {aimags.map((a) => (
              <path key={a.id} d={a.d} fill="#d9e8f3" stroke="#0e5a9e" strokeWidth="4" />
            ))}
          </svg>
          {/* a nail and its little shadow */}
          <circle cx="936" cy="392" r="5" fill="#6c6054" />
        </g>,
      )}

      {/* ——— the low table, with the ticket on it ——— */}
      {hotspot(
        "ticket",
        <g className="ger-table">
          <rect className="ger-hit" x="176" y="596" width="300" height="140" fill="transparent" />
          <ellipse cx="326" cy="664" rx="148" ry="34" fill="#a8763c" stroke="#7c4e1c" strokeWidth="4" />
          <path d="M206 672l14 54M446 672l-14 54" stroke="#7c4e1c" strokeWidth="10" strokeLinecap="round" />
          {/* a bowl of milk tea */}
          <path d="M372 646h54l-8 24h-38Z" fill="#f4e3c0" stroke="#7c4e1c" strokeWidth="3" />
          {/* the ticket */}
          <g className="ger-ticket" transform="rotate(-7 300 640)">
            <rect x="232" y="616" width="140" height="48" rx="5" fill="#fffaf0" stroke="#8a5620" strokeWidth="3" />
            <rect x="232" y="616" width="38" height="48" rx="5" fill="#0e5a9e" />
            {/* a small aeroplane on the stub */}
            <path d="M240 644l24-7-4-6 4-2 4 4 6-2-8-8 4-2 10 7 5-1-5-7h4l7 7" fill="none" stroke="#fffaf0" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
            <path d="M284 628h74M284 638h56M284 650h40" stroke="#b98f52" strokeWidth="4" strokeLinecap="round" />
          </g>
        </g>,
      )}

      {/* a soft marker over each object so it reads as touchable */}
      {gerObjectIds.map((id) => {
        const { anchor } = gerObjects[id];
        return (
          <circle
            key={id}
            className={`ger-pin${active === id ? " is-active" : ""}`}
            cx={anchor.x}
            cy={anchor.y}
            r="13"
            pointerEvents="none"
          />
        );
      })}
    </svg>
  );
}
