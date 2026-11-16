import en from "@/lib/guide/en";
import ja from "@/lib/guide/ja";
import ko from "@/lib/guide/ko";
import mn from "@/lib/guide/mn";
import ru from "@/lib/guide/ru";
import zh from "@/lib/guide/zh";
import type { GuideText } from "@/lib/guide/types";
import type { Lang } from "@/lib/i18n";

const guides: Record<Lang, GuideText> = { en, mn, ja, ko, zh, ru };

/** Text for the culture / itineraries / practical pages and the search box. */
export function getGuide(lang: Lang): GuideText {
  return guides[lang];
}

export type { GuideText };
export * from "@/lib/guide/shared";
