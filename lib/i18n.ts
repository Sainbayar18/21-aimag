export const langs = ["en", "mn", "ja", "ko", "zh", "ru"] as const;
export type Lang = (typeof langs)[number];
export const defaultLang: Lang = "en";

import ja from "@/lib/locales/ja";
import ko from "@/lib/locales/ko";
import zh from "@/lib/locales/zh";
import ru from "@/lib/locales/ru";
import type { LocalePack } from "@/lib/locales/types";

export const packs: Record<Exclude<Lang, "en" | "mn">, LocalePack> = { ja, ko, zh, ru };

export function isLang(x: string): x is Lang {
  return (langs as readonly string[]).includes(x);
}

export type ExperienceId = "desert" | "lakes" | "mountains" | "heritage" | "wildlife" | "nomadic";
export const experienceIds: ExperienceId[] = ["desert", "lakes", "mountains", "heritage", "wildlife", "nomadic"];

export type RegionId = "west" | "khangai" | "central" | "east";
export const regionIds: RegionId[] = ["west", "khangai", "central", "east"];

/** Mongolian region names in the source data → region id */
export const regionIdFromMn: Record<string, RegionId> = {
  "Баруун бүс": "west",
  "Хангайн бүс": "khangai",
  "Төвийн бүс": "central",
  "Зүүн бүс": "east",
};

