/**
 * Language-independent data for the guide pages: ids, route skeletons, phrases
 * and numbers. Only the prose around these lives in the per-language files.
 */

/* ---------------- ids ---------------- */

export const cultureIds = ["ger", "greetings", "food", "naadam", "music", "faith", "script", "year"] as const;
export type CultureId = (typeof cultureIds)[number];

export const practicalIds = [
  "visa",
  "arriving",
  "around",
  "money",
  "connect",
  "health",
  "stay",
  "pack",
  "respect",
] as const;
export type PracticalId = (typeof practicalIds)[number];

/** The ways into Mongolia on the getting-here page, in the order they are shown. */
export const wayIds = ["air", "china", "russia", "kazakhstan"] as const;
export type WayId = (typeof wayIds)[number];

export const routeIds = ["short", "orkhon", "gobi", "khuvsgul", "east", "altai"] as const;
export type RouteId = (typeof routeIds)[number];

/**
 * Things standing in the ger on the landing scene. Add an id here, give it a
 * place in `gerObjects` below, a clickable area in components/ger/GerScenes.tsx
 * (SPOTS) and text in each language file, and it appears.
 */
export const gerObjectIds = ["map", "chest", "ticket", "pot"] as const;
export type GerObjectId = (typeof gerObjectIds)[number];

export type GerObjectMeta = {
  id: GerObjectId;
  /** where the pulsing marker sits, in pixels of the 1376×768 interior picture */
  anchor: { x: number; y: number };
  /** an in-page anchor on the home page, or a path under /{lang} */
  target: { kind: "hash"; id: string } | { kind: "page"; path: string };
};

export const gerObjects: Record<GerObjectId, GerObjectMeta> = {
  map: { id: "map", anchor: { x: 1236, y: 386 }, target: { kind: "page", path: "destinations" } },
  chest: { id: "chest", anchor: { x: 586, y: 400 }, target: { kind: "page", path: "culture" } },
  ticket: { id: "ticket", anchor: { x: 146, y: 684 }, target: { kind: "page", path: "getting-here" } },
  pot: { id: "pot", anchor: { x: 700, y: 574 }, target: { kind: "page", path: "food" } },
};

/* ---------------- the chest ---------------- */

/**
 * What lies in the painted chest when it is opened (public/images/ger/
 * chest-open.jpg, seen from straight above, measured in its own 1376×768
 * pixels): each thing is outlined for its light, has a marker, and leads
 * to a page.
 */
export const chestItemIds = ["book", "deel", "zodog", "snuff"] as const;
export type ChestItemId = (typeof chestItemIds)[number];

/**
 * parts: one outline per piece. Most things are one piece; the snuff bottle
 * is three — the bottle, its spoon and its pouch — outlined apart, so the
 * felt between them stays dark when they light.
 */
export const chestItems: Record<
  ChestItemId,
  { path: string; anchor: { x: number; y: number }; parts: [number, number][][] }
