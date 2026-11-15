import TransitionLink from "@/components/TransitionLink";
import { getAimags, provinceHref, ulaanbaatarPath, zoomViewBox, type Aimag } from "@/lib/aimags";
import { getDict, type Lang } from "@/lib/i18n";

/** Zoomed map centred on one province; neighbours stay clickable. */
export default function LocatorMap({ aimag, lang }: { aimag: Aimag; lang: Lang }) {
  const t = getDict(lang);
  const { viewBox, strokeWidth } = zoomViewBox(aimag);

  return (
    <div className="locator">
      <svg className="map" viewBox={viewBox} role="group" aria-label={t.locatorAria(aimag.name)}>
        <path className="ub" d={ulaanbaatarPath} strokeWidth={strokeWidth} />
        {getAimags(lang).map((a) => (
          <TransitionLink
            key={a.id}
            href={provinceHref(lang, a.slug)}
            aria-label={a.name + t.provinceSuffix}
            aria-current={a.id === aimag.id ? "page" : undefined}
            className={`r-${a.regionId}${a.id === aimag.id ? " is-selected" : ""}`}
          >
            <path d={a.d} strokeWidth={strokeWidth} />
          </TransitionLink>
        ))}
      </svg>
      <p className="caption">{t.locatorNote}</p>
    </div>
  );
}
