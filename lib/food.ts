import raw from "@/data/food-photos.json";
import type { Photo } from "@/lib/aimags";

/*
 * The food page's photographs, from Wikimedia Commons, with their credits.
 * They are kept apart from the province photos because their captions are
 * the dishes' names, which already live in the guide text in every language.
 */
const photos = raw as Record<string, Omit<Photo, "caption">>;

export function getFoodPhoto(key: string, caption: string): Photo {
  return { ...photos[key], caption };
}
