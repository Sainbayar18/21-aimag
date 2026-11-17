/*
 * Draws public/images/ger/wall-map.svg: the map that hangs on the lattice
 * inside the ger.
 *
 * It is a file rather than markup because the ger is a client component —
 * built inline, the province geometry went into the home page's JavaScript,
 * 74 kB of it, for a picture that never changes.
 *
 * It is the atlas without its names: on the wall the land is 215 units wide,
 * where a province name would set at about two pixels. The names are in the
 * panel that opens when the map is tapped (components/ger/GerAtlas.tsx).
 *
 * The sheet's frame (229.5 x 168) is the one in components/ger/GerScenes.tsx;
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
const FILL = { west: "#cfe0f0", khangai: "#cfe3c1", central: "#f1d9a6", east: "#ead2c6" };
const SHEET = { w: 229.5, h: 168 };
/* the atlas's padded frame, 1060x590, fitted across the sheet */
const MAP = { w: 1060, h: 590, x: -30, y: -50 };
const SCALE = (SHEET.w - 12) / MAP.w;
const OX = 6 - MAP.x * SCALE;
const OY = (SHEET.h - MAP.h * SCALE) / 2 - MAP.y * SCALE;

/* the same dotted ground the atlas card has in globals.css, at this scale */
const DOT = 18 * SCALE;

const parts = [
  `<defs><pattern id="d" width="${DOT.toFixed(3)}" height="${DOT.toFixed(3)}" patternUnits="userSpaceOnUse">` +
    `<circle cx="${(DOT / 2).toFixed(3)}" cy="${(DOT / 2).toFixed(3)}" r="0.22" fill="rgba(86,97,107,.18)"/>` +
    `</pattern></defs>`,
  `<rect width="${SHEET.w}" height="${SHEET.h}" fill="#fbf6ec"/>`,
  `<rect width="${SHEET.w}" height="${SHEET.h}" fill="url(#d)"/>`,
  `<g transform="translate(${OX.toFixed(3)} ${OY.toFixed(3)}) scale(${SCALE.toFixed(5)})">`,
  ...aimags.map(
    (a) =>
      `<path d="${a.d}" fill="${FILL[REGION[a.region]]}" stroke="#fbf8f1" stroke-width="3" stroke-linejoin="round"/>`,
  ),
  `<path d="${ub.d}" fill="#b9b1a3"/>`,
  `</g>`,
];

const svg =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SHEET.w} ${SHEET.h}" ` +
  `width="${SHEET.w}" height="${SHEET.h}">${parts.join("")}</svg>`;

const out = "public/images/ger/wall-map.svg";
writeFileSync(join(root, out), svg);
console.log(`${out}: ${aimags.length} provinces, ${(svg.length / 1024).toFixed(0)} kB`);
