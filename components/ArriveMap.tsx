import { getAimags } from "@/lib/aimags";
import type { GuideText, WayId } from "@/lib/guide";
import type { Lang } from "@/lib/i18n";

/*
 * Every way into Mongolia on one map: the flights into Ulaanbaatar and the
 * border crossings open to foreign travellers, each way in its own colour.
 *
 * Drawn entirely on the server. The legend under the map is a row of links
 * to the sections below; hovering or focusing one dims the other ways, which
 * globals.css does with :has(), so the page ships no script for it.
 *
 * Places are given in real longitude and latitude and turned into the
 * 1000×484 province geometry with `at()`: the provinces are an equirectangular
 * projection of Mongolia's extent (87.74°–119.93° E, 41.58°–52.15° N).
 * Things outside Mongolia that the map only gestures at, the Altai road and
 * Kazakhstan beyond it, are drawn schematically.
 */

const VIEWBOX = "-120 -50 1160 590";

function at(lon: number, lat: number): [number, number] {
  const x = 1.1 + (lon - 87.74) * 30.99;
  const y = 3.2 + (52.15 - lat) * 45.35;
  return [Math.round(x * 10) / 10, Math.round(y * 10) / 10];
}

const PLACE = {
  ulaanbaatar: at(106.917, 47.919),
  airport: at(106.82, 47.65),
  zamynUud: at(111.9, 43.716),
  sainshand: at(110.12, 44.89),
  choir: at(108.36, 46.36),
  darkhan: at(105.97, 49.49),
  altanbulag: at(106.35, 50.28),
  ulanUde: at(107.6, 51.83),
  tsagaannuur: at(89.3, 49.7),
  koshAgach: at(88.67, 50.0),
  gornoAltaisk: at(85.96, 51.96),
  ulgii: at(89.97, 48.97),
  ereentsav: at(115.72, 49.88),
  choibalsan: at(114.53, 48.07),
  zabaykalsk: at(116.5, 50.6),
} as const;

type Pt = readonly [number, number];
const line = (...pts: Pt[]) => "M" + pts.map(([x, y]) => `${x} ${y}`).join(" L");

/** Where the line south from Zamyn-Üüd leaves the map, heading for Beijing. */
const BEIJING_EDGE: Pt = [858, 520];

type Route = { way: WayId | `${WayId} ${WayId}`; d: string; dashed?: boolean };

const ROUTES: Route[] = [
  // flights, all landing at the airport south of the city
  { way: "air", dashed: true, d: `M150 -50 Q330 70 ${PLACE.airport.join(" ")}` },
  { way: "air", dashed: true, d: `M1038 330 Q820 170 ${PLACE.airport.join(" ")}` },
  { way: "air", dashed: true, d: `M560 538 Q520 360 ${PLACE.airport.join(" ")}` },
  // the railway and the road from Erenhot, through Sainshand and Choir
  {
    way: "china",
    d: line(BEIJING_EDGE, PLACE.zamynUud, PLACE.sainshand, PLACE.choir, PLACE.ulaanbaatar),
  },
  // from Ulan-Ude over Naushki–Sükhbaatar and Kyakhta–Altanbulag, through Darkhan
  { way: "russia", d: line(PLACE.ulanUde, PLACE.altanbulag, PLACE.darkhan, PLACE.ulaanbaatar) },
  // the east: Zabaykalsky Krai to Ereentsav and on to Choibalsan
  { way: "russia", d: line(PLACE.zabaykalsk, PLACE.ereentsav, PLACE.choibalsan) },
  // the Chuysky Trakt down through the Altai Republic to Tashanta–Tsagaannuur
  {
    way: "russia kazakhstan",
    d: line(PLACE.gornoAltaisk, PLACE.koshAgach, PLACE.tsagaannuur, PLACE.ulgii),
  },
  // Kazakhstan has no border with Mongolia: the road goes north into Russia first
  {
    way: "kazakhstan",
    dashed: true,
    d: `M-64 362 C-116 236 -92 52 ${PLACE.gornoAltaisk.join(" ")}`,
  },
];

type Crossing = {
  id: "zamynUud" | "altanbulag" | "tsagaannuur" | "ereentsav";
  way: string;
  label: { dx: number; dy: number; anchor: "start" | "end" };
};

const CROSSINGS: Crossing[] = [
  { id: "zamynUud", way: "china", label: { dx: 14, dy: 8, anchor: "start" } },
  { id: "altanbulag", way: "russia", label: { dx: -14, dy: -4, anchor: "end" } },
  { id: "tsagaannuur", way: "russia kazakhstan", label: { dx: 14, dy: 8, anchor: "start" } },
  { id: "ereentsav", way: "russia", label: { dx: 14, dy: 8, anchor: "start" } },
];

export default function ArriveMap({ lang, text }: { lang: Lang; text: GuideText["arrive"] }) {
  const places = text.places;
  const [ubX, ubY] = PLACE.ulaanbaatar;

  return (
    <svg className="arrive-map" viewBox={VIEWBOX} role="img" aria-label={text.mapLabel}>
      {/* the neighbours, named where they lie */}
      <g className="arrive-country" aria-hidden="true">
        <text x="740" y="-14">{places.russia}</text>
        <text x="330" y="520">{places.china}</text>
        <text x="-116" y="408">{places.kazakhstan}</text>
      </g>

      {/* the land */}
      <g className="arrive-land" aria-hidden="true">
        {getAimags(lang).map((a) => (
          <path key={a.id} d={a.d} />
        ))}
      </g>

      {/* the ways in */}
      <g className="arrive-routes" aria-hidden="true">
        {ROUTES.map((r, i) => (
          <path
            key={i}
            d={r.d}
            data-way={r.way}
            className={`arrive-route arrive-route--${r.way.split(" ")[0]}${r.dashed ? " is-dashed" : ""}`}
          />
        ))}
      </g>

      <g className="arrive-places" aria-hidden="true">
        <text className="arrive-place arrive-place--far" x="-46" y="-12" textAnchor="middle" data-way="russia kazakhstan">
          {places.altai}
        </text>
        <text className="arrive-place arrive-place--far" x={PLACE.ulanUde[0] + 12} y={PLACE.ulanUde[1] - 2} data-way="russia">
          {places.ulanUde}
        </text>
        <text className="arrive-place arrive-place--far" x={BEIJING_EDGE[0] + 12} y={BEIJING_EDGE[1] + 2} data-way="china">
          {places.beijing}
        </text>

        {CROSSINGS.map((c) => {
          const [x, y] = PLACE[c.id];
          return (
            <g key={c.id} data-way={c.way}>
              <circle className="arrive-crossing" cx={x} cy={y} r="6.5" />
              <text className="arrive-place" x={x + c.label.dx} y={y + c.label.dy} textAnchor={c.label.anchor}>
                {places[c.id]}
              </text>
            </g>
          );
        })}

        <circle className="arrive-capital" cx={ubX} cy={ubY} r="9" />
        <text className="arrive-place arrive-place--capital" x={ubX - 16} y={ubY + 26} textAnchor="end">
          {places.ulaanbaatar}
        </text>
      </g>
    </svg>
  );
}
