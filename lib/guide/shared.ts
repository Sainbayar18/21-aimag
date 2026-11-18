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
 * parts: one outline per piece. Most things are one piece; the wrestler's
 * outfit is three — the zodog, its cord and the shuudag — outlined apart, so
 * the felt between them stays dark when they light.
 */
export const chestItems: Record<
  ChestItemId,
  { path: string; anchor: { x: number; y: number }; parts: [number, number][][] }
> = {
  // the history book: a dark blue hardback, its title in Mongolian script
  book: {
    path: "history",
    anchor: { x: 226, y: 520 },
    parts: [
      [
        [120.5, 277.5], [327, 277.5], [336, 285.5], [341, 320], [341, 401], [340, 500],
        [338.5, 576], [323, 583], [113.5, 585.5], [109, 447], [112, 350], [116, 288],
      ],
    ],
  },
  // the folded green silk deel with gold dragons, collar to hem
  deel: {
    path: "deels",
    anchor: { x: 430, y: 440 },
    parts: [
      [
        [451, 183.5], [586, 183.5], [609.5, 227.5], [662.5, 229.5], [667, 336.5], [665.5, 513],
        [657, 598], [521.5, 604], [362.5, 592], [355.5, 424.5], [359.5, 236.5], [368.5, 229.5],
        [445, 227.5], [448, 201],
      ],
    ],
  },
  // the wrestler's red zodog (sleeves and back, open in front), its white
  // cord, and the blue shuudag laid below it: three pieces
  zodog: {
    path: "culture#naadam",
    anchor: { x: 880, y: 300 },
    parts: [
      [
        [788, 180], [972, 180], [1012, 233], [1065, 276.5], [1091.5, 380], [1095, 533],
        [1098, 640], [1015, 650], [1008, 553], [978, 420], [962, 417], [962, 400],
        [798, 400], [798, 413], [778, 533], [775, 636.5], [681.5, 640], [675, 426.5],
        [688, 293], [745, 233], [781.5, 186.5],
      ],
      [
        [798, 416.5], [851.5, 410], [931.5, 403], [961.5, 416.5], [968, 446.5], [951.5, 473],
        [928, 470], [905, 446.5], [865, 450], [835, 486.5], [815, 490], [808, 453],
        [795, 433],
      ],
      [
        [788, 500], [1001.5, 493], [1008, 533], [992, 560], [962, 605], [930, 652],
        [881.5, 657], [865, 620], [811.5, 580], [778, 550], [781.5, 513],
      ],
    ],
  },
  // the agate snuff bottle with its coral stopper and spoon, lying on its
  // embroidered pouch; the pouch's strings are left out
  snuff: {
    path: "culture#greetings",
    anchor: { x: 1130, y: 420 },
    parts: [
      [
        [1123, 322], [1222, 325], [1226, 345], [1223, 379], [1222, 441], [1210, 470],
        [1189, 485], [1142, 487], [1122, 472], [1114, 454], [1110.5, 385], [1115, 345],
      ],
    ],
  },
};

/* ---------------- deels ---------------- */

/**
 * The peoples on the deels page, grouped the way Mongolian ethnography groups
 * them, each family in the order shown. `image` says what stands for the
 * deel: an AI illustration drawn from written descriptions (public/images/
 * deel/{id}.jpg) or a credited photograph (data/deel-photos.json). The
 * Khotgoid's is drawn from the general description of Oirat dress, since no
 * account of their own was found; their entry says so.
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
  oold: { family: "west", image: "ai" },
  khotgoid: { family: "west", image: "ai" },
  sartuul: { family: "west", image: "ai" },
  buryat: { family: "northEast", image: "ai" },
  barga: { family: "northEast", image: "ai" },
  darkhad: { family: "northEast", image: "ai" },
  dariganga: { family: "northEast", image: "ai" },
  uzemchin: { family: "northEast", image: "ai" },
  kazakh: { family: "turkic", image: "photo" },
  tsaatan: { family: "turkic", image: "ai" },
  khamnigan: { family: "turkic", image: "ai" },
  khoton: { family: "turkic", image: "ai" },
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
