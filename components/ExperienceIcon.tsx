import type { ExperienceId } from "@/lib/i18n";

const paths: Record<ExperienceId, React.ReactNode> = {
  desert: (
    <>
      <path d="M2 18c3-4 6-6 10-6s7 2 10 6" />
      <path d="M7 13c2-3 4-4 6-4" />
      <circle cx="17" cy="6" r="2.5" />
    </>
  ),
  lakes: (
    <>
      <path d="M2 15c2 0 2-1.5 4-1.5S8 15 10 15s2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5" />
      <path d="M2 19c2 0 2-1.5 4-1.5S8 19 10 19s2-1.5 4-1.5 2 1.5 4 1.5 2-1.5 4-1.5" />
      <path d="m5 11 4-6 3 4 2-2 4 4" />
    </>
  ),
  mountains: (
    <>
      <path d="m2 20 7-13 4 7 2-3 7 9Z" />
      <path d="m7.5 10 1.5 1.5L10.5 10" />
    </>
  ),
  heritage: (
    <>
      <path d="M4 20h16M6 20v-7M18 20v-7M10 20v-5h4v5" />
      <path d="M3 13h18L12 6 3 13Z" />
      <path d="M12 6V3" />
    </>
  ),
  wildlife: (
    <>
      <path d="M5 19v-5l-2-2 2-5 3 2h7l3-3 2 2-2 4v7" />
      <path d="M9 19v-4M15 19v-4" />
    </>
  ),
  nomadic: (
    <>
      <path d="M3 19h18" />
      <path d="M4.5 19v-6.5L12 8l7.5 4.5V19" />
      <path d="M12 8V5M10 19v-4h4v4" />
    </>
  ),
};

export default function ExperienceIcon({ id, size = 22 }: { id: ExperienceId; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[id]}
    </svg>
  );
}
