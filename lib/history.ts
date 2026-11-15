import { packs, type Lang } from "@/lib/i18n";

type T = Record<"en" | "mn", string>;

export type HistoryEntry = {
  id: string;
  date: T;
  era: T;
  title: T;
  text: T;
  /** shown in the short timeline on the home page */
  key?: boolean;
  /** photo file from /public/images, credited on the page */
  photo?: string;
};

export const eras: { id: string; name: T; range: T }[] = [
  { id: "ancient", name: { en: "Ancient steppe", mn: "Эртний тал нутаг" }, range: { en: "Stone Age – 12th century", mn: "Чулуун зэвсгийн үе – XII зуун" } },
  { id: "empire", name: { en: "The Mongol Empire", mn: "Их Монгол Улс" }, range: { en: "1162 – 1368", mn: "1162 – 1368" } },
  { id: "khanates", name: { en: "Khans, lamas and the Qing", mn: "Хаад, лам нар, Чин улс" }, range: { en: "1368 – 1911", mn: "1368 – 1911" } },
  { id: "modern", name: { en: "Independence to democracy", mn: "Тусгаар тогтнолоос ардчилал хүртэл" }, range: { en: "1911 – 1992", mn: "1911 – 1992" } },
  { id: "today", name: { en: "Mongolia today", mn: "Өнөөгийн Монгол" }, range: { en: "1992 – 2026", mn: "1992 – 2026" } },
];

