import raw from "@/data/deel-photos.json";
import type { Photo } from "@/lib/aimags";

/*
 * Credits for the deels page's photographs. Most of its pictures are AI
 * illustrations, credited as such on the page; the few real photographs,
 * from Wikimedia Commons, carry their author and licence here.
 */
const photos = raw as Record<string, Omit<Photo, "caption">>;

export function getDeelPhoto(key: string, caption: string): Photo {
  return { ...photos[key], caption };
}
