import raw from "@/data/tsagaan-sar-photos.json";
import type { Photo } from "@/lib/aimags";

/*
 * The Tsagaan Sar page's photographs, from Wikimedia Commons, with their
 * credits. The zolgokh picture is an AI illustration and is not listed here.
 */
const photos = raw as Record<string, Omit<Photo, "caption">>;

export function getTsagaanSarPhoto(key: string, caption: string): Photo {
  return { ...photos[key], caption };
}