> = {
  // the history book, an old green cloth hardback with frayed, yellowed edges
  book: {
    path: "history",
    anchor: { x: 252, y: 432 },
    parts: [
      [
        [157, 309], [198, 299], [298, 296], [332, 301], [361, 313], [371, 330],
        [365, 405], [357, 455], [355, 513], [340, 551], [240, 563], [148, 553],
        [128, 538], [144, 468], [153, 393], [155, 318],
      ],
    ],
  },
  // the folded blue silk deel, collar to hem
  deel: {
    path: "deels",
    anchor: { x: 525, y: 470 },
    parts: [
      [
        [490, 244], [560, 245], [570, 258], [675, 265], [680, 285], [673, 435],
        [668, 555], [660, 568], [560, 575], [380, 565], [368, 545], [380, 460],
        [388, 320], [405, 280], [435, 254], [483, 250],
      ],
    ],
  },
  // the wrestler's red zodog, the shuudag laid on it; the loose ties are left out
  zodog: {
    path: "culture#naadam",
    anchor: { x: 760, y: 468 },
    parts: [
      [
        [827, 276], [888, 276], [971, 298], [1016, 329], [1049, 418], [1043, 462],
        [1027, 484], [1012, 492], [1016, 523], [1010, 557], [882, 565], [727, 551],
        [718, 501], [677, 451], [674, 401], [693, 345], [738, 295], [799, 284],
      ],
    ],
  },
  // the agate snuff bottle with its coral stopper, its spoon and its pouch;
  // the snuff bottle is passed and returned in the greeting
  snuff: {
    path: "culture#greetings",
    anchor: { x: 1164, y: 476 },
    parts: [
      [
        [1075, 401], [1081, 399], [1087, 401], [1090, 412], [1097, 420], [1110, 440],
        [1116, 465], [1110, 490], [1095, 502], [1078, 504], [1060, 496], [1052, 472],
        [1053, 447], [1060, 428], [1068, 416], [1072, 405],
      ],
      [
        [1092, 357], [1101, 359], [1103, 367], [1150, 397], [1147, 404], [1096, 372],
        [1090, 365],
      ],
      [
        [1120, 407], [1158, 402], [1195, 404], [1203, 420], [1206, 453], [1211, 497],
        [1201, 515], [1181, 524], [1131, 523], [1122, 505], [1119, 470], [1121, 440],
      ],
    ],
  },
};

/* ---------------- deels ---------------- */

/**
 * The peoples on the deels page, grouped the way Mongolian ethnography groups
 * them, each family in the order shown. `image` says what stands for the
 * deel: an AI illustration drawn from written descriptions (public/images/
 * deel/{id}.jpg), a credited photograph (data/deel-photos.json), or nothing
 * where no reliable description was found to draw from.
 */
export const deelFamilyIds = ["khalkha", "west", "northEast", "turkic"] as const;
export type DeelFamilyId = (typeof deelFamilyIds)[number];

export const deelIds = [
  "khalkha",
  "durvud",
  "bayad",
  "zakhchin",
  "torguud",
  "uriankhai",
  "myangad",
  "oold",
  "khotgoid",
  "sartuul",
  "buryat",
  "barga",
  "darkhad",
  "dariganga",
  "uzemchin",
  "kazakh",
  "tsaatan",
  "khamnigan",
  "khoton",
] as const;
export type DeelId = (typeof deelIds)[number];

export const deelGroups: Record<DeelId, { family: DeelFamilyId; image: "ai" | "photo" | null }> = {
  khalkha: { family: "khalkha", image: "ai" },
  durvud: { family: "west", image: "ai" },
  bayad: { family: "west", image: "ai" },
  zakhchin: { family: "west", image: "ai" },
  torguud: { family: "west", image: "ai" },
  uriankhai: { family: "west", image: "ai" },
  myangad: { family: "west", image: "ai" },
  oold: { family: "west", image: null },
  khotgoid: { family: "west", image: null },
  sartuul: { family: "west", image: null },
  buryat: { family: "northEast", image: "ai" },
  barga: { family: "northEast", image: "ai" },
  darkhad: { family: "northEast", image: "ai" },
  dariganga: { family: "northEast", image: "ai" },
  uzemchin: { family: "northEast", image: null },
  kazakh: { family: "turkic", image: "photo" },
  tsaatan: { family: "turkic", image: "ai" },
  khamnigan: { family: "turkic", image: "ai" },
  khoton: { family: "turkic", image: null },
};

/* ---------------- food ---------------- */

/** The dishes on the food page, in the order they are shown. */
export const dishIds = ["buuz", "khuushuur", "tsuivan", "shul", "khorkhog", "tsai", "airag", "dairy"] as const;
export type DishId = (typeof dishIds)[number];

/**
 * Each dish's own name in Mongolian, how to say it, and its photo — a key
 * into data/food-photos.json, where the credits are.
 */
