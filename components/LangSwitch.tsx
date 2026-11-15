"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { getDict, langNames, langs, type Lang } from "@/lib/i18n";

/** Language menu: keeps the current page, swaps the /{lang} prefix. */
export default function LangSwitch({ lang }: { lang: Lang }) {
  const pathname = usePathname() || `/${lang}`;
  const t = getDict(lang);
  const ref = useRef<HTMLDetailsElement>(null);

  // Close on outside click and on Escape.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onDown = (e: PointerEvent) => {
      if (el.open && !el.contains(e.target as Node)) el.open = false;
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && el.open) {
        el.open = false;
        el.querySelector("summary")?.focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // Close after navigating to another language.
  useEffect(() => {
    if (ref.current) ref.current.open = false;
  }, [pathname]);

  const hrefFor = (l: Lang) => pathname.replace(new RegExp(`^/(${langs.join("|")})(?=/|$)`), `/${l}`);

  return (
    <details ref={ref} className="lang-menu">
      <summary className="lang-switch" aria-label={`${t.langMenu}: ${langNames[lang]}`}>
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z" />
        </svg>
        <span className="lang-current">{langNames[lang]}</span>
        <svg className="lang-caret" width="14" height="14" viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 8l5 5 5-5" />
        </svg>
      </summary>
      <ul className="lang-list">
        {langs.map((l) => (
          <li key={l}>
            <Link
              href={hrefFor(l)}
              hrefLang={l}
              lang={l}
              aria-current={l === lang ? "true" : undefined}
              className={l === lang ? "is-current" : undefined}
            >
              <span>{langNames[l]}</span>
              <span className="lang-code" aria-hidden="true">{l.toUpperCase()}</span>
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}