const en = {
  htmlLang: "en",
  brand: "21 Aimags",
  brandSub: "Mongolia, province by province",
  nav: { destinations: "Destinations", map: "Map", seasons: "When to go", plan: "Plan your trip" },
  langName: "English",
  langMenu: "Language",
  skip: "Skip to content",
  navLabel: "Main",

  hero: {
    eyebrow: "Mongolia",
    title: ["Twenty-one provinces.", "One endless sky."],
    lead: "From the glaciers of the Altai to the dunes of the Gobi and the taiga of Khövsgöl — discover Mongolia one province at a time.",
    ctaPrimary: "Explore the map",
    ctaSecondary: "Plan your trip",
  },
  stats: [
    { value: "21", label: "provinces, each with its own landscape" },
    { value: "1.56M km²", label: "of mountains, steppe, taiga and desert" },
    { value: "#1", label: "least densely populated country on Earth" },
  ],

  experiencesTitle: "Find your Mongolia",
  experiencesLead: "Pick what moves you, and we’ll show you where to find it.",
  experiences: {
    desert: { title: "Desert & dunes", text: "Singing sands, flaming cliffs and dinosaur country." },
    lakes: { title: "Lakes & rivers", text: "Crystal-clear alpine lakes and wide river valleys." },
    mountains: { title: "Mountains & volcanoes", text: "Glaciers, sacred peaks and extinct craters." },
    heritage: { title: "History & monasteries", text: "Empire capitals, temples and ancient monuments." },
    wildlife: { title: "Wildlife", text: "Wild horses, gazelle herds and rare Gobi species." },
    nomadic: { title: "Nomadic life", text: "Herders, eagle hunters and reindeer people." },
  } as Record<ExperienceId, { title: string; text: string }>,

  destinationsTitle: "Destinations",
  destinationsLead: "Four great regions, twenty-one provinces.",
  filterAll: "All provinces",
  filterLabel: "Filter by experience",
  resultCount: (n: number) => `${n} ${n === 1 ? "province" : "provinces"}`,
  regions: {
    west: { name: "Western Mongolia", intro: "Snow-capped Altai peaks, glaciers and the Great Lakes Depression — home of the Kazakh eagle hunters." },
    khangai: { name: "Khangai", intro: "The forested heartland: volcanoes, hot springs, the Orkhon Valley and Lake Khövsgöl." },
    central: { name: "Central Mongolia", intro: "National parks around Ulaanbaatar, and the vast Gobi stretching south." },
    east: { name: "Eastern Mongolia", intro: "An ocean of grassland, great gazelle herds and the birthplace of Chinggis Khaan." },
  } as Record<RegionId, { name: string; intro: string }>,

  mapTitle: "Explore the map",
  mapLead: "Hover over a province for a preview, click to open it.",
  mapEmpty: "Hover over a province on the map to see a quick preview here.",
  mapNote: "The grey area is the capital, Ulaanbaatar, which is not part of any province. The small provinces Orkhon, Darkhan-Uul and Govisümber are easiest to pick from the list.",
  mapAria: "Map of Mongolia’s 21 provinces",
  mapLegend: "Regions",
  mapCapital: "Ulaanbaatar",
  mapRussia: "RUSSIA",
  mapChina: "CHINA",
  mapOpen: (name: string) => `Explore ${name}`,
  mapNorth: "N",

  seasonsTitle: "When to go",
  seasonsLead: "Mongolia has four sharp seasons. Each one shows a different country.",
  seasons: [
    { name: "Spring", months: "Mar – May", text: "Windy days, melting ice and very few travellers. Lake Khövsgöl’s ice festival takes place in early March." },
    { name: "Summer", months: "Jun – Aug", text: "Green steppe, warm days and the peak travel season. Naadam, the festival of wrestling, archery and horse racing, is held on 11–13 July." },
    { name: "Autumn", months: "Sep – Oct", text: "Golden larch forests, clear skies and comfortable Gobi temperatures. The Golden Eagle Festival in Bayan-Ölgii is in early October." },
    { name: "Winter", months: "Nov – Feb", text: "Bitterly cold but brilliantly sunny. Families celebrate Tsagaan Sar, the Lunar New Year, in January or February." },
  ],

  planTitle: "Plan your trip",
  planLead: "Distances are vast and the roads are part of the adventure. A few things to know before you go.",
  plan: [
    { title: "Arriving", text: "Most international flights land at Chinggis Khaan International Airport near Ulaanbaatar. The Trans-Mongolian Railway links the capital with Beijing and with Russia." },
    { title: "Getting around", text: "Many roads outside the cities are unpaved. Domestic flights reach several province centres, and most visitors travel by 4×4 with a local driver and guide." },
    { title: "Where to stay", text: "Ger camps welcome travellers across the countryside, province centres have hotels, and homestays with herder families are a memorable option." },
    { title: "Before you go", text: "Check the latest visa and entry rules with official sources, get travel insurance, and carry some cash in tögrög for the countryside." },
  ],

  // Province page
  allProvinces: "All provinces",
  facts: { capital: "Provincial centre", founded: "Founded", area: "Area", population: "Population (2020)" },
  foundedValue: (y: string) => y,
  provinceSuffix: "",
  bestTime: "Best time to visit",
  experiencesHere: "Experiences",
  history: "History",
  nature: "Landscape & nature",
  highlights: "Highlights",
  gallery: "Gallery",
  location: "Location",
  locatorNote: "Click a neighbouring province to jump straight to it.",
  locatorAria: (name: string) => `Location of ${name}`,
  prev: "← Previous",
  next: "Next →",
  pagerLabel: "Browse provinces",
  scrollHint: (n: number) => `Scroll over the photo to see all ${n} photos`,
  photosLabel: (name: string) => `Photos of ${name}`,
  prevPhoto: "Previous photo",
  nextPhoto: "Next photo",
  photoN: (i: number, caption: string) => `Photo ${i}: ${caption}`,
  capitalShort: "Centre",
  population: "Population",
  photoBy: "Photo",
  footer: "Area and population: 2020 Population and Housing Census of Mongolia. Boundaries: Natural Earth. Photos: Wikimedia Commons — author and licence are listed under each photo.",
  seasonNames: {
    gobi: "May – June and September – October, when the Gobi is warm but not scorching.",
    summer: "June – September, when the passes are open and the valleys are green.",
    eagle: "June – September; come in early October for the Golden Eagle Festival.",
    khuvsgul: "June – September for hiking and boating; early March for the ice festival.",
    central: "May – September; easy to reach from Ulaanbaatar year-round.",
  } as Record<SeasonKey, string>,
  metaTitle: "21 Aimags — Discover Mongolia province by province",
  metaDescription: "A travel guide to Mongolia’s 21 provinces: landscapes, history, highlights and the best time to visit.",
  ogImageAlt: "A herder’s ger on the open steppe, with mountains behind it",
  notFound: {
    title: "This page has wandered off",
    text: "The link may be old, or the address mistyped. All 21 provinces are still here.",
    home: "Back to the ger",
    destinations: "All provinces",
  },
};

type Dict = typeof en;

