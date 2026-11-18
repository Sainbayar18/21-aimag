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
  // the history book, an old green cloth hardback with worn, yellowed edges
  book: {
    path: "history",
    anchor: { x: 212, y: 432 },
    parts: [
      [
        [105.5, 281], [303, 278.5], [321, 294.5], [325, 401], [323.5, 560.5], [317, 578.5],
        [221, 585], [108, 583], [101, 538], [105.5, 447], [101, 392], [98.5, 297],
      ],
    ],
  },
  // the folded blue silk deel, collar to hem
  deel: {
    path: "deels",
    anchor: { x: 500, y: 500 },
    parts: [
      [
        [436, 187.5], [542, 187.5], [571, 232], [642, 229], [650.5, 240.5], [656.5, 287.5],
        [653.5, 464], [650.5, 582], [642, 605], [495, 608], [342, 602], [344.5, 493.5],
        [350.5, 246.5], [359.5, 232], [430, 229], [433, 199],
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
        [780, 183], [973, 187], [1020, 240], [1046.5, 283], [1086.5, 360], [1093, 533],
        [1096.5, 646.5], [1013, 650], [1006.5, 560], [983, 413], [960, 420], [957, 397],
        [797, 397], [796.5, 413], [780, 553], [770, 640], [676.5, 636.5], [670, 426.5],
        [686.5, 293], [740, 236.5], [773, 186.5],
      ],
      [
        [791, 414], [850, 412], [905, 408], [950, 414], [966, 428], [958, 458],
        [930, 473], [910, 465], [900, 452], [860, 452], [830, 460], [824, 488],
        [812, 488], [808, 470], [795, 440],
      ],
      [
        [796.5, 496.5], [990, 493], [1003, 546.5], [953, 586.5], [926.5, 656.5], [873, 660],
        [860, 620], [800, 573], [776.5, 553], [783, 513],
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
        [1123, 322], [1223, 325], [1228, 345], [1226, 379], [1223, 441], [1210, 470],
        [1189, 485], [1142, 487], [1122, 472], [1113, 450], [1110, 379], [1115, 345],
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
