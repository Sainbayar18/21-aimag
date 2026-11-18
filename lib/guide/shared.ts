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
  ticket: { id: "ticket", anchor: { x: 146, y: 684 }, target: { kind: "page", path: "practical" } },
  pot: { id: "pot", anchor: { x: 700, y: 574 }, target: { kind: "page", path: "food" } },
};

/* ---------------- the chest ---------------- */

/**
 * What lies in the painted chest when it is opened (public/images/ger/
 * chest-open.jpg, measured in its own 1376×768 pixels): each thing is
 * outlined for its light, has a marker, and leads to a page.
 */
export const chestItemIds = ["book", "deel", "bowl"] as const;
export type ChestItemId = (typeof chestItemIds)[number];

export const chestItems: Record<
  ChestItemId,
  { path: string; anchor: { x: number; y: number }; points: [number, number][] }
> = {
  // the history book, leather-bound with its straps and the tab of one
  book: {
    path: "about",
    anchor: { x: 425, y: 430 },
    points: [
      [362, 321], [520, 320], [530, 333], [534, 350], [536, 400], [535, 460],
      [552, 462], [555, 470], [550, 476], [536, 476], [534, 500], [526, 512],
      [512, 524], [470, 528], [400, 526], [330, 522], [304, 518], [300, 505],
      [306, 470], [315, 430], [330, 385], [345, 340], [352, 326],
    ],
  },
  // the folded silk deel, from the collar down to the fold at its foot
  deel: {
    path: "culture",
    anchor: { x: 690, y: 470 },
    points: [
      [657, 305], [740, 305], [753, 327], [793, 325], [807, 333], [818, 377],
      [822, 440], [827, 490], [823, 523], [700, 528], [573, 525], [563, 487],
      [570, 430], [580, 370], [590, 340], [600, 327], [637, 327],
    ],
  },
  // the silver bowl: its rim, tilted a little, and the belly under it
  bowl: {
    path: "food",
    anchor: { x: 951, y: 410 },
    points: [
      [871.5, 396], [875, 382], [884.5, 370], [898, 359.5], [915.5, 352.5], [935, 349],
      [955.5, 348.5], [976, 352.5], [995, 359.5], [1010.5, 369.5], [1022.5, 382], [1029, 395.5],
      [1030.5, 410], [1024, 440], [1008, 463], [982, 478], [952, 482], [922, 477],
      [897, 462], [880, 440],
    ],
  },
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