export const dishes: Record<DishId, { mn: string; say: string; photo: string }> = {
  buuz: { mn: "Бууз", say: "buuz", photo: "buuz" },
  khuushuur: { mn: "Хуушуур", say: "khuushuur", photo: "khuushuur" },
  tsuivan: { mn: "Цуйван", say: "tsuivan", photo: "tsuivan" },
  shul: { mn: "Гурилтай шөл", say: "guriltai shul", photo: "shul" },
  khorkhog: { mn: "Хорхог", say: "khorkhog", photo: "khorkhog" },
  tsai: { mn: "Сүүтэй цай", say: "suutei tsai", photo: "tsai" },
  airag: { mn: "Айраг", say: "airag", photo: "airag" },
  dairy: { mn: "Цагаан идээ", say: "tsagaan idee", photo: "dairy" },
};

/* ---------------- routes ---------------- */

export type RouteMeta = {
  id: RouteId;
  /** Suggested length in days: [from, to]; equal values mean a fixed length. */
  days: [number, number];
  /** Rough driving distance in km — a planning figure, not an exact route. */
  km: number;
  photo: string;
  /** Province slug per stop, in order; null for a stop that is not a province. */
  stops: (string | null)[];
};

export const routeMeta: Record<RouteId, RouteMeta> = {
  short: {
    id: "short",
    days: [3, 4],
    km: 300,
    photo: "/images/gallery/tuv-3.jpg",
    stops: [null, "tuv", "tuv"],
  },
  orkhon: {
    id: "orkhon",
    days: [6, 7],
    km: 1200,
    photo: "/images/uvurkhangai.jpg",
    stops: ["tuv", "uvurkhangai", "arkhangai", "bulgan"],
  },
  gobi: {
    id: "gobi",
    days: [8, 9],
    km: 1700,
    photo: "/images/umnugovi.jpg",
    stops: ["dundgovi", "umnugovi", "bayankhongor", "uvurkhangai"],
  },
  khuvsgul: {
    id: "khuvsgul",
    days: [8, 10],
    km: 1800,
    photo: "/images/khuvsgul.jpg",
    stops: ["selenge", "bulgan", "khuvsgul", "arkhangai"],
  },
  east: {
    id: "east",
    days: [7, 8],
    km: 1600,
    photo: "/images/gallery/khentii-2.jpg",
    stops: ["khentii", "dornod", "sukhbaatar", "dornogovi"],
  },
  altai: {
    id: "altai",
    days: [10, 12],
    km: 1100,
    photo: "/images/bayan-ulgii.jpg",
    stops: ["bayan-ulgii", "khovd", "uvs", "zavkhan"],
  },
};

export const routes: RouteMeta[] = routeIds.map((id) => routeMeta[id]);

/* ---------------- phrases ---------------- */

export type Phrase = {
  /** Mongolian in Cyrillic */
  mn: string;
  /** how to say it, for a non-Mongolian reader */
  say: string;
};

/** Meanings live in each language file, aligned by index. */
export const phrases: Phrase[] = [
  { mn: "Сайн байна уу?", say: "sain bain-uu" },
  { mn: "Баярлалаа", say: "bayarlalaa" },
  { mn: "Тийм / Үгүй", say: "teem / ugui" },
  { mn: "Уучлаарай", say: "uuchlaarai" },
  { mn: "Нохой хорио!", say: "nokhoi khorio" },
  { mn: "Энэ хэд вэ?", say: "ene khed ve" },
  { mn: "Ус", say: "oos" },
  { mn: "Жорлон хаана байна?", say: "jorlon khaana bain" },
  { mn: "Би ойлгохгүй байна", say: "bi oilgokh-gui bain" },
  { mn: "Баяртай", say: "bayartai" },
];

/** For the food page; meanings in each language file, aligned by index. */
export const foodPhrases: Phrase[] = [
  { mn: "Сайхан хооллоорой", say: "saikhan khoolloorai" },
  { mn: "Амттай байна", say: "amttai bain" },
  { mn: "Цадлаа, баярлалаа", say: "tsadlaa, bayarlalaa" },
  { mn: "Би мах иддэггүй", say: "bi makh iddeg-gui" },
  { mn: "Тооцоо бодоод өгөөрэй", say: "tootsoo bodood ugurei" },
];

/* ---------------- emergency ---------------- */

/** Labels live in each language file, aligned by index. */
export const emergencyNumbers = ["103", "102", "101", "105"];
