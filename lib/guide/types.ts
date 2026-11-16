import type { CultureId, GerObjectId, PracticalId, RouteId } from "@/lib/guide/shared";

/** One titled block with a short paragraph and a few bullet points. */
export type GuideSection = {
  title: string;
  text: string;
  points: string[];
};

/** One stop on a route. Aligned by index with the slugs in `routeMeta`. */
export type RouteStop = {
  /** The place itself: "Khongoryn Els", "Erdene Zuu" … */
  place: string;
  text: string;
};

export type RouteText = {
  name: string;
  summary: string;
  /** Best months, written out: "June – September" */
  bestTime: string;
  tip: string;
  stops: RouteStop[];
};

/** Everything the culture / itineraries / practical pages and the search box need. */
/** The ger you walk into on the landing scene. */
export type GerText = {
  doorKicker: string;
  doorTitle: string;
  doorLead: string;
  doorAction: string;
  skip: string;
  sceneTitle: string;
  hint: string;
  scrollHint: string;
  back: string;
  close: string;
  objectsLabel: string;
  doorAria: string;
  objects: Record<GerObjectId, { name: string; teaser: string; cta: string }>;
};

export type GuideText = {
  nav: { culture: string; itineraries: string; practical: string };

  ger: GerText;

  search: {
    open: string;
    title: string;
    placeholder: string;
    hint: string;
    empty: (q: string) => string;
    emptyHint: string;
    provinces: string;
    sights: string;
    pages: string;
    close: string;
    results: (n: number) => string;
  };

  itineraries: {
    kicker: string;
    pageTitle: string;
    pageLead: string;
    metaDescription: string;
    /** "8 days" / "6–8 days" */
    daysLabel: (from: number, to: number) => string;
    /** "≈ 1,600 km" */
    distanceLabel: (km: number) => string;
    bestTimeLabel: string;
    stopsLabel: string;
    tipLabel: string;
    provincesLabel: string;
    openProvince: (name: string) => string;
    note: string;
    routes: Record<RouteId, RouteText>;
  };

  culture: {
    kicker: string;
    pageTitle: string;
    pageLead: string;
    metaDescription: string;
    intro: string[];
    sections: Record<CultureId, GuideSection>;
    etiquetteTitle: string;
    etiquetteLead: string;
    doTitle: string;
    dontTitle: string;
    dos: string[];
    donts: string[];
  };

  practical: {
    kicker: string;
    pageTitle: string;
    pageLead: string;
    metaDescription: string;
    sections: Record<PracticalId, GuideSection>;
    phrasesTitle: string;
    phrasesLead: string;
    /** Meanings, aligned by index with `phrases` in shared.ts */
    phrases: string[];
    phraseHeadMn: string;
    phraseHeadSay: string;
    phraseHeadMeaning: string;
    emergencyTitle: string;
    emergencyLead: string;
    /** Labels, aligned by index with `emergencyNumbers` in shared.ts */
    emergency: string[];
    disclaimer: string;
  };
};
