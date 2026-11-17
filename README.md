# 21 Aimags — Монгол орныг аймаг аймгаар нь

Монгол Улсын 21 аймгийг гадаадын зочдод танилцуулах, 6 хэл дээрх аяллын хөтөч вэбсайт.
Next.js 15 (App Router) дээр бүтээгдсэн, бүх хуудас урьдчилан статикаар үүсгэгддэг.

**Хэлүүд:** English · Монгол · 日本語 · 한국어 · 中文 · Русский

---

## Хурдан эхлэх

```bash
npm ci        # хамаарлуудыг суулгах (package-lock.json-оос яг тэр хувилбараар)
npm run dev   # http://localhost:3000
```

Бусад тушаалууд:

```bash
npm run build   # production build (бүх хуудсыг статикаар үүсгэнэ)
npm start       # build хийсний дараа production серверийг асаах
npx tsc --noEmit  # TypeScript шалгалт
```

Шаардлага: Node.js 18.18+ (Next 15). Нэмэлт `.env` тохиргоо шаардахгүй.

---

## Хуудаснууд

| Зам | Агуулга |
| --- | --- |
| `/` | Хөтчийн хэлээр таних → `/{lang}` руу чиглүүлнэ (`middleware.ts`) |
| `/<хэлгүй зам>` | `/destinations` мэтийн угтваргүй хаягийг `/{lang}/destinations` руу чиглүүлнэ |
| `/sitemap.xml` · `/robots.txt` | 162 хаягтай sitemap (hreflang-тай) ба robots (`app/sitemap.ts`, `app/robots.ts`) |
| `/{lang}` | Нүүр: зөвхөн гэр — гаднаас нь орж, дотор нь газрын зураг, авдар, билет дээр дарна |
| `/{lang}/destinations` | "Өөрийн Монголоо ол" шүүлтүүр, интерактив газрын зураг, 21 аймгийн жагсаалт |
| `/{lang}/about` | Монгол орны танилцуулга + чулуун зэвсгийн үеэс 2026 он хүртэлх түүхэн цаг хугацааны зураглал |
| `/{lang}/culture` | Соёл, ёс заншил: гэрийн ёс, хоол, наадам, хөгжим, шашин, бичиг үсэг, нүүдлийн жил |
| `/{lang}/itineraries` | 6 бэлэн аяллын маршрут (өдөр, улирал, зогсоол бүр аймгийн хуудастай холбогдсон) |
| `/{lang}/practical` | Практик мэдээлэл: виз, ирэх зам, дотоод зорчилт, мөнгө, холбоо, эрүүл мэнд, буудал, ачаа, хэрэгтэй үгс, яаралтай дугаар |
| `/{lang}/province/{slug}` | Аймаг бүрийн хуудас: баримт, түүх, байгаль, үзэх газар, зургийн цомог, байршлын зураг |

`{lang}` ∈ `en` · `mn` · `ja` · `ko` · `zh` · `ru` → нийт 6 × 27 = 162 статик хуудас.

Хайлт (⌘K / Ctrl+K) толгой хэсэгт байрлах бөгөөд 21 аймаг, тэдгээрийн үзэх газрууд болон бүх хуудсыг индексэлдэг.

---

## Төслийн бүтэц

```
app/
  [lang]/
    layout.tsx              толгой, хөл, фонт, metadata, хэлний alternates
    page.tsx                нүүр хуудас
    about/page.tsx          танилцуулга + түүхэн зураглал
    culture/page.tsx        соёл, ёс заншил
    itineraries/page.tsx    аяллын маршрутууд
    practical/page.tsx      практик мэдээлэл
    province/[slug]/page.tsx  аймгийн хуудас
    [...rest]/page.tsx      тохироогүй хаягийг 404 руу (хэлний layout дотор)
    not-found.tsx           хэлний хэсгийн 404
  not-found.tsx             хэлний угтваргүй хаягийн 404 (өөрийн загвартай)
  sitemap.ts  robots.ts     sitemap.xml ба robots.txt
  icon.svg  apple-icon.png  favicon ба iOS дүрс
  globals.css               бүх загвар (дизайн token-ууд :root дээр)

components/                 Explorer, MongoliaMap, PhotoSlider, Search, Reveal г.м.
  JsonLd.tsx                schema.org блок хэвлэнэ
  NotFoundContent.tsx       404-ийн текст (хаягнаас хэлийг нь уншина)
lib/
  i18n.ts                   үндсэн толь бичиг (en + mn), Lang/Dict төрлүүд
  seo.ts                    сайтын хаяг, canonical, hreflang, хуваалцах карт
  aimags.ts                 аймгийн өгөгдлийг хэлээр нь угсардаг
  history.ts                түүхэн зураглалын өгөгдөл
  locales/{ja,ko,zh,ru}.ts  нэмэлт 4 хэлний толь
  guide/                    culture / itineraries / practical / search текстүүд
    types.ts  routes.ts  index.ts  {en,mn,ja,ko,zh,ru}.ts
data/
  aimags.json               21 аймгийн монгол эх өгөгдөл + SVG зам (path)
  aimags-en.json            англи хувилбар
  ulaanbaatar.json          нийслэлийн SVG зам
  images.json               аймаг бүрийн үндсэн зураг + лиценз
  gallery.json              нэмэлт зургууд + лиценз
middleware.ts               хэлний угтваргүй бүх хаягт хэл таниулах
```

