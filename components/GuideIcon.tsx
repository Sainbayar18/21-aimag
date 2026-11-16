import type { ReactNode } from "react";
import type { CultureId, PracticalId } from "@/lib/guide";

type Id = CultureId | PracticalId;

/** Line icons for the culture and practical sections, drawn on a 24×24 grid. */
const paths: Record<Id, ReactNode> = {
  // culture
  ger: (
    <>
      <path d="M3 19 12 5l9 14Z" />
      <path d="M10 19v-5h4v5" />
      <path d="M12 5v4" />
    </>
  ),
  greetings: (
    <>
      <path d="M7 13 4.5 10.5a2 2 0 0 1 2.8-2.8L12 12.4l4.7-4.7a2 2 0 0 1 2.8 2.8L17 13" />
      <path d="M7 13v3.5A3.5 3.5 0 0 0 10.5 20h3a3.5 3.5 0 0 0 3.5-3.5V13" />
    </>
  ),
  food: (
    <>
      <path d="M5 10h14a7 7 0 0 1-7 7 7 7 0 0 1-7-7Z" />
      <path d="M3 20h18" />
      <path d="M9 7c0-1 1-1.5 1-2.5S9 3 9 3M14 7c0-1 1-1.5 1-2.5S14 3 14 3" />
    </>
  ),
  naadam: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 4v16M4 12h16" />
      <path d="M8.5 8.5 15.5 15.5M15.5 8.5 8.5 15.5" />
    </>
  ),
  music: (
    <>
      <path d="M9 18V6l10-2v12" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="17" cy="16" r="2" />
    </>
  ),
  faith: (
    <>
      <path d="M4 20h16" />
      <path d="M7 20v-4l5-3 5 3v4" />
      <path d="M12 13V9M9.5 9h5" />
      <circle cx="12" cy="5.5" r="2" />
    </>
  ),
  script: (
    <>
      <path d="M8 3v18M16 3v18" />
      <path d="M8 7h3M8 12h3M8 17h3M16 9h3M16 15h3" />
    </>
  ),
  year: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 3.5v3M12 17.5v3M3.5 12h3M17.5 12h3" />
      <path d="m12 12 3.5 2" />
      <path d="M12 7.5V12" />
    </>
  ),

  // practical
  visa: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <circle cx="12" cy="10" r="2.5" />
      <path d="M8 17c1-2 2.4-3 4-3s3 1 4 3" />
    </>
  ),
  arriving: (
    <>
      <path d="M2 16 22 9l-2.5-3-5.5 2-6-5-2.5 1 4 5.5-4 1-2-2L2 9.5Z" />
      <path d="M4 20h16" />
    </>
  ),
  around: (
    <>
      <path d="M3 16l1.5-6h15L21 16Z" />
      <circle cx="7" cy="17.5" r="1.8" />
      <circle cx="17" cy="17.5" r="1.8" />
      <path d="M3 13h18M12 10V5" />
    </>
  ),
  money: (
    <>
      <rect x="2.5" y="6" width="19" height="12" rx="2" />
      <circle cx="12" cy="12" r="2.8" />
      <path d="M6 12h.01M18 12h.01" />
    </>
  ),
  connect: (
    <>
      <path d="M12 19.5h.01" />
      <path d="M8.5 16a5 5 0 0 1 7 0" />
      <path d="M5.5 12.8a9.5 9.5 0 0 1 13 0" />
      <path d="M2.5 9.6a14 14 0 0 1 19 0" />
    </>
  ),
  health: (
    <>
      <path d="M12 20s-7.5-4.4-7.5-9.5A4.5 4.5 0 0 1 12 7.6a4.5 4.5 0 0 1 7.5 2.9C19.5 15.6 12 20 12 20Z" />
      <path d="M12 10.5v4M10 12.5h4" />
    </>
  ),
  stay: (
    <>
      <path d="M3 20h18" />
      <path d="M4 20v-7l8-5 8 5v7" />
      <path d="M10 20v-4.5h4V20" />
    </>
  ),
  pack: (
    <>
      <rect x="4" y="7" width="16" height="13" rx="2" />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
      <path d="M4 12h16" />
    </>
  ),
  respect: (
    <>
      <path d="M12 3c3 4 4.5 6.5 4.5 9a4.5 4.5 0 0 1-9 0c0-2.5 1.5-5 4.5-9Z" />
      <path d="M12 12v9" />
      <path d="M8 21h8" />
    </>
  ),
};

export default function GuideIcon({ id, size = 22 }: { id: Id; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[id]}
    </svg>
  );
}
