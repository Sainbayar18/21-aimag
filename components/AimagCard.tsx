import Image from "next/image";
import TransitionLink from "@/components/TransitionLink";
import { getPhoto, provinceHref, type Aimag } from "@/lib/aimags";
import { getDict, type Lang } from "@/lib/i18n";

/** Photo card linking to a province page; its photo morphs into the page hero. */
export default function AimagCard({
  aimag,
  lang,
  eyebrow,
  compact = false,
}: {
  aimag: Aimag;
  lang: Lang;
  eyebrow?: string;
  compact?: boolean;
}) {
  const t = getDict(lang);
  const photo = getPhoto(aimag.slug, lang);

  return (
    <TransitionLink
      href={provinceHref(lang, aimag.slug)}
      className={`card${compact ? " card--compact" : ""}`}
    >
      <span className="card-media" data-vt-photo="">
        <Image
          src={photo.file}
          alt={photo.caption}
          fill
          sizes={compact ? "160px" : "(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 320px"}
        />
        {!compact && <span className="card-region">{t.regions[aimag.regionId].name}</span>}
      </span>
      <span className="card-body">
        {eyebrow && <span className="label">{eyebrow}</span>}
        <span className="card-title">{aimag.name}</span>
        {!compact && (
          <span className="card-tags">
            {aimag.experiences.slice(0, 3).map((e) => (
              <span key={e} className="tag">
                {t.experiences[e].title}
              </span>
            ))}
          </span>
        )}
      </span>
      <svg
        className="card-arrow"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 10h12M11 5l5 5-5 5" />
      </svg>
    </TransitionLink>
  );
}