export const history: (HistoryEntry & { eraId: string })[] = [
  {
    id: "stone-age",
    eraId: "ancient",
    date: { en: "Stone Age", mn: "Чулуун зэвсгийн үе" },
    era: { en: "Ancient steppe", mn: "Эртний тал нутаг" },
    title: { en: "The first people of the steppe", mn: "Тал нутгийн анхны хүмүүс" },
    text: {
      en: "People have lived on the Mongolian plateau since the Stone Age. Caves such as Tsagaan Agui in Bayankhongor and Khoit Tsenkher in Khovd still hold their tools and rock paintings.",
      mn: "Монголын өндөрлөгт чулуун зэвсгийн үеэс хүн амьдарч ирсэн. Баянхонгорын Цагаан агуй, Ховдын Хойд Цэнхэрийн агуйд тэдний багаж зэвсэг, хадны зураг хадгалагдан үлджээ.",
    },
  },
  {
    id: "bronze-age",
    eraId: "ancient",
    date: { en: "c. 3,000 years ago", mn: "Ойролцоогоор 3000 жилийн өмнө" },
    era: { en: "Ancient steppe", mn: "Эртний тал нутаг" },
    title: { en: "Deer stones and the first herders", mn: "Буган хөшөө ба анхны малчид" },
    text: {
      en: "Bronze Age herders raised carved ‘deer stones’ and great burial mounds across the grasslands. The deer stone monuments were inscribed as a UNESCO World Heritage Site in 2023.",
      mn: "Хүрэл зэвсгийн үеийн малчид тал нутгаар сийлбэртэй буган хөшөө, хиргисүүр босгожээ. Буган хөшөөт дурсгалууд 2023 онд ЮНЕСКО-гийн дэлхийн өвд бүртгэгдсэн.",
    },
  },
  {
    id: "xiongnu",
    eraId: "ancient",
    key: true,
    date: { en: "209 BC", mn: "МЭӨ 209" },
    era: { en: "Ancient steppe", mn: "Эртний тал нутаг" },
    title: { en: "The Xiongnu: the first steppe empire", mn: "Хүннү: тал нутгийн анхны эзэнт гүрэн" },
    text: {
      en: "Modun Chanyu united the steppe tribes into the Xiongnu (Hunnu) Empire. Mongolia counts the beginning of its statehood from this year.",
      mn: "Модун шаньюй тал нутгийн аймгуудыг нэгтгэн Хүннү гүрнийг байгуулав. Монгол Улс төр ёсныхоо эхлэлийг энэ оноос тоолдог.",
    },
  },
  {
    id: "turkic",
    eraId: "ancient",
    date: { en: "552 – 840", mn: "552 – 840" },
    era: { en: "Ancient steppe", mn: "Эртний тал нутаг" },
    title: { en: "Turkic and Uyghur khaganates", mn: "Түрэг, Уйгурын хаант улсууд" },
    text: {
      en: "Successive empires ruled from the Orkhon Valley. The 8th-century stone inscriptions of Khöshöö Tsaidam, honouring Bilge Khagan and Kul Tigin, are among the oldest known Turkic texts.",
      mn: "Орхоны хөндийгөөс дараалан эзэнт гүрнүүд захирч байв. Билгэ хаан, Культегинд зориулсан VIII зууны Хөшөө Цайдамын бичээс бол түрэг хэлний хамгийн эртний бичгийн дурсгалын нэг.",
    },
  },
  {
    id: "temujin",
    eraId: "empire",
    date: { en: "1162", mn: "1162" },
    era: { en: "The Mongol Empire", mn: "Их Монгол Улс" },
    title: { en: "Temüjin is born", mn: "Тэмүжин мэндэлсэн нь" },
    text: {
      en: "By tradition, Temüjin — the future Chinggis Khaan — was born at Delüün Boldog on the Onon River, in today’s Khentii province.",
      mn: "Уламжлалт ёсоор ирээдүйн Чингис хаан Тэмүжин одоогийн Хэнтий аймгийн нутаг, Онон голын Дэлүүн болдогт мэндэлсэн гэдэг.",
    },
    photo: "/images/gallery/khentii-3.jpg",
  },
  {
    id: "1206",
    eraId: "empire",
    key: true,
    date: { en: "1206", mn: "1206" },
    era: { en: "The Mongol Empire", mn: "Их Монгол Улс" },
    title: { en: "Chinggis Khaan founds the Great Mongol State", mn: "Чингис хаан Их Монгол Улсыг байгуулав" },
    text: {
      en: "At a great assembly (khuraltai), Temüjin was proclaimed Chinggis Khaan. He united the Mongol tribes under one state, one law and one script.",
      mn: "Их хуралдайгаар Тэмүжинийг Чингис хаан хэмээн өргөмжилжээ. Тэрээр монгол аймгуудыг нэг төр, нэг хууль, нэг бичигтэйгээр нэгтгэсэн.",
    },
  },
  {
    id: "karakorum",
    eraId: "empire",
    date: { en: "1220 – 1260", mn: "1220 – 1260" },
    era: { en: "The Mongol Empire", mn: "Их Монгол Улс" },
    title: { en: "Karakorum, capital of the world’s largest land empire", mn: "Хархорум — дэлхийн хамгийн том эзэнт гүрний нийслэл" },
    text: {
      en: "From Karakorum in the Orkhon Valley, the Mongol Empire grew into the largest contiguous land empire in history, reaching from the Pacific to Eastern Europe.",
      mn: "Орхоны хөндий дэх Хархорумаас удирдсан Монголын эзэнт гүрэн Номхон далайгаас Зүүн Европ хүртэл үргэлжилсэн, түүхэн дэх хамгийн том нэгдмэл нутагтай гүрэн болжээ.",
    },
    photo: "/images/gallery/uvurkhangai-3.jpg",
  },
  {
    id: "yuan",
    eraId: "empire",
    date: { en: "1271 – 1368", mn: "1271 – 1368" },
    era: { en: "The Mongol Empire", mn: "Их Монгол Улс" },
    title: { en: "Khubilai Khaan and the Yuan", mn: "Хубилай хаан ба Юань улс" },
    text: {
      en: "Chinggis Khaan’s grandson Khubilai founded the Yuan dynasty and ruled China. After 1368 the Mongol court withdrew to the steppe.",
      mn: "Чингис хааны ач Хубилай Юань улсыг байгуулж Хятадыг захирав. 1368 оноос хойш Монголын хаадын ордон тал нутагтаа буцжээ.",
    },
  },
  {
    id: "erdene-zuu",
    eraId: "khanates",
    date: { en: "1586", mn: "1586" },
    era: { en: "Khans, lamas and the Qing", mn: "Хаад, лам нар, Чин улс" },
    title: { en: "Buddhism and Erdene Zuu", mn: "Буддын шашин ба Эрдэнэ Зуу" },
    text: {
      en: "Abtai Sain Khan built Erdene Zuu, the first great Buddhist monastery in Khalkha, on the ruins of Karakorum. Buddhism became central to Mongolian life.",
      mn: "Автай сайн хаан Хархорумын туурин дээр Халхын анхны томоохон хийд Эрдэнэ Зууг бариулав. Буддын шашин монголчуудын амьдралын салшгүй хэсэг болжээ.",
    },
    photo: "/images/uvurkhangai.jpg",
  },
  {
    id: "zanabazar",
    eraId: "khanates",
    key: true,
    date: { en: "1639", mn: "1639" },
    era: { en: "Khans, lamas and the Qing", mn: "Хаад, лам нар, Чин улс" },
    title: { en: "Zanabazar and the birth of Örgöö", mn: "Занабазар ба Өргөөгийн үүсэл" },
    text: {
      en: "Zanabazar, a brilliant sculptor and scholar, was proclaimed the first Bogd Gegeen. His moving monastery camp, Örgöö, would one day settle and become Ulaanbaatar. Amarbayasgalant Monastery was later built in his honour.",
      mn: "Уран барималч, эрдэмтэн Занабазарыг анхны Богд гэгээнээр өргөмжилжээ. Түүний нүүдэллэдэг хүрээ Өргөө хожим суурьшиж Улаанбаатар хот болсон. Түүнд зориулан хожим Амарбаясгалант хийдийг бариулжээ.",
    },
    photo: "/images/selenge.jpg",
  },
  {
    id: "qing",
    eraId: "khanates",
    date: { en: "1691", mn: "1691" },
    era: { en: "Khans, lamas and the Qing", mn: "Хаад, лам нар, Чин улс" },
    title: { en: "Two centuries under the Qing", mn: "Манж Чин улсын захиргаанд хоёр зуун жил" },
    text: {
      en: "The Khalkha Mongols came under the rule of the Manchu Qing dynasty, which lasted until its collapse in 1911.",
      mn: "Халх Монгол Манж Чин улсын харьяанд орж, Чин улс 1911 онд мөхөх хүртэл энэ байдал үргэлжилсэн.",
    },
  },
  {
    id: "1911",
    eraId: "modern",
    key: true,
    date: { en: "1911", mn: "1911" },
    era: { en: "Independence to democracy", mn: "Тусгаар тогтнолоос ардчилал хүртэл" },
    title: { en: "Independence", mn: "Тусгаар тогтнол" },
    text: {
      en: "On 29 December 1911, Mongolia declared independence and the Bogd Khan was enthroned as head of state. The date is celebrated as National Freedom and Independence Day.",
      mn: "1911 оны 12 дугаар сарын 29-нд Монгол Улс тусгаар тогтнолоо тунхаглаж, Богд хааныг төрийн тэргүүнээр өргөмжилсөн. Энэ өдрийг Үндэсний эрх чөлөө, тусгаар тогтнолын өдөр болгон тэмдэглэдэг.",
    },
  },
  {
    id: "1921",
    eraId: "modern",
    date: { en: "1921 – 1924", mn: "1921 – 1924" },
    era: { en: "Independence to democracy", mn: "Тусгаар тогтнолоос ардчилал хүртэл" },
    title: { en: "Revolution and the People’s Republic", mn: "Ардын хувьсгал ба Бүгд Найрамдах Ард Улс" },
    text: {
      en: "The People’s Revolution of 1921 — remembered every year at Naadam on 11 July — led to the Mongolian People’s Republic in 1924. The capital, then called Niislel Khüree, was renamed Ulaanbaatar — ‘Red Hero’.",
      mn: "1921 оны Ардын хувьсгал — жил бүр 7 сарын 11-нд наадмаар тэмдэглэдэг — 1924 онд Бүгд Найрамдах Монгол Ард Улсыг тунхаглахад хүргэв. Нийслэл Хүрээг Улаанбаатар хот хэмээн нэрлэжээ.",
    },
  },
  {
    id: "socialism",
    eraId: "modern",
    date: { en: "1930s – 1980s", mn: "1930 – 1980-аад он" },
    era: { en: "Independence to democracy", mn: "Тусгаар тогтнолоос ардчилал хүртэл" },
    title: { en: "The socialist era", mn: "Социализмын үе" },
    text: {
      en: "Closely tied to the Soviet Union, Mongolia built cities, schools and industry. The political purges of the late 1930s destroyed most monasteries and took tens of thousands of lives. In 1939 Soviet and Mongolian forces fought Japan at Khalkhin Gol.",
      mn: "Зөвлөлт Холбоотой нягт холбоотой Монгол Улс хот, сургууль, аж үйлдвэр байгуулав. 1930-аад оны сүүлчийн улс төрийн хэлмэгдүүлэлт ихэнх хийдийг устгаж, хэдэн арван мянган хүний амийг авчээ. 1939 онд Халх голд Зөвлөлт, Монголын цэрэг Японы эсрэг тулалдсан.",
    },
  },
  {
    id: "un",
    eraId: "modern",
    date: { en: "1961", mn: "1961" },
    era: { en: "Independence to democracy", mn: "Тусгаар тогтнолоос ардчилал хүртэл" },
    title: { en: "A seat at the United Nations", mn: "НҮБ-ын гишүүн" },
    text: {
      en: "Mongolia became a member of the United Nations.",
      mn: "Монгол Улс Нэгдсэн Үндэстний Байгууллагын гишүүн болов.",
    },
  },
  {
    id: "1990",
    eraId: "modern",
    key: true,
    date: { en: "1990", mn: "1990" },
    era: { en: "Independence to democracy", mn: "Тусгаар тогтнолоос ардчилал хүртэл" },
    title: { en: "The peaceful Democratic Revolution", mn: "Тайван замаар ялсан Ардчилсан хувьсгал" },
    text: {
      en: "Peaceful protests and hunger strikes in the winter of 1989–90 ended one-party rule. Mongolia held its first multi-party elections that summer.",
      mn: "1989–90 оны өвлийн тайван жагсаал, өлсгөлөн зарлалт нэг намын засаглалыг төгсгөв. Тэр зун Монгол Улс анхны олон намын сонгуулиа явуулсан.",
    },
  },
  {
    id: "1992",
    eraId: "today",
    date: { en: "1992", mn: "1992" },
    era: { en: "Mongolia today", mn: "Өнөөгийн Монгол" },
    title: { en: "A new Constitution", mn: "Шинэ Үндсэн хууль" },
    text: {
      en: "The democratic Constitution established a parliamentary republic, and the country’s official name became simply ‘Mongolia’.",
      mn: "Ардчилсан Үндсэн хуулиар парламентын засаглалтай бүгд найрамдах улсыг тогтоож, улсын нэрийг «Монгол Улс» болгосон.",
    },
  },
  {
    id: "heritage",
    eraId: "today",
    date: { en: "2000s – 2010s", mn: "2000 – 2010-аад он" },
    era: { en: "Mongolia today", mn: "Өнөөгийн Монгол" },
    title: { en: "Mining, growth and world heritage", mn: "Уул уурхай, хөгжил, дэлхийн өв" },
    text: {
      en: "Copper, gold and coal from deposits such as Oyu Tolgoi and Tavan Tolgoi drove rapid growth. UNESCO recognised the Orkhon Valley, Naadam, Burkhan Khaldun and other treasures of Mongolian culture and nature.",
      mn: "Оюу толгой, Таван толгой зэрэг ордын зэс, алт, нүүрс эдийн засгийг эрчимтэй өсгөв. ЮНЕСКО Орхоны хөндий, наадам, Бурхан Халдун зэрэг Монголын соёл, байгалийн үнэт өвийг бүртгэсэн.",
    },
  },
  {
    id: "2024",
    eraId: "today",
    date: { en: "2024", mn: "2024" },
    era: { en: "Mongolia today", mn: "Өнөөгийн Монгол" },
    title: { en: "A larger parliament", mn: "Өргөжсөн парламент" },
    text: {
      en: "After constitutional amendments in 2023, Mongolians elected a 126-seat State Great Khural under a new mixed electoral system.",
      mn: "2023 оны Үндсэн хуулийн нэмэлт өөрчлөлтийн дагуу монголчууд холимог тогтолцоогоор 126 гишүүнтэй Улсын Их Хурлаа сонгосон.",
    },
  },
  {
    id: "2026",
    eraId: "today",
    key: true,
    date: { en: "2026", mn: "2026" },
    era: { en: "Mongolia today", mn: "Өнөөгийн Монгол" },
    title: { en: "820 years on, a nomadic nation", mn: "820 жилийн дараах нүүдэлчин үндэстэн" },
    text: {
      en: "Mongolia marks 820 years since the Great Mongol State. The United Nations named 2026 the International Year of Rangelands and Pastoralists — an initiative proposed by Mongolia, where herding remains a living way of life.",
      mn: "Монгол Улс Их Монгол Улс байгуулагдсаны 820 жилийн ойг тэмдэглэж байна. НҮБ 2026 оныг Монгол Улсын санаачилгаар «Бэлчээр ба малчдын олон улсын жил» болгон зарласан бөгөөд мал аж ахуй монголчуудын амьд уламжлал хэвээр байна.",
    },
    photo: "/images/home.jpg",
  },
];

