import type { Photo } from "@/lib/aimags";
import { getDict, type Lang } from "@/lib/i18n";

export default function PhotoCredit({
  photo,
  lang,
  className = "",
}: {
  photo: Photo;
  lang: Lang;
  className?: string;
}) {
  const t = getDict(lang);
  return (
    <p className={`photo-credit ${className}`}>
      {photo.caption}. {t.photoBy}:{" "}
      <a href={photo.source} target="_blank" rel="noopener noreferrer">
        {photo.author || "Wikimedia Commons"}
      </a>
      ,{" "}
      {photo.licenseUrl ? (
        <a href={photo.licenseUrl} target="_blank" rel="noopener noreferrer license">
          {photo.license}
        </a>
      ) : (
        photo.license
      )}
    </p>
  );
}
