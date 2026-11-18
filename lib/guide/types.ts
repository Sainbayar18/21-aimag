import type { ChestItemId, CultureId, DishId, GerObjectId, PracticalId, RouteId, WayId } from "@/lib/guide/shared";

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
  /** on every other page: the way back into the ger, top and foot */
  toGer: string;
  close: string;
  objectsLabel: string;
  doorAria: string;
  objects: Record<GerObjectId, { name: string; teaser: string; cta: string }>;
  /** the things in the opened chest: what each is, and the page it opens */
  chest: Record<ChestItemId, { name: string; page: string }>;
};

/** Everything the culture / itineraries / practical pages need. */
export type GuideText = {
  nav: { culture: string; itineraries: string; practical: string; food: string };

  ger: GerText;

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

  /** The getting-here page, opened by the plane ticket in the ger. */
  arrive: {
    pageTitle: string;
    pageLead: string;
    metaDescription: string;
    /** what the map shows, for a screen reader */
    mapLabel: string;
    /** the names written on the map */
    places: {
      russia: string;
      china: string;
      kazakhstan: string;
      altai: string;
      ulaanbaatar: string;
      zamynUud: string;
      altanbulag: string;
      tsagaannuur: string;
      ereentsav: string;
      ulanUde: string;
      beijing: string;
    };
    waysLabel: string;
    ways: Record<WayId, GuideSection>;
    border: GuideSection;
    /** "{link}" marks where the link to the practical page goes */
    visa: string;
    visaLink: string;
    disclaimer: string;
  };

  food: {
    pageTitle: string;
    pageLead: string;
    metaDescription: string;
    intro: string[];
    dishesTitle: string;
    dishesLead: string;
    /** name: what the dish is, in this language (for mn, the dish's own name) */
    dishes: Record<DishId, { name: string; text: string; tip: string }>;
    tableTitle: string;
    tableLead: string;
    table: string[];
    whereTitle: string;
    whereLead: string;
    where: { title: string; text: string }[];
    phrasesTitle: string;
    phrasesLead: string;
    /** Meanings, aligned by index with `foodPhrases` in shared.ts */
    phrases: string[];
    note: string;
  };
};
