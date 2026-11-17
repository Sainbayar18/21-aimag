import { notFound } from "next/navigation";

/**
 * Anything under a language that matches no real page — /en/typo, a dead deep
 * link — lands here and renders the 404 of app/[lang]/not-found.tsx, inside the
 * normal header and footer and in the right language. Next serves it with a
 * 404 status and a noindex tag of its own.
 */
export const dynamicParams = true;

export default function CatchAll(): never {
  notFound();
}
