import raw from "@/data/naadam-photos.json";
import type { Photo } from "@/lib/aimags";

/*
 * The Naadam page's photographs, from Wikimedia Commons, with their credits.
 * Their captions are the alt text in the guide, in every language.
 */
const photos = raw as Record<string, Omit<Photo, "caption">>;

export function getNaadamPhoto(key: string, caption: string): Photo {
  return { ...photos[key], caption };
}