---

## i18n хэрхэн ажилладаг вэ

Хоёр давхарга:

1. **`lib/i18n.ts`** — `en` объект нь эх загвар, `Dict = typeof en`. `mn` нь түүнийг бүрэн гүйцээнэ.
   Нэмэлт 4 хэл `lib/locales/*.ts` дотор `LocalePack.dict` болж орно.
   → **`en` дээр шинэ түлхүүр нэмвэл бусад 5 хэлэнд заавал нэмэх ёстой**, эс бөгөөс TypeScript алдаа өгнө.

2. **`lib/guide/`** — шинэ хуудсуудын (соёл, маршрут, практик, хайлт) текст.
   Хэл бүр `GuideText` төрлийг бүрэн хангасан нэг файлтай. `getGuide(lang)` буцаана.
   Хуваалцсан өгөгдөл (өдрийн тоо, аймгийн slug, зураг) `lib/guide/routes.ts` дотор нэг л удаа бичигддэг — зөвхөн текст нь орчуулагдана.

Аймгийн нэр, төв, танилцуулга, түүх, байгаль, үзэх газрууд нь `getAimag(slug, lang)`-аар хэлээр нь угсрагдана:
монголоор `data/aimags.json`, англиар `data/aimags-en.json`, бусдаар `locales/*.aimags`.

### Шинэ хэл нэмэх

1. `lib/i18n.ts` → `langs` массивт код нэмэх, `langNames`-д эх нэрийг нь бичих
2. `middleware.ts` → `supported` массивт нэмэх
3. `lib/locales/<code>.ts` → `LocalePack` бүрэн бөглөх (dict, aimags, captions, eras, history, about, numbers)
4. `lib/guide/<code>.ts` → `GuideText` бүрэн бөглөх
5. `lib/i18n.ts` → `packs`-д, `lib/guide/index.ts` → `guides`-д бүртгэх

TypeScript дутуу талбар бүрийг заана.

---

## Өгөгдөл ба эх сурвалж

- **Нутаг дэвсгэр, хүн ам:** Монгол Улсын 2020 оны хүн ам, орон сууцны тооллого
- **Хил зааг (SVG):** Natural Earth
- **Зургууд:** Wikimedia Commons — зохиогч, лиценз, эх сурвалж тус бүр `data/images.json` / `data/gallery.json` дотор бүртгэгдсэн бөгөөд сайт дээр зураг бүрийн доор харагдана (`PhotoCredit`)

> Виз, нислэг, үнэ зэрэг практик мэдээлэл өөрчлөгдөж болзошгүй тул `practical` хуудас нь зөвхөн чиглүүлэх зорилготой. Албан ёсны эх сурвалжаас шалгахыг зөвлөдөг.

---

## SEO ба хуваалцах

- **Сайтын хаяг.** `lib/seo.ts` дахь `siteUrl` нь `NEXT_PUBLIC_SITE_URL` → Vercel-ийн
  production домэйн → `https://21-aimag.vercel.app` гэсэн дарааллаар сонгоно. Өөр домэйн
  рүү шилжвэл `NEXT_PUBLIC_SITE_URL`-ийг тохируулахад canonical, sitemap, OG зураг бүгд
  дагаж өөрчлөгдөнө.
- **Canonical ба hreflang.** Хуудас бүр `alternates(lang, path)`-аар 6 хэлний hreflang
  болон `x-default` (англи) өгнө.
- **Хуваалцах карт.** `share()` нь Open Graph болон X картыг бүрэн гаргана. Next нь
  эцэг layout-ын `openGraph`-ыг нэгтгэхгүй дарж бичдэг тул хуудас бүр бүтнээр нь өгдөг.
  Үндсэн зураг: `public/images/og/og-default.jpg` (1200×630, гэрийн зургаас тайрсан),
  аймгийн хуудас өөрийн зургаа ашиглана.
- **JSON-LD.** Нүүр хуудас `WebSite`, аймгийн хуудас `TouristDestination` +
  `BreadcrumbList`, аймгуудын жагсаалт `ItemList`.
- **404.** `/{lang}/...` доорх тохироогүй хаяг толгой, хөлтэйгээр хэл дээрээ гарна;
  угтваргүй хаяг (жишээ нь `/broken.php`) өөрийн загвартай энгийн 404 харуулна.

---

## Deploy

Статик хуудас дээр суурилсан тул Vercel дээр тохиргоогүй ажиллана:

```bash
npm run build
```

`middleware.ts` нь хэлний угтваргүй хаягуудыг барьдаг тул Edge дээр ажиллана. Бусад
hosting дээр Next.js Node server (`npm start`) шаардлагатай.

> **Локал build-ийн анхааруулга.** Төслийн зам апостроф агуулж байвал
> (`C:\Sainbayar's Files\...`) Next.js-ийн metadata route-ууд (`sitemap.ts`, `robots.ts`,
> `icon.svg`, `apple-icon.png`) compile хийгдэхгүй — Next тэр замыг ганц хашилтан
> мөрөнд шууд оруулдаг. Vercel дээр асуудалгүй. Локал дээр бүрэн build хийх бол
> төслийг апострофгүй зам руу (жишээ нь `C:\Projects\21-aimag`) зөөх хэрэгтэй.
