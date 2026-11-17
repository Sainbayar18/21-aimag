/*
 * Draws public/images/ger/wall-map.svg: the map that hangs on the lattice
 * inside the ger.
 *
 * It is a file rather than markup because the ger is a client component —
 * built inline, the province geometry went into the home page's JavaScript,
 * 74 kB of it, for a picture that never changes.
 *
 * The sheet's frame (229.5 x 168) and the placement inside it are the ones
 * in components/ger/GerScenes.tsx; change them in both places together.
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
const ORDER = ["west", "khangai", "central", "east"];

const SHEET = { w: 229.5, h: 168 };
const LAND = { x: 8, y: 30, scale: 0.213 }; // the 1000x484 geometry, fitted across
const INK = "rgba(58,46,30,.5)";

/* A printed wall map's furniture: the country is far wider than this sheet,
   so a title bar and the region key fill it the way a real one would. */
const parts = [
  `<rect x="72" y="12" width="86" height="5" rx="2.5" fill="${INK}"/>`,
  `<g transform="translate(${LAND.x} ${LAND.y}) scale(${LAND.scale})">`,
  ...aimags.map(
    (a) =>
      `<path d="${a.d}" fill="${FILL[REGION[a.region]]}" stroke="#fbf8f1" stroke-width="3" stroke-linejoin="round"/>`,
  ),
  `<path d="${ub.d}" fill="#b9b1a3"/>`,
  `</g>`,
  ...ORDER.map(
    (r, i) =>
      `<rect x="${12 + i * 13}" y="143" width="9" height="9" rx="1.5" fill="${FILL[r]}" stroke="rgba(58,46,30,.35)" stroke-width=".8"/>`,
  ),
  `<rect x="12" y="157" width="52" height="2.5" rx="1.25" fill="${INK}"/>`,
];

const svg =
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SHEET.w} ${SHEET.h}" ` +
  `width="${SHEET.w}" height="${SHEET.h}">${parts.join("")}</svg>`;

const out = "public/images/ger/wall-map.svg";
writeFileSync(join(root, out), svg);
console.log(`${out}: ${aimags.length} provinces, ${(svg.length / 1024).toFixed(0)} kB`);
