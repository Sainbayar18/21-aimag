import Reveal from "@/components/Reveal";
import TransitionLink from "@/components/TransitionLink";
import { entryLabel, getAbout, history } from "@/lib/history";
import type { Lang } from "@/lib/i18n";

/** Home-page section: what Mongolia is, key facts, and a short timeline. */
export default function AboutTeaser({ lang }: { lang: Lang }) {
  const a = getAbout(lang);
  const key = history.filter((h) => h.key);

  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="about-grid">
        <Reveal className="section-head">
          <p className="kicker">01</p>
          <p className="label">{a.kicker}</p>
          <h2 id="about-title" className="h2 about-title">{a.title}</h2>
          {a.intro.map((p) => (
            <p key={p.slice(0, 20)} className="about-intro">
              {p}
            </p>
          ))}
        </Reveal>
        <Reveal delay={120}>
          <dl className="glance">
            {a.facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <Reveal className="mini-timeline-wrap">
        <h3 className="label">{a.timelineTeaser}</h3>
        <ol className="mini-timeline">
          {key.map((h, i) => {
            const e = entryLabel(h, lang);
            return (
              <li key={h.id} style={{ transitionDelay: `${i * 90}ms` }}>
                <span className="mini-date">{e.date}</span>
                <span className="mini-title">{e.title}</span>
              </li>
            );
          })}
        </ol>
        <TransitionLink href={`/${lang}/about`} className="primary-btn">
          {a.readMore}
          <svg width="18" height="18" viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 10h12M11 5l5 5-5 5" />
          </svg>
        </TransitionLink>
      </Reveal>
    </section>
  );
}
