import raw from "@/data/aimags.json";
import ub from "@/data/ulaanbaatar.json";
import imageData from "@/data/images.json";
import galleryData from "@/data/gallery.json";
import enData from "@/data/aimags-en.json";
import {
  packs,
  regionIdFromMn,
  type ExperienceId,
  type Lang,
  type RegionId,
  type SeasonKey,
} from "@/lib/i18n";

/* ---------------- photos ---------------- */

type RawPhoto = {
  caption: string;
  captionEn: string;
  file: string;
  title: string;
  author: string;
  license: string;
  licenseUrl: string | null;
  source: string;
  width: number;
  height: number;
};

export type Photo = Omit<RawPhoto, "captionEn">;

const photos = imageData as Record<string, RawPhoto>;
const extraPhotos = galleryData as Record<string, RawPhoto[]>;

function localizePhoto(p: RawPhoto, lang: Lang): Photo {
  const { captionEn, ...rest } = p;
  const caption =
    lang === "mn" ? p.caption : lang === "en" ? captionEn : packs[lang].captions[captionEn] ?? captionEn;
  return { ...rest, caption };
}

/** Main photo for a province slug, or "home" for the landing page. */
export function getPhoto(key: string, lang: Lang): Photo {
  return localizePhoto(photos[key] ?? photos.home, lang);
}

/** Look up any downloaded photo (main or gallery) by its public path. */
export function getPhotoByFile(file: string, lang: Lang): Photo | undefined {
  const all = [...Object.values(photos), ...Object.values(extraPhotos).flat()];
  const p = all.find((x) => x.file === file);
  return p ? localizePhoto(p, lang) : undefined;
}

/** All photos of a province: the main one first, then the gallery shots. */
export function getGallery(slug: string, lang: Lang): Photo[] {
  return [photos[slug], ...(extraPhotos[slug] ?? [])].filter(Boolean).map((p) => localizePhoto(p, lang));
}

/* ---------------- provinces ---------------- */

type RawAimag = {
  id: string;
  slug: string;
  name: string;
  region: string;
  capital: string;
  year: string;
  area: string;
  pop: string;
  lead: string;
  history: string;
  nature: string;
  sights: string[];
  d: string;
  bb: [number, number, number, number];
  lx: number;
  ly: number;
  label: boolean;
};

type EnFields = Pick<RawAimag, "name" | "capital" | "lead" | "history" | "nature" | "sights">;

export type Aimag = Omit<RawAimag, "region"> & {
  regionId: RegionId;
  experiences: ExperienceId[];
  season: SeasonKey;
};

/** What each province is best for (drives the "Find your Mongolia" filter). */
const EXPERIENCES: Record<string, ExperienceId[]> = {
  arkhangai: ["lakes", "mountains", "heritage", "nomadic"],
  "bayan-ulgii": ["mountains", "nomadic", "lakes", "heritage"],
  bayankhongor: ["desert", "mountains", "lakes", "heritage"],
  bulgan: ["heritage", "mountains", "nomadic"],
  "govi-altai": ["desert", "wildlife", "mountains"],
  govisumber: ["nomadic"],
  "darkhan-uul": ["heritage"],
  dornogovi: ["desert", "heritage"],
  dornod: ["wildlife", "lakes", "heritage"],
  dundgovi: ["desert", "heritage"],
  zavkhan: ["mountains", "lakes", "desert"],
  orkhon: ["heritage"],
  selenge: ["heritage", "nomadic"],
  sukhbaatar: ["mountains", "nomadic"],
  tuv: ["mountains", "wildlife", "nomadic", "heritage"],
  uvs: ["lakes", "mountains"],
  khovd: ["mountains", "lakes", "heritage"],
  khentii: ["heritage", "mountains", "nomadic"],
  khuvsgul: ["lakes", "mountains", "nomadic", "wildlife"],
  uvurkhangai: ["heritage", "nomadic"],
  umnugovi: ["desert", "mountains", "heritage"],
};

const SEASON: Record<string, SeasonKey> = {
  "bayan-ulgii": "eagle",
  khuvsgul: "khuvsgul",
  umnugovi: "gobi",
  dornogovi: "gobi",
  dundgovi: "gobi",
  "govi-altai": "gobi",
  bayankhongor: "gobi",
  tuv: "central",
  "darkhan-uul": "central",
  orkhon: "central",
  selenge: "central",
  govisumber: "central",
};

const en = enData as Record<string, EnFields>;

/** "55 314 км²" → "55,314 km²" for English. */
function formatNumber(s: string, group: "," | " ", areaUnit: string) {
  const grouped = group === "," ? s.replace(/(\d)\s(?=\d{3})/g, "$1,") : s;
  return grouped.replace("км²", areaUnit).trim();
}

function localize(a: RawAimag, lang: Lang): Aimag {
  const { region, ...rest } = a;
  const base: Aimag = {
    ...rest,
    regionId: regionIdFromMn[region],
    experiences: EXPERIENCES[a.slug] ?? [],
    season: SEASON[a.slug] ?? "summer",
  };
  if (lang === "mn") return base;
  if (lang === "en") {
    return { ...base, ...en[a.slug], area: formatNumber(a.area, ",", "km²"), pop: formatNumber(a.pop, ",", "") };
  }
  const pack = packs[lang];
  const { group, areaUnit } = pack.numbers;
  return {
    ...base,
    ...(pack.aimags[a.slug] ?? en[a.slug]),
    area: formatNumber(a.area, group, areaUnit),
    pop: formatNumber(a.pop, group, ""),
  };
}

const rawAimags = raw as RawAimag[];
const cache: Partial<Record<Lang, Aimag[]>> = {};

export function getAimags(lang: Lang): Aimag[] {
  const list = (cache[lang] ??= rawAimags.map((a) => localize(a, lang)));
  return list;
}

export const slugs = rawAimags.map((a) => a.slug);

export function getAimag(slug: string, lang: Lang): Aimag | undefined {
  return getAimags(lang).find((a) => a.slug === slug);
}

export function getNeighbors(slug: string, lang: Lang) {
  const list = getAimags(lang);
  const i = list.findIndex((a) => a.slug === slug);
  const n = list.length;
  return { prev: list[(i + n - 1) % n], next: list[(i + 1) % n] };
}

/* ---------------- map ---------------- */

export const ulaanbaatarPath: string = ub.d;
export const MAP_VIEWBOX = "0 0 1000 484";

/** Zoomed viewBox around a province, 4:3, with padding. */
export function zoomViewBox(a: Pick<Aimag, "bb">) {
  const [x0, y0, x1, y1] = a.bb;
  let w = Math.max(x1 - x0, 90) * 1.5;
  let h = Math.max(y1 - y0, 60) * 1.5;
  if (w / h > 4 / 3) h = (w * 3) / 4;
  else w = (h * 4) / 3;
  const cx = (x0 + x1) / 2;
  const cy = (y0 + y1) / 2;
  return {
    viewBox: [cx - w / 2, cy - h / 2, w, h].map((v) => v.toFixed(1)).join(" "),
    strokeWidth: Number((w / 400).toFixed(2)),
  };
}

export function provinceHref(lang: Lang, slug: string) {
  return `/${lang}/province/${slug}`;
}