const mn: Dict = {
  htmlLang: "mn",
  brand: "21 Аймаг",
  brandSub: "Монгол орныг аймаг аймгаар",
  nav: { destinations: "Аймгууд", map: "Газрын зураг", seasons: "Хэзээ очих", plan: "Аялал төлөвлөх" },
  langName: "Монгол",
  langMenu: "Хэл",
  skip: "Үндсэн агуулга руу",
  navLabel: "Үндсэн цэс",

  hero: {
    eyebrow: "Монгол Улс",
    title: ["Хорин нэгэн аймаг.", "Нэг л мөнх хөх тэнгэр."],
    lead: "Алтайн мөнх цаснаас Говийн элс, Хөвсгөлийн тайга хүртэл Монгол орныг аймаг аймгаар нь танина уу.",
    ctaPrimary: "Газрын зураг үзэх",
    ctaSecondary: "Аялал төлөвлөх",
  },
  stats: [
    { value: "21", label: "өөр өөрийн байгальтай аймаг" },
    { value: "1.56 сая км²", label: "уул, тал, тайга, говь" },
    { value: "№1", label: "дэлхийн хамгийн сийрэг хүн амтай улс" },
  ],

  experiencesTitle: "Өөрийн Монголоо ол",
  experiencesLead: "Сонирхсон зүйлээ сонговол хаана үзэж болохыг харуулъя.",
  experiences: {
    desert: { title: "Говь, элсэн манхан", text: "Дуут манхан, улаан хад, үлэг гүрвэлийн нутаг." },
    lakes: { title: "Нуур, гол мөрөн", text: "Тунгалаг уулын нуур, өргөн голын хөндий." },
    mountains: { title: "Уул, галт уул", text: "Мөсөн гол, тахилгат оргил, унтарсан тогоо." },
    heritage: { title: "Түүх, хийд", text: "Эзэнт гүрний нийслэл, сүм хийд, эртний дурсгал." },
    wildlife: { title: "Зэрлэг амьтан", text: "Тахь, зээрийн сүрэг, говийн ховор амьтад." },
    nomadic: { title: "Нүүдэлчдийн амьдрал", text: "Малчид, бүргэдчид, цаатан иргэд." },
  },

  destinationsTitle: "Аймгууд",
  destinationsLead: "Дөрвөн том бүс, хорин нэгэн аймаг.",
  filterAll: "Бүх аймаг",
  filterLabel: "Сонирхлоор шүүх",
  resultCount: (n: number) => `${n} аймаг`,
  regions: {
    west: { name: "Баруун бүс", intro: "Алтайн мөнх цаст оргил, мөсөн гол, Их нууруудын хотгор — казах бүргэдчдийн нутаг." },
    khangai: { name: "Хангайн бүс", intro: "Ой модтой голомт нутаг: галт уул, халуун рашаан, Орхоны хөндий, Хөвсгөл нуур." },
    central: { name: "Төвийн бүс", intro: "Улаанбаатарыг тойрсон байгалийн цогцолборууд, өмнө зүгт үргэлжлэх их говь." },
    east: { name: "Зүүн бүс", intro: "Далай мэт тал, зээрийн сүрэг, Чингис хааны төрсөн нутаг." },
  },

  mapTitle: "Газрын зургаас сонгох",
  mapLead: "Аймаг дээр хулганаа аваачвал товч мэдээлэл, дарвал аймгийн хуудас нээгдэнэ.",
  mapEmpty: "Газрын зураг дээр аймаг руу хулганаа аваачвал энд товч мэдээлэл гарна.",
  mapNote: "Саарал өнгөөр тэмдэглэсэн нь нийслэл Улаанбаатар хот бөгөөд аймагт тооцогдохгүй. Орхон, Дархан-Уул, Говьсүмбэр аймгийг жагсаалтаас сонгоход хялбар.",
  mapAria: "Монгол Улсын 21 аймгийн газрын зураг",
  mapLegend: "Бүсүүд",
  mapCapital: "Улаанбаатар",
  mapRussia: "ОРОС",
  mapChina: "ХЯТАД",
  mapOpen: (name: string) => `${name} аймгийг үзэх`,
  mapNorth: "Х",

  seasonsTitle: "Хэзээ очих вэ",
  seasonsLead: "Монгол орны дөрвөн улирал тод ялгаатай. Улирал бүр өөр Монголыг харуулна.",
  seasons: [
    { name: "Хавар", months: "3 – 5 сар", text: "Салхитай, мөс хайлж, жуулчин цөөн. Гуравдугаар сарын эхээр Хөвсгөлд мөсний баяр болдог." },
    { name: "Зун", months: "6 – 8 сар", text: "Ногоон тал, дулаан өдрүүд, аялал жуулчлалын оргил үе. Үндэсний их баяр наадам 7 сарын 11–13-нд болно." },
    { name: "Намар", months: "9 – 10 сар", text: "Шаргал шинэс, цэлмэг тэнгэр, говьд аялахад таатай. Баян-Өлгийн бүргэдийн наадам 10 сарын эхээр болдог." },
    { name: "Өвөл", months: "11 – 2 сар", text: "Тачигнам хүйтэн ч нартай цэлмэг. Цагаан сар 1, 2 сард тохионо." },
  ],

  planTitle: "Аяллаа төлөвлөх",
  planLead: "Зай хол, зам өөрөө нэг адал явдал. Явахаас өмнө мэдэх хэдэн зүйл.",
  plan: [
    { title: "Ирэх", text: "Олон улсын ихэнх нислэг Улаанбаатарын ойролцоох Чингис хаан олон улсын нисэх буудалд буудаг. Транс-Монголын төмөр зам нийслэлийг Бээжин, Оростой холбоно." },
    { title: "Зорчих", text: "Хотоос гадна олон зам шороон. Дотоодын нислэг хэд хэдэн аймгийн төв рүү нисдэг бөгөөд ихэнх жуулчид жолооч, хөтөчтэй жийпээр аялдаг." },
    { title: "Буудаллах", text: "Хөдөө орон нутагт жуулчны баазууд, аймгийн төвд зочид буудал бий. Малчин айлд хоноглох нь мартагдашгүй дурсамж болно." },
    { title: "Явахаас өмнө", text: "Виз, хил нэвтрэх журмыг албан ёсны эх сурвалжаас шалгаж, аяллын даатгалтай болж, хөдөө явахдаа бэлэн мөнгө авч яваарай." },
  ],

  allProvinces: "Бүх аймаг",
  facts: { capital: "Аймгийн төв", founded: "Байгуулагдсан", area: "Нутаг дэвсгэр", population: "Хүн ам (2020)" },
  foundedValue: (y: string) => `${y} он`,
  provinceSuffix: " аймаг",
  bestTime: "Очиход тохиромжтой үе",
  experiencesHere: "Юу үзэх вэ",
  history: "Түүх",
  nature: "Газар зүй ба байгаль",
  highlights: "Үзэх газар",
  gallery: "Зургийн цомог",
  location: "Байршил",
  locatorNote: "Хөрш аймаг дээр дарж шууд шилжиж болно.",
  locatorAria: (name: string) => `${name} аймгийн байршил`,
  prev: "← Өмнөх",
  next: "Дараах →",
  pagerLabel: "Аймаг хооронд шилжих",
  scrollHint: (n: number) => `Зурган дээр гүйлгэж ${n} зургийг үзээрэй`,
  photosLabel: (name: string) => `${name} аймгийн зургууд`,
  prevPhoto: "Өмнөх зураг",
  nextPhoto: "Дараах зураг",
  photoN: (i: number, caption: string) => `${i}-р зураг: ${caption}`,
  capitalShort: "Төв",
  population: "Хүн ам",
  photoBy: "Зураг",
  footer: "Нутаг дэвсгэр, хүн амын тоо: 2020 оны хүн ам, орон сууцны тооллого. Хил зааг: Natural Earth. Зургууд: Wikimedia Commons — зохиогч, лиценз нь зураг бүрийн доор.",
  seasonNames: {
    gobi: "5–6 сар болон 9–10 сар: говь дулаан ч халуун биш үе.",
    summer: "6–9 сар: даваа нээлттэй, хөндий ногоорсон үе.",
    eagle: "6–9 сар; бүргэдийн наадмыг үзэх бол 10 сарын эхээр.",
    khuvsgul: "Явган аялал, завиар зугаалахад 6–9 сар; мөсний баярт 3 сарын эхээр.",
    central: "5–9 сар; Улаанбаатараас ойр тул жилийн турш хүрэхэд хялбар.",
  },
  metaTitle: "21 Аймаг — Монгол орныг аймаг аймгаар нь",
  metaDescription: "Монгол Улсын 21 аймгийн байгаль, түүх, үзэх газар, очиход тохиромжтой үеийн аяллын хөтөч.",
  ogImageAlt: "Уудам талд байх малчны гэр, ард нь уул харагдана",
  notFound: {
    title: "Энэ хуудас олдсонгүй",
    text: "Холбоос хуучирсан эсвэл хаяг буруу бичигдсэн байж магадгүй. 21 аймаг хэвээрээ байна.",
    home: "Гэр рүү буцах",
    destinations: "Бүх аймаг",
  },
};

export type SeasonKey = "gobi" | "summer" | "eagle" | "khuvsgul" | "central";

export function getDict(lang: Lang): Dict {
  if (lang === "en") return en;
  if (lang === "mn") return mn;
  return packs[lang].dict;
}

/** Native names for the language menu. */
export const langNames: Record<Lang, string> = {
  en: "English",
  mn: "Монгол",
  ja: "日本語",
  ko: "한국어",
  zh: "中文",
  ru: "Русский",
};

export type { Dict };
