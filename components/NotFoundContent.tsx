"use client";

import { useEffect, useState } from "react";

export type NotFoundText = { title: string; text: string; home: string; destinations: string };

/** The language codes, spelled out so this file pulls no dictionary into the browser bundle. */
const LANGS = ["en", "mn", "ja", "ko", "zh", "ru"];

/**
 * Next renders one 404 page for the whole language segment and passes it no
 * params, so the language is read from the address after mount. The server
 * renders English, which is also what a visitor on a path with no language
 * prefix keeps seeing.
 */
export default function NotFoundContent({ texts }: { texts: Record<string, NotFoundText> }) {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const segment = window.location.pathname.split("/")[1];
    if (LANGS.includes(segment)) setLang(segment);
  }, []);

  const t = texts[lang] ?? texts.en;

  // The boundary that renders this page keeps the site title, so set it here.
  useEffect(() => {
    document.title = t.title;
  }, [t.title]);

  return (
    <main className="container stack page-plain">
      <section className="section">
        <div className="section-head">
          <h1 className="h2">{t.title}</h1>
          <p className="lead muted">{t.text}</p>
        </div>
        <p className="hero-actions">
          <a className="primary-btn" href={`/${lang}`}>
            {t.home}
          </a>
          <a className="ghost-btn" href={`/${lang}/destinations`}>
            {t.destinations}
          </a>
        </p>
      </section>
    </main>
  );
}