export const aboutText = {
  en: {
    nav: "About Mongolia",
    kicker: "What is Mongolia?",
    title: "A nomadic nation under the eternal blue sky",
    intro: [
      "Mongolia is a landlocked country between Russia and China — a land of high plateaus, mountains, steppe and desert where herding families have moved with their animals for thousands of years.",
      "It was the heart of the largest contiguous land empire in history. Today it is a parliamentary democracy of about 3.5 million people, nearly half of whom live in the capital, Ulaanbaatar.",
    ],
    facts: [
      { label: "Capital", value: "Ulaanbaatar" },
      { label: "Population", value: "≈ 3.5 million" },
      { label: "Area", value: "1,564,116 km²" },
      { label: "Language", value: "Mongolian" },
      { label: "Government", value: "Parliamentary republic" },
      { label: "Currency", value: "Tögrög (MNT)" },
      { label: "Religion", value: "Mostly Buddhist, with shamanic traditions" },
      { label: "Neighbours", value: "Russia and China" },
    ],
    timelineTitle: "From the Stone Age to 2026",
    timelineTeaser: "Key moments in Mongolian history",
    readMore: "Read the full story",
    pageTitle: "About Mongolia",
    pageLead: "Who the Mongols are, and how a nation of herders shaped the world — from the first people of the steppe to 2026.",
    photoBy: "Photo",
    sources: "Dates follow commonly accepted histories of Mongolia. Population is an estimate; the 2020 census counted about 3.3 million.",
  },
  mn: {
    nav: "Монгол Улс",
    kicker: "Монгол гэж ямар улс вэ?",
    title: "Мөнх хөх тэнгэр доорх нүүдэлчин үндэстэн",
    intro: [
      "Монгол Улс бол Орос, Хятадын дунд оршдог далайд гарцгүй орон. Өндөрлөг, уул, тал, говьтой энэ нутагт малчин айлууд мянга мянган жил малаа дагаж нүүдэллэж ирсэн.",
      "Түүхэн дэх хамгийн том нэгдмэл нутагтай эзэнт гүрний голомт байсан энэ орон өнөөдөр 3.5 сая орчим хүн амтай, парламентын засаглалтай ардчилсан улс. Хүн амын бараг тал нь нийслэл Улаанбаатарт амьдардаг.",
    ],
    facts: [
      { label: "Нийслэл", value: "Улаанбаатар" },
      { label: "Хүн ам", value: "≈ 3.5 сая" },
      { label: "Нутаг дэвсгэр", value: "1 564 116 км²" },
      { label: "Хэл", value: "Монгол хэл" },
      { label: "Засаглал", value: "Парламентын бүгд найрамдах улс" },
      { label: "Мөнгөн тэмдэгт", value: "Төгрөг (MNT)" },
      { label: "Шашин", value: "Ихэнх нь буддын шашинтай, бөөгийн уламжлалтай" },
      { label: "Хөрш орнууд", value: "Орос, Хятад" },
    ],
    timelineTitle: "Чулуун зэвсгийн үеэс 2026 он хүртэл",
    timelineTeaser: "Монголын түүхийн гол үйл явдлууд",
    readMore: "Бүрэн түүхийг унших",
    pageTitle: "Монгол Улсын тухай",
    pageLead: "Монголчууд хэн бэ, малчин ард түмэн дэлхийн түүхэнд хэрхэн нөлөөлсөн бэ — тал нутгийн анхны хүмүүсээс 2026 он хүртэл.",
    photoBy: "Зураг",
    sources: "Он цагийг Монголын түүхийн нийтлэг хүлээн зөвшөөрөгдсөн эх сурвалжийн дагуу бичив. Хүн ам нь ойролцоо тоо; 2020 оны тооллогоор 3.3 сая орчим байсан.",
  },
};

export type AboutText = (typeof aboutText)["en"];

function isBase(lang: Lang): lang is "en" | "mn" {
  return lang === "en" || lang === "mn";
}

export function getAbout(lang: Lang): AboutText {
  return isBase(lang) ? aboutText[lang] : packs[lang].about;
}

export function eraLabel(era: (typeof eras)[number], lang: Lang) {
  if (isBase(lang)) return { name: era.name[lang], range: era.range[lang] };
  return packs[lang].eras[era.id] ?? { name: era.name.en, range: era.range.en };
}

export function entryLabel(h: HistoryEntry, lang: Lang) {
  if (isBase(lang)) return { date: h.date[lang], title: h.title[lang], text: h.text[lang] };
  return packs[lang].history[h.id] ?? { date: h.date.en, title: h.title.en, text: h.text.en };
}
