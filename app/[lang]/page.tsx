import { notFound } from "next/navigation";
import GerEntry from "@/components/GerEntry";
import { isLang } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

/**
 * The home page is the ger and nothing else. The map and the province list
 * live on /{lang}/destinations; seasons and trip planning on /{lang}/practical.
 */
export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    <main>
      <GerEntry lang={lang} />
    </main>
  );
}
