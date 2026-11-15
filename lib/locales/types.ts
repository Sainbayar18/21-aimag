import type { Dict } from "@/lib/i18n";
import type { AboutText } from "@/lib/history";

export type AimagText = {
  name: string;
  capital: string;
  lead: string;
  history: string;
  nature: string;
  sights: string[];
};

/** Everything one extra language needs (English and Mongolian live in i18n.ts / history.ts). */
export type LocalePack = {
  dict: Dict;
  aimags: Record<string, AimagText>;
  /** English caption → translated caption */
  captions: Record<string, string>;
  eras: Record<string, { name: string; range: string }>;
  history: Record<string, { date: string; title: string; text: string }>;
  about: AboutText;
  /** how to print "55 314 км²" from the source data */
  numbers: { group: "," | " "; areaUnit: string };
};
