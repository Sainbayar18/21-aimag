/*
 * Draws public/images/ger/wall-map.svg: the map that hangs on the lattice
 * inside the ger.
 *
 * It is a file rather than markup because the ger is a client component —
 * built inline, the province geometry went into the home page's JavaScript,
 * 74 kB of it, for a picture that never changes.
 *
 * It is the atlas without its names: on the wall the land is 227 units wide,
 * where a province name would set at about two pixels. The names are in the
 * panel that opens when the map is tapped (components/ger/GerAtlas.tsx).
 *
 * The sheet's frame (242.5 x 177) is the one in components/ger/GerScenes.tsx;
 * change it in both places together.
 *
 *   node scripts/wall-map.mjs
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (p) => JSON.parse(readFileSync(join(root, p), "utf8"));

const aimags = read("data/aimags.json");
const ub = read("data/ulaanbaatar.json");

/** the same four regions the atlas uses, with the tokens from globals.css */
const REGION = {
  "Баруун бүс": "west",
  "Хангайн бүс": "khangai",
  "Төвийн бүс": "central",
  "Зүүн бүс": "east",
};
/* A step deeper than the atlas's own fills. On screen the map is 1000 units
   across and these read as tinted land; on the wall it is 227 and the same
   values wash out to blank paper. Same four hues, more of them. */
const FILL = { west: "#b7d2ea", khangai: "#b6d7a2", central: "#eccd86", east: "#e0bdab" };
/* the raised plate the atlas draws with a drop-shadow, as a layer here */
const PLATE = "#cfc2a9";
const SHEET = { w: 242.5, h: 177 };
/* the land itself, 1000x484, fitted across the sheet. The atlas's padded
   frame would fit too, but its room for the neighbours' names is empty here
   and only makes the country smaller. */
const MAP = { w: 1000, h: 484 };
const SCALE = (SHEET.w - 16) / MAP.w;
const OX = 8;
const OY = (SHEET.h - MAP.h * SCALE) / 2;

/* the same dotted ground the atlas card has in globals.css, at this scale.
   It is drawn harder than the original: at this size the pattern is what
   tells the eye the sheet is a map and not blank paper. */
const DOT = 18 * SCALE;

const parts = [
  `<defs><pattern id="d" width="${DOT.toFixed(3)}" height="${DOT.toFixed(3)}" patternUnits="userSpaceOnUse">` +
    `<circle cx="${(DOT / 2).toFixed(3)}" cy="${(DOT / 2).toFixed(3)}" r="0.3" fill="rgba(86,97,107,.3)"/>` +
    `</pattern></defs>`,
  `<rect width="${SHEET.w}" height="${SHEET.h}" fill="#fbf6ec"/>`,
  `<rect width="${SHEET.w}" height="${SHEET.h}" fill="url(#d)"/>`,
  `<g transform="translate(${OX.toFixed(3)} ${OY.toFixed(3)}) scale(${SCALE.toFixed(5)})">`,
  // the plate: the same land, widened and dropped, so the country has an
  // edge against the paper instead of fading into it
  `<g transform="translate(0 5)" fill="${PLATE}" stroke="${PLATE}" stroke-width="8" stroke-linejoin="round">`,
  ...aimags.map((a) => `<path d="${a.d}"/>`),
  `</g>`,
  ...aimags.map(
    (a) =>
      `<path d="${a.d}" fill="${FILL[REGION[a.region]]}" stroke="#fbf8f1" stroke-width="2" stroke-linejoin="round"/>`,
  ),
  `<path d="${ub.d}" fill="#a79e8e"/>`,
  `</g>`,
];

const svg =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SHEET.w} ${SHEET.h}" ` +
  `width="${SHEET.w}" height="${SHEET.h}">${parts.join("")}</svg>`;

const out = "public/images/ger/wall-map.svg";
writeFileSync(join(root, out), svg);
console.log(`${out}: ${aimags.length} provinces, ${(svg.length / 1024).toFixed(0)} kB`);
