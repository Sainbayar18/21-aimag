import raw from "@/data/snuff-photos.json";
import type { Photo } from "@/lib/aimags";

/*
 * The snuff page's museum photographs (Gary Todd, CC0, Wikimedia Commons),
 * cropped to the bottles. Captions come from the guide text.
 */
const photos = raw as Record<string, Omit<Photo, "caption">>;

export function getSnuffPhoto(key: string, caption: string): Photo {
  return { ...photos[key], caption };
}
