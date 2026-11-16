"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { getAimags } from "@/lib/aimags";
import { getGuide } from "@/lib/guide";
import { getAbout } from "@/lib/history";
import { getDict, type Lang } from "@/lib/i18n";

type Kind = "province" | "sight" | "page";
type Hit = { id: string; kind: Kind; title: string; sub: string; href: string; hay: string };

/** Lowercase, strip accents, and fold the Mongolian vowels that visitors type without the diacritic. */
function fold(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/ө/g, "о")
    .replace(/ү/g, "у")
    .replace(/ё/g, "е");
}

/** Lower is better; -1 means no match. */
function score(hit: Hit, q: string) {
  const title = fold(hit.title);
  if (title.startsWith(q)) return 0;
  if (title.split(/[\s(/-]+/).some((w) => w.startsWith(q))) return 1;
  if (title.includes(q)) return 2;
  if (fold(hit.sub).includes(q)) return 3;
  if (hit.hay.includes(q)) return 4;
  return -1;
}

const MAX = 14;

export default function Search({ lang }: { lang: Lang }) {
  const router = useRouter();
  const t = getDict(lang);
  const g = getGuide(lang);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const index = useMemo<Hit[]>(() => {
    const aimags = getAimags(lang);
    const about = getAbout(lang);

    const pages: Hit[] = [
      { id: "p-home", kind: "page", title: t.brand, sub: t.brandSub, href: `/${lang}`, hay: "" },
      { id: "p-destinations", kind: "page", title: t.destinationsTitle, sub: t.destinationsLead, href: `/${lang}/destinations`, hay: "" },
      { id: "p-about", kind: "page", title: about.pageTitle, sub: about.pageLead, href: `/${lang}/about`, hay: "" },
      {
        id: "p-culture",
        kind: "page",
        title: g.culture.pageTitle,
        sub: g.culture.pageLead,
        href: `/${lang}/culture`,
        hay: Object.values(g.culture.sections).map((s) => `${s.title} ${s.text}`).join(" "),
      },
      {
        id: "p-itin",
        kind: "page",
        title: g.itineraries.pageTitle,
        sub: g.itineraries.pageLead,
        href: `/${lang}/itineraries`,
        hay: Object.values(g.itineraries.routes).map((r) => `${r.name} ${r.summary}`).join(" "),
      },
      {
        id: "p-practical",
        kind: "page",
        title: g.practical.pageTitle,
        sub: g.practical.pageLead,
        href: `/${lang}/practical`,
        hay: Object.values(g.practical.sections).map((s) => `${s.title} ${s.text}`).join(" "),
      },
    ];

    const provinces: Hit[] = aimags.map((a) => ({
      id: `a-${a.slug}`,
      kind: "province",
      title: a.name + t.provinceSuffix,
      sub: `${t.regions[a.regionId].name} · ${t.capitalShort}: ${a.capital}`,
      href: `/${lang}/province/${a.slug}`,
      hay: fold(`${a.slug} ${a.capital} ${a.lead} ${a.sights.join(" ")} ${a.experiences.map((e) => t.experiences[e].title).join(" ")}`),
    }));

    const sights: Hit[] = aimags.flatMap((a) =>
      a.sights.map((s, i) => ({
        id: `s-${a.slug}-${i}`,
        kind: "sight" as const,
        title: s,
        sub: a.name + t.provinceSuffix,
        href: `/${lang}/province/${a.slug}`,
        hay: fold(a.name),
      })),
    );

    return [...pages.map((p) => ({ ...p, hay: fold(`${p.sub} ${p.hay}`) })), ...provinces, ...sights];
  }, [lang, t, g]);

  const results = useMemo(() => {
    const needle = fold(q.trim());
    if (!needle) return [];
    const order: Record<Kind, number> = { province: 0, page: 1, sight: 2 };
    return index
      .map((hit) => ({ hit, s: score(hit, needle) }))
      .filter((r) => r.s >= 0)
      .sort((a, b) => a.s - b.s || order[a.hit.kind] - order[b.hit.kind] || a.hit.title.localeCompare(b.hit.title))
      .slice(0, MAX)
      .map((r) => r.hit);
  }, [index, q]);

  const groups = useMemo(() => {
    const by: Record<Kind, Hit[]> = { province: [], page: [], sight: [] };
    for (const r of results) by[r.kind].push(r);
    return (["province", "page", "sight"] as Kind[])
      .map((kind) => ({ kind, items: by[kind] }))
      .filter((grp) => grp.items.length > 0);
  }, [results]);

  /** Flat order used by the arrow keys, matching how the groups are rendered. */
  const flat = useMemo(() => groups.flatMap((grp) => grp.items), [groups]);

  useEffect(() => setActive(0), [q]);

  // ⌘K / Ctrl+K anywhere on the page.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>("[data-active='true']")?.scrollIntoView({ block: "nearest" });
  }, [active]);

  function close() {
    setOpen(false);
    setQ("");
    openerRef.current?.focus();
  }

  function go(hit: Hit) {
    close();
    router.push(hit.href);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (flat.length ? (i + 1) % flat.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (flat.length ? (i - 1 + flat.length) % flat.length : 0));
    } else if (e.key === "Enter" && flat[active]) {
      e.preventDefault();
      go(flat[active]);
    }
  }

  const icon = (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );

  return (
    <>
      <button ref={openerRef} type="button" className="search-open" onClick={() => setOpen(true)} aria-label={g.search.open}>
        {icon}
        <span className="search-open-text">{g.search.open}</span>
        <kbd className="search-kbd" aria-hidden="true">⌘K</kbd>
      </button>

      {open && (
        <div className="search-overlay" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && close()}>
          <div className="search-panel" role="dialog" aria-modal="true" aria-label={g.search.title} onKeyDown={onKeyDown}>
            <div className="search-field">
              <span className="search-field-icon" aria-hidden="true">{icon}</span>
              <input
                ref={inputRef}
                type="search"
                className="search-input"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder={g.search.placeholder}
                aria-label={g.search.title}
                autoComplete="off"
                spellCheck={false}
              />
              <button type="button" className="search-close" onClick={close} aria-label={g.search.close}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" aria-hidden="true">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>

            <div className="search-body">
              {!q.trim() ? (
                <p className="search-note">{g.search.hint}</p>
              ) : flat.length === 0 ? (
                <div className="search-note">
                  <p className="search-empty">{g.search.empty(q.trim())}</p>
                  <p>{g.search.emptyHint}</p>
                </div>
              ) : (
                <>
                  <p className="search-count" aria-live="polite">{g.search.results(flat.length)}</p>
                  <ul ref={listRef} className="search-list">
                    {groups.map((grp) => (
                      <li key={grp.kind}>
                        <p className="search-group">
                          {grp.kind === "province" ? g.search.provinces : grp.kind === "page" ? g.search.pages : g.search.sights}
                        </p>
                        <ul className="search-sublist">
                          {grp.items.map((hit) => {
                            const i = flat.indexOf(hit);
                            return (
                              <li key={hit.id}>
                                <button
                                  type="button"
                                  className={`search-hit${i === active ? " is-active" : ""}`}
                                  data-active={i === active}
                                  onMouseMove={() => setActive(i)}
                                  onClick={() => go(hit)}
                                >
                                  <span className="search-hit-title">{hit.title}</span>
                                  <span className="search-hit-sub">{hit.sub}</span>
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
