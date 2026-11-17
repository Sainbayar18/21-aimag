import { notFound } from "next/navigation";
import GerEntry from "@/components/GerEntry";
import JsonLd from "@/components/JsonLd";
import { getDict, isLang } from "@/lib/i18n";
import { absolute } from "@/lib/seo";

type Props = { params: Promise<{ lang: string }> };

/**
 * The home page is the ger and nothing else. The map and the province list
 * live on /{lang}/destinations; seasons and trip planning on /{lang}/practical.
 */
export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const t = getDict(lang);

  /* The site itself, so a search result can carry the name and the language. */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: t.brand,
    alternateName: t.brandSub,
    description: t.metaDescription,
    url: absolute(`/${lang}`),
    inLanguage: lang,
  };

  return (
    <main>
      <JsonLd data={jsonLd} />
      <GerEntry lang={lang} />
    </main>
  );
}
