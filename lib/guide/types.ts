import type {
  ChestItemId,
  CultureId,
  DeelFamilyId,
  DeelId,
  DishId,
  GerObjectId,
  NaadamGameId,
  NaadamTitleId,
  PracticalId,
  RouteId,
  SnuffBottleId,
  WayId,
  WrestlerGearId,
} from "@/lib/guide/shared";

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

  /** The deels page, opened by the silk deel in the chest. */
  deels: {
    pageTitle: string;
    pageLead: string;
    metaDescription: string;
    /** how the pictures were made, under the lead */
    note: string;
    lineupLabel: string;
    /** under each AI illustration */
    aiCaption: string;
    /** "{name}" is replaced with the people's name */
    imageAlt: string;
    /** the Kazakh photograph's caption */
    photoCaption: string;
    /** for a people whose deel is not pictured */
    missing: string;
    families: Record<DeelFamilyId, { title: string; text: string }>;
    groups: Record<DeelId, { name: string; place: string; text: string }>;
    sources: string;
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

  naadam: {
    pageTitle: string;
    pageLead: string;
    metaDescription: string;
    intro: string[];
    wrestlingTitle: string;
    wrestlingLead: string;
    rulesTitle: string;
    rulesLead: string;
    rules: string[];
    outfitTitle: string;
    outfitText: string;
    /** what each piece is; its Mongolian name is in shared.ts */
    outfit: Record<WrestlerGearId, string>;
    ritualTitle: string;
    ritualText: string;
    titlesTitle: string;
    titlesLead: string;
    titles: Record<NaadamTitleId, { meaning: string; rule: string }>;
    gamesTitle: string;
    games: Record<NaadamGameId, { title: string; text: string }>;
    watchTitle: string;
    watchLead: string;
    watch: string[];
    /** alt text for each photograph, keyed as in data/naadam-photos.json */
    photoAlt: Record<string, string>;
    note: string;
  };

  snuff: {
    pageTitle: string;
    pageLead: string;
    metaDescription: string;
    heroAlt: string;
    aiCaption: string;
    intro: string[];
    stepsTitle: string;
    /** the exchange, in order */
    steps: { title: string; text: string }[];
    elderTitle: string;
    elderText: string;
    avoidTitle: string;
    avoidLead: string;
    avoid: string[];
    bottlesTitle: string;
    bottlesText: string;
    bottles: Record<SnuffBottleId, string>;
    note: string;
  };
};
