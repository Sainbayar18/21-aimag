"use client";

import { createContext, useContext } from "react";
import type { ExperienceId } from "@/lib/i18n";

/**
 * The "Find your Mongolia" choice, shared between the province list and the
 * map on the destinations page. The map is handed to Explorer from the server
 * page as a prop, so it cannot receive the filter as one; it reads it from here.
 */
export type ExperienceFilter = {
  filter: ExperienceId | null;
  setFilter: (id: ExperienceId | null) => void;
};

export const ExperienceFilterContext = createContext<ExperienceFilter | null>(null);

/** null outside the destinations page, where the map stands on its own. */
export function useExperienceFilter() {
  return useContext(ExperienceFilterContext);
}
